document.addEventListener("DOMContentLoaded", function () {

    // ==========================================================
    // Variáveis Globais (acessíveis em todo o DOMContentLoaded)
    // ==========================================================
    const btnConfirmarCancelamento = document.getElementById('btnConfirmarCancelamento');
    const overlayCancelamento = document.getElementById('overlayCancelamento');
    const toastCompraCanceladaEl = document.getElementById('toastCompraCancelada'); // Existe em ambas as páginas

    // ==========================================================
    // Outros Event Listeners (que podem existir em ambas as páginas ou na index)
    // ==========================================================

    // Listener para o botão de confirmação de cancelamento (dentro do modal de cancelamento)
    if (btnConfirmarCancelamento) {
        btnConfirmarCancelamento.addEventListener('click', function () {
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalCancelarCompra'));
            if (modal) modal.hide();

            if (overlayCancelamento) {
                overlayCancelamento.classList.remove('d-none');
            }

            // Você pode adicionar uma chamada DELETE para limpar o carrinho aqui antes de redirecionar,
            // se o cancelamento implicar em limpar o carrinho no servidor.
            fetch('http://localhost:3000/carrinho', { method: 'DELETE' })
                .then(res => res.json())
                .then(data => console.log(data.mensagem))
                .catch(err => console.error('Erro ao limpar carrinho ao cancelar:', err));

            //Navegação para o início da aplicação
            setTimeout(() => {
                window.location.href = "/index.html?compraCancelada=true";
            }, 2000);
        });
    }

    // Lógica para exibir o toast de compra cancelada na página inicial (index.html)
    // Esta lógica é para a página index, mas o script.js pode ser incluído em ambas.
    // O toastCompraCanceladaEl existe no index.html e também no carrinho.html (para a mensagem ao cancelar).
    if (toastCompraCanceladaEl) {
        const urlParams = new URLSearchParams(window.location.search);
        const compraCancelada = urlParams.get('compraCancelada');

        if (compraCancelada === 'true') {
            const toast = new bootstrap.Toast(toastCompraCanceladaEl, { delay: 4000 });
            toast.show();
            // Limpa o parâmetro da URL para que o toast não apareça novamente ao recarregar
            history.replaceState({}, document.title, window.location.pathname);
        }
    }
});