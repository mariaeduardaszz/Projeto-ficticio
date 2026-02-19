# 🍽️ SISTEMA DE RESTAURANTE GASTRONÔMICO

Sistema completo de gerenciamento de restaurante desenvolvido com **HTML**, **CSS** e **JavaScript** puros.

---

## 📁 ESTRUTURA DOS ARQUIVOS

```
public/
├── index.html      → HTML - Estrutura da página
├── styles.css      → CSS - Toda a estilização
└── script.js       → JavaScript - Toda a lógica
```

---

## 📄 **1. HTML (index.html)**

### O que contém:
- **Estrutura semântica** da página
- **Formulários** de login e verificação
- **Modais** (popups) para customização
- **Navegação** entre telas
- **Cards** de produtos e pedidos

### Principais seções:
```html
<!-- MODAIS -->
<div id="ageModal">           → Verificação de idade
<div id="customizeModal">     → Personalizar pedido

<!-- TELAS -->
<div id="loginScreen">        → Tela de login
<div id="customerInterface">  → Interface do cliente
<div id="staffInterface">     → Interface administrativa

<!-- COMPONENTES -->
<header>                      → Cabeçalho fixo
<nav class="bottom-nav">      → Navegação inferior (mobile)
<main class="app-main">       → Conteúdo principal
```

---

## 🎨 **2. CSS (styles.css)**

### O que contém:
- **Variáveis CSS** (cores, espaçamentos, fontes)
- **Reset CSS** para consistência
- **Layouts** (flexbox, grid)
- **Componentes** estilizados
- **Responsividade** mobile-first
- **Animações** e transições

### Principais seções:

#### **Variáveis (Customizáveis)**
```css
:root {
    --primary-color: #ea580c;      /* Laranja principal */
    --success-color: #16a34a;      /* Verde sucesso */
    --spacing-md: 1rem;            /* Espaçamento médio */
    --font-base: 1rem;             /* Tamanho fonte base */
}
```

#### **Botões**
```css
.btn                  → Botão base
.btn-primary          → Botão principal (laranja)
.btn-outline          → Botão com borda
.btn-danger           → Botão vermelho
.btn-lg               → Botão grande
```

#### **Cards**
```css
.card                 → Card branco com sombra
.menu-item            → Card de produto do menu
.order-card           → Card de pedido
.stat-card            → Card de estatística
```

#### **Layout**
```css
.container            → Container centralizado
.grid                 → Layout em grade
.flex                 → Layout flexível
.modal                → Modal overlay
```

---

## ⚙️ **3. JAVASCRIPT (script.js)**

### O que contém:
- **Estado da aplicação** (dados globais)
- **Eventos** de cliques e formulários
- **Manipulação DOM** (criar/modificar elementos)
- **Lógica de negócio** (carrinho, pedidos, pagamento)
- **Funções utilitárias**

### Estrutura do código:

#### **1. DADOS**
```javascript
const menuItemsData = [...]     // Cardápio do restaurante
const availableAdditions = [...] // Ingredientes para adicionar
const availableRemovals = [...]  // Ingredientes para remover

let appState = {
    isVerified: false,          // Verificação de idade OK?
    userType: null,             // 'customer' ou 'staff'
    cart: [],                   // Carrinho de compras
    orders: [],                 // Pedidos realizados
    // ...
}
```

#### **2. FUNÇÕES UTILITÁRIAS**
```javascript
showToast(message, type)        // Exibir notificação
formatCurrency(value)           // Formatar moeda (R$ 10,50)
hideAllScreens()                // Esconder todas as telas
showScreen(screenId)            // Mostrar tela específica
```

#### **3. VERIFICAÇÃO DE IDADE**
```javascript
// Valida se usuário tem 18+ anos
document.getElementById('ageForm')
    .addEventListener('submit', function(e) {
        // Calcula idade
        // Se >= 18, libera acesso
    });
```

