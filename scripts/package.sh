#!/usr/bin/env sh

set -e

rm -f grpcweb-devtools*.zip
npm run build
echo "Packaging for chrome..."
node ./scripts/transform-manifest.ts ./dist/manifest.json chrome
(cd dist; zip -r ../grpcweb-devtools.chrome.zip .)
echo "Packaging for firefox..."
node ./scripts/transform-manifest.ts ./dist/manifest.json firefox
(cd dist; zip -r ../grpcweb-devtools.firefox.zip .)
