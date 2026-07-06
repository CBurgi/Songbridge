import { $ } from "bun";

console.log("Removing obsolete build...");
try {
  await $`rm dist/index* dist/logo*`;
} catch {
  // Ignore errors if files don't exist
}

console.log("Installing dependencies...");
await $`bun i`;

console.log("Building Tailwind CSS...");
await $`bun run tailwindcss -i ./src/input.css -o ./dist/output.css`;

console.log("Building server...");
await $`bun build --target=bun --production --outdir=dist ./src/index.ts`;

console.log("Building frontend...");
await $`bun build --production --outdir=dist ./src/frontend.tsx`;

console.log("Build complete!");

