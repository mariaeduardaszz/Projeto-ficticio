// ==========================================
// JAVASCRIPT - SISTEMA DE RESTAURANTE
// ==========================================

// ==========================================
// DADOS DO SISTEMA
// ==========================================

const menuItemsData = [
    {
        id: 1,
        name: 'Risoto de Camarão',
        description: 'Risoto cremoso com camarões frescos e açafrão',
        price: 68.90,
        category: 'Pratos Principais',
        image: 'https://images.unsplash.com/photo-1712746784068-703c0c915611?w=400',
        available: true
    },
    {
        id: 2,
        name: 'Pasta Carbonara',
        description: 'Massa italiana com molho carbonara tradicional',
        price: 52.90,
        category: 'Massas',
        image: 'https://images.unsplash.com/photo-1691689115767-1532d12c119f?w=400',
        available: true
    },
    {
        id: 3,
        name: 'Picanha Premium',
        description: 'Picanha grelhada ao ponto com acompanhamentos',
        price: 89.90,
        category: 'Pratos Principais',
        image: 'https://images.unsplash.com/photo-1693422660544-014dd9f3ef73?w=400',
        available: true
    },
    {
        id: 4,
        name: 'Salada Caesar',
        description: 'Alface romana, croutons, parmesão e molho caesar',
        price: 32.90,
        category: 'Saladas',
        image: 'https://images.unsplash.com/photo-1654458804670-2f4f26ab3154?w=400',
        available: true
    },
    {
        id: 5,
        name: 'Petit Gâteau',
        description: 'Bolo de chocolate quente com sorvete de baunilha',
        price: 28.90,
        category: 'Sobremesas',
        image: 'https://images.unsplash.com/photo-1736840334919-aac2d5af73e4?w=400',
        available: true
    },
    {
        id: 6,
        name: 'Limonada Suíça',
        description: 'Limonada fresca com leite condensado e gelo',
        price: 12.90,
        category: 'Bebidas',
        image: 'https://images.unsplash.com/photo-1690988109026-1a16b58d4bf8?w=400',
        available: true
    }
];

const availableAdditions = [
    'Queijo extra',
    'Bacon',
    'Cebola caramelizada',
    'Molho especial',
    'Pimenta',
    'Azeitonas',
    'Cogumelos'
];

const availableRemovals = [
    'Cebola',
    'Tomate',
    'Alho',
    'Pimenta',
    'Sal',
    'Temperos',
    'Molho'
];

// Estado Global da Aplicação
let appState = {
    isVerified: false,
    userType: null,
    customerName: '',
    tableNumber: '',
    cart: [],
    orders: [],
    currentItem: null,
    lastCallTime: null,
    selectedCategory: 'Todos'
};

// ==========================================
// FUNÇÕES UTILITÁRIAS
// ==========================================

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

function formatCurrency(value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
}

function showScreen(screenId) {
    hideAllScreens();
    document.getElementById(screenId).classList.remove('hidden');
}

function hideAllViews() {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
}

function showView(viewId) {
    hideAllViews();
    document.getElementById(viewId).classList.add('active');
}

// ==========================================
// VERIFICAÇÃO DE IDADE
// ==========================================

document.getElementById('ageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const birthDate = document.getElementById('birthDate').value;
    const errorElement = document.getElementById('ageError');
    
    if (!birthDate) {
        errorElement.textContent = 'Por favor, insira sua data de nascimento';
        return;
    }
    
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    let actualAge = age;
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        actualAge--;
    }
    
    if (actualAge >= 18) {
        appState.isVerified = true;
        document.getElementById('ageModal').classList.add('hidden');
        showScreen('loginScreen');
    } else {
        errorElement.textContent = 'Você precisa ter 18 anos ou mais para acessar o sistema';
    }
});

