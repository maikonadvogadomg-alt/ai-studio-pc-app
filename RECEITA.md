# 🧬 Receita para recriar: AI Studio PC

_Gerada sem IA, lendo 19 arquivo(s). Serve para remontar este app como HTML modular — com qualquer IA, um arquivo por vez._

## 1. O que é

- **Nome:** AI Studio PC
- **Partes de código:** 11 (2 tela, 9 logica, 0 servidor, 0 dados, 0 estilo)
- **Tem servidor (rotas /api):** não — dá para ser só HTML
- **Peças de fora (bibliotecas):** child_process, crypto, electron, fs, http, msedge-tts, net, os, path, ws

## 2. Estrutura modular proposta

```
index.html            ← a página; chama os módulos NA ORDEM
css/app.css           ← o visual
js/00-core.js         ← a "locomotiva": cria window.APP (registrar, guardar, avisar)
js/10-pc-extras.js    ← logica (era app/js/pc-extras.js)
js/15-segredos.js     ← 🛡 SEGREDOS (20/11) — reconhece CHAVES SECRETAS para elas não irem par (era app/lib/segredos.js)
js/20-ponte.js        ← Ponte de arquivos do Mini SK — no PC, o próprio programa liga (no celu (era electron/ponte.cjs)
js/25-terminal.js     ← Terminal do computador para o Mini SK — fala o mesmo "idioma" do ttyd  (era electron/terminal.cjs)
js/30-saude.js        ← 🩺 Saúde do computador — para o Mini SK para PC. Mostra, em português  (era electron/saude.cjs)
js/35-voz.js          ← 🗣 voz.cjs — a voz Francisco GRÁTIS, já DENTRO do programa do PC (não  (era electron/voz.cjs)
js/40-preload-nav.js  ← 🌐 o Navegador do Mini SK só pode pedir uma coisa ao programa: abrir a (era electron/preload-nav.cjs)
js/45-preload.js      ← Conta para o Mini SK que ele está no PC (terminal e ponte já ligados p (era electron/preload.cjs)
js/50-app.js          ← AI Studio PC — Título (era app/index.html)
js/55-navegador.js    ← 🌐 Navegador — Mini SK (era electron/navegador.html)
js/99-app.js          ← o último: monta a tela com o que embarcou
```

## 3. As partes, uma por uma

| # | Era | Vira | Tipo | O que faz | Usa |
|---|---|---|---|---|---|
| 1 | `app/js/pc-extras.js` | `js/10-pc-extras.js` | logica | $id, esc, lerPref, gravarPref | — |
| 2 | `app/lib/segredos.js` | `js/15-segredos.js` | logica | 🛡 SEGREDOS (20/11) — reconhece CHAVES SECRETAS para elas não irem parar no chat, na IA ne | — |
| 3 | `electron/ponte.cjs` | `js/20-ponte.js` | logica | Ponte de arquivos do Mini SK — no PC, o próprio programa liga (no celular, roda no Termux) | — |
| 4 | `electron/terminal.cjs` | `js/25-terminal.js` | logica | Terminal do computador para o Mini SK — fala o mesmo "idioma" do ttyd (o do Termux), então | — |
| 5 | `electron/saude.cjs` | `js/30-saude.js` | logica | 🩺 Saúde do computador — para o Mini SK para PC. Mostra, em português simples: espaço nos  | — |
| 6 | `electron/voz.cjs` | `js/35-voz.js` | logica | 🗣 voz.cjs — a voz Francisco GRÁTIS, já DENTRO do programa do PC (não precisa de Python).  | — |
| 7 | `electron/main.cjs` | css/app.css | logica | Mini SK para PC — abre o Mini SK numa janela própria e liga, por dentro: - o 💻 Terminal d | ponte.cjs, terminal.cjs, saude.cjs, voz.cjs |
| 8 | `electron/preload-nav.cjs` | `js/40-preload-nav.js` | logica | 🌐 o Navegador do Mini SK só pode pedir uma coisa ao programa: abrir a página no navegador | — |
| 9 | `electron/preload.cjs` | `js/45-preload.js` | logica | Conta para o Mini SK que ele está no PC (terminal e ponte já ligados pelo programa) | — |
| 10 | `app/index.html` | `js/50-app.js` | tela | AI Studio PC — Título | guia-maikon.js, jszip.min.js, segredos.js, pc-extras.js |
| 11 | `electron/navegador.html` | `js/55-navegador.js` | tela | 🌐 Navegador — Mini SK | — |

