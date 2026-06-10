import fs from "fs";
import path from "path";
import chokidar from "chokidar";

const CONTENT_DIR = path.join(process.cwd(), "content");
const OUTPUT_DIR = path.join(process.cwd(), "src", "lib");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "content-index.json");

const SECTIONS = ["projects", "blog", "case-studies"];

function ensureDirs() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    console.log(`Created content directory at: ${CONTENT_DIR}`);
  }

  SECTIONS.forEach((section) => {
    const dir = path.join(CONTENT_DIR, section);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created section directory at: ${dir}`);
    }
  });

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory at: ${OUTPUT_DIR}`);
  }
}

type ParsedValue = string | string[] | boolean | number;

interface ParseResult {
  metadata: Record<string, ParsedValue>;
  body: string;
}

function parseFrontmatter(fileContent: string): ParseResult {
  const yamlRegex = /^---\r?\n([\s\S]+?)\r?\n---\r?\n?([\s\S]*)/;
  const match = fileContent.match(yamlRegex);

  if (!match) {
    return { metadata: {}, body: fileContent };
  }

  const yamlBlock = match[1];
  const body = match[2];
  const metadata: Record<string, ParsedValue> = {};

  yamlBlock.split(/\r?\n/).forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      let valStr = line.slice(colonIndex + 1).trim();

      if (
        (valStr.startsWith('"') && valStr.endsWith('"')) ||
        (valStr.startsWith("'") && valStr.endsWith("'"))
      ) {
        valStr = valStr.slice(1, -1);
      }

      let parsedVal: ParsedValue = valStr;

      if (valStr.startsWith("[") && valStr.endsWith("]")) {
        parsedVal = valStr
          .slice(1, -1)
          .split(",")
          .map((item) => item.trim().replace(/^['"]|['"]$/g, ""));
      } else if (valStr.toLowerCase() === "true") {
        parsedVal = true;
      } else if (valStr.toLowerCase() === "false") {
        parsedVal = false;
      } else if (!isNaN(Number(valStr)) && valStr !== "") {
        parsedVal = Number(valStr);
      }

      metadata[key] = parsedVal;
    }
  });

  return { metadata, body };
}

interface ContentItem {
  slug: string;
  [key: string]: unknown;
}

function compileContentIndex() {
  console.log("Compiling content registry...");
  const registry: Record<string, ContentItem[]> = {
    projects: [],
    blog: [],
    "case-studies": [],
  };

  SECTIONS.forEach((section) => {
    const dir = path.join(CONTENT_DIR, section);
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (!stat.isFile()) return;

      const ext = path.extname(file).toLowerCase();
      const slug = path.basename(file, ext);
      const content = fs.readFileSync(filePath, "utf-8");

      let itemData: ContentItem = { slug };

      if (ext === ".json") {
        try {
          const parsed = JSON.parse(content) as Record<string, unknown>;
          itemData = { ...itemData, ...parsed };
        } catch (e) {
          console.error(`Error parsing JSON file ${file}:`, e);
          return;
        }
      } else if (ext === ".md" || ext === ".mdx") {
        const { metadata, body } = parseFrontmatter(content);
        itemData = { ...itemData, ...metadata, body };
      } else {
        return;
      }

      registry[section].push(itemData);
    });
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(registry, null, 2), "utf-8");
  console.log(`Content index successfully generated at: ${OUTPUT_FILE}`);
}

let compileTimeout: NodeJS.Timeout | null = null;
function queueCompile() {
  if (compileTimeout) clearTimeout(compileTimeout);
  compileTimeout = setTimeout(() => {
    try {
      compileContentIndex();
    } catch (e) {
      console.error("Compilation failed:", e);
    }
  }, 150);
}

ensureDirs();
compileContentIndex();

if (process.argv.includes("--once")) {
  console.log("Single compilation complete. Exiting...");
  process.exit(0);
}

console.log(`Starting file watcher on: ${CONTENT_DIR}`);
const watcher = chokidar.watch(CONTENT_DIR, {
  ignored: /(^|[\/\\])\../, 
  persistent: true,
  ignoreInitial: true,
});

watcher
  .on("add", (filepath) => {
    console.log(`File added: ${path.relative(process.cwd(), filepath)}`);
    queueCompile();
  })
  .on("change", (filepath) => {
    console.log(`File changed: ${path.relative(process.cwd(), filepath)}`);
    queueCompile();
  })
  .on("unlink", (filepath) => {
    console.log(`File removed: ${path.relative(process.cwd(), filepath)}`);
    queueCompile();
  })
  .on("error", (error) => {
    console.error(`Watcher error: ${error}`);
  });

process.on("SIGINT", () => {
  console.log("\nClosing content watcher...");
  watcher.close().then(() => {
    console.log("Content watcher closed.");
    process.exit(0);
  });
});
