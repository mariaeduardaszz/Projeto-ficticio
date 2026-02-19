# 🔍 EXEMPLOS SEPARADOS - HTML, CSS, JAVASCRIPT

Este arquivo mostra exemplos de como cada tecnologia funciona isoladamente.

---

## 1️⃣ EXEMPLO: BOTÃO SIMPLES

### **HTML (Estrutura)**
```html
<button id="meuBotao" class="btn btn-primary">
    Clique Aqui
</button>
```
**O que faz:** Cria um botão na página

---

### **CSS (Aparência)**
```css
.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.btn-primary {
    background-color: #ea580c;
    color: white;
}

.btn-primary:hover {
    background-color: #c2410c;
}
```
**O que faz:** 
- `.btn` = estilo base do botão
- `.btn-primary` = cor laranja
- `:hover` = escurece quando passa o mouse

---

### **JAVASCRIPT (Comportamento)**
```javascript
document.getElementById('meuBotao')
    .addEventListener('click', function() {
        alert('Botão clicado!');
    });
```
**O que faz:** Quando clicar no botão, mostra um alerta

---

## 2️⃣ EXEMPLO: CARD DE PRODUTO

### **HTML**
```html
<div class="product-card">
    <img src="imagem.jpg" alt="Pizza">
    <h3>Pizza Margherita</h3>
    <p class="price">R$ 45,90</p>
    <button class="btn-add">Adicionar</button>
</div>
```

### **CSS**
```css
.product-card {
    background-color: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.product-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
}

.product-card h3 {
    font-size: 1.25rem;
    margin: 10px 0;
}

.price {
    color: #16a34a;
    font-size: 1.5rem;
    font-weight: bold;
}
```

### **JAVASCRIPT**
```javascript
document.querySelector('.btn-add')
    .addEventListener('click', function() {
        const productName = document.querySelector('h3').textContent;
        const price = document.querySelector('.price').textContent;
        
        console.log('Adicionado:', productName, price);
    });
```

---

## 3️⃣ EXEMPLO: FORMULÁRIO DE LOGIN

### **HTML**
```html
<form id="loginForm">
    <div class="form-group">
        <label for="email">E-mail:</label>
        <input type="email" id="email" required>
    </div>
    
    <div class="form-group">
        <label for="senha">Senha:</label>
        <input type="password" id="senha" required>
    </div>
    
    <button type="submit">Entrar</button>
    
    <p id="mensagem"></p>
</form>
```

### **CSS**
```css
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
}

.form-group input:focus {
    outline: none;
    border-color: #ea580c;
}

#mensagem {
    color: red;
    font-size: 14px;
}
```

### **JAVASCRIPT**
```javascript
document.getElementById('loginForm')
    .addEventListener('submit', function(e) {
        e.preventDefault(); // Impede envio do formulário
        
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        
        if (email === 'admin@restaurante.com' && senha === '123456') {
            document.getElementById('mensagem').textContent = 'Login com sucesso!';
            document.getElementById('mensagem').style.color = 'green';
        } else {
            document.getElementById('mensagem').textContent = 'E-mail ou senha incorretos';
            document.getElementById('mensagem').style.color = 'red';
        }
    });
```

---

## 4️⃣ EXEMPLO: LISTA DINÂMICA (CARRINHO)

### **HTML**
```html
<div id="carrinho">
    <h2>Meu Carrinho</h2>
    <ul id="listaItens"></ul>
    <p>Total: <span id="total">R$ 0,00</span></p>
</div>

<button onclick="adicionarItem('Pizza', 45.90)">Adicionar Pizza</button>
<button onclick="adicionarItem('Refrigerante', 8.90)">Adicionar Refrigerante</button>
```

### **CSS**
```css
#carrinho {
    background-color: #f9fafb;
    padding: 20px;
    border-radius: 12px;
}

#listaItens {
    list-style: none;
    padding: 0;
}

#listaItens li {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: white;
    margin-bottom: 10px;
    border-radius: 6px;
}

#total {
    font-size: 1.5rem;
    font-weight: bold;
    color: #16a34a;
}
```

### **JAVASCRIPT**
```javascript
// Array para guardar os itens
let carrinho = [];

function adicionarItem(nome, preco) {
    // Adicionar item ao array
    carrinho.push({ nome: nome, preco: preco });
    
    // Atualizar a interface
    renderizarCarrinho();
}

function renderizarCarrinho() {
    const lista = document.getElementById('listaItens');
    
    // Limpar lista
    lista.innerHTML = '';
    
    // Criar HTML para cada item
    carrinho.forEach(function(item, index) {
        lista.innerHTML += `
            <li>
                <span>${item.nome}</span>
                <span>R$ ${item.preco.toFixed(2)}</span>
            </li>
        `;
    });
    
    // Calcular total
    const total = carrinho.reduce((soma, item) => soma + item.preco, 0);
    document.getElementById('total').textContent = `R$ ${total.toFixed(2)}`;
}
```