## 4. Montar passo a passo (cada bloco é um pedido pronto: 📋 Copiar → colar na IA)

### Passo 0 — combinar as regras com a IA

```text
Vamos recriar o app "AI Studio PC" como HTML MODULAR, que abre pelo index.html, sem servidor e sem nada da Replit.
Regras: (1) index.html chama os arquivos js/ na ordem, antes do </body>; (2) js/00-core.js cria window.APP com APP.registrar(modulo), APP.guardar(chave, valor) em IndexedDB/localStorage e APP.avisar(texto); (3) cada arquivo js/NN-nome.js cuida de UM assunto, começa com (function (APP) { e termina com })(window.APP); (4) js/99-app.js vem por último e monta a tela com os módulos registrados; (5) textos em português do Brasil.
Vou pedir UM arquivo por vez. Responda só com o arquivo completo, sem cortar nada. Primeiro: crie index.html, css/app.css e js/00-core.js.
```

### Passo 1 — `js/10-pc-extras.js` (era `app/js/pc-extras.js`, 165 linhas)

```text
Crie js/10-pc-extras.js. Ele é uma parte de logica do app.
No app original ele tinha estas funções/partes: $id, esc, lerPref, gravarPref, toast, decodificar, fotoEmTexto, carregarTesseract, ocr, registrar, tabelaDesempenho, vozNatural, limparTexto, pedacos, falarNatural, ligarVoz, abrirPainel, abrirTerminal.
Ele chamava estes endereços: http://127.0.0.1:7790/falar. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 2 — `js/15-segredos.js` (era `app/lib/segredos.js`, 47 linhas)

```text
Crie js/15-segredos.js. Ele faz: 🛡 SEGREDOS (20/11) — reconhece CHAVES SECRETAS para elas não irem parar no chat, na IA nem na nuvem. Usado pelo Meu Chat e pelo SK Jurídico HTML. - ehSecreta(chave): true se for a chave "service_role", "sb_secret_…", token "sbp_…" etc. (A palavra "service_role" fica ESCONDIDA dentro da chave eyJ…: é preciso abrir a chave para ver.).
No app original ele tinha estas funções/partes: papelJwt, achar, tampar, ehSecreta.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 3 — `js/20-ponte.js` (era `electron/ponte.cjs`, 81 linhas)

```text
Crie js/20-ponte.js. Ele faz: Ponte de arquivos do Mini SK — no PC, o próprio programa liga (no celular, roda no Termux). Leva o projeto da árvore para ~/minisk/NOME e traz de volta o que o terminal criou (dist, arquivos novos…). Só o próprio celular enxerga (127.0.0.1) e só quem tem o código entra.
No app original ele tinha estas funções/partes: nomeProj, dentro, responder, corpo, andar.
O original usava as bibliotecas http, fs, path, os: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 4 — `js/25-terminal.js` (era `electron/terminal.cjs`, 98 linhas)

```text
Crie js/25-terminal.js. Ele faz: Terminal do computador para o Mini SK — fala o mesmo "idioma" do ttyd (o do Termux), então o painel 📱/💻 do Mini SK funciona sem mudar nada. Cada linha que você digita roda como um comando (cmd no Windows). Ctrl+C para o comando que está rodando. "cd" muda de pasta.
No app original ele tinha estas funções/partes: matar, iniciarTerminal, mandar, curto, prompt, trocarLinha, parar, expandir, rodar, tecla.
O original usava as bibliotecas ws, child_process, path, fs, os: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 5 — `js/30-saude.js` (era `electron/saude.cjs`, 159 linhas)

