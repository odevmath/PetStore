document.addEventListener("DOMContentLoaded", function () {

    // ======================================================================================
    // Constantes e Elementos do DOM
    // ======================================================================================
    const possuiTicket = document.getElementById('possuiTicket');
    const possuiGratuito = document.getElementById('ticketGratuito');
    const possuiComValor = document.getElementById('ticketComValor');
    const btnPosuiTicket = document.getElementById('btnPosuiTicket');
    const valorTotal = document.getElementById('valorTotal');

    // ======================================================================================
    //  Armazenamento e Recuperação de dados do localStorage
    // ======================================================================================
    const localValorTotalCarrinho = parseFloat(localStorage.getItem('valorTotalCarrinho'));
    localStorage.removeItem('isIsento');
    localStorage.setItem('valorTotal', localValorTotalCarrinho.toFixed(2));

    // ====================================================================================================================
    //  Funções do Ticket
    // ====================================================================================================================
    function mostrarTicketGratuito() {
        possuiTicket.classList.add("d-none");
        possuiComValor.classList.add("d-none");
        possuiGratuito.classList.remove("d-none");

        localStorage.setItem('isIsento', 'sim');
        localStorage.setItem('valorTotal', localValorTotalCarrinho.toFixed(2));
    }

    function mostrarTicketPago() {
        possuiTicket.classList.add("d-none");
        possuiComValor.classList.remove("d-none");
        possuiGratuito.classList.add("d-none");

        localStorage.setItem('isIsento', 'nao');
        const calculoValorTotalCarrinho = localValorTotalCarrinho + 10;
        localStorage.setItem('valorTotal', calculoValorTotalCarrinho.toFixed(2));
        valorTotal.innerHTML = `R$ ${calculoValorTotalCarrinho.toFixed(2).replace('.', ',')}`;
    }

    // ====================================================================================================================
    //  Chamada de Inicialização e Event Listeners
    // ====================================================================================================================
    btnPosuiTicket.addEventListener('click', function () {
        if (localValorTotalCarrinho >= 60) {
            mostrarTicketGratuito();

        } else {
            mostrarTicketPago();

        }
    });

});