// ==========================================
// LOGIN - TABS
// ==========================================

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tabName = this.dataset.tab;
        
        // Atualizar botões
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Atualizar conteúdo
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}Tab`).classList.add('active');
    });
});

// ==========================================
// LOGIN - CLIENTE
// ==========================================

document.getElementById('customerLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    appState.customerName = document.getElementById('customerName').value;
    appState.tableNumber = document.getElementById('tableNumber').value;
    appState.userType = 'customer';
    
    document.getElementById('tableInfo').textContent = `Mesa ${appState.tableNumber}`;
    
    showScreen('customerInterface');
    loadMenu();
    showToast(`Bem-vindo! Mesa ${appState.tableNumber}`);
});

// ==========================================
// LOGIN - STAFF
// ==========================================

document.getElementById('staffLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    appState.userType = 'staff';
    showScreen('staffInterface');
    showToast('Login realizado com sucesso!');
});

// ==========================================
// NAVEGAÇÃO CLIENTE
// ==========================================

document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const viewName = this.dataset.view;
        
        // Atualizar botões
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Mostrar view
        showView(`${viewName}View`);
        
        // Atualizar conteúdo específico
        if (viewName === 'orders') {
            renderOrders();
        } else if (viewName === 'payment') {
            updateBillSummary();
        }
    });
});

// ==========================================
// CARDÁPIO
// ==========================================

function getCategories() {
    const categories = ['Todos'];
    menuItemsData.forEach(item => {
        if (!categories.includes(item.category)) {
            categories.push(item.category);
        }
    });
    return categories;
}

function loadMenu() {
    renderCategories();
    renderMenuItems();
}

function renderCategories() {
    const container = document.getElementById('categoryTabs');
    const categories = getCategories();
    
    container.innerHTML = categories.map(cat => `
        <button class="category-tab ${cat === appState.selectedCategory ? 'active' : ''}" 
                onclick="selectCategory('${cat}')">
            ${cat}
        </button>
    `).join('');
}

function selectCategory(category) {
    appState.selectedCategory = category;
    renderCategories();
    renderMenuItems();
}

function renderMenuItems() {
    const container = document.getElementById('menuItems');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    let items = menuItemsData.filter(item => item.available);
    
    // Filtrar por categoria
    if (appState.selectedCategory !== 'Todos') {
        items = items.filter(item => item.category === appState.selectedCategory);
    }
    
    // Filtrar por busca
    if (searchTerm) {
        items = items.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );
    }
    
    if (items.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-secondary);">Nenhum prato encontrado</p>';
        return;
    }
    
    container.innerHTML = items.map(item => `
        <div class="menu-item" onclick="openCustomizeModal(${item.id})">
            <img src="${item.image}" alt="${item.name}" class="menu-item-image">
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <div>
                        <h3>${item.name}</h3>
                        <span class="menu-item-category">${item.category}</span>
                    </div>
                </div>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-footer">
                    <span class="menu-item-price">${formatCurrency(item.price)}</span>
                    <button class="btn btn-sm btn-primary">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Busca
document.getElementById('searchInput').addEventListener('input', renderMenuItems);

// ==========================================
// MODAL DE CUSTOMIZAÇÃO
// ==========================================

function openCustomizeModal(itemId) {
    const item = menuItemsData.find(i => i.id === itemId);
    if (!item) return;
    
    appState.currentItem = {
        ...item,
        quantity: 1,
        additions: [],
        removals: [],
        notes: ''
    };
    
    document.getElementById('customizeItemName').textContent = item.name;
    document.getElementById('itemQuantity').textContent = '1';
    
    // Renderizar adições
    const additionsHTML = availableAdditions.map(addition => `
        <label class="checkbox-item">
            <input type="checkbox" value="${addition}" onchange="toggleAddition('${addition}')">
            <span>${addition}</span>
        </label>
    `).join('');
    document.getElementById('additionsList').innerHTML = additionsHTML;
    
    // Renderizar remoções
    const removalsHTML = availableRemovals.map(removal => `
        <label class="checkbox-item">
            <input type="checkbox" value="${removal}" onchange="toggleRemoval('${removal}')">
            <span>${removal}</span>
        </label>
    `).join('');
    document.getElementById('removalsList').innerHTML = removalsHTML;
    
    document.getElementById('specialNotes').value = '';
    
    updateCustomizeTotal();
    document.getElementById('customizeModal').classList.remove('hidden');
}

document.getElementById('closeCustomizeModal').addEventListener('click', function() {
    document.getElementById('customizeModal').classList.add('hidden');
});

