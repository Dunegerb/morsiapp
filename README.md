# 🏆 MORSI - Comunidade de Superação de Vícios

**MORSI** é um aplicativo móvel de comunidade para pessoas que desejam superar vícios. Com sistema de gamificação, chat em tempo real e suporte entre membros.

## ✨ Funcionalidades

### 📱 App Completo
- ✅ **Criação de Identidade Animada** - Formulário interativo com animação de cartão de ID
- ✅ **Seleção de Servidores** - Comunidades organizadas por tipo de vício
- ✅ **Contador de Dias Automático** - Contagem automática de dias sem o vício
- ✅ **Sistema de Patentes** - 7 níveis de patente (Iniciante → Lenda)
- ✅ **Chat em Tempo Real** - Mensagens com suporte a menções (@usuario) e respostas
- ✅ **Reset de Contagem** - Botão para reiniciar a contagem quando necessário
- ✅ **Notificações Push** - Sistema para enviar notificações personalizadas

### 🎮 Gamificação - Sistema de Patentes

| Patente | Dias Necessários | Ícone |
|---------|------------------|-------|
| Iniciante | 0+ dias | 🌱 |
| Determinado | 7+ dias | 🔥 |
| Persistente | 30+ dias | ⚡ |
| Guerreiro | 60+ dias | ⚔️ |
| Veterano | 90+ dias | 🛡️ |
| Mestre | 180+ dias | 👑 |
| Lenda | 300+ dias | 🏆 |

## 🚀 Como Instalar e Rodar

### Pré-requisitos

1. **Node.js instalado** (você já baixou em: `C:\Users\Usuário\Downloads\node-v24.13.0-win-x64`)
2. Adicionar Node.js ao PATH do Windows:
   - Ir para: `Painel de Controle` → `Sistema` → `Configurações Avançadas do Sistema`
   - Clicar em `Variáveis de Ambiente`
   - Em `Variáveis do Sistema`, selecionar `Path` e clicar em `Editar`
   - Adicionar: `C:\Users\Usuário\Downloads\node-v24.13.0-win-x64\node-v24.13.0-win-x64`

### Passo 1: Instalar Dependências

```powershell
cd c:\Users\Usuário\Documents\antigravityprojects\morsi
npm install
```

### Passo 2: Configurar Firebase (IMPORTANTE!)

1. Criar projeto no [Firebase Console](https://console.firebase.google.com)
2. Ativar:
   - **Authentication** (método anônimo)
   - **Firestore Database**
   - **Cloud Messaging**
3. Copiar as credenciais do Firebase
4. Editar o arquivo `src/services/firebase.js` e substituir:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_AUTH_DOMAIN_AQUI",
  projectId: "SEU_PROJECT_ID_AQUI",
  storageBucket: "SEU_STORAGE_BUCKET_AQUI",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID_AQUI",
  appId: "SEU_APP_ID_AQUI"
};
```

### Passo 3: Rodar em Desenvolvimento

```powershell
npm run dev
```

Acesse: `http://localhost:3000`

## 📦 Gerar Arquivos .IPA e .APK

### Opção 1: Build Local (Requer instalação adicional)

#### Para Android (.APK)

