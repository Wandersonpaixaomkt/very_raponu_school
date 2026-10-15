#!/bin/bash
# Sobe o servidor local e abre o site no navegador. Feche esta janela para parar.
cd "$(dirname "$0")" || exit 1

PORTA=8123
while lsof -iTCP:"$PORTA" -sTCP:LISTEN >/dev/null 2>&1; do PORTA=$((PORTA+1)); done

( sleep 1; open "http://localhost:$PORTA/index.html" ) &
exec python3 servidor.py "$PORTA"