document.getElementById('decreaseQty').addEventListener('click', function() {
    if (appState.currentItem.quantity > 1) {
        appState.currentItem.quantity--;
        document.getElementById('itemQuantity').textContent = appState.currentItem.quantity;
        updateCustomizeTotal();
    }
});

document.getElementById('increaseQty').addEventListener('click', function() {
    appState.currentItem.quantity++;
    document.getElementById('itemQuantity').textContent = appState.currentItem.quantity;
    updateCustomizeTotal();
});

function toggleAddition(addition) {
    const index = appState.currentItem.additions.indexOf(addition);
    if (index > -1) {
        appState.currentItem.additions.splice(index, 1);
    } else {
        appState.currentItem.additions.push(addition);
    }
    updateCustomizeTotal();
}

function toggleRemoval(removal) {
    const index = appState.currentItem.removals.indexOf(removal);
    if (index > -1) {
        appState.currentItem.removals.splice(index, 1);
    } else {
        appState.currentItem.removals.push(removal);
    }
}

function updateCustomizeTotal() {
    const basePrice = appState.currentItem.price;
    const additionsPrice = appState.currentItem.additions.length * 5;
    const total = (basePrice + additionsPrice) * appState.currentItem.quantity;
    
    document.getElementById('customizeTotal').textContent = formatCurrency(total);
}

document.getElementById('addToCartBtn').addEventListener('click', function() {
    appState.currentItem.notes = document.getElementById('specialNotes').value;
    
    appState.cart.push({
        id: Date.now(),
        itemId: appState.currentItem.id,
        name: appState.currentItem.name,
        price: appState.currentItem.price,
        quantity: appState.currentItem.quantity,
        additions: [...appState.currentItem.additions],
        removals: [...appState.currentItem.removals],
        notes: appState.currentItem.notes
    });
    
    updateCartDisplay();
    document.getElementById('customizeModal').classList.add('hidden');
    showToast(`${appState.currentItem.name} adicionado ao carrinho!`);
});

// ==========================================
// CARRINHO
// ==========================================

function updateCartDisplay() {
    const itemCount = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = appState.cart.reduce((sum, item) => {
        const additionsPrice = item.additions.length * 5;
        return sum + (item.price + additionsPrice) * item.quantity;
    }, 0);
    
    // Atualizar resumo no topo
    if (itemCount > 0) {
        document.getElementById('cartSummary').classList.remove('hidden');
        document.getElementById('cartCount').textContent = `${itemCount} ${itemCount === 1 ? 'item' : 'itens'} no carrinho`;
        document.getElementById('cartTotal').textContent = formatCurrency(total);
        
        // Atualizar carrinho fixo
        document.getElementById('cartFixed').classList.remove('hidden');
        document.getElementById('cartFixedCount').textContent = `${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`;
        document.getElementById('cartFixedTotal').textContent = formatCurrency(total);
        
        // Badge de pedidos
        document.getElementById('orderBadge').classList.remove('hidden');
        document.getElementById('orderBadge').textContent = appState.orders.filter(o => o.status !== 'cancelled').length;
    } else {
        document.getElementById('cartSummary').classList.add('hidden');
        document.getElementById('cartFixed').classList.add('hidden');
    }
}

document.getElementById('makeOrderBtn').addEventListener('click', function() {
    if (appState.cart.length === 0) {
        showToast('Carrinho vazio', 'error');
        return;
    }
    
    const total = appState.cart.reduce((sum, item) => {
        const additionsPrice = item.additions.length * 5;
        return sum + (item.price + additionsPrice) * item.quantity;
    }, 0);
    
    const order = {
        id: (1000 + appState.orders.length + 1).toString(),
        items: [...appState.cart],
        total: total,
        status: 'pending',
        timestamp: new Date(),
        canCancel: true
    };
    
    appState.orders.push(order);
    appState.cart = [];
    
    updateCartDisplay();
    showToast('Pedido enviado para a cozinha!', 'success');
    
    // Simular confirmação após 10 segundos
    setTimeout(() => {
        const orderIndex = appState.orders.findIndex(o => o.id === order.id);
        if (orderIndex > -1) {
            appState.orders[orderIndex].status = 'confirmed';
            appState.orders[orderIndex].canCancel = false;
            showToast('Pedido confirmado! Não pode mais ser cancelado.', 'success');
        }
    }, 10000);
    
    // Ir para aba de pedidos
    document.querySelector('[data-view="orders"]').click();
});

