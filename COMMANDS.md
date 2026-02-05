# 💻 MORSI - Comandos Úteis

## Referência Rápida de Comandos do Terminal

---

## 🚀 INSTALAÇÃO INICIAL

### Instalar Dependências
```powershell
npm install
```

### Instalar Dependência Específica
```powershell
npm install nome-do-pacote
```

### Atualizar Dependências
```powershell
npm update
```

---

## 🔧 DESENVOLVIMENTO

### Rodar em Dev (com Hot Reload)
```powershell
npm run dev
```
Acessa em: http://localhost:3000

### Build para Produção
```powershell
npm run build
```
Gera arquivos em `/dist`

### Preview do Build
```powershell
npm run preview
```
Visualiza a versão de produção

---

## 📱 CAPACITOR (iOS/Android)

### Inicializar Capacitor
```powershell
npm run cap:init
```

### Adicionar Plataforma Android
```powershell
npm run cap:add:android
```

### Adicionar Plataforma iOS
```powershell
npm run cap:add:ios
```

### Sincronizar Código com Plataformas
```powershell
npm run cap:sync
```

### Abrir Android Studio
```powershell
npm run cap:open:android
```

### Abrir Xcode (Mac apenas)
```powershell
npm run cap:open:ios
```

### Build Completo para Mobile
```powershell
npm run build:mobile
```
Faz build web + sync com platforms

---

## 🔥 FIREBASE

### Instalar Firebase CLI (Global)
```powershell
npm install -g firebase-tools
```

### Login no Firebase
```powershell
firebase login
```

### Inicializar Firebase no Projeto
```powershell
firebase init
```

### Deploy para Firebase Hosting
```powershell
firebase deploy
```

### Ver Logs do Firebase
```powershell
firebase functions:log
```

---

## 🧹 LIMPEZA E MANUTENÇÃO

### Limpar Cache do NPM
```powershell
npm cache clean --force
```

### Deletar node_modules e Reinstalar
```powershell
rm -r node_modules
rm package-lock.json
npm install
```

### Limpar Build
```powershell
rm -r dist
npm run build
```

### Reset Completo (Limpar Tudo)
```powershell
rm -r node_modules
rm -r dist
rm -r android
rm -r ios
rm package-lock.json
npm install
npm run build
```

---

## 🔍 DEBUGGING

### Ver Versão do Node
```powershell
node --version
```

### Ver Versão do NPM
```powershell
npm --version
```

### Ver Dependências Instaladas
```powershell
npm list --depth=0
```

### Verificar Erros no Projeto
```powershell
npm run build
```
Veja os erros no output

### Ver Porta em Uso
```powershell
netstat -ano | findstr :3000
```

### Matar Processo em Porta Específica
```powershell
taskkill /PID <PID> /F
```

---

## 📦 GIT (Controle de Versão)

### Inicializar Git
```powershell
git init
```

### Adicionar Todos os Arquivos
```powershell
git add .
```

### Commit
```powershell
git commit -m "Mensagem do commit"
```

### Ver Status
```powershell
git status
```

### Ver Histórico
```powershell
git log --oneline
```

### Criar Branch
```powershell
git checkout -b nome-da-branch
```

### Mudar de Branch
```powershell
git checkout nome-da-branch
```

### Adicionar Remote (GitHub)
```powershell
git remote add origin https://github.com/SEU_USUARIO/morsi.git
```

### Push para GitHub
```powershell
git push -u origin main
```

### Pull do GitHub
```powershell
git pull origin main
```

---

## 🔗 CAPACITOR - Comandos Avançados

### Verificar Configuração
```powershell
npx cap doctor
```

### Copiar Assets Web para Plataformas
```powershell
npx cap copy
```

### Atualizar Capacitor CLI
```powershell
npm install @capacitor/cli@latest
```

### Atualizar Plugins Capacitor
```powershell
npm install @capacitor/core@latest @capacitor/app@latest
```

### Remover Plataforma
```powershell
npx cap remove android
# ou
npx cap remove ios
```

---

## 🌐 NAVEGAÇÃO NO TERMINAL

### Mudar de Diretório
```powershell
cd caminho/para/pasta
```

### Voltar um Nível
```powershell
cd ..
```

### Ir para Home
```powershell
cd ~
```

### Listar Arquivos
```powershell
ls
# ou
dir
```

### Criar Pasta
```powershell
mkdir nome-da-pasta
```