---

## 5️⃣ EXEMPLO: MODAL (POPUP)

### **HTML**
```html
<button onclick="abrirModal()">Abrir Modal</button>

<div id="modal" class="modal hidden">
    <div class="modal-content">
        <span class="close" onclick="fecharModal()">&times;</span>
        <h2>Título do Modal</h2>
        <p>Conteúdo do modal aqui...</p>
    </div>
</div>
```

### **CSS**
```css
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal.hidden {
    display: none;
}

.modal-content {
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    position: relative;
}

.close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 30px;
    cursor: pointer;
}

.close:hover {
    color: red;
}
```

### **JAVASCRIPT**
```javascript
function abrirModal() {
    document.getElementById('modal').classList.remove('hidden');
}

function fecharModal() {
    document.getElementById('modal').classList.add('hidden');
}

// Fechar modal ao clicar fora dele
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) {
        fecharModal();
    }
});
```

---

## 6️⃣ EXEMPLO: BUSCA/FILTRO

### **HTML**
```html
<input type="text" id="campoBusca" placeholder="Buscar produto...">

<div id="produtos">
    <div class="produto" data-nome="pizza margherita">
        <h3>Pizza Margherita</h3>
    </div>
    <div class="produto" data-nome="hamburguer">
        <h3>Hamburguer</h3>
    </div>
    <div class="produto" data-nome="salada caesar">
        <h3>Salada Caesar</h3>
    </div>
</div>
```

### **CSS**
```css
#campoBusca {
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 16px;
}

#campoBusca:focus {
    border-color: #ea580c;
    outline: none;
}

.produto {
    padding: 15px;
    background-color: white;
    margin-bottom: 10px;
    border-radius: 8px;
}

.produto.hidden {
    display: none;
}
```

### **JAVASCRIPT**
```javascript
document.getElementById('campoBusca')
    .addEventListener('input', function() {
        const termo = this.value.toLowerCase();
        const produtos = document.querySelectorAll('.produto');
        
        produtos.forEach(function(produto) {
            const nome = produto.dataset.nome;
            
            if (nome.includes(termo)) {
                produto.classList.remove('hidden');
            } else {
                produto.classList.add('hidden');
            }
        });
    });
```

---

## 7️⃣ EXEMPLO: TABS (ABAS)

### **HTML**
```html
<div class="tabs">
    <button class="tab-btn active" onclick="mostrarAba('pratos')">Pratos</button>
    <button class="tab-btn" onclick="mostrarAba('bebidas')">Bebidas</button>
    <button class="tab-btn" onclick="mostrarAba('sobremesas')">Sobremesas</button>
</div>

<div id="pratos" class="tab-content active">
    <h3>Pratos Principais</h3>
    <p>Conteúdo de pratos...</p>
</div>

<div id="bebidas" class="tab-content">
    <h3>Bebidas</h3>
    <p>Conteúdo de bebidas...</p>
</div>

<div id="sobremesas" class="tab-content">
    <h3>Sobremesas</h3>
    <p>Conteúdo de sobremesas...</p>
</div>
```

### **CSS**
```css
.tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.tab-btn {
    padding: 10px 20px;
    background-color: #e5e7eb;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.tab-btn.active {
    background-color: #ea580c;
    color: white;
}

.tab-content {
    display: none;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
}

.tab-content.active {
    display: block;
}
```

### **JAVASCRIPT**
```javascript
function mostrarAba(abaId) {
    // Esconder todas as abas
    document.querySelectorAll('.tab-content').forEach(function(aba) {
        aba.classList.remove('active');
    });
    
    // Remover active dos botões
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    
    // Mostrar aba selecionada
    document.getElementById(abaId).classList.add('active');
    
    // Ativar botão correspondente
    event.target.classList.add('active');
}
```

---

## 🎯 RESUMO DAS RESPONSABILIDADES

| Tecnologia | Responsabilidade | Exemplo |
|------------|------------------|---------|
| **HTML** | Estrutura | `<button>`, `<div>`, `<form>` |
| **CSS** | Aparência | cores, tamanhos, posicionamento |
| **JavaScript** | Comportamento | cliques, validações, cálculos |

---

## 💡 DICA IMPORTANTE

**NO PROJETO REAL:**
- Todo o HTML está em `index.html`
- Todo o CSS está em `styles.css`
- Todo o JavaScript está em `script.js`

**Os arquivos estão separados, mas trabalham juntos!**

```
index.html  ────────> Carrega ────────> styles.css
     │                                        │
     └────────> Carrega ────────> script.js  │
                                              │
                                              ▼
                                    SITE FUNCIONANDO
```