// ==========================================
// PEDIDOS
// ==========================================

function getStatusInfo(status) {
    const statusMap = {
        pending: { label: 'Aguardando Confirmação', class: 'status-pending', description: 'Seu pedido está sendo processado' },
        confirmed: { label: 'Confirmado', class: 'status-confirmed', description: 'Pedido confirmado pela cozinha' },
        preparing: { label: 'Em Preparo', class: 'status-preparing', description: 'Seu pedido está sendo preparado' },
        ready: { label: 'Pronto', class: 'status-ready', description: 'Seu pedido está pronto!' },
        cancelled: { label: 'Cancelado', class: 'status-cancelled', description: 'Pedido cancelado' }
    };
    return statusMap[status];
}

function renderOrders() {
    const container = document.getElementById('ordersList');
    const activeOrders = appState.orders.filter(o => o.status !== 'cancelled');
    
    if (activeOrders.length === 0) {
        container.innerHTML = `
            <div class="info-box">
                Você ainda não fez nenhum pedido. Explore nosso cardápio e faça seu primeiro pedido!
            </div>
        `;
        return;
    }
    
    const totalAmount = activeOrders.reduce((sum, order) => sum + order.total, 0);
    
    const billSummaryHTML = `
        <div class="order-card" style="background: linear-gradient(135deg, #fff7ed 0%, #fef2f2 100%);">
            <h3>Resumo da Conta</h3>
            <div style="margin-top: 1rem;">
                <div class="bill-row">
                    <span>Subtotal</span>
                    <span>${formatCurrency(totalAmount)}</span>
                </div>
                <div class="bill-row">
                    <span>Taxa de serviço (10%)</span>
                    <span>${formatCurrency(totalAmount * 0.1)}</span>
                </div>
                <div class="bill-row bill-total">
                    <span>Total</span>
                    <span>${formatCurrency(totalAmount * 1.1)}</span>
                </div>
            </div>
        </div>
    `;
    
    const ordersHTML = appState.orders.map(order => {
        const statusInfo = getStatusInfo(order.status);
        const time = order.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        return `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <h3>Pedido #${order.id}</h3>
                        <p style="color: var(--text-secondary); font-size: var(--font-sm);">${time}</p>
                    </div>
                    <div class="order-status ${statusInfo.class}">
                        ${statusInfo.label}
                    </div>
                </div>
                
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <span>${item.quantity}x ${item.name}</span>
                            <span>${formatCurrency((item.price + item.additions.length * 5) * item.quantity)}</span>
                        </div>
                        ${item.additions.length > 0 ? `
                            <div class="order-item-customization">
                                <span style="color: var(--success-color);">+</span> ${item.additions.join(', ')}
                            </div>
                        ` : ''}
                        ${item.removals.length > 0 ? `
                            <div class="order-item-customization">
                                <span style="color: var(--danger-color);">-</span> ${item.removals.join(', ')}
                            </div>
                        ` : ''}
                        ${item.notes ? `
                            <div class="order-item-customization">
                                <em>"${item.notes}"</em>
                            </div>
                        ` : ''}
                    `).join('')}
                </div>
                
                <div class="order-total">
                    <span>Total</span>
                    <span>${formatCurrency(order.total)}</span>
                </div>
                
                <div class="order-description">
                    ${statusInfo.description}
                </div>
                
                ${order.canCancel && order.status === 'pending' ? `
                    <button class="btn btn-danger" onclick="cancelOrder('${order.id}')">
                        Cancelar Pedido
                    </button>
                    <p style="text-align: center; font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem;">
                        Você só pode cancelar pedidos que ainda não foram confirmados
                    </p>
                ` : ''}
                
                ${!order.canCancel && order.status !== 'cancelled' ? `
                    <div class="info-box">
                        Este pedido já foi confirmado e não pode mais ser cancelado
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
    
    container.innerHTML = billSummaryHTML + ordersHTML;
}

function cancelOrder(orderId) {
    const orderIndex = appState.orders.findIndex(o => o.id === orderId);
    if (orderIndex > -1) {
        const order = appState.orders[orderIndex];
        if (order.canCancel && order.status === 'pending') {
            appState.orders[orderIndex].status = 'cancelled';
            renderOrders();
            showToast('Pedido cancelado com sucesso', 'success');
        } else {
            showToast('Este pedido não pode mais ser cancelado', 'error');
        }
    }
}

// ==========================================
// CHAMAR GARÇOM
// ==========================================

document.getElementById('callWaiterBtn').addEventListener('click', function() {
    const now = Date.now();
    
    if (appState.lastCallTime && (now - appState.lastCallTime) < 30000) {
        showToast('Aguarde alguns instantes antes de chamar novamente', 'error');
        return;
    }
    
    appState.lastCallTime = now;
    showToast('Garçom chamado! Ele virá atender você em breve.', 'success');
    
    const lastCallDiv = document.getElementById('lastCallInfo');
    lastCallDiv.classList.remove('hidden');
    lastCallDiv.textContent = `Última chamada: ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    
    // Desabilitar botão temporariamente
    this.disabled = true;
    setTimeout(() => {
        this.disabled = false;
    }, 30000);
});

