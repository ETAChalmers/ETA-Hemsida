#!/bin/sh

set -x -e -o pipefail # Show commands executed, exit on error (including subcommands)

cleanup() {
    rm -rf /tmp/auction-images /tmp/auction-images.zip
}
trap cleanup EXIT

curl -k 'https://sortera.sk6ab.se/api/export.zip?images=1' --output /tmp/auction-images.zip

unzip -q /tmp/auction-images.zip -d /tmp/auction-images

cp /tmp/auction-images/auctionItems.csv assets/auction/auctionItems.csv
cp -r /tmp/auction-images/images/ assets/auction

