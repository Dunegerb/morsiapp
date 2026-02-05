# 🔔 Painel de Notificações Push - MORSI

## Como Enviar Notificações Personalizadas

### Opção 1: Via Firebase Console (Mais Simples)

1. Acesse o [Firebase Console](https://console.firebase.google.com)
2. Selecione seu projeto MORSI
3. Vá para **Cloud Messaging** no menu lateral
4. Clique em **"Send your first message"**
5. Preencha:
   - **Notification title**: Título da notificação
   - **Notification text**: Corpo da mensagem
   - **Image** (opcional): URL de uma imagem
6. Clique em **"Next"**
7. Em **Target**, selecione **"All devices"** ou escolha usuários específicos
8. Clique em **"Review"** → **"Publish"**

✅ **Pronto! Todos os usuários receberão a notificação!**

---

### Opção 2: Painel Web Personalizado (Avançado)

Vou criar um painel web simples para você enviar notificações customizadas.

#### Arquivo: `admin-panel.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MORSI - Painel Admin</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .panel {
      background: white;
      border-radius: 20px;
      padding: 40px;
      max-width: 600px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    h1 {
      color: #667eea;
      margin-bottom: 10px;
      font-size: 32px;
    }
    
    p {
      color: #666;
      margin-bottom: 30px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      color: #333;
      font-weight: 600;
      margin-bottom: 8px;
      font-size: 14px;
    }
    
    input, textarea, select {
      width: 100%;
      padding: 14px;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 15px;
      font-family: inherit;
      transition: border-color 0.3s;
    }
    
    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: #667eea;
    }
    
    textarea {
      resize: vertical;
      min-height: 100px;
    }
    
    button {
      width: 100%;
      padding: 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 10px;
      color: white;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }
    
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
    
    .preview {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    
    .preview h3 {
      margin-bottom: 10px;
      color: #333;
    }
    
    .notification-preview {
      background: white;
      padding: 16px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .notif-title {
      font-weight: 700;
      margin-bottom: 4px;
      color: #333;
    }
    
    .notif-body {
      color: #666;
      font-size: 14px;
    }
    
    .notif-image {
      width: 100%;
      border-radius: 8px;
      margin-top: 10px;
      max-height: 200px;
      object-fit: cover;
    }
    
    .status {
      margin-top: 20px;
      padding: 12px;
      border-radius: 8px;
      font-weight: 600;
      display: none;
    }
    
    .status.success {
      background: #d4edda;
      color: #155724;
      display: block;
    }
    
    .status.error {
      background: #f8d7da;
      color: #721c24;
      display: block;
    }
  </style>
</head>
<body>
  <div class="panel">
    <h1>🔔 MORSI Admin</h1>
    <p>Enviar notificação push para todos os usuários</p>
    
    <div class="preview">
      <h3>Preview da Notificação:</h3>
      <div class="notification-preview">
        <div class="notif-title" id="previewTitle">Título da notificação</div>
        <div class="notif-body" id="previewBody">Corpo da mensagem aparecerá aqui...</div>
        <img id="previewImage" class="notif-image" style="display: none;">
      </div>
    </div>
    
    <form id="notificationForm">
      <div class="form-group">
        <label>📝 Título da Notificação</label>
        <input 
          type="text" 
          id="title" 
          placeholder="Ex: Continue Forte! 💪"
          required
        >
      </div>
      
      <div class="form-group">
        <label>💬 Corpo da Mensagem</label>
        <textarea 
          id="body" 
          placeholder="Ex: Você está indo muito bem! Mantenha o foco na sua jornada."
          required
        ></textarea>
      </div>
      
      <div class="form-group">
        <label>🖼️ URL da Imagem (Opcional)</label>
        <input 
          type="url" 
          id="image" 
          placeholder="https://exemplo.com/imagem.png"
        >
      </div>
      
      <div class="form-group">
        <label>🎯 Enviar Para</label>
        <select id="target">
          <option value="all">Todos os Usuários</option>
          <option value="cigarro">Comunidade - Cigarro</option>
          <option value="alcool">Comunidade - Álcool</option>
          <option value="jogos">Comunidade - Jogos de Azar</option>
          <option value="pornografia">Comunidade - Pornografia</option>
          <option value="drogas">Comunidade - Drogas</option>
          <option value="social">Comunidade - Redes Sociais</option>
          <option value="compras">Comunidade - Compras</option>
          <option value="games">Comunidade - Videogames</option>
        </select>
      </div>
      
      <button type="submit" id="sendBtn">Enviar Notificação 🚀</button>
    </form>
    
    <div id="status" class="status"></div>
  </div>

  <script type="module">
    // Importar Firebase
    import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
    import { getMessaging, getToken } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js';
    
    // SUBSTITUA COM SUAS CREDENCIAIS FIREBASE
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    
    const app = initializeApp(firebaseConfig);
    
    // Preview em tempo real
    const titleInput = document.getElementById('title');
    const bodyInput = document.getElementById('body');
    const imageInput = document.getElementById('image');
    const previewTitle = document.getElementById('previewTitle');
    const previewBody = document.getElementById('previewBody');
    const previewImage = document.getElementById('previewImage');
    
    titleInput.addEventListener('input', (e) => {
      previewTitle.textContent = e.target.value || 'Título da notificação';
    });
    
    bodyInput.addEventListener('input', (e) => {
      previewBody.textContent = e.target.value || 'Corpo da mensagem aparecerá aqui...';
    });
    
    imageInput.addEventListener('input', (e) => {
      if (e.target.value) {
        previewImage.src = e.target.value;
        previewImage.style.display = 'block';
      } else {
        previewImage.style.display = 'none';
      }
    });
    
    // Enviar notificação
    document.getElementById('notificationForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const title = titleInput.value;
      const body = bodyInput.value;
      const image = imageInput.value;
      const target = document.getElementById('target').value;
      const sendBtn = document.getElementById('sendBtn');
      const status = document.getElementById('status');
      
      sendBtn.disabled = true;
      sendBtn.textContent = 'Enviando...';
      status.className = 'status';
      status.textContent = '';
      
      try {
        // Enviar via Firebase Cloud Functions ou API
        // VOCÊ PRECISA CRIAR UMA CLOUD FUNCTION OU USAR A API REST DO FIREBASE
        
        const serverKey = 'YOUR_SERVER_KEY'; // Obter no Firebase Console
        
        const notification = {
          to: `/topics/${target}`,
          notification: {
            title: title,
            body: body,
            image: image || undefined,
            icon: '/icon.svg'
          },
          data: {
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
            sound: 'default'
          }
        };
        
        const response = await fetch('https://fcm.googleapis.com/fcm/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `key=${serverKey}`
          },
          body: JSON.stringify(notification)
        });
        
        if (response.ok) {
          status.className = 'status success';
          status.textContent = '✅ Notificação enviada com sucesso!';
          document.getElementById('notificationForm').reset();
          previewTitle.textContent = 'Título da notificação';
          previewBody.textContent = 'Corpo da mensagem aparecerá aqui...';
          previewImage.style.display = 'none';
        } else {
          throw new Error('Erro ao enviar notificação');
        }
      } catch (error) {
        console.error('Erro:', error);
        status.className = 'status error';
        status.textContent = '❌ Erro ao enviar. Verifique as credenciais do Firebase.';
      }
      
      sendBtn.disabled = false;
      sendBtn.textContent = 'Enviar Notificação 🚀';
    });
  </script>
