document.addEventListener("DOMContentLoaded", function () {

    // ======================================================================================
    // Constantes e Elementos do DOM
    // ======================================================================================
    const modalAdicionarCpf = document.getElementById('modalAdicionarCpf');
    const inputCpf = document.getElementById("inputCpf");
    const tecladoVirtualContainer = modalAdicionarCpf ? modalAdicionarCpf.querySelector('.modal-body .d-grid.gap-2') : null;
    const btnAdicionarNoModal = modalAdicionarCpf ? modalAdicionarCpf.querySelector('#btnAdicionarCpf') : null;

    // Função para validar cpf
    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');

        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        let digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        return digito1 === parseInt(cpf.charAt(9)) && digito2 === parseInt(cpf.charAt(10));
    }

    // ====================================================================================================================
    //  Event Listeners
    // ====================================================================================================================
    if (modalAdicionarCpf && inputCpf) {

        if (tecladoVirtualContainer) {
            tecladoVirtualContainer.addEventListener('click', function (event) {
                const targetButton = event.target.closest('button');
                if (!targetButton) return;

                //Lógica para ser obrigatório 11 digitos para liberar o botão de incluir
                if (targetButton.classList.contains('btn-numero') && inputCpf.value.length < 11) {
                    const numero = targetButton.getAttribute("data-numero");

                    inputCpf.value += numero;

                    if (inputCpf.value.length == 11) btnAdicionarNoModal.classList.remove('disabled')

                } else if (targetButton.id === 'btnBackspace') {
                    inputCpf.value = inputCpf.value.slice(0, -1);
                    btnAdicionarNoModal.classList.add('disabled')
                }
            });
        }

        // Listener para o botão "Incluir", navegação para próxima tela
        if (btnAdicionarNoModal) {
            btnAdicionarNoModal.addEventListener('click', function () {
                const cpf = inputCpf.value;

                if (!validarCPF(cpf)) {
                    const toast = new bootstrap.Toast(document.getElementById('toastCpfInvalido'));
                    toast.show();
                    return;
                }

                // Redireciona se o CPF for válido
                window.location.href = "processando.html";
            });

        }

        // Limpar e focar input ao abrir
        modalAdicionarCpf.addEventListener('shown.bs.modal', function () {
            inputCpf.value = "";
            inputCpf.focus();
        });
    }

});