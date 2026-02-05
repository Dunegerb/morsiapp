# 🎨 MORSI - Guia de Design

## 🌈 Paleta de Cores

### Cores Principais
- **Primary Purple**: `#6C63FF` - RGB(108, 99, 255)
- **Secondary Pink**: `#FF6584` - RGB(255, 101, 132)
- **Success Green**: `#4CAF50` - RGB(76, 175, 80)
- **Warning Orange**: `#FFC107` - RGB(255, 193, 7)
- **Danger Red**: `#F44336` - RGB(244, 67, 54)

### Backgrounds
- **Dark BG**: `#1a1a2e` - RGB(26, 26, 46)
- **Darker BG**: `#0f0f1e` - RGB(15, 15, 30)
- **Card BG**: `#25274d` - RGB(37, 39, 77)

### Text
- **Primary Text**: `#ffffff` - Branco
- **Secondary Text**: `#b8b8d4` - RGB(184, 184, 212)
- **Border**: `#3d3d5c` - RGB(61, 61, 92)

---

## 🎨 Gradientes

### Gradient 1 (Principal)
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
**Uso**: Botões principais, headers, destaques

### Gradient 2 (Secundário)
```css
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```
**Uso**: Mensagens próprias, alertas especiais

### Gradient 3 (Terciário)
```css
background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
```
**Uso**: Elementos de água/frescor

---

## 🏆 Cores das Patentes

| Patente | Cor | Hex |
|---------|-----|-----|
| Iniciante 🌱 | Marrom | `#8B4513` |
| Determinado 🔥 | Laranja Queimado | `#FF6B35` |
| Persistente ⚡ | Laranja | `#F7931E` |
| Guerreiro ⚔️ | Amarelo | `#FFC107` |
| Veterano 🛡️ | Verde | `#4CAF50` |
| Mestre 👑 | Azul | `#2196F3` |
| Lenda 🏆 | Roxo | `#9C27B0` |

---

## 📏 Tipografia

### Fonte Principal
**Inter** - Google Fonts
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Tamanhos de Fonte

#### Desktop
- **H1 (Logo)**: `64px` / `900 weight` / `4px letter-spacing`
- **H2 (Títulos)**: `32px` / `700 weight`
- **H3 (Subtítulos)**: `24px` / `600 weight`
- **Body**: `16px` / `400 weight`
- **Small**: `14px` / `400 weight`

#### Mobile
- **H1 (Logo)**: `48px` / `900 weight` / `3px letter-spacing`
- **H2 (Títulos)**: `24px` / `700 weight`
- **H3 (Subtítulos)**: `20px` / `600 weight`
- **Body**: `15px` / `400 weight`
- **Small**: `13px` / `400 weight`

---

## 🎭 Componentes de UI

### Botões

#### Botão Principal
```css
padding: 14px 32px;
border-radius: 12px;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
transition: transform 0.3s, box-shadow 0.3s;
```

**Hover**: 
```css
transform: translateY(-2px);
box-shadow: 0 6px 24px rgba(102, 126, 234, 0.6);
```

#### Botão Secundário
```css
background: #25274d;
border: 2px solid #3d3d5c;
```

### Input Fields
```css
padding: 16px 20px;
background: #25274d;
border: 2px solid #3d3d5c;
border-radius: 12px;
transition: border-color 0.3s;
```

**Focus**:
```css
border-color: #6C63FF;
box-shadow: 0 0 0 4px rgba(108, 99, 255, 0.1);
```

### Cards
```css
background: #25274d;
border-radius: 20px;
padding: 24px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
border: 2px solid transparent;
transition: all 0.3s ease;
```

**Hover**:
```css
transform: translateY(-4px);
box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
border-color: #6C63FF;
```

---

## ✨ Animações

### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
**Duração**: `0.5s ease-in`

### Spin (Loading)
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
```
**Duração**: `1s linear infinite`

### Pulse (Texto de loading)
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```
**Duração**: `1.5s ease-in-out infinite`

### Typing (Efeito máquina de escrever)
```css
@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}
```
**Duração**: `1.5s steps(20) forwards`

---

## 📐 Espaçamentos

### Padding/Margin
- **xs**: `8px`
- **sm**: `12px`
- **md**: `16px`
- **lg**: `24px`
- **xl**: `32px`
- **2xl**: `48px`

### Border Radius
- **Pequeno**: `8px`
- **Médio**: `12px`
- **Grande**: `16px`
- **Extra Grande**: `20px`
- **Circular**: `50%`

---

## 🖼️ Ícones e Emojis

### Comunidades
- Cigarro: 🚭
- Álcool: 🍺
- Jogos: 🎰
- Pornografia: 🔞
- Drogas: 💊
- Redes Sociais: 📱
- Compras: 🛒
- Games: 🎮

### Patentes
- Iniciante: 🌱
- Determinado: 🔥
- Persistente: ⚡
- Guerreiro: ⚔️
- Veterano: 🛡️
- Mestre: 👑
- Lenda: 🏆

### UI
- Chat: 💬
- Notificação: 🔔
- Busca: 🔍
- Usuário: 👤
- Seta: →
- Verificado: ✓
- Reset: 🔄
- Enviar: ➤

---

## 🌓 Sombras (Shadows)

### Sombra Padrão
```css
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
```

### Sombra Hover
```css
box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
```

### Sombra de Foco
```css
box-shadow: 0 0 0 4px rgba(108, 99, 255, 0.1);
```

### Sombra de Botão
```css
box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
```

---

## 📱 Breakpoints

```css
/* Mobile First */
@media (max-width: 768px) {
  /* Tablets e abaixo */
}

@media (max-width: 1024px) {
  /* Desktops pequenos e abaixo */
}

@media (max-width: 1440px) {
  /* Desktops médios e abaixo */
}
```

---

## 🎯 Melhores Práticas

### 1. Sempre use transições suaves
```css
transition: all 0.3s ease;
```

### 2. Micro-interações em hover
- **Botões**: `translateY(-2px)`
- **Cards**: `translateY(-4px) + box-shadow`
- **Ícones**: `scale(1.1)`

### 3. Estados de foco visíveis
- Border color change
- Shadow glow
- Nunca `outline: none` sem alternativa

### 4. Contraste de texto
- Branco em fundos escuros
- Texto secundário em tom mais claro
- Nunca menos de 4.5:1 (WCAG AA)

### 5. Feedback visual
- Loading states
- Disabled states
- Error states
- Success states

---

## 🎨 Exemplos de Uso

### Gradiente em Texto
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

### Glass Morphism (Opcional)
```css
background: rgba(37, 39, 77, 0.8);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Neon Glow Effect
```css
box-shadow: 
  0 0 10px rgba(108, 99, 255, 0.5),
  0 0 20px rgba(108, 99, 255, 0.3),
  0 0 30px rgba(108, 99, 255, 0.1);
```

---

**Design criado com foco em modernidade, acessibilidade e experiência do usuário! 🎨**
