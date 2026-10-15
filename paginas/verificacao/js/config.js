// Configuração do painel de verificação.
//
// API_URL: endpoint REAL de validação (fornecido pela Cogna). A página faz
//   GET `${API_URL}?codigo=<codigo>` e espera JSON no formato:
//   { "valido": true,
//     "documento": "Declaração de Matrícula",
//     "signatario": "Nome Sobrenome",
//     "instituicao": "Unopar",
//     "assinadoEm": "2026-10-05T14:30:00Z",
//     "validaAte": "2027-02-14",        (validade da assinatura)
//     "disponivelAte": "2027-02-14",    (disponibilidade do documento)
//     "cargo": "Cargo do signatário",
//     "cpf": "000.***.***-00",          (já mascarado)
//     "hash": "abc123..." }
//   ou { "valido": false } quando o código não existe.
//
// Enquanto API_URL estiver vazio o painel roda em MODO DEMO, usando só os
// códigos de exemplo abaixo, para você trabalhar o layout. Qualquer outro
// código retorna "não encontrado" — o modo demo nunca valida código arbitrário.
window.VERIFICACAO_CONFIG = {
  API_URL: "",
  DEMO_DOCS: {
    // Código de teste (UUID zerado) com PDF de demonstração para o botão de download.
    // "arquivo" é relativo à página de autenticação (paginas/autenticacao/).
    // Guarde os PDFs em paginas/compartilhado/assets/documentos/.
    "B2057305-963F-4642-AC9A-CEC9FFD46B20": {
      valido: true,
      documento: "Atestado de Conclusão de Curso",
      signatario: "RAFAEL LEME",
      instituicao: "Instituição de exemplo",
      cargo: "Secretário Acadêmico",
      cpf: "403.***.***-52",
      assinadoEm: "15/10/2026",
      validaAte: "05/03/2027",
      disponivelAte: "05/03/2027",
      arquivo: "../compartilhado/assets/documentos/Universidade Pitágoras Unopar.pdf",
      hash: "demo-hash-zero"
    },
    // Código de teste que leva à página de autenticação.
    "0B2057305-963F-4642-AC9A-CEC9FFD46B20": {
      valido: true,
      documento: "Exemplo de atestado (demonstração)",
      signatario: "FULANO DE TAL",
      instituicao: "Instituição de exemplo",
      cargo: "Cargo de exemplo",
      cpf: "000.***.***-00",
      assinadoEm: "2099-01-01T12:00:00Z",
      validaAte: "2099-12-31",
      disponivelAte: "2099-12-31",
      hash: "demo-hash-zero"
    },
    // Código de teste que leva à página "Histórico" (paginas/historico-documento/), dados zerados.
    "C10FA475-C9FF-4959-B7C9-B0040A35C5CF": {
      valido: true,
      pagina: "historico-documento",
      documento: "HISTORICO ESCOLAR",
      signatario: "RAFAEL LEME",
      instituicao: "Instituição de exemplo",
      cargo: "Secretário Acadêmico",
      cpf: "403.***.***-52",
      assinadoEm: "15/10/2026",
      validaAte: "05/03/2027",
      disponivelAte: "05/03/2027",
      arquivo: "../compartilhado/assets/documentos/202691427281-GEANE KEZIA XAVIER COSTA PAIXAO.pdf",
      hash: "demo-hash-um"
    },
    "DEMO-0000-0001": {
      valido: true,
      documento: "000000000 00 0000000 (0000)",
      signatario: "000000 00 000 (0000)",
      instituicao: "Instituição de exemplo",
      assinadoEm: "00/00/0000",
      hash: "demo-hash-0001"
    }
  }
};