#### **4. LOGIN**
```javascript
// Login do cliente (nome + mesa)
document.getElementById('customerLoginForm')
    .addEventListener('submit', function(e) {
        appState.customerName = ...
        appState.tableNumber = ...
        showScreen('customerInterface');
    });

// Login administrativo (staff)
document.getElementById('staffLoginForm')
    .addEventListener('submit', function(e) {
        appState.userType = 'staff';
        showScreen('staffInterface');
    });
```

#### **5. CARDÁPIO**
```javascript
function loadMenu() {
    renderCategories();         // Renderiza abas de categorias
    renderMenuItems();          // Renderiza produtos
}

function renderMenuItems() {
    // Filtra por categoria e busca
    // Cria HTML dos produtos
    // Insere no DOM
}

function openCustomizeModal(itemId) {
    // Abre modal de personalização
    // Permite adicionar/remover ingredientes
    // Controla quantidade
}
```

#### **6. CARRINHO**
```javascript
function updateCartDisplay() {
    // Conta total de itens
    // Calcula valor total
    // Atualiza badges e resumos
}

// Fazer pedido
document.getElementById('makeOrderBtn')
    .addEventListener('click', function() {
        // Cria novo pedido
        // Limpa carrinho
        // Aguarda 10s para confirmação
    });
```

#### **7. PEDIDOS**
```javascript
function renderOrders() {
    // Lista todos os pedidos
    // Exibe status (Pendente, Confirmado, Pronto)
    // Permite cancelamento (se pendente)
}

function cancelOrder(orderId) {
    // Cancela pedido se ainda pendente
}
```

#### **8. CHAMAR GARÇOM**
```javascript
// Chamar garçom
document.getElementById('callWaiterBtn')
    .addEventListener('click', function() {
        // Verifica cooldown (30s)
        // Envia notificação
        // Registra horário da chamada
    });
```

#### **9. PAGAMENTO**
```javascript
function updateBillSummary() {
    // Calcula subtotal
    // Adiciona taxa de serviço (10%)
    // Exibe total
}

// Confirmar pagamento
document.getElementById('confirmPaymentBtn')
    .addEventListener('click', function() {
        // Valida forma de pagamento selecionada
        // Processa pagamento
        // Exibe confirmação
    });
```

---

## 🔄 FLUXO DA APLICAÇÃO

```
1. INÍCIO
   ↓
2. VERIFICAÇÃO DE IDADE (18+)
   ↓
3. TELA DE LOGIN
   ├── CLIENTE → Interface do Cliente
   │   ├── Cardápio (buscar, filtrar, personalizar)
   │   ├── Carrinho (adicionar, remover)
   │   ├── Comanda (ver pedidos, cancelar)
   │   ├── Chamar Garçom
   │   └── Pagamento
   │
   └── STAFF → Interface Administrativa
       ├── Dashboard
       ├── Pedidos
       ├── Cardápio
       └── Reservas
```

---

## 🎯 FUNCIONALIDADES PRINCIPAIS

### ✅ **Cliente:**
- ✓ Visualizar cardápio com fotos
- ✓ Buscar pratos
- ✓ Filtrar por categoria
- ✓ Personalizar pedidos (adicionar/remover ingredientes)
- ✓ Controlar quantidade
- ✓ Ver carrinho em tempo real
- ✓ Fazer pedidos
- ✓ Cancelar pedidos (10 segundos)
- ✓ Ver comanda completa
- ✓ Chamar garçom
- ✓ Solicitar conta
- ✓ Escolher forma de pagamento

### ✅ **Administrativo:**
- ✓ Dashboard com estatísticas
- ✓ Gerenciar pedidos
- ✓ Gerenciar cardápio
- ✓ Sistema de reservas

---

## 🎨 PERSONALIZAÇÃO

### **Alterar Cores:**
Edite o arquivo `styles.css`, na seção `:root`:

```css
:root {
    --primary-color: #ea580c;     /* Cor principal */
    --secondary-color: #dc2626;   /* Cor secundária */
    --success-color: #16a34a;     /* Cor de sucesso */
}
```

### **Alterar Produtos:**
Edite o arquivo `script.js`, no array `menuItemsData`:

```javascript
const menuItemsData = [
    {
        id: 1,
        name: 'Nome do Prato',
        description: 'Descrição do prato',
        price: 49.90,
        category: 'Categoria',
        image: 'URL_da_imagem',
        available: true
    },
    // Adicione mais produtos aqui
];
```