</body>
</html>
```

---

### Como Usar o Painel:

1. **Salvar o arquivo** `admin-panel.html` no projeto
2. **Configurar credenciais** Firebase (linha 166-172)
3. **Obter Server Key**:
   - Firebase Console → ⚙️ Project Settings
   - Aba **Cloud Messaging**
   - Copiar **Server Key**
   - Colar na linha 188 do `admin-panel.html`
4. **Abrir o arquivo** no navegador
5. **Preencher** título, mensagem, imagem (opcional)
6. **Selecionar** para quem enviar
7. **Clicar em** "Enviar Notificação"

---

### Opção 3: API REST (Para Desenvolvedores)

```bash
curl -X POST https://fcm.googleapis.com/fcm/send \
-H "Content-Type: application/json" \
-H "Authorization: key=YOUR_SERVER_KEY" \
-d '{
  "to": "/topics/all",
  "notification": {
    "title": "Continue Forte! 💪",
    "body": "Você está indo muito bem!",
    "image": "https://exemplo.com/imagem.png"
  }
}'
```

---

## 📱 Inscrever Usuários em Tópicos

Para enviar notificações para comunidades específicas, adicione este código no `ServerView.jsx`:

```javascript
import { getMessaging, getToken } from 'firebase/messaging';

// Quando o usuário entrar em um servidor
useEffect(() => {
  const subscribeToTopic = async () => {
    const messaging = getMessaging();
    const token = await getToken(messaging);
    
    // Enviar token para o backend para inscrever no tópico
    await fetch('https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/' + server.id, {
      method: 'POST',
      headers: {
        'Authorization': 'key=YOUR_SERVER_KEY'
      }
    });
  };
  
  subscribeToTopic();
}, [server.id]);
```

---

## 🎯 Exemplos de Notificações

### Motivacional
- **Título**: "Você está indo muito bem! 💪"
- **Corpo**: "Já são {dias} dias limpo! Continue assim!"

### Conquista
- **Título**: "Nova Patente Desbloqueada! 🏆"
- **Corpo**: "Parabéns! Você alcançou a patente {patente}!"

### Lembrete
- **Título**: "Como você está se sentindo? 😊"
- **Corpo**: "Compartilhe sua experiência no chat da comunidade!"

### Alerta de Recaída
- **Título**: "Respirefundo 🧘"
- **Corpo**: "Se você está pensando em desistir, lembre-se do porquê começou. A comunidade está aqui por você!"

---

**Boas notificações! 🔔**
