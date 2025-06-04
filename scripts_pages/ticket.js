document.addEventListener("DOMContentLoaded", function () {

    const valorTotalCarrinho = parseFloat( localStorage.getItem('valorTotalCarrinho') );

    const possuiTicket = document.getElementById('possuiTicket');
    const possuiGratuito = document.getElementById('ticketGratuito');
    const possuiComValor = document.getElementById('ticketComValor');
    const btnPosuiTicket = document.getElementById('btnPosuiTicket');

    localStorage.removeItem('isIsento');
    localStorage.setItem('valorTotal', valorTotalCarrinho.toFixed(2));
    btnPosuiTicket.addEventListener('click', function () {
        if(valorTotalCarrinho <= 60) {
            possuiTicket.classList.add("d-none");
            possuiComValor.classList.add("d-none");
            possuiGratuito.classList.remove("d-none");

            localStorage.setItem('isIsento', 'sim');
            localStorage.setItem('valorTotal', valorTotalCarrinho.toFixed(2));

        } else {
            possuiTicket.classList.add("d-none");
            possuiComValor.classList.remove("d-none");
            possuiGratuito.classList.add("d-none");

            localStorage.setItem('isIsento', 'nao');

            const valorTotal = valorTotalCarrinho + 10;
            localStorage.setItem('valorTotal', valorTotal.toFixed(2));
            document.getElementById('valorTotal').innerHTML = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
        }
    });

});