import { ImageResponse } from "next/og";

async function loadFont(url: string): Promise<ArrayBuffer | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.arrayBuffer();
  } catch (e) {
    console.error("Failed to load font:", e);
    return null;
  }
}

export async function generateOgImage() {
  const boldFontUrl =
    "https://raw.githubusercontent.com/google/fonts/main/ofl/inter/static/Inter-Bold.ttf";
  const regularFontUrl =
    "https://raw.githubusercontent.com/google/fonts/main/ofl/inter/static/Inter-Regular.ttf";

  const [boldFontData, regularFontData] = await Promise.all([
    loadFont(boldFontUrl),
    loadFont(regularFontUrl),
  ]);

  interface FontOption {
    name: string;
    data: ArrayBuffer;
    style?: "normal" | "italic";
    weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  }

  const fonts: FontOption[] = [];
  if (regularFontData) {
    fonts.push({
      name: "Inter",
      data: regularFontData,
      style: "normal",
      weight: 400,
    });
  }
  if (boldFontData) {
    fonts.push({
      name: "Inter",
      data: boldFontData,
      style: "normal",
      weight: 800,
    });
  }

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#090d16",
        backgroundImage: "radial-gradient(circle at 50% 50%, #161233 0%, #070a10 100%)",
        color: "#fff",
        fontFamily: fonts.length > 0 ? "Inter" : "sans-serif",
        padding: "60px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "300px",
          height: "300px",
          borderRadius: "150px",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%)",
          filter: "blur(40px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "350px",
          height: "350px",
          borderRadius: "175px",
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0) 70%)",
          filter: "blur(50px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "1080px",
          height: "510px",
          backgroundColor: "rgba(11, 15, 25, 0.75)",
          borderRadius: "28px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "50px 60px",
          justifyContent: "space-between",
          position: "relative",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "64px",
                height: "64px",
                borderRadius: "32px",
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                color: "#fff",
                fontSize: "30px",
                fontWeight: 800,
                boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
              }}
            >
              R
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  fontWeight: 600,
                }}
              >
                Portfolio
              </span>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                Rishi
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
              borderRadius: "999px",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              fontSize: "14px",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            Available for Opportunities
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              margin: 0,
              background: "linear-gradient(to right, #ffffff 30%, #a855f7 70%, #6366f1 100%)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-2px",
              lineHeight: 1.1,
            }}
          >
            Rishi Chaurasia
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "rgba(255, 255, 255, 0.8)",
              margin: "4px 0 12px 0",
              fontWeight: 600,
            }}
          >
            Full-Stack Developer & AI Engineer
          </p>
          <p
            style={{
              fontSize: "19px",
              color: "rgba(255, 255, 255, 0.6)",
              margin: 0,
              maxWidth: "900px",
              lineHeight: "1.5",
              fontWeight: 400,
            }}
          >
            Specializing in scalable web applications. Designing modern frontend interfaces,
            training custom models, and deploying reliable backends.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <span
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                backgroundColor: "rgba(99, 102, 241, 0.12)",
                border: "1px solid rgba(99, 102, 241, 0.25)",
                color: "#a5b4fc",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              Generative AI
            </span>
            <span
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                backgroundColor: "rgba(168, 85, 247, 0.12)",
                border: "1px solid rgba(168, 85, 247, 0.25)",
                color: "#e9d5ff",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              Next.js / React
            </span>
            <span
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                backgroundColor: "rgba(6, 182, 212, 0.12)",
                border: "1px solid rgba(6, 182, 212, 0.25)",
                color: "#c5f2f7",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              Full Stack
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "8px" }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            rishibuilds.vercel.app
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts,
    },
  );
}
