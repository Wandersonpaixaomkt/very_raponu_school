(function () {
  "use strict";

  var cfg = window.VERIFICACAO_CONFIG || {};
  var form = document.getElementById("form-verificacao");
  var input = document.getElementById("codigo");
  var btn = document.getElementById("btn-verificar");
  var out = document.getElementById("resultado");

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function fmtData(iso) {
    var d = new Date(iso);
    return isNaN(d) ? "—" : d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
  }

  // Ignora espaços, caracteres invisíveis (copiar/colar) e maiúsculas/minúsculas.
  function normalizar(s) {
    return String(s).replace(/[\s​-‍﻿]/g, "").toUpperCase();
  }

  function consultar(codigo) {
    if (cfg.API_URL) {
      return fetch(cfg.API_URL + "?codigo=" + encodeURIComponent(codigo), { headers: { Accept: "application/json" } })
        .then(function (r) {
          if (r.status === 404) return { valido: false };
          if (!r.ok) throw new Error("http " + r.status);
          return r.json();
        });
    }
    return new Promise(function (resolve) {
      setTimeout(function () {
        var docs = cfg.DEMO_DOCS || {};
        var alvo = normalizar(codigo);
        var chave = Object.keys(docs).filter(function (k) { return normalizar(k) === alvo; })[0];
        resolve(chave ? Object.assign({ _codigo: chave }, docs[chave]) : { valido: false });
      }, 600);
    });
  }

  function mostrar(html) {
    out.innerHTML = html;
    out.hidden = false;
  }

  function renderOk(d) {
    mostrar(
      '<div class="res-status ok">✓ Documento válido — assinatura digital verificada.</div>' +
      '<dl class="res-lista">' +
        "<div><dt>Documento</dt><dd>" + esc(d.documento) + "</dd></div>" +
        "<div><dt>Signatário</dt><dd>" + esc(d.signatario) + "</dd></div>" +
        "<div><dt>Instituição</dt><dd>" + esc(d.instituicao) + "</dd></div>" +
        "<div><dt>Assinado em</dt><dd>" + esc(fmtData(d.assinadoEm)) + "</dd></div>" +
        (d.hash ? "<div><dt>Hash</dt><dd>" + esc(d.hash) + "</dd></div>" : "") +
      "</dl>"
    );
  }

  function renderErro(msg) {
    mostrar('<div class="res-status erro">✕ ' + esc(msg) + "</div>");
  }

  // Guarda a consulta no histórico (somente neste navegador, até 50 itens).
  function registrar(codigo, resultado) {
    try {
      var chave = "verificacao.historico";
      var lista = JSON.parse(localStorage.getItem(chave) || "[]");
      if (!Array.isArray(lista)) lista = [];
      lista.unshift({ codigo: codigo, resultado: resultado, quando: new Date().toISOString() });
      localStorage.setItem(chave, JSON.stringify(lista.slice(0, 50)));
    } catch (e) { /* armazenamento indisponível: ignora */ }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var codigo = input.value.trim();
    input.classList.toggle("invalido", !codigo);
    if (!codigo) { input.focus(); return; }

    btn.disabled = true;
    btn.classList.add("carregando");
    out.hidden = true;

    consultar(codigo)
      .then(function (d) {
        if (d && d.valido) {
          registrar(d._codigo || codigo, "valido");
          var destino = "../" + (d.pagina || "autenticacao") + "/index.html?codigo=" + encodeURIComponent(d._codigo || codigo);
          document.querySelector("main").classList.add("saindo");
          setTimeout(function () { window.location.href = destino; }, 300);
          return;
        }
        registrar(codigo, "nao-encontrado");
        renderErro("Código não encontrado. Confira o código e tente novamente.");
      })
      .catch(function () {
        renderErro("Não foi possível consultar agora. Tente novamente em instantes.");
      })
      .then(function () {
        btn.disabled = false;
        btn.classList.remove("carregando");
      });
  });

  input.addEventListener("input", function () { input.classList.remove("invalido"); });
})();