```text
Crie js/30-saude.js. Ele faz: 🩺 Saúde do computador — para o Mini SK para PC. Mostra, em português simples: espaço nos discos, memória, o que está usando as portas, as peças instaladas (Node, npm, Git, Ollama), o tamanho das pastas do Mini SK e o que dá para limpar. Também faz cópia de segurança (backup) dos projetos para outra pasta / HD externo.
No app original ele tinha estas funções/partes: rodar, tamanho, discos, nomesDosProgramas, portas, versao, analisar, apagarConteudo, limpar, backup, fecharPrograma.
O original usava as bibliotecas child_process, os, fs, path: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 6 — `js/35-voz.js` (era `electron/voz.cjs`, 85 linhas)

```text
Crie js/35-voz.js. Ele faz: 🗣 voz.cjs — a voz Francisco GRÁTIS, já DENTRO do programa do PC (não precisa de Python). Liga sozinha junto com o programa, em http://127.0.0.1:7790 — o mesmo endereço do voz-francisco.py, então os apps (Meu Chat, Assistente Jurídico…) usam igualzinho: ⚙️ → Voz → 🗣 Francisco. Usa a voz do Microsoft Edge (pacote msedge-tts). Precisa de internet. Só aceita pedidos deste PC.
No app original ele tinha estas funções/partes: umAudio, falar, vozes, cabecalhos, json, ligar.
O original usava as bibliotecas http, msedge-tts: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 7 — `js/40-preload-nav.js` (era `electron/preload-nav.cjs`, 4 linhas)

```text
Crie js/40-preload-nav.js. Ele faz: 🌐 o Navegador do Mini SK só pode pedir uma coisa ao programa: abrir a página no navegador do Windows.
O original usava as bibliotecas electron: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 8 — `js/45-preload.js` (era `electron/preload.cjs`, 6 linhas)

```text
Crie js/45-preload.js. Ele faz: Conta para o Mini SK que ele está no PC (terminal e ponte já ligados pelo programa).
No app original ele tinha estas funções/partes: arg.
O original usava as bibliotecas electron: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 9 — `js/50-app.js` (era `app/index.html`, 1883 linhas)

```text
Crie js/50-app.js. Ele faz: AI Studio PC — Título.
No app original ele tinha estas funções/partes: est, uid, isMobile, escapeHtml, copyText, AMBIENTE, activeConv, MODULE_Storage, pacote, idb, salvarIdb, lerIdb, marcarSalvo, save, carregarIdb, saveSoon, load, aplicar.
Ele usa o que já foi criado em: js/15-segredos.js, js/10-pc-extras.js (pelo APP).
Ele chamava estes endereços: https://api.anthropic.com/v1/messages, https://api.anthropic.com/v1/models?limit=100, https://google.serper.dev/search. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 10 — `js/55-navegador.js` (era `electron/navegador.html`, 69 linhas)

```text
Crie js/55-navegador.js. Ele faz: 🌐 Navegador — Mini SK.
No app original ele tinha estas funções/partes: historico, guardar, arrumar, botoes.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 11 — `js/99-app.js` e conferir

```text
Crie js/99-app.js: ele olha APP.modulos e monta o menu/abas com um botão para cada módulo. Depois, me mande o index.html atualizado com todos os <script src="js/…"> na ordem certa: js/00-core.js, js/10-pc-extras.js, js/15-segredos.js, js/20-ponte.js, js/25-terminal.js, js/30-saude.js, js/35-voz.js, js/40-preload-nav.js, js/45-preload.js, js/50-app.js, js/55-navegador.js, js/99-app.js.
```

## 5. Conferir no final

- [ ] Abrir o index.html na prévia: aparece a tela sem erro (▤ console vazio)?
- [ ] Cada botão abre a sua parte?
- [ ] Fechar e abrir de novo: os dados continuam?
- [ ] Nada com "replit", "REPL_", "@workspace" no código (🏗️ Preparar confere).
- [ ] 📱 PWA → deixar instalável; 📦 APK ou 🖥️ .exe.
