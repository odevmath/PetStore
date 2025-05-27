// exibe o toast no carrinho
document.addEventListener("DOMContentLoaded", function () {
    const botaoAdicionar = document.getElementById('btnAdicionarProduto');
    const toastElement = document.getElementById('toastProdutoAdicionado');

    const toast = new bootstrap.Toast(toastElement, {
        delay: 3000
    });

    botaoAdicionar.addEventListener('click', function () {
        toast.show();
    });
});

// tooltip no botão de remover produto
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
