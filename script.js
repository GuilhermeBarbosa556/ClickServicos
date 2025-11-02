// Dados dos serviços
const servicos = [
    {
        id: '1',
        nome: 'João Silva - Eletricista',
        categoria: 'Elétrica',
        descricao: 'Instalações elétricas residenciais e comerciais',
        avaliacao: 4.8,
        distancia: 2.5,
        preco: 80.00,
        telefone: '86994194571',
        whatsapp: '86994194571',
        email: 'guilhermebarbosa556@email.com',
    },
    {
        id: '2',
        nome: 'Maria Santos - Diarista',
        categoria: 'Limpeza',
        descricao: 'Limpeza residencial e comercial',
        avaliacao: 4.9,
        distancia: 1.2,
        preco: 60.00,
        telefone: '86994194571',
        whatsapp: '86994194571',
        email: 'guilhermebarbosa556@email.com',
    },
    {
        id: '3',
        nome: 'Carlos Oliveira - Encanador',
        categoria: 'Encanamento',
        descricao: 'Reparos hidráulicos e instalações',
        avaliacao: 4.7,
        distancia: 3.1,
        preco: 90.00,
        telefone: '+5511777777777',
        whatsapp: '+5511777777777',
        email: 'carlos.oliveira@email.com',
    },
    {
        id: '4',
        nome: 'Ana Souza - Professora de Inglês',
        categoria: 'Aulas',
        descricao: 'Aulas particulares de inglês para todos os níveis',
        avaliacao: 4.9,
        distancia: 0.8,
        preco: 75.00,
        telefone: '+5511987654321',
        whatsapp: '+5511987654321',
        email: 'ana.souza@email.com',
    },
    {
        id: '5',
        nome: 'Pedro Mendes - Pedreiro',
        categoria: 'Construção',
        descricao: 'Pequenas reformas e construções',
        avaliacao: 4.5,
        distancia: 5.0,
        preco: 120.00,
        telefone: '+5511912345678',
        whatsapp: '+5511912345678',
        email: 'pedro.mendes@email.com',
    },
];

// Dados do usuário
const usuario = {
    nome: 'Ana Oliveira',
    email: 'ana.oliveira@email.com',
    telefone: '+5511999999999',
    localizacao: 'São Paulo, SP',
    servicosContratados: 12,
    membroDesde: '2024-01-15',
};

// Estado da aplicação
let servicosFiltrados = [...servicos];
let termoBusca = '';
let ordenacaoAtual = '';
let prestadorAtual = null;

// Elementos DOM
const mainScreen = document.getElementById('main-screen');
const providerProfileScreen = document.getElementById('provider-profile-screen');
const userProfileScreen = document.getElementById('user-profile-screen');
const servicesList = document.getElementById('services-list');
const searchInput = document.getElementById('search-input');
const sortButton = document.getElementById('sort-button');
const filterButton = document.getElementById('filter-button');
const profileButton = document.getElementById('profile-button');
const backFromProvider = document.getElementById('back-from-provider');
const backFromUser = document.getElementById('back-from-user');
const editProfile = document.getElementById('edit-profile');
const logoutButton = document.getElementById('logout-button');
const sortModal = document.getElementById('sort-modal');
const closeSortModal = document.getElementById('close-sort-modal');
const filterModal = document.getElementById('filter-modal');
const closeFilterModal = document.getElementById('close-filter-modal');
const closeFilterButton = document.getElementById('close-filter-button');
const editProfileModal = document.getElementById('edit-profile-modal');
const closeEditModal = document.getElementById('close-edit-modal');
const cancelEdit = document.getElementById('cancel-edit');
const saveProfile = document.getElementById('save-profile');
const logoutModal = document.getElementById('logout-modal');
const closeLogoutModal = document.getElementById('close-logout-modal');
const cancelLogout = document.getElementById('cancel-logout');
const confirmLogout = document.getElementById('confirm-logout');
const phoneButton = document.getElementById('phone-button');
const whatsappButton = document.getElementById('whatsapp-button');
const emailButton = document.getElementById('email-button');

// Funções de contato
function fazerLigacao(telefone) {
    const numeroLimpo = telefone.replace(/[^\d+]/g, '');
    
    if (confirm(`Deseja ligar para ${numeroLimpo}?`)) {
        window.location.href = `tel:${numeroLimpo}`;
    }
}