1. Instalar [Android Studio](https://developer.android.com/studio)
2. Gerar o build:

```powershell
npm run build
npm run cap:add:android
npm run cap:sync
npm run cap:open:android
```

3. No Android Studio: `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`

#### Para iOS (.IPA) - Requer macOS

```bash
npm run build
npm run cap:add:ios
npm run cap:sync
npm run cap:open:ios
```

No Xcode: `Product` → `Archive` → Exportar como .IPA

### Opção 2: Build na Nuvem (RECOMENDADO - SEM NECESSIDADE DE MAC!)

#### Usando GitHub Actions (GRÁTIS)

1. Criar repositório no GitHub e fazer push do código
2. Criar arquivo `.github/workflows/build.yml`:

```yaml
name: Build Mobile App

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npx cap add android
      - run: npx cap sync
      - name: Build APK
        run: |
          cd android
          ./gradlew assembleRelease
      - uses: actions/upload-artifact@v3
        with:
          name: app-release.apk
          path: android/app/build/outputs/apk/release/app-release.apk

  build-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npx cap add ios
      - run: npx cap sync
      - name: Build iOS
        run: |
          cd ios/App
          xcodebuild -workspace App.xcworkspace -scheme App -configuration Release archive -archivePath build/App.xcarchive
          xcodebuild -exportArchive -archivePath build/App.xcarchive -exportPath build -exportOptionsPlist exportOptions.plist
      - uses: actions/upload-artifact@v3
        with:
          name: App.ipa
          path: ios/App/build/App.ipa
```

3. Fazer push e o GitHub vai gerar os arquivos automaticamente!
4. Baixar os arquivos em: `Actions` → `Build Mobile App` → `Artifacts`

#### Usando Codemagic (GRÁTIS - 500 min/mês)

1. Criar conta em [codemagic.io](https://codemagic.io)
2. Conectar o repositório GitHub
3. Configurar o build seguindo o wizard
4. Codemagic vai gerar .IPA e .APK automaticamente!

## 📲 Instalar o App no iPhone (SEM App Store)

### Método 1: AltStore (RECOMENDADO)

1. Baixar **AltServer** no PC: [altstore.io](https://altstore.io)
2. Instalar **AltStore** no iPhone via iTunes/Finder
3. Abrir AltStore no iPhone
4. Tocar em `+` e selecionar o arquivo `.ipa`
5. O app será instalado!

**Nota:** Precisa renovar a cada 7 dias (AltStore faz automaticamente via WiFi)

### Método 2: Sideloadly

1. Baixar [Sideloadly](https://sideloadly.io)
2. Conectar iPhone via USB
3. Arrastar o `.ipa` para o Sideloadly
4. Entrar com Apple ID (grátis)
5. Clicar em "Start"

### Método 3: TestFlight (Requer conta de desenvolvedor)

1. Fazer upload do .IPA para App Store Connect
2. Adicionar testers no TestFlight
3. Testers instalam via app TestFlight

## 📲 Instalar no Android

1. Transferir o `.apk` para o celular
2. Ativar "Fontes Desconhecidas" nas configurações
3. Abrir o `.apk` e instalar

## 🔔 Sistema de Notificações Push

### Configurar Envio de Notificações

1. No Firebase Console, ir para **Cloud Messaging**
2. Copiar a **Server Key**
3. Usar a API do Firebase para enviar notificações:

```javascript
// Exemplo de envio via Node.js
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert('serviceAccountKey.json')
});

// Enviar notificação para todos
const message = {
  notification: {
    title: 'Continue Forte! 💪',
    body: 'Você está indo muito bem! Mantenha o foco.',
    imageUrl: 'https://exemplo.com/imagem.png'
  },
  topic: 'all_users'
};

admin.messaging().send(message);
```

### Painel Admin (Opcional - Criar depois)

Você pode criar um painel web para enviar notificações personalizadas com:
- Campo de título
- Campo de corpo da mensagem
- Upload de imagem
- Seleção de servidor/comunidade

## 🔧 Estrutura do Projeto

```
morsi/
├── src/
│   ├── components/
│   │   ├── CreateIdentity.jsx   # Tela de criação de perfil
│   │   ├── ServerSelection.jsx  # Tela de seleção de comunidades
│   │   └── ServerView.jsx       # Tela principal com contador e chat
│   ├── services/
│   │   └── firebase.js          # Configuração Firebase
│   ├── styles/
│   │   ├── global.css
│   │   ├── create-identity.css
│   │   ├── server-selection.css
│   │   └── server-view.css
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── icon.svg
├── capacitor.config.json
├── package.json
└── vite.config.js
```

## 🎨 Tecnologias Utilizadas

- **React** - Framework frontend
- **Vite** - Build tool rápido
- **Capacitor** - Compilação para iOS/Android
- **Firebase** - Backend (Auth, Firestore, Cloud Messaging)
- **CSS personalizado** - Design moderno com gradientes e animações

## 🆘 Troubleshooting

### Erro: "npx não é reconhecido"
- Adicionar Node.js ao PATH do Windows (ver instruções acima)

### Firebase não funciona
- Verificar se as credenciais foram substituídas corretamente
- Verificar se Firestore e Authentication estão ativos no console

### Build falha
- Verificar se todas as dependências foram instaladas: `npm install`
- Limpar cache: `npm cache clean --force` e reinstalar

## 📝 Próximos Passos

1. ✅ Configurar Firebase
2. ✅ Testar localmente com `npm run dev`
3. ✅ Fazer build e gerar .APK/.IPA
4. ✅ Instalar no dispositivo
5. 🔄 Criar painel admin para notificações
6. 🔄 Adicionar mais funcionalidades (perfil, conquistas, etc.)

## 📄 Licença

MIT License - Livre para uso pessoal e comercial

---

**Desenvolvido com ❤️ para ajudar pessoas a superarem seus vícios**

🚀 **MORSI - Sua jornada de superação começa aqui!**
