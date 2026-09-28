#!/usr/bin/env bash
# Genera public/garantia-climex.pdf a partir de docs/garantia/garantia-climex.html usando Google Chrome.
# Uso: ./scripts/build-garantia-pdf.sh
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PWD/public/garantia-climex.pdf" \
  "file://$PWD/docs/garantia/garantia-climex.html" 2>/dev/null
echo "PDF generado en public/garantia-climex.pdf"