### Deletar Arquivo
```powershell
rm arquivo.txt
```

### Deletar Pasta (e conteúdo)
```powershell
rm -r nome-da-pasta
```

### Ver Conteúdo de Arquivo
```powershell
cat arquivo.txt
# ou
type arquivo.txt
```

### Copiar Arquivo
```powershell
cp origem.txt destino.txt
```

### Mover/Renomear Arquivo
```powershell
mv antigo.txt novo.txt
```

---

## 🎯 COMANDOS ESPECÍFICOS DO MORSI

### Workflow Completo de Desenvolvimento
```powershell
# 1. Entrar no projeto
cd c:\Users\Usuário\Documents\antigravityprojects\morsi

# 2. Instalar dependências (primeira vez)
npm install

# 3. Configurar Firebase (editar src/services/firebase.js)

# 4. Rodar em desenvolvimento
npm run dev

# 5. Testar localmente (http://localhost:3000)

# 6. Fazer alterações no código

# 7. Build para produção
npm run build

# 8. Sync com mobile (se houver)
npm run cap:sync
```

### Workflow de Deploy
```powershell
# 1. Fazer alterações

# 2. Build
npm run build

# 3. Commit
git add .
git commit -m "Descrição das mudanças"

# 4. Push para GitHub
git push origin main

# 5. GitHub Actions vai gerar .apk e .ipa automaticamente
```

---

## 🔔 TESTAR NOTIFICAÇÕES

### Via Curl (API REST)
```bash
curl -X POST https://fcm.googleapis.com/fcm/send \
-H "Content-Type: application/json" \
-H "Authorization: key=YOUR_SERVER_KEY" \
-d '{
  "to": "/topics/all",
  "notification": {
    "title": "Teste",
    "body": "Mensagem de teste"
  }
}'
```

### Via Firebase CLI
```powershell
firebase functions:shell
```

---

## 📊 ANÁLISE DE TAMANHO

### Ver Tamanho do Build
```powershell
npm run build
# Depois
ls -lh dist
```

### Analisar Bundle Size
```powershell
npm install -g vite-bundle-visualizer
vite-bundle-visualizer
```

---

## 🆘 TROUBLESHOOTING

### Erro: "Cannot find module"
```powershell
npm install
```

### Erro: "Port 3000 is already in use"
```powershell
# Matar processo na porta 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Erro: "Permission denied"
```powershell
# Rodar PowerShell como Administrador
```

### Erro de Build
```powershell
# Limpar e rebuild
npm cache clean --force
rm -r node_modules dist
npm install
npm run build
```

---

## 🎨 COMANDOS ÚTEIS DO VITE

### Dev com Porta Específica
```powershell
npm run dev -- --port 3001
```

### Build com Source Maps
```powershell
npm run build -- --sourcemap
```

### Preview em Porta Específica
```powershell
npm run preview -- --port 4173
```

---

## 📝 ALIASES ÚTEIS (PowerShell Profile)

### Criar Aliases
Edite `$PROFILE`:
```powershell
notepad $PROFILE
```

Adicione:
```powershell
# MORSI Shortcuts
function morsi { cd c:\Users\Usuário\Documents\antigravityprojects\morsi }
function mdev { cd c:\Users\Usuário\Documents\antigravityprojects\morsi; npm run dev }
function mbuild { cd c:\Users\Usuário\Documents\antigravityprojects\morsi; npm run build }
```

Use:
```powershell
morsi   # Vai para pasta do projeto
mdev    # Vai e roda dev
mbuild  # Vai e faz build
```

---

## ⚡ COMANDOS RÁPIDOS (One-Liners)

### Build e Sync em um Comando
```powershell
npm run build && npm run cap:sync
```

### Limpar e Reinstalar
```powershell
rm -r node_modules package-lock.json; npm install
```

### Commitar Rápido
```powershell
git add .; git commit -m "Update"; git push
```

---

## 🔑 VARIÁVEIS DE AMBIENTE

### Criar .env
```powershell
echo "VITE_API_KEY=sua_chave" > .env
```

### Usar no Código
```javascript
const apiKey = import.meta.env.VITE_API_KEY;
```

---

## 📂 ESTRUTURA DE PASTAS (Tree)

### Ver Árvore de Diretórios (PowerShell)
```powershell
tree /F
```

### Apenas Diretórios
```powershell
tree
```

---

**Salve esta página nos favoritos para referência rápida! 📌**
