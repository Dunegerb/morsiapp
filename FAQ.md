# ❓ FAQ - MORSI

## Perguntas Frequentes

### 📱 Sobre o App

#### O que é MORSI?
MORSI é um aplicativo mobile de comunidade para pessoas que querem superar vícios. Oferece suporte em grupo, gamificação com sistema de patentes e contador automático de dias sem o vício.

#### É grátis?
Sim! O app é totalmente gratuito. Firebase tem um plano gratuito generoso que suporta milhares de usuários.

#### Funciona online ou offline?
Funciona nos dois modos:
- **Offline**: Contador e dados locais funcionam
- **Online**: Chat em tempo real e notificações funcionam

#### Quais vícios o app suporta?
Qualquer vício! Temos 8 comunidades pré-configuradas:
- Cigarro
- Álcool
- Jogos de Azar
- Pornografia
- Drogas
- Redes Sociais
- Compras Compulsivas
- Videogames

Você pode adicionar mais comunidades facilmente.

---

### 🔧 Instalação e Configuração

#### Como adiciono Node.js ao PATH no Windows?
1. Pressione `Win + R` e digite `sysdm.cpl` + Enter
2. Vá para aba "Avançado" → "Variáveis de Ambiente"
3. Em "Variáveis do Sistema", selecione `Path` → "Editar"
4. Clique em "Novo" e adicione o caminho do Node.js
5. Clique "OK" em todas as janelas
6. **Reinicie o terminal**

#### Como configurar o Firebase?
1. Acesse https://console.firebase.google.com
2. Clique em "Adicionar projeto"
3. Nomeie como "MORSI" e siga o wizard
4. No projeto, clique em "Adicionar app" → 🌐 Web
5. Registre o app e copie as credenciais
6. Cole em `src/services/firebase.js` (linhas 6-12)
7. Ative:
   - **Firestore Database** (modo teste)
   - **Authentication** → Provedores de login → Anônimo
   - **Cloud Messaging**

#### `npm install` está falhando. O que fazer?
```powershell
# Limpar cache
npm cache clean --force

# Deletar node_modules e package-lock.json
rm -r node_modules
rm package-lock.json

# Reinstalar
npm install
```

#### Erro: "Cannot find module..."
Certifique-se de estar no diretório correto:
```powershell
cd c:\Users\Usuário\Documents\antigravityprojects\morsi
```

---

### 📦 Build e Deploy

#### Como gero o arquivo .APK para Android?
**Opção 1 - GitHub Actions (Recomendado):**
1. Criar repositório no GitHub
2. Fazer push do código
3. GitHub Actions vai gerar automaticamente
4. Baixar em `Actions` → `Artifacts`

**Opção 2 - Android Studio:**
1. Instalar Android Studio
2. Rodar:
```powershell
npm run build
npm run cap:add:android
npm run cap:sync
npm run cap:open:android
```
3. No Android Studio: `Build` → `Build APK(s)`

#### Como gero o arquivo .IPA para iOS?
**Sem Mac:**
Use GitHub Actions (já configurado) ou Codemagic.io

**Com Mac:**
```bash
npm run build
npm run cap:add:ios
npm run cap:sync
npm run cap:open:ios
```
No Xcode: `Product` → `Archive` → Export

#### Quanto tempo leva para gerar .APK/.IPA no GitHub Actions?
- Android: ~5-7 minutos
- iOS: ~10-15 minutos

#### GitHub Actions falhou. O que verificar?
1. Verifique se o arquivo `.github/workflows/build.yml` existe
2. Verifique se `package.json` está correto
3. Veja os logs do erro no GitHub Actions
4. Tente fazer push novamente

---

### 📲 Instalação no Celular

#### Como instalo o .APK no Android?
1. Transferir o `.apk` para o celular
2. Ir em Configurações → Segurança
3. Ativar "Fontes Desconhecidas" ou "Instalar apps desconhecidos"
4. Abrir o arquivo `.apk`
5. Tocar em "Instalar"

#### Como instalo o .IPA no iPhone SEM App Store?
**AltStore (Recomendado):**
1. Baixar AltServer no PC: https://altstore.io
2. Instalar AltStore no iPhone via iTunes/Finder
3. Abrir AltStore no iPhone
4. Tocar em `+` e selecionar o `.ipa`
5. Aguardar instalação

**Sideloadly:**
1. Baixar: https://sideloadly.io
2. Conectar iPhone via USB
3. Arrastar `.ipa` para Sideloadly
4. Login com Apple ID (grátis)
5. Clicar "Start"

#### Por que preciso renovar o app no iPhone a cada 7 dias?
É uma limitação da Apple para apps instalados fora da App Store com Apple ID grátis. 

**Solução automática**: AltStore renova automaticamente quando o iPhone está na mesma WiFi que o PC com AltServer.

**Solução permanente**: Conta de desenvolvedor Apple ($99/ano).

#### Posso distribuir o app publicamente?
**Android**: Sim, .APK pode ser distribuído livremente.

**iOS**: 
- Com Apple ID grátis: Não (máx 3 dispositivos)
- Com conta Developer ($99/ano): Sim, via TestFlight (até 10.000 usuários)
- App Store: Sim, após aprovação da Apple

