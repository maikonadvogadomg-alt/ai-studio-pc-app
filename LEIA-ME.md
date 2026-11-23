# 🤖 AI Studio PC (.exe) — v23/11-A

O AI Code Studio numa **janela própria do Windows**, mais leve que o Meu Chat (sem banco de dados, sem login):
bom para **testar o Ollama** e comparar com as outras IAs.

## O que tem
- **⏱ Desempenho**: cada resposta mostra o tempo e os **tokens por segundo**. O botão ⏱ compara as IAs pela média.
- **🦙 Ollama**: se a IA escolhida for o Ollama, o programa liga ele sozinho (escondido).
- **🟣 Monica**: escolha "Monica" na lista — ou cole a chave como OpenAI: se a OpenAI recusar, ele testa na Monica e troca sozinho.
- **🗣 Voz natural grátis**: Francisca, Francisco, Antônio ou Thalita (⏱ → Voz). Precisa de internet.
- **🔤 Foto em texto**: a foto vira texto em português e vai para a IA (automático no Ollama, que não enxerga imagem).
- **📦 ZIP grande** (até ~3 milhões de letras de código), arquivos até 50 MB, **acentos certos** (UTF-8, UTF-16, Windows-1252).
- **💾 Salva sozinho** a cada mudança (agora no IndexedDB, que cabe muito mais) — a hora aparece no topo.
- **⌨️ Terminal** do computador dentro do app, com "↩ Mandar para a IA".

## Como gerar o .exe (igual ao Meu Chat)
1. No Mini SK: abra este zip como projeto → 🐙 GitHub → criar repositório (**privado**) → enviar.
2. No GitHub: **Actions** → "Programa .exe para Windows" → **Run workflow**.
3. Quando ficar verde: **Releases** → baixe **AIStudio-Instalar.exe** (ou o "sem-instalar").

Porta **7740** (abre junto com o Mini SK 7680, o Laboratório 7690 e o Meu Chat 7730).
