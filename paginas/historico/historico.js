(function () {
  "use strict";

  var CHAVE = "verificacao.historico";
  var vazio = document.getElementById("vazio");
  var wrap = document.getElementById("tabela-wrap");
  var corpo = document.getElementById("linhas");
  var btnLimpar = document.getElementById("btn-limpar");

  function ler() {
    try {
      var lista = JSON.parse(localStorage.getItem(CHAVE) || "[]");
      return Array.isArray(lista) ? lista : [];
    } catch (e) {
      return [];
    }
  }

  function fmt(iso) {
    var d = new Date(iso);
    return isNaN(d) ? "—" : d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "medium" });
  }

  function td(txt, cls) {
    var c = document.createElement("td");
    c.textContent = txt;
    if (cls) c.className = cls;
    return c;
  }

  function render() {
    var lista = ler();
    corpo.textContent = "";
    vazio.hidden = lista.length > 0;
    wrap.hidden = lista.length === 0;
    btnLimpar.hidden = lista.length === 0;

    lista.forEach(function (it) {
      var tr = document.createElement("tr");
      tr.appendChild(td(fmt(it.quando)));
      tr.appendChild(td(it.codigo, "cod"));

      var res = document.createElement("td");
      var tag = document.createElement("span");
      var ok = it.resultado === "valido";
      tag.className = "status " + (ok ? "ok" : "nao");
      tag.textContent = ok ? "Documento válido" : "Não encontrado";
      res.appendChild(tag);
      tr.appendChild(res);

      var acao = document.createElement("td");
      if (ok) {
        var a = document.createElement("a");
        a.className = "abrir";
        a.href = "../autenticacao/index.html?codigo=" + encodeURIComponent(it.codigo);
        a.textContent = "Abrir";
        acao.appendChild(a);
      }
      tr.appendChild(acao);
      corpo.appendChild(tr);
    });
  }

  btnLimpar.addEventListener("click", function () {
    if (!confirm("Apagar todo o histórico de consultas deste navegador?")) return;
    try { localStorage.removeItem(CHAVE); } catch (e) {}
    render();
  });

  render();
})();
