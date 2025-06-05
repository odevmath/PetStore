document.addEventListener("DOMContentLoaded", function () {

    const modalAdicionarCpf = document.getElementById('modalAdicionarCpf');
    const inputCpf = document.getElementById("inputCpf");
    const tecladoVirtualContainer = modalAdicionarCpf ? modalAdicionarCpf.querySelector('.modal-body .d-grid.gap-2') : null;
    const btnAdicionarNoModal = modalAdicionarCpf ? modalAdicionarCpf.querySelector('#btnAdicionarCpf') : null;

    modalAdicionarCpf.addEventListener('shown.bs.modal', function () {
        inputCpf.value = "";
        inputCpf.focus();
    });

    if (tecladoVirtualContainer) {
        tecladoVirtualContainer.addEventListener('click', function (event) {
            console.log("clicou")

            const targetButton = event.target.closest('button');
            if (!targetButton) return;

            if (targetButton.classList.contains('btn-numero')) {
                const numero = targetButton.getAttribute("data-numero");
                if (inputCpf.value.length < 11) {
                    inputCpf.value += numero;
                } else if (inputCpf.value.length == 11) {
                    btnAdicionarNoModal.classList.remove('disabled')
                }
            } else if (targetButton.id === 'btnBackspace') {
                inputCpf.value = inputCpf.value.slice(0, -1);
            }
        });
    }

    // Listener para o botão "Adicionar" DENTRO DO MODAL
    btnAdicionarNoModal.addEventListener('click', function (event) {
        window.location.href = "processando.html";
    });


});