---

### 🔔 Notificações Push

#### Como envio notificações?
**Método 1 - Firebase Console:**
1. Firebase Console → Cloud Messaging
2. "Send your first message"
3. Preencher título, mensagem, imagem
4. Selecionar "All devices"
5. Publicar

**Método 2 - Painel Admin:**
Use o arquivo `NOTIFICATIONS.md` para instruções completas.

#### As notificações funcionam no iOS?
Sim, mas você precisa:
1. Configurar APNs no Firebase
2. Certificado de desenvolvedor Apple
3. Permissão de notificações no app

No desenvolvimento local (web), só funciona em HTTPS.

#### Posso agendar notificações?
No Firebase Console, sim! Você pode agendar data e hora.

---

### 💬 Chat e Funcionalidades

#### O chat é em tempo real?
Sim! Usando Firestore real-time listeners.

#### Como funciona o sistema de menções?
Digite `@` seguido do nome do usuário. Exemplo: `@João como você está?`

#### Como respondo uma mensagem específica?
Clique no botão "↩️ Responder" na mensagem.

#### O contador é manual ou automático?
**100% automático!** Calcula os dias desde que você iniciou a contagem.

#### O que acontece se eu resetar a contagem?
Volta para 0 dias e perde a patente. Use com cuidado!

#### Posso participar de várias comunidades?
Sim! Você pode entrar em quantas comunidades quiser.

---

### 🏆 Sistema de Patentes

#### Como subo de patente?
Automático! Baseado nos dias sem o vício:
- 7 dias → Determinado
- 30 dias → Persistente
- 60 dias → Guerreiro
- E assim por diante...

#### Perco a patente se resetar?
Sim, volta para Iniciante.

#### Qual a patente máxima?
**Lenda** (300+ dias) 🏆

---

### 🔒 Privacidade e Segurança

#### Meus dados são públicos?
Não. Apenas:
- Nome de usuário (que você escolhe)
- Mensagens no chat (públicas na comunidade)

Idade, avatar e dados pessoais são privados.

#### O app rastreia minha localização?
Não! O app não usa geolocalização.

#### Preciso criar conta?
Não. Usa autenticação anônima do Firebase.

#### Posso deletar meus dados?
Sim. Desinstale o app e os dados locais serão removidos.

---

### 🛠️ Desenvolvimento e Personalização

#### Como adiciono uma nova comunidade?
Edite `src/components/ServerSelection.jsx`:
```javascript
const defaultServers = [
  // Adicione aqui
  { id: '9', name: 'Nova Comunidade', icon: '🎯', description: 'Descrição...', members: 0 }
];
```

#### Como mudo as cores do app?
Edite `src/styles/global.css` (linhas 3-15):
```css
:root {
  --primary-color: #6C63FF; /* Mude aqui */
  --secondary-color: #FF6584;
  /* ... */
}
```

#### Como adiciono novas patentes?
Edite `src/components/ServerView.jsx`:
```javascript
const RANKS = [
  // Adicione aqui
  { name: 'Nova Patente', minDays: 365, icon: '🌟', color: '#FF0000' }
];
```

#### Posso customizar as animações?
Sim! Edite os arquivos CSS nas pastas `src/styles/`.

---

### 🌐 Firebase e Backend

#### Preciso pagar pelo Firebase?
No plano grátis (Spark):
- **Firestore**: 50K leituras/dia
- **Authentication**: Ilimitada
- **Cloud Messaging**: Ilimitado

Suficiente para milhares de usuários!

#### E se exceder o plano grátis?
Firebase avisa antes. Você pode:
1. Otimizar queries
2. Upgradar para plano Blaze (paga só o que usar)

#### Posso usar outro backend?
Sim! Mas precisará reescrever `src/services/firebase.js`.

---

### ❌ Erros Comuns

#### Erro: "Firebase: Error (auth/invalid-api-key)"
Credenciais Firebase incorretas. Verifique `src/services/firebase.js`.

#### Erro: "Module not found: Can't resolve..."
Execute `npm install` novamente.

#### O app não abre no celular
Verifique:
1. Se o `.ipa`/`.apk` foi instalado corretamente
2. Se há erros no console durante `npm run build`
3. Se o Firebase está configurado

#### Chat não está atualizando
Verifique:
1. Conexão com internet
2. Firestore está ativo no Firebase Console
3. Regras do Firestore permitem leitura/escrita

#### Contador não está funcionando
Verifique:
1. Se você está na tela do servidor
2. Se há JavaScript errors no console
3. Se o `localStorage` está habilitado no navegador

---

### 🚀 Performance

#### O app está lento
1. Otimize imagens
2. Reduza animações CSS
3. Limite mensagens no chat (paginação)
4. Use Firestore queries com `limit()`

#### Como faço cache de dados?
Firestore já faz cache automático! Dados ficam disponíveis offline.

---

### 📚 Recursos Adicionais

#### Onde aprendo mais sobre Capacitor?
https://capacitorjs.com/docs

#### Onde aprendo mais sobre Firebase?
https://firebase.google.com/docs

#### Como contribuo com o projeto?
Faça um fork no GitHub e envie pull requests!

---

**Ainda tem dúvidas? Consulte o README.md completo! 📖**
