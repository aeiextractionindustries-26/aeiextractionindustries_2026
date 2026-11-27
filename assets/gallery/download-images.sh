#!/usr/bin/env bash
# ==============================================================================
# AEI Extraction Industries Private Limited
# Industrial Photograph Asset Downloader
# Re-downloads the 12 illustrative WebP images used by the site.
# ==============================================================================

set -euo pipefail
GALLERY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Downloading 12 illustrative industrial photographs into ${GALLERY_DIR}..."

curl -fsSL "https://images.pexels.com/photos/33514501/pexels-photo-33514501.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920&fm=webp" -o "${GALLERY_DIR}/hero-industrial-factory.webp"
curl -fsSL "https://images.pexels.com/photos/38364316/pexels-photo-38364316.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1280&fm=webp" -o "${GALLERY_DIR}/about-manufacturing-facility.webp"
curl -fsSL "https://images.pexels.com/photos/7782871/pexels-photo-7782871.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200&fm=webp" -o "${GALLERY_DIR}/biomass-pellets.webp"
curl -fsSL "https://images.pexels.com/photos/6608506/pexels-photo-6608506.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200&fm=webp" -o "${GALLERY_DIR}/soap-grade-oil.webp"
curl -fsSL "https://images.pexels.com/photos/8450475/pexels-photo-8450475.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200&fm=webp" -o "${GALLERY_DIR}/liquid-tannin.webp"
curl -fsSL "https://images.pexels.com/photos/30878153/pexels-photo-30878153.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200&fm=webp" -o "${GALLERY_DIR}/cashew-catechin.webp"
curl -fsSL "https://images.pexels.com/photos/10514729/pexels-photo-10514729.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200&fm=webp" -o "${GALLERY_DIR}/industrial-machinery.webp"
curl -fsSL "https://images.pexels.com/photos/2760286/pexels-photo-2760286.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200&fm=webp" -o "${GALLERY_DIR}/extraction-processing.webp"
curl -fsSL "https://images.pexels.com/photos/17765433/pexels-photo-17765433.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200&fm=webp" -o "${GALLERY_DIR}/manufacturing-production.webp"
curl -fsSL "https://images.pexels.com/photos/8540036/pexels-photo-8540036.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200&fm=webp" -o "${GALLERY_DIR}/quality-control.webp"
curl -fsSL "https://images.pexels.com/photos/5411674/pexels-photo-5411674.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200&fm=webp" -o "${GALLERY_DIR}/industrial-storage-tanks.webp"
curl -fsSL "https://images.pexels.com/photos/6537735/pexels-photo-6537735.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200&fm=webp" -o "${GALLERY_DIR}/factory-infrastructure.webp"

echo "All 12 industrial photographs saved successfully as WebP in assets/gallery/."
