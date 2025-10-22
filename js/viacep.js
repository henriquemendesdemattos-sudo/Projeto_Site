// Aguarda o documento carregar para garantir que todos os elementos existam
document.addEventListener('DOMContentLoaded', (event) => {

    const cepInput = document.getElementById('cep');
    if (!cepInput) return; // Não faz nada se o campo CEP não estiver na página

    // Cria dinamicamente um elemento para exibir erros
    const cepErrorDiv = document.createElement('div');
    cepErrorDiv.id = 'cep-error-message';
    cepErrorDiv.style.color = '#dc3545'; // Cor de perigo do Bootstrap
    cepErrorDiv.style.fontSize = '0.875em';
    cepErrorDiv.style.height = '1.2em';
    cepErrorDiv.style.marginTop = '0.25rem';
    
    // Insere a div de erro logo após o campo CEP
    cepInput.parentNode.insertBefore(cepErrorDiv, cepInput.nextSibling);

    // Função para mostrar o erro por alguns segundos
    let errorTimeout;
    function showError(message) {
        cepErrorDiv.textContent = message;
        
        // Limpa o timer de erro anterior, se houver
        clearTimeout(errorTimeout);

        // Define um novo timer para limpar a mensagem
        errorTimeout = setTimeout(() => {
            cepErrorDiv.textContent = '';
        }, 3000); // A mensagem desaparece após 3 segundos
    }

    // Função para limpar os campos de endereço
    function clearAddressFields() {
        document.getElementById('rua').value = '';
        document.getElementById('bairro').value = '';
        document.getElementById('cidade').value = '';
        document.getElementById('estado').value = '';
        document.getElementById('complemento').value = '';
    }

    // Adiciona o evento "blur" (quando o usuário clica fora do campo)
    cepInput.addEventListener('blur', function() {
        const cep = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        
        // Limpa a mensagem de erro anterior
        cepErrorDiv.textContent = '';
        clearTimeout(errorTimeout);

        if (cep.length !== 8) {
            if (this.value.length > 0) { // Só mostra erro se algo foi digitado
                showError('CEP deve ter 8 dígitos.');
            }
            clearAddressFields();
            return; // CEP inválido
        }

        // Mostra um "carregando" enquanto busca
        document.getElementById('rua').value = 'Buscando...';
        document.getElementById('bairro').value = 'Buscando...';
        document.getElementById('cidade').value = 'Buscando...';
        document.getElementById('estado').value = 'Buscando...';

        // Faz a chamada para a API ViaCEP
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    // CEP não encontrado
                    clearAddressFields();
                    showError('CEP não encontrado.');
                } else {
                    // Preenche os campos com os dados
                    document.getElementById('rua').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                    
                    // Foca no campo "número" para o usuário continuar
                    document.getElementById('numero').focus();
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o CEP:', error);
                clearAddressFields();
                showError('Erro ao buscar CEP. Tente novamente.');
            });
    });
});