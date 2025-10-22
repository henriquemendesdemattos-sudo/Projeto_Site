document.addEventListener('DOMContentLoaded', function() {

    // Função reutilizável para simular o envio de um formulário
    function simulateFormSubmit(formId, messageText) {
        const form = document.getElementById(formId);

        if (form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault(); // Impede o recarregamento da página

                // Remove mensagens de sucesso antigas
                const oldMessage = document.getElementById('successMessage');
                if (oldMessage) {
                    oldMessage.remove();
                }

                // Cria a nova mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.id = 'successMessage';
                successMessage.className = 'alert alert-success mt-4';
                successMessage.textContent = messageText;
                
                // Insere a mensagem após o formulário
                form.parentElement.appendChild(successMessage);

                // Limpa o formulário
                form.reset();

                // Remove a mensagem após 5 segundos
                setTimeout(() => {
                    successMessage.style.transition = 'opacity 0.5s ease';
                    successMessage.style.opacity = '0';
                    setTimeout(() => successMessage.remove(), 500);
                }, 5000);
            });
        }
    }

    // Executa a simulação para a página de Contato
    simulateFormSubmit(
        'contactForm', 
        'Mensagem enviada com sucesso! Entraremos em contato em breve.'
    );

    // Executa a simulação para a página de Cadastro
    simulateFormSubmit(
        'cadastroForm', 
        'Cadastro realizado com sucesso! Em breve, você receberá um e-mail com os próximos passos.'
    );

});