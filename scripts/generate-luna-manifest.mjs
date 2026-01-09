import fs from "fs";
import path from "path";

const root = process.cwd();
const imagesDir = path.join(root, "public", "luna", "images");
const videosDir = path.join(root, "public", "luna", "videos");
const outFile = path.join(root, "public", "luna", "manifest.json");

const imageExt = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const videoExt = new Set([".mp4", ".webm", ".mov"]);

function listFiles(dir, allowedExt) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => allowedExt.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

const images = listFiles(imagesDir, imageExt).map((f) => `/luna/images/${f}`);
const videos = listFiles(videosDir, videoExt).map((f) => `/luna/videos/${f}`);

const payload = {
  generatedAt: new Date().toISOString(),
  images,
  videos,
};

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(payload, null, 2), "utf8");

console.log(`✅ Wrote ${outFile}`);
console.log(`   images: ${images.length}, videos: ${videos.length}`);
