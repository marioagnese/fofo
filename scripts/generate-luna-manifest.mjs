// scripts/generate-luna-manifest.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const LUNA_DIR = path.join(PUBLIC_DIR, "luna");
const IMAGES_DIR = path.join(LUNA_DIR, "images");
const VIDEOS_DIR = path.join(LUNA_DIR, "videos");
const OUT_FILE = path.join(LUNA_DIR, "manifest.json");

// Allowed extensions
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const VIDEO_EXT = new Set([".mp4", ".webm", ".mov", ".m4v"]);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function listFiles(dir, allowedExtSet) {
  if (!fs.existsSync(dir)) return [];

  const items = fs.readdirSync(dir, { withFileTypes: true });

  const files = items
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((name) => allowedExtSet.has(path.extname(name).toLowerCase()));

  // Natural-ish sort so luna2 < luna10
  files.sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
  );

  return files;
}

function toPublicUrl(kind, filename) {
  // kind = "images" or "videos"
  return `/luna/${kind}/${filename}`;
}

function main() {
  ensureDir(LUNA_DIR);

  const images = listFiles(IMAGES_DIR, IMAGE_EXT).map((f) =>
    toPublicUrl("images", f)
  );
  const videos = listFiles(VIDEOS_DIR, VIDEO_EXT).map((f) =>
    toPublicUrl("videos", f)
  );

  const manifest = {
    generatedAt: new Date().toISOString(),
    images,
    videos,
  };

  fs.writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2), "utf8");

  console.log(
    `[LUNA] manifest.json generated: ${images.length} images, ${videos.length} videos -> public/luna/manifest.json`
  );
}

main();