document.querySelectorAll('.btn-quick').forEach(btn => {
    btn.addEventListener('click', function() {
        const request = this.dataset.request;
        showToast(`Solicitação enviada: ${request}`, 'success');
    });
});

// Atualizar info do garçom
document.getElementById('waiterInfo').textContent = `Mesa ${appState.tableNumber || '-'} • Atendente: Carlos Silva`;

// ==========================================
// PAGAMENTO
// ==========================================

function updateBillSummary() {
    const activeOrders = appState.orders.filter(o => o.status !== 'cancelled');
    const subtotal = activeOrders.reduce((sum, order) => sum + order.total, 0);
    const service = subtotal * 0.1;
    const total = subtotal + service;
    
    document.getElementById('billSubtotal').textContent = formatCurrency(subtotal);
    document.getElementById('billService').textContent = formatCurrency(service);
    document.getElementById('billTotal').textContent = formatCurrency(total);
}

document.querySelectorAll('.payment-option').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.payment-option').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
    });
});

document.getElementById('confirmPaymentBtn').addEventListener('click', function() {
    const selected = document.querySelector('.payment-option.selected');
    
    if (!selected) {
        showToast('Selecione uma forma de pagamento', 'error');
        return;
    }
    
    const activeOrders = appState.orders.filter(o => o.status !== 'cancelled');
    if (activeOrders.length === 0) {
        showToast('Nenhum pedido para pagar', 'error');
        return;
    }
    
    showToast('Pagamento processado com sucesso!', 'success');
    
    setTimeout(() => {
        showToast('Obrigado pela preferência! Volte sempre!', 'success');
    }, 1500);
});

// ==========================================
// LOGOUT
// ==========================================

document.getElementById('logoutBtn').addEventListener('click', function() {
    if (confirm('Deseja realmente sair?')) {
        appState = {
            isVerified: true,
            userType: null,
            customerName: '',
            tableNumber: '',
            cart: [],
            orders: [],
            currentItem: null,
            lastCallTime: null,
            selectedCategory: 'Todos'
        };
        
        showScreen('loginScreen');
        showToast('Você saiu do sistema', 'success');
    }
});

document.getElementById('staffLogoutBtn').addEventListener('click', function() {
    if (confirm('Deseja realmente sair?')) {
        appState.userType = null;
        showScreen('loginScreen');
        showToast('Você saiu do sistema', 'success');
    }
});

// ==========================================
// INTERFACE ADMINISTRATIVA
// ==========================================

document.querySelectorAll('.staff-nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const section = this.dataset.section;
        
        document.querySelectorAll('.staff-nav-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        document.querySelectorAll('.staff-section').forEach(s => s.classList.remove('active'));
        document.getElementById(`staff${section.charAt(0).toUpperCase() + section.slice(1)}`).classList.add('active');
    });
});

// ==========================================
// INICIALIZAÇÃO
// ==========================================

// Verificar se já está verificado (para desenvolvimento)
if (!appState.isVerified) {
    document.getElementById('ageModal').classList.remove('hidden');
}
