#! /bin/bash
#
# Render all .aseprite files in ./aseprites into separate .webp files.
# Requires having Aseprite installed and available in PATH.

set -eo pipefail

mkdir -p ./public/rendered

for file in ./aseprites/*.aseprite
do
  dest="./public/rendered/$(basename $file .aseprite).webp"
  aseprite $file --save-as $dest --batch
done