### **Adicionar Ingredientes:**
Edite o arquivo `script.js`:

```javascript
const availableAdditions = [
    'Queijo extra',
    'Bacon',
    // Adicione mais aqui
];

const availableRemovals = [
    'Cebola',
    'Tomate',
    // Adicione mais aqui
];
```

---

## 📱 RESPONSIVIDADE

O sistema é **totalmente responsivo**:

- **Desktop:** Layout em grid com sidebar
- **Tablet:** Layout adaptado com 2 colunas
- **Mobile:** Layout de 1 coluna com navegação inferior

### Breakpoints:
```css
@media (max-width: 768px)  /* Tablet */
@media (max-width: 480px)  /* Mobile */
```

---

## 🚀 COMO USAR

1. **Abra o arquivo `index.html` no navegador**
2. **Insira sua data de nascimento** (precisa ter 18+)
3. **Escolha o tipo de acesso:**
   - **Cliente:** Informe nome e número da mesa
   - **Staff:** Informe e-mail e senha (qualquer valor para demo)

---

## 🔧 TECNOLOGIAS UTILIZADAS

- **HTML5** → Estrutura semântica
- **CSS3** → Estilização moderna (Flexbox, Grid, Variáveis)
- **JavaScript ES6+** → Lógica da aplicação (Vanilla JS)

### **Sem dependências externas!**
- ❌ Sem React
- ❌ Sem jQuery  
- ❌ Sem Bootstrap
- ✅ 100% código puro

---

## 📖 CONCEITOS APRENDIDOS

### **HTML:**
- Estrutura semântica (`<header>`, `<main>`, `<nav>`)
- Formulários (`<form>`, `<input>`, `<button>`)
- Atributos personalizados (`data-*`)
- SVG para ícones

### **CSS:**
- Variáveis CSS (`--nome-variavel`)
- Flexbox (layout flexível)
- Grid (layout em grade)
- Media queries (responsividade)
- Transições e animações
- Pseudo-classes (`:hover`, `:focus`)
- Seletores avançados

### **JavaScript:**
- Manipulação do DOM
- Event listeners
- Arrays e objetos
- Template strings
- Arrow functions
- Array methods (`.map()`, `.filter()`, `.reduce()`)
- LocalStorage (para persistência - pode adicionar)
- Manipulação de datas

---

## 🎓 PRÓXIMOS PASSOS (Melhorias)

1. **Persistência de dados** com LocalStorage
2. **Backend** com Node.js/Express
3. **Banco de dados** (MongoDB/PostgreSQL)
4. **Autenticação** real de usuários
5. **Notificações** em tempo real (WebSocket)
6. **Impressão** de comandas
7. **Relatórios** e gráficos
8. **Sistema de avaliações**

---

## 📞 ESTRUTURA DE PASTAS RECOMENDADA

```
projeto-restaurante/
├── public/
│   ├── index.html        ← Abrir este arquivo no navegador
│   ├── styles.css
│   └── script.js
├── images/              ← (opcional) Imagens locais
└── README.md            ← Esta documentação
```

---

## 💡 DICAS DE ESTUDO

1. **Leia o código na ordem:**
   - `index.html` → Veja a estrutura
   - `styles.css` → Veja a estilização  
   - `script.js` → Veja a lógica

2. **Teste modificações:**
   - Altere cores no CSS
   - Adicione novos produtos no JS
   - Modifique textos no HTML

3. **Use o DevTools do navegador:**
   - `F12` para abrir
   - Aba "Elements" para ver HTML/CSS
   - Aba "Console" para ver JavaScript
   - Aba "Network" para ver requisições

---

## 🎉 CONCLUSÃO

Este é um projeto completo que demonstra:
- ✅ HTML semântico e acessível
- ✅ CSS moderno e responsivo
- ✅ JavaScript funcional e organizado
- ✅ Boas práticas de desenvolvimento
- ✅ Experiência de usuário (UX) bem pensada

**Código 100% separado e comentado!** 🚀
