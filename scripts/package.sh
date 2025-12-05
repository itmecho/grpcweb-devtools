#!/usr/bin/env sh

TAG=$1
if [ -z "$TAG" ]; then
  echo "Usage: $0 <tag>"
  exit 1
fi

set -e

package_version=$(jq -r '.version' package.json)
if [[ "$TAG" != "$package_version" ]]; then
  echo "Tag $TAG does not match package version $package_version"
  exit 1
fi

rm -f grpcweb-devtools*.zip
rm -f grpcweb-devtools*.xpi
npm run build
echo "Packaging for chrome..."
node ./scripts/transform-manifest.ts ./dist/manifest.json chrome ${TAG}
(cd dist; zip -r ../grpcweb-devtools-${TAG}.zip .)
echo "Packaging for firefox..."
node ./scripts/transform-manifest.ts ./dist/manifest.json firefox ${TAG}
(cd dist; zip -r ../grpcweb-devtools-${TAG}.xpi .)
