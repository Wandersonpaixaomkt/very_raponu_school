# Site de verificação Unopar

## Organização

```text
materiais/
  logos-e-icones/       Logos e ícones originais para usar nas edições
  referencias/         PDFs e imagens de referência
paginas/
  verificacao/         Página de consulta do código, com seu JavaScript
  autenticacao/        Página de resultado, com seu CSS específico
  compartilhado/
    assets/            Imagens, logos e documentos usados pelas páginas
      documentos/      PDFs do botão de download (campo "arquivo" do config.js)
    css/               Estilos usados pelas duas páginas
index.html             Entrada que abre a página de verificação
iniciar.command        Inicia o servidor local e abre o site
servidor.py            Servidor local (PDFs baixam em vez de abrir; sem cache)
```

## Onde trabalhar

- Edite a consulta em `paginas/verificacao/index.html`.
- Edite o resultado em `paginas/autenticacao/index.html`.
- Edite os estilos comuns em `paginas/compartilhado/css/styles.css`.
- Adicione novos materiais em `materiais/logos-e-icones/` ou `materiais/referencias/`.
- Quando um material passar a ser usado por uma página, copie-o para `paginas/compartilhado/assets/` e ajuste a referência na página.

## Visualização local

Abra `iniciar.command` para iniciar o servidor. A entrada `index.html` abre a página de verificação. Para visualizar o resultado, acesse `/paginas/autenticacao/index.html` no mesmo servidor.

As páginas mantêm os dados de demonstração existentes. A configuração de consulta fica em `paginas/verificacao/js/config.js`.

Os arquivos auxiliares do macOS (`._*` e `.DS_Store`) foram preservados e ficam ocultos no explorador do VS Code.
