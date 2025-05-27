document.addEventListener("DOMContentLoaded", function () {
    // Toast de produto adicionado ao carrinho
    const botaoAdicionar = document.getElementById('btnAdicionarProduto');
    const toastProdutoAdicionadoEl = document.getElementById('toastProdutoAdicionado');

    if (botaoAdicionar && toastProdutoAdicionadoEl) {
        const toastAdicionado = new bootstrap.Toast(toastProdutoAdicionadoEl, { delay: 3000 });

        botaoAdicionar.addEventListener('click', function () {
            const modalAdicionarProdutoEl = document.getElementById('modalAdicionarProduto');
            const modalAdicionarProduto = bootstrap.Modal.getInstance(modalAdicionarProdutoEl);

            if (modalAdicionarProduto) {
                modalAdicionarProduto.hide();
            }

            toastAdicionado.show();
        });
    }

    // Toast de produto removido do carrinho
    const toastProdutoRemovidoEl = document.getElementById('toastProdutoRemovido');
    const btnConfirmarRemocao = document.getElementById('btnConfirmarRemocao');
    if (toastProdutoRemovidoEl && btnConfirmarRemocao) {
        const toastRemovido = new bootstrap.Toast(toastProdutoRemovidoEl, { delay: 3000 });
        btnConfirmarRemocao.addEventListener('click', function () {
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalConfirmarRemocao'));
            if (modal) modal.hide();
            toastRemovido.show();
        });
    }

    // Modal de confirmação de cancelamento de compra
    const btnConfirmarCancelamento = document.getElementById('btnConfirmarCancelamento');
    if (btnConfirmarCancelamento) {
        btnConfirmarCancelamento.addEventListener('click', function () {
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalCancelarCompra'));
            if (modal) modal.hide();

            // Mostra overlay com spinner e mensagem
            const overlay = document.getElementById('overlayCancelamento');
            if (overlay) overlay.classList.remove('d-none');

            // Após tempo, redireciona para a index com um parâmetro
            setTimeout(() => {
                window.location.href = "/index.html?compraCancelada=true";
            }, 2500);
        });
    }

    // Toast de compra cancelada no index
    const toastCompraCanceladaEl = document.getElementById('toastCompraCancelada');
    if (toastCompraCanceladaEl) { 
        const urlParams = new URLSearchParams(window.location.search);
        const compraCancelada = urlParams.get('compraCancelada');

        if (compraCancelada === 'true') {
            const toast = new bootstrap.Toast(toastCompraCanceladaEl, { delay: 4000 });
            toast.show();
            history.replaceState({}, document.title, window.location.pathname);
        }
    }
});

