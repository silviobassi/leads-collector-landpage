// ==================== MÁSCARA DE TELEFONE ====================
function maskPhone(value) {
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    return value;
}

// ==================== VALIDAÇÃO DO FORMULÁRIO ====================
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('leadForm');
    const whatsappInput = document.getElementById('whatsapp');

    // Aplicar máscara no campo WhatsApp
    whatsappInput.addEventListener('input', function (e) {
        e.target.value = maskPhone(e.target.value);
    });

    // Validação e envio do formulário
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Coletar dados do formulário
        const formData = {
            name: document.getElementById('name').value.trim(),
            whatsapp: document.getElementById('whatsapp').value.trim(),
            income: document.getElementById('income').value
        };

        // Validações
        if (!formData.name || formData.name.length < 3) {
            showMessage('Por favor, insira seu nome completo.', 'error');
            return;
        }

        if (!formData.whatsapp || formData.whatsapp.length < 14) {
            showMessage('Por favor, insira um número de WhatsApp válido.', 'error');
            return;
        }

        if (!formData.income) {
            showMessage('Por favor, selecione sua faixa de renda.', 'error');
            return;
        }

        // Simular envio (aqui você integraria com seu backend)
        submitLead(formData);
    });
});

// ==================== ENVIO DO LEAD ====================
function submitLead(data) {
    const submitButton = document.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;

    // Desabilitar botão e mostrar loading
    submitButton.disabled = true;
    submitButton.innerHTML = `
        <svg class="button-icon animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Enviando...
    `;

    // Simular envio para servidor (substitua pela sua API)
    setTimeout(() => {
        console.log('Lead capturado:', data);

        // Você pode enviar para seu backend aqui:
        // fetch('/api/leads', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })

        // Mostrar mensagem de sucesso
        showMessage('Obrigado! Entraremos em contato em breve.', 'success');

        // Resetar formulário
        document.getElementById('leadForm').reset();

        // Restaurar botão
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;

        // Analytics tracking (se tiver Google Analytics ou Facebook Pixel)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-XXXXXXXXX/XXXXXX',
                'value': 1.0,
                'currency': 'BRL'
            });
        }

        // Facebook Pixel (se configurado)
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead');
        }

    }, 2000);
}

// ==================== SISTEMA DE MENSAGENS ====================
function showMessage(message, type) {
    // Remover mensagem anterior se existir
    const existingMessage = document.querySelector('.alert-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Criar nova mensagem
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert-message alert-${type}`;
    alertDiv.innerHTML = `
        <div class="alert-content">
            ${type === 'success' ?
            '<svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>' :
            '<svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
        }
            <span>${message}</span>
        </div>
    `;

    // Adicionar ao formulário
    const formCard = document.querySelector('.form-card');
    formCard.insertBefore(alertDiv, formCard.firstChild);

    // Remover após 5 segundos
    setTimeout(() => {
        alertDiv.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => alertDiv.remove(), 300);
    }, 5000);
}

// ==================== ANIMAÇÃO DE SCROLL ====================
window.addEventListener('scroll', function () {
    const benefits = document.querySelectorAll('.benefit-card');

    benefits.forEach(benefit => {
        const position = benefit.getBoundingClientRect();

        if (position.top < window.innerHeight - 100) {
            benefit.style.opacity = '1';
            benefit.style.transform = 'translateY(0)';
        }
    });
});

// Inicializar estado dos cards
document.querySelectorAll('.benefit-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// ==================== CSS PARA MENSAGENS E ANIMAÇÕES ====================
const style = document.createElement('style');
style.textContent = `
    .alert-message {
        padding: 16px 20px;
        border-radius: 10px;
        margin-bottom: 24px;
        animation: slideDown 0.3s ease-out;
    }
    
    .alert-success {
        background: #d1fae5;
        border: 2px solid #10b981;
        color: #065f46;
    }
    
    .alert-error {
        background: #fee2e2;
        border: 2px solid #ef4444;
        color: #991b1b;
    }
    
    .alert-content {
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 500;
    }
    
    .alert-icon {
        width: 22px;
        height: 22px;
        flex-shrink: 0;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .animate-spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style);
