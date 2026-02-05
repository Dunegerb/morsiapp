# 🚀 GUIA RÁPIDO - MORSI

## ⚡ Instalação em 5 Minutos

### 1️⃣ Adicionar Node.js ao PATH

**Windows:**
1. Pressione `Win + R` e digite `sysdm.cpl`
2. Vá para aba "Avançado" → "Variáveis de Ambiente"
3. Em "Variáveis do Sistema", selecione `Path` → "Editar"
4. Clique em "Novo" e adicione:
   ```
   C:\Users\Usuário\Downloads\node-v24.13.0-win-x64\node-v24.13.0-win-x64
   ```
5. Clique "OK" em todas as janelas
6. **Feche e abra o terminal novamente**

### 2️⃣ Instalar Dependências

```powershell
cd c:\Users\Usuário\Documents\antigravityprojects\morsi
npm install
```

### 3️⃣ Configurar Firebase

1. Acesse: https://console.firebase.google.com
2. Crie um novo projeto chamado "MORSI"
3. Adicione um app Web
4. Copie as credenciais
5. Cole em `src/services/firebase.js` (linha 6-12)
6. Ative no console:
   - **Firestore Database** (modo teste)
   - **Authentication** (método anônimo)
   - **Cloud Messaging**

### 4️⃣ Rodar o App

```powershell
npm run dev
```

Acesse: http://localhost:3000

---

## 📱 Gerar .IPA e .APK

### Opção Mais Fácil: GitHub Actions (Recomendado!)

1. Criar repositório no GitHub
2. Fazer push do código:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/morsi.git
   git push -u origin main
   ```
3. No GitHub: `Actions` → Aguardar o build
4. Baixar `.apk` e `.ipa` em `Actions` → `Build MORSI App` → `Artifacts`

### Instalar no iPhone (SEM App Store)

**Método AltStore:**
1. Baixar AltServer: https://altstore.io
2. Instalar AltStore no iPhone
3. No AltStore (iPhone): `+` → Selecionar `.ipa`
4. Pronto! ✅

**Método Sideloadly:**
1. Baixar: https://sideloadly.io
2. Conectar iPhone via USB
3. Arrastar `.ipa` → Entrar com Apple ID → Install
4. Pronto! ✅

---

## 🎯 Checklist Rápido

- [ ] Node.js no PATH
- [ ] `npm install` executado com sucesso
- [ ] Firebase configurado
- [ ] App rodando em `localhost:3000`
- [ ] Código enviado para GitHub
- [ ] GitHub Actions rodou e gerou APK/IPA
- [ ] App instalado no telefone

---

## 🆘 Problemas Comuns

| Problema | Solução |
|----------|---------|
| `npx não reconhecido` | Adicionar Node.js ao PATH e reiniciar terminal |
| `Firebase error` | Verificar credenciais no `firebase.js` |
| `npm install falha` | Rodar `npm cache clean --force` e tentar novamente |
| Build GitHub falha | Verificar se `package.json` está correto |

---

## 📞 Suporte

Qualquer dúvida, verifique o **README.md** completo para instruções detalhadas!

**Boa sorte na sua jornada! 🏆**
