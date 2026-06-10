import { generateOgImage } from "./og-image-generator";

export const runtime = "edge";

export const alt = "Rishi Chaurasia | Full-Stack Developer & AI Engineer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return generateOgImage();
}
