#!/usr/bin/env python3
"""Servidor local do site.

Diferenças em relação ao `python3 -m http.server`:
- PDFs são enviados como anexo (Content-Disposition: attachment), então o
  navegador baixa o arquivo em vez de abri-lo e a página continua aberta.
- Nada fica em cache, então toda edição aparece ao recarregar.

Uso: python3 servidor.py [porta]
"""
import os
import sys
import unicodedata
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import quote, unquote, urlparse


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        caminho = unquote(urlparse(self.path).path)
        if caminho.lower().endswith(".pdf"):
            nome = os.path.basename(caminho).replace('"', "")
            ascii_nome = unicodedata.normalize("NFKD", nome).encode("ascii", "ignore").decode("ascii") or "documento.pdf"
            self.send_header(
                "Content-Disposition",
                "attachment; filename=\"%s\"; filename*=UTF-8''%s" % (ascii_nome, quote(nome)),
            )
        super().end_headers()


if __name__ == "__main__":
    porta = int(sys.argv[1]) if len(sys.argv) > 1 else 8123
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    print("Site rodando em http://localhost:%d  (Ctrl+C para parar)" % porta)
    ThreadingHTTPServer(("", porta), Handler).serve_forever()
