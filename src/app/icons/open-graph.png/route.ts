import { generateOgImage } from "../../og-image-generator";

export const runtime = "edge";

export async function GET() {
  return generateOgImage();
}
