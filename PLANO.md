# 📋 Plano do projeto: ai-studio-pc

_Gerado em 23/11/2026, 14:10:35 — sem IA, lendo os arquivos._

## 📊 Visão geral
| Item | Valor |
|---|---|
| Arquivos | 18 |
| Linhas | 3.005 |
| Telas/páginas | 2 |
| Rotas do backend | 0 |
| Chamadas do app | 0 |
| Tabelas do banco | 0 |
| Variáveis de ambiente | 6 |

**Linguagens:** JavaScript (10), Imagem (2), HTML (2), YAML (1), Outros (1), Markdown (1), JSON (1)

## 💡 O que fazer (em ordem)
1. 🔐 Criar um .env.example com: DADOS_EM, LOCALAPPDATA, PONTE_BASE, PONTE_CODIGO, PONTE_PORTA, TESTE_SAIR (os valores você coloca no servidor, nunca no código)
2. 📝 Criar um README.md explicando como rodar
3. 🚫 Criar .gitignore (não mandar node_modules ao GitHub)

## 🚀 Por onde começa
- `app/index.html`

## ⌨️ Comandos (package.json)
| Pasta | Comando | O que roda |
|---|---|---|
| . | `npm run programa` | `electron .` |
| . | `npm run exe` | `electron-builder --win nsis portable --x64 --publish never` |

## 📱 Telas e páginas
| Endereço | Arquivo |
|---|---|
| `app/index.html` | app/index.html |
| `electron/navegador.html` | electron/navegador.html |

## 🖥️ Rotas do backend
_Nenhum encontrado._

## 📡 O que o app pede ao servidor
_Nenhum encontrado._

## 🔌 O que falta no backend
✅ Tudo que o app chama tem rota no projeto (ou o app não usa servidor).

## 🗄️ Banco de dados
_Nenhuma tabela encontrada._

## 🔐 Variáveis de ambiente (configurar no servidor)
- `DADOS_EM`
- `LOCALAPPDATA`
- `PONTE_BASE`
- `PONTE_CODIGO`
- `PONTE_PORTA`
- `TESTE_SAIR`

_Só os nomes. Os valores (chaves, senhas) nunca vão no código nem no GitHub._

## 🌐 Serviços de fora que ele acessa
- cdn.jsdelivr.net
- github.com
- raw.github.com
- stuartk.com
- stuk.github.io

## 📦 Peças principais (dependências)
`msedge-tts` · `ws`

## 🔁 Roteiro para recriar fora da Replit
1. Importar o projeto no Mini SK e tocar em 🏗️ Preparar → ✅ Fazer tudo (tira a Replit, cria os arquivos que faltam).
2. Não tem backend: o site sozinho basta (Netlify ou GitHub Pages).
3. Variáveis: cadastrar 6 variável(is) no servidor (lista acima).
4. Testar a prévia; se der erro, 🤖 Mandar os erros para a IA.
5. App: 📲 Instalável (PWA), 📦 APK ou 🖥️ Desktop (.exe) pelo 🏗️ Preparar.

## 🌳 Árvore de arquivos
```
├─ 📁 .github/
│  └─ 📁 workflows/
│     └─ programa-exe.yml
├─ 📁 app/
│  ├─ 📁 icons/
│  │  ├─ icon-192.png
│  │  └─ icon-512.png
│  ├─ 📁 js/
│  │  └─ pc-extras.js
│  ├─ 📁 lib/
│  │  ├─ jszip.min.js
│  │  └─ segredos.js
│  └─ index.html
├─ 📁 electron/
│  ├─ instalar.nsh
│  ├─ main.cjs
│  ├─ navegador.html
│  ├─ ponte.cjs
│  ├─ preload-nav.cjs
│  ├─ preload.cjs
│  ├─ saude.cjs
│  ├─ terminal.cjs
│  └─ voz.cjs
├─ LEIA-ME.md
└─ package.json
```