function abrirWhatsApp(telefone, mensagem = 'Olá, gostaria de solicitar seu serviço!') {
    const numeroLimpo = telefone.replace(/[^\d+]/g, '');
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    window.open(`https://wa.me/${numeroLimpo}?text=${mensagemCodificada}`, '_blank');
}

function enviarEmail(email, assunto = 'Solicitação de Serviço', corpo = 'Olá, gostaria de solicitar seu serviço!') {
    const assuntoCodificado = encodeURIComponent(assunto);
    const corpoCodificado = encodeURIComponent(corpo);
    
    window.location.href = `mailto:${email}?subject=${assuntoCodificado}&body=${corpoCodificado}`;
}

// Inicialização
function init() {
    renderServicos();
    setupEventListeners();
}

// Renderizar serviços
function renderServicos() {
    servicesList.innerHTML = '';
    
    if (servicosFiltrados.length === 0) {
        servicesList.innerHTML = `
            <div class="empty-state">
                <span class="material-icons empty-state-icon">search_off</span>
                <p class="empty-state-text">Nenhum serviço encontrado</p>
            </div>
        `;
        return;
    }
    
    servicosFiltrados.forEach(servico => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="service-card-content">
                <div class="service-avatar">
                    <span class="material-icons">person</span>
                </div>
                <div class="service-info">
                    <h3 class="service-name">${servico.nome}</h3>
                    <p class="service-description">${servico.descricao}</p>
                    <div class="service-details">
                        <div class="service-detail rating">
                            <span class="material-icons">star</span>
                            <span>${servico.avaliacao.toFixed(1)}</span>
                        </div>
                        <div class="service-detail distance">
                            <span class="material-icons">location_on</span>
                            <span>${servico.distancia.toFixed(1)} km</span>
                        </div>
                        <div class="service-detail price">
                            <span class="material-icons">attach_money</span>
                            <span>R$${servico.preco.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <span class="material-icons" style="color: #ddd; align-self: center;">arrow_forward_ios</span>
            </div>
        `;
        
        card.addEventListener('click', () => {
            abrirPerfilPrestador(servico);
        });
        
        servicesList.appendChild(card);
    });
}

// Filtrar serviços
function filtrarServicos() {
    const busca = termoBusca.trim().toLowerCase();
    
    if (!busca) {
        servicosFiltrados = [...servicos];
    } else {
        servicosFiltrados = servicos.filter(servico => {
            return servico.nome.toLowerCase().includes(busca) ||
                   servico.descricao.toLowerCase().includes(busca) ||
                   servico.categoria.toLowerCase().includes(busca);
        });
    }
    
    aplicarOrdenacao();
    renderServicos();
}

// Aplicar ordenação
function aplicarOrdenacao() {
    if (ordenacaoAtual === 'rating') {
        servicosFiltrados.sort((a, b) => b.avaliacao - a.avaliacao);
    } else if (ordenacaoAtual === 'distance') {
        servicosFiltrados.sort((a, b) => a.distancia - b.distancia);
    } else if (ordenacaoAtual === 'price') {
        servicosFiltrados.sort((a, b) => a.preco - b.preco);
    }
}

// Abrir perfil do prestador
function abrirPerfilPrestador(servico) {
    prestadorAtual = servico;
    
    document.getElementById('provider-name').textContent = servico.nome;
    document.getElementById('provider-category').textContent = servico.categoria;
    document.getElementById('provider-rating').textContent = servico.avaliacao.toFixed(1);
    document.getElementById('provider-distance').textContent = `${servico.distancia.toFixed(1)} km`;
    document.getElementById('provider-description').textContent = servico.descricao;
    document.getElementById('provider-price').textContent = `Preço médio: R$${servico.preco.toFixed(2)}`;
    
    mainScreen.classList.add('hidden');
    providerProfileScreen.classList.remove('hidden');
}

// Configurar event listeners
function setupEventListeners() {
    // Busca
    searchInput.addEventListener('input', (e) => {
        termoBusca = e.target.value;
        filtrarServicos();
    });
    
    // Navegação
    sortButton.addEventListener('click', () => {
        sortModal.classList.remove('hidden');
    });
    
    filterButton.addEventListener('click', () => {
        filterModal.classList.remove('hidden');
    });
    
    profileButton.addEventListener('click', () => {
        document.getElementById('user-name').textContent = usuario.nome;
        document.getElementById('user-email').textContent = usuario.email;
        document.getElementById('user-phone').textContent = usuario.telefone;
        document.getElementById('user-email-value').textContent = usuario.email;
        document.getElementById('user-location').textContent = usuario.localizacao;
        
        mainScreen.classList.add('hidden');
        userProfileScreen.classList.remove('hidden');
    });
    
    backFromProvider.addEventListener('click', () => {
        providerProfileScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
    });
    
    backFromUser.addEventListener('click', () => {
        userProfileScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
    });
    
    editProfile.addEventListener('click', () => {
        document.getElementById('edit-name').value = usuario.nome;
        document.getElementById('edit-email').value = usuario.email;
        document.getElementById('edit-phone').value = usuario.telefone;
        
        editProfileModal.classList.remove('hidden');
    });
    
    logoutButton.addEventListener('click', () => {
        logoutModal.classList.remove('hidden');
    });
    
    // Botões de contato
    phoneButton.addEventListener('click', () => {
        if (prestadorAtual && prestadorAtual.telefone) {
            fazerLigacao(prestadorAtual.telefone);
        } else {
            alert('Número de telefone não disponível');
        }
    });
    
    whatsappButton.addEventListener('click', () => {
        if (prestadorAtual && prestadorAtual.whatsapp) {
            const mensagem = `Olá ${prestadorAtual.nome.split(' - ')[0]}, gostaria de solicitar seu serviço de ${prestadorAtual.categoria}!`;
            abrirWhatsApp(prestadorAtual.whatsapp, mensagem);
        } else {
            alert('Número do WhatsApp não disponível');
        }
    });
    
    emailButton.addEventListener('click', () => {
        if (prestadorAtual && prestadorAtual.email) {
            const assunto = `Solicitação de Serviço - ${prestadorAtual.categoria}`;
            const corpo = `Olá ${prestadorAtual.nome.split(' - ')[0]},\n\nGostaria de solicitar seu serviço de ${prestadorAtual.categoria}.\n\nAtenciosamente.`;
            enviarEmail(prestadorAtual.email, assunto, corpo);
        } else {
            alert('E-mail não disponível');
        }
    });
    
    // Modais
    closeSortModal.addEventListener('click', () => {
        sortModal.classList.add('hidden');
    });
    
    closeFilterModal.addEventListener('click', () => {
        filterModal.classList.add('hidden');
    });
    
    closeFilterButton.addEventListener('click', () => {
        filterModal.classList.add('hidden');
    });
    
    closeEditModal.addEventListener('click', () => {
        editProfileModal.classList.add('hidden');
    });
    
    cancelEdit.addEventListener('click', () => {
        editProfileModal.classList.add('hidden');
    });
    
    saveProfile.addEventListener('click', () => {
        usuario.nome = document.getElementById('edit-name').value;
        usuario.email = document.getElementById('edit-email').value;
        usuario.telefone = document.getElementById('edit-phone').value;
        
        document.getElementById('user-name').textContent = usuario.nome;
        document.getElementById('user-email').textContent = usuario.email;
        document.getElementById('user-phone').textContent = usuario.telefone;
        document.getElementById('user-email-value').textContent = usuario.email;
        
        editProfileModal.classList.add('hidden');
    });
    
    closeLogoutModal.addEventListener('click', () => {
        logoutModal.classList.add('hidden');
    });
    
    cancelLogout.addEventListener('click', () => {
        logoutModal.classList.add('hidden');
    });
    
    confirmLogout.addEventListener('click', () => {
        alert('Logout realizado com sucesso!');
        logoutModal.classList.add('hidden');
    });
    
    // Opções de ordenação
    document.querySelectorAll('.modal-option[data-sort]').forEach(option => {
        option.addEventListener('click', () => {
            ordenacaoAtual = option.getAttribute('data-sort');
            aplicarOrdenacao();
            renderServicos();
            sortModal.classList.add('hidden');
        });
    });
    
    // Fechar modais clicando fora
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });
}

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', init);