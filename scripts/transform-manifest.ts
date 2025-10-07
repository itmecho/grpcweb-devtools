import { existsSync, readFileSync, writeFileSync } from "node:fs";

const manifestPath = process.argv[2];
if (!manifestPath.endsWith("manifest.json") || !existsSync(manifestPath)) {
  throw new Error("ERROR: first arg must be a path to a manifest.json file");
}
const browser = process.argv[3];
if (browser !== "chrome" && browser !== "firefox") {
  throw new Error("ERROR: second arg must be either 'chrome' or 'firefox'");
}

const manifestFile = readFileSync(manifestPath, { encoding: "utf-8" });
const manifest = JSON.parse(manifestFile);
manifest["background"] =
  browser === "chrome"
    ? {
        service_worker: "worker.js",
      }
    : {
        scripts: ["worker.js"],
      };
writeFileSync(manifestPath, JSON.stringify(manifest, undefined, 2));
