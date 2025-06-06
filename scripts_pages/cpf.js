document.addEventListener("DOMContentLoaded", function () {

    // ======================================================================================
    // Constantes e Elementos do DOM
    // ======================================================================================
    const modalAdicionarCpf = document.getElementById('modalAdicionarCpf');
    const inputCpf = document.getElementById("inputCpf");
    const tecladoVirtualContainer = modalAdicionarCpf ? modalAdicionarCpf.querySelector('.modal-body .d-grid.gap-2') : null;
    const btnAdicionarNoModal = modalAdicionarCpf ? modalAdicionarCpf.querySelector('#btnAdicionarCpf') : null;


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
            btnAdicionarNoModal.addEventListener('click', function (event) {
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