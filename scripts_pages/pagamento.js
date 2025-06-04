document.addEventListener("DOMContentLoaded", function () {

    /* Valores de Local Storage */
    const valorTotalCarrinho = parseFloat( localStorage.getItem('valorTotalCarrinho') );
    const valorTotal = parseFloat( localStorage.getItem('valorTotal') );
    const isIsento = localStorage.getItem('isIsento');

    /* Adiciona os valores na tela */
    document.getElementById('valorTotalCarrinho').innerHTML = `R$ ${valorTotalCarrinho.toFixed(2).replace('.', ',')}`;
    document.getElementById('valorTotal').innerHTML = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    if(isIsento === 'sim') {
        document.getElementById('valorTicket').innerHTML = '';
        document.getElementById('isento').classList.remove("d-none");
        document.getElementById('semTicket').classList.add("d-none");

    } else if(isIsento === 'nao') {
        document.getElementById('valorTicket').innerHTML = "R$ 10,00";
        document.getElementById('isento').classList.add("d-none");
        document.getElementById('semTicket').classList.add("d-none");
    } else {
        document.getElementById('valorTicket').innerHTML = '';
        document.getElementById('isento').classList.add("d-none");
        document.
        getElementById('semTicket').classList.remove("d-none");
    }

    /* Adiciona valores Local Storage */
    const pgtoCredito = document.getElementById('credito');
    const pgtoDebito = document.getElementById('debito');
    const pgtoPix = document.getElementById('pix');
    const pgtoVoucher = document.getElementById('voucher');
    
    pgtoCredito.addEventListener('click', function () {
        localStorage.setItem('formaPagamento', 'Crédito');
    });
    pgtoDebito.addEventListener('click', function () {
        localStorage.setItem('formaPagamento', 'Débito');
    });
    pgtoPix.addEventListener('click', function () {
        localStorage.setItem('formaPagamento', 'Pix');
    });
    pgtoVoucher.addEventListener('click', function () {
        localStorage.setItem('formaPagamento', 'Voucher');
    });
});