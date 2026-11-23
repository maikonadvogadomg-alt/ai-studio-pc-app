/* =========================================================================
   AI Studio PC — pc-extras.js (23/11)
   O que o AI Code Studio ganhou na versão de computador:
   • ⏱ DESEMPENHO: cada resposta mostra quanto tempo levou e quantos tokens por segundo.
     O painel ⏱ compara as IAs (Ollama × Gemini × Monica…) pela média das últimas respostas.
   • 🗣 VOZ NATURAL GRÁTIS: Francisca, Francisco ou Antônio (a voz do Edge que o programa do PC já liga sozinho,
     em 127.0.0.1:7790). Se ela não responder, usa a voz do aparelho.
   • 🔤 FOTO EM TEXTO: a foto vira texto (OCR em português) e vai para a IA — para as que não enxergam imagem (Ollama…).
   • 🔡 ACENTOS CERTOS: arquivo em UTF-8, UTF-16 ou Windows-1252/Latin-1 é lido sem virar "�".
   • ⌨️ TERMINAL do computador (cmd do Windows) dentro do app, com "↩ Mandar para a IA".
   ========================================================================= */
(function () {
  'use strict';
  const $id = (i) => document.getElementById(i);
  const esc = (t) => String(t == null ? '' : t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const lerPref = (k, d) => { try { const v = localStorage.getItem('pc:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } };
  const gravarPref = (k, v) => { try { localStorage.setItem('pc:' + k, JSON.stringify(v)); } catch (e) {} };
  const toast = (t, tipo) => { try { MODULE_UI.toast(t, tipo); } catch (e) { console.log(t); } };

  // ── 🔡 codificação dos arquivos ──
  function decodificar(u8) {
    u8 = u8 instanceof Uint8Array ? u8 : new Uint8Array(u8);
    if (u8[0] === 0xff && u8[1] === 0xfe) return new TextDecoder('utf-16le').decode(u8.subarray(2));
    if (u8[0] === 0xfe && u8[1] === 0xff) return new TextDecoder('utf-16be').decode(u8.subarray(2));
    const semBom = u8[0] === 0xef && u8[1] === 0xbb && u8[2] === 0xbf ? u8.subarray(3) : u8;
    try { return new TextDecoder('utf-8', { fatal: true }).decode(semBom); }
    catch (e) { try { return new TextDecoder('windows-1252').decode(semBom); } catch (e2) { return new TextDecoder('latin1').decode(semBom); } }
  }

  // ── 🔤 foto em texto ──
  function fotoEmTexto() {
    const m = lerPref('fotoTexto', 'auto');
    if (m === 'sempre') return true; if (m === 'nunca') return false;
    try { return MODULE_Provider.current().provider === 'ollama'; } catch (e) { return false; }
  }
  let tesseractPronto = null;
  function carregarTesseract() {
    if (window.Tesseract) return Promise.resolve();
    if (!tesseractPronto) tesseractPronto = new Promise((ok, erro) => {
      const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js';
      s.onload = ok; s.onerror = () => { tesseractPronto = null; erro(new Error('não consegui baixar o leitor de texto (precisa de internet na 1ª vez)')); };
      document.head.appendChild(s);
    });
    return tesseractPronto;
  }
  async function ocr(file) {
    await carregarTesseract();
    const r = await window.Tesseract.recognize(file, 'por');
    return String((r && r.data && r.data.text) || '').replace(/\n{3,}/g, '\n\n').trim();
  }

  // ── ⏱ desempenho ──
  function registrar(provider, model, perf) {
    const l = lerPref('desempenho', []); l.push({ provider, model, ...perf, quando: Date.now() });
    gravarPref('desempenho', l.slice(-300));
  }
  function tabelaDesempenho() {
    const l = lerPref('desempenho', []); if (!l.length) return '<p style="opacity:.7">Ainda nenhuma resposta medida. Converse com uma IA e volte aqui.</p>';
    const g = {}; l.forEach((x) => { const k = x.provider + ' · ' + x.model; (g[k] = g[k] || []).push(x); });
    const linhas = Object.entries(g).map(([k, xs]) => { const ms = xs.reduce((t, x) => t + x.ms, 0) / xs.length, tps = xs.reduce((t, x) => t + x.tps, 0) / xs.length; return { k, n: xs.length, ms, tps }; }).sort((a, b) => b.tps - a.tps);
    const max = Math.max(...linhas.map((x) => x.tps), 1);
    return '<table style="width:100%;border-collapse:collapse;font-size:13px"><tr style="opacity:.7"><th style="text-align:left">IA · modelo</th><th>respostas</th><th>tempo médio</th><th style="text-align:left">tokens/s</th></tr>' +
      linhas.map((x) => '<tr style="border-top:1px solid var(--border)"><td style="padding:6px 4px">' + esc(x.k) + '</td><td style="text-align:center">' + x.n + '</td><td style="text-align:center">' + (x.ms / 1000).toFixed(1) + ' s</td><td><div style="display:flex;align-items:center;gap:6px"><div style="height:8px;border-radius:4px;background:var(--accent);width:' + Math.max(4, Math.round((x.tps / max) * 120)) + 'px"></div>' + x.tps.toFixed(1) + '</div></td></tr>').join('') + '</table>' +
      '<p style="opacity:.7;font-size:12px;margin-top:6px">tokens/s maior = escreve mais rápido. "Tempo médio" inclui esperar a IA começar. Quando a IA não informa os tokens, conto aproximado (4 letras ≈ 1 token).</p>';
  }

  // ── 🗣 voz natural (Francisca/Francisco/Antônio) ──
  const VOZES = [['', 'Voz do aparelho (a de antes)'], ['pt-BR-FranciscaNeural', 'Francisca (natural, grátis)'], ['pt-BR-FranciscoNeural', 'Francisco (natural, grátis)'], ['pt-BR-AntonioNeural', 'Antônio (natural, grátis)'], ['pt-BR-ThalitaNeural', 'Thalita (natural, grátis)']];
  const vozNatural = () => lerPref('vozNatural', 'pt-BR-FranciscaNeural');
  let tocando = null, idFala = 0;
  function limparTexto(t) { return String(t).replace(/```[\s\S]*?(```|$)/g, ' (tem um bloco de código na tela) ').replace(/`([^`]+)`/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/https?:\/\/\S+/g, ' link ').replace(/[#*_>~|•]/g, ' ').replace(/\s+/g, ' ').trim(); }
  function pedacos(t) { const out = []; let cur = ''; (t.match(/[^.!?;:\n]+[.!?;:]*\s*/g) || [t]).forEach((p) => { if ((cur + p).length > 1400) { if (cur.trim()) out.push(cur); cur = p; } else cur += p; }); if (cur.trim()) out.push(cur); return out; }
  async function falarNatural(texto, aoAcabar) {
    const id = ++idFala; const l = pedacos(limparTexto(texto));
    for (const p of l) {
      if (id !== idFala) return;
      const r = await fetch('http://127.0.0.1:7790/falar', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ texto: p, voz: vozNatural() }) });
      if (!r.ok) throw new Error('voz respondeu ' + r.status);
      const url = URL.createObjectURL(await r.blob());
      await new Promise((ok) => { tocando = new Audio(url); tocando.onended = ok; tocando.onerror = ok; tocando.play().catch(ok); });
      URL.revokeObjectURL(url);
    }
    if (id === idFala && aoAcabar) aoAcabar();
  }
  function ligarVoz() {
    if (typeof MODULE_Voice === 'undefined') return;
    const falar0 = MODULE_Voice.speak, parar0 = MODULE_Voice.stopSpeaking;
    MODULE_Voice.speak = function (texto, aoAcabar) {
      if (!vozNatural()) return falar0(texto, aoAcabar);
      parar0();
      falarNatural(texto, aoAcabar).catch(() => { toast('🗣 A voz natural não respondeu — usei a voz do aparelho.', 'warn'); falar0(texto, aoAcabar); });
    };
    MODULE_Voice.stopSpeaking = function () { idFala++; try { tocando && tocando.pause(); } catch (e) {} parar0(); };
  }

  // ── painel ⏱ ──
  function abrirPainel() {
    let w = $id('pcPainel'); if (w) { w.remove(); return; }
    w = document.createElement('div'); w.id = 'pcPainel';
    w.style.cssText = 'position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,.55);display:grid;place-items:center;padding:16px;overscroll-behavior:none';
    const ft = lerPref('fotoTexto', 'auto');
    w.innerHTML = '<div style="background:var(--bg2);color:var(--text);border:1px solid var(--border);border-radius:12px;padding:16px;max-width:640px;width:100%;max-height:90vh;overflow:auto">' +
      '<div style="display:flex;align-items:center;gap:8px"><h2 style="flex:1;font-size:17px">⏱ Desempenho · voz · foto</h2><button class="btn icon" id="pcFechar">✕</button></div>' +
      '<h3 style="font-size:14px;margin:12px 0 6px">⏱ Qual IA responde mais rápido</h3><div id="pcTabela">' + tabelaDesempenho() + '</div>' +
      '<div style="margin-top:6px"><button class="btn sm" id="pcZerar">Zerar as medições</button></div>' +
      '<h3 style="font-size:14px;margin:16px 0 6px">🗣 Voz que lê as respostas</h3><select id="pcVoz" style="width:100%">' + VOZES.map(([v, n]) => '<option value="' + v + '"' + (v === vozNatural() ? ' selected' : '') + '>' + n + '</option>').join('') + '</select>' +
      '<div style="margin-top:6px"><button class="btn sm" id="pcTestarVoz">🔊 Testar</button> <span style="opacity:.7;font-size:12px">As naturais são grátis e já vêm no programa do PC (precisam de internet).</span></div>' +
      '<h3 style="font-size:14px;margin:16px 0 6px">🔤 Foto em texto</h3><select id="pcFoto" style="width:100%"><option value="auto"' + (ft === 'auto' ? ' selected' : '') + '>Automático: só quando a IA é o Ollama</option><option value="sempre"' + (ft === 'sempre' ? ' selected' : '') + '>Sempre: toda foto vira texto</option><option value="nunca"' + (ft === 'nunca' ? ' selected' : '') + '>Nunca: manda a foto (para IA que enxerga)</option></select>' +
      '<p style="opacity:.7;font-size:12px;margin-top:6px">O texto é lido aqui no PC (em português) e vai na mensagem. A 1ª vez baixa o leitor (~10 MB).</p></div>';
    document.body.appendChild(w);
    $id('pcFechar').onclick = () => w.remove();
    w.addEventListener('click', (e) => { if (e.target === w) w.remove(); });
    $id('pcZerar').onclick = () => { gravarPref('desempenho', []); $id('pcTabela').innerHTML = tabelaDesempenho(); };
    $id('pcVoz').onchange = (e) => { gravarPref('vozNatural', e.target.value); toast('🗣 Voz trocada.', 'success'); };
    $id('pcTestarVoz').onclick = () => MODULE_Voice.speak('Olá! Esta é a voz do seu AI Studio no computador.');
    $id('pcFoto').onchange = (e) => { gravarPref('fotoTexto', e.target.value); toast('🔤 Pronto.', 'success'); };
  }

  // ── ⌨️ terminal do computador ──
  let ws = null, saida = '';
  function abrirTerminal() {
    let w = $id('pcTerm'); if (w) { w.remove(); try { ws && ws.close(); } catch (e) {} ws = null; return; }
    const porta = window.miniskPC && window.miniskPC.portas && window.miniskPC.portas.terminal;
    w = document.createElement('div'); w.id = 'pcTerm';
    w.style.cssText = 'position:fixed;left:0;right:0;bottom:0;height:42vh;z-index:8000;background:#0b0f14;color:#d6e2f0;border-top:2px solid var(--accent);display:flex;flex-direction:column;overscroll-behavior:none';
    w.innerHTML = '<div style="display:flex;gap:6px;align-items:center;padding:6px 8px;background:#111821"><b style="flex:1">⌨️ Terminal do computador</b><button class="btn sm" id="ptIA">↩ Mandar para a IA</button><button class="btn sm" id="ptCtrlC">Ctrl+C</button><button class="btn sm" id="ptLimpar">Limpar</button><button class="btn icon" id="ptFechar">✕</button></div>' +
      '<pre id="ptSaida" style="flex:1;overflow:auto;margin:0;padding:8px;font:12px/1.45 Consolas,monospace;white-space:pre-wrap;word-break:break-word"></pre>' +
      '<div style="display:flex;gap:6px;padding:6px 8px;background:#111821"><input id="ptLinha" style="flex:1;font-family:Consolas,monospace" placeholder="Digite um comando (ex.: ollama list) e Enter" autocomplete="off"><button class="btn sm primary" id="ptRodar">▶</button></div>';
    document.body.appendChild(w);
    const out = $id('ptSaida');
    const escrever = (t) => {
      t = String(t).replace(/\x1b\[[0-9;?]*[A-Za-z]/g, '').replace(/\r\n/g, '\n').replace(/\r/g, '');
      for (const ch of t) { if (ch === '\b') saida = saida.slice(0, -1); else saida += ch; }
      if (saida.length > 200000) saida = saida.slice(-150000);
      out.textContent = saida; out.scrollTop = out.scrollHeight;
    };
    $id('ptFechar').onclick = abrirTerminal;
    $id('ptLimpar').onclick = () => { saida = ''; out.textContent = ''; };
    if (!porta) { escrever('O terminal só funciona no programa do PC (o .exe).\nAqui no navegador não dá para mexer no computador.\n'); return; }
    try { ws = new WebSocket('ws://127.0.0.1:' + porta + '/ws', ['tty']); } catch (e) { escrever('Não conectei: ' + e.message); return; }
    ws.binaryType = 'arraybuffer';
    ws.onopen = () => ws.send(JSON.stringify({ columns: 120, rows: 30 }));
    ws.onmessage = (e) => { const u8 = new Uint8Array(e.data instanceof ArrayBuffer ? e.data : new TextEncoder().encode(e.data)); if (u8[0] === 48) escrever(new TextDecoder().decode(u8.subarray(1))); };
    ws.onclose = () => escrever('\n[terminal desligado]\n');
    const mandar = (t) => { if (ws && ws.readyState === 1) ws.send('0' + t); };
    const rodar = () => { const l = $id('ptLinha').value; $id('ptLinha').value = ''; mandar(l + '\r'); };
    $id('ptRodar').onclick = rodar;
    $id('ptLinha').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); rodar(); } });
    $id('ptCtrlC').onclick = () => mandar('\x03');
    $id('ptIA').onclick = () => {
      const fim = saida.slice(-8000).trim(); if (!fim) return toast('O terminal está vazio.', 'warn');
      const inp = $id('userInput'); inp.value += (inp.value ? '\n\n' : '') + 'Saída do terminal:\n```\n' + (window.Segredos ? Segredos.tampar(fim) : fim) + '\n```\n'; try { MODULE_UI.autoResize(inp); } catch (e) {}
      toast('↩ A saída foi para a caixa de mensagem.', 'success');
    };
    setTimeout(() => $id('ptLinha').focus(), 100);
  }

  window.PC_EXTRAS = { decodificar, fotoEmTexto, ocr, registrar, abrirPainel, abrirTerminal, falarNatural };
  ligarVoz();
  // 🦙 no programa do PC: se a IA escolhida é o Ollama, liga ele escondido (sem janela preta)
  setTimeout(() => { try { if (window.miniskPC && window.miniskPC.ligarOllama && MODULE_Provider.current().provider === 'ollama') window.miniskPC.ligarOllama().then((r) => r && r !== 'já estava ligado' && toast('🦙 Ollama: ' + r)); } catch (e) {} }, 1500);
  // 23/11: sem "esticar igual chiclete"
  const st = document.createElement('style'); st.textContent = 'html,body,*{overscroll-behavior:none}'; document.head.appendChild(st);
})();
