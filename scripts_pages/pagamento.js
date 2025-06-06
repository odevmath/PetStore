document.addEventListener("DOMContentLoaded", function () {

    // ======================================================================================
    // Constantes e Elementos do DOM
    // ======================================================================================
    const valorTotalCarrinho = document.getElementById('valorTotalCarrinho');
    const valorTotal = document.getElementById('valorTotal');

    const pgtoCredito = document.getElementById('credito');
    const pgtoDebito = document.getElementById('debito');
    const pgtoPix = document.getElementById('pix');
    const pgtoVoucher = document.getElementById('voucher');

    // ======================================================================================
    //  Recuperação de dados do localStorage
    // ======================================================================================
    const localValorTotalCarrinho = parseFloat(localStorage.getItem('valorTotalCarrinho'));
    const localValorTotal = parseFloat(localStorage.getItem('valorTotal'));
    const localIsIsento = localStorage.getItem('isIsento');


    // ====================================================================================================================
    //  Funções do Pagamento
    // ====================================================================================================================
    function atualizarValoresNaTela() {
        // Valor da Compra e Valor do Carrinho
        valorTotal.innerHTML = `R$ ${localValorTotal.toFixed(2).replace('.', ',')}`;
        valorTotalCarrinho.innerHTML = `R$ ${localValorTotalCarrinho.toFixed(2).replace('.', ',')}`;

        //Lógica para o que dev motrar no valor do ticket
        if (localIsIsento === 'sim') {
            document.getElementById('valorTicket').innerHTML = '';
            document.getElementById('isento').classList.remove("d-none");
            document.getElementById('semTicket').classList.add("d-none");

        } else if (localIsIsento === 'nao') {
            document.getElementById('valorTicket').innerHTML = "R$ 10,00";
            document.getElementById('isento').classList.add("d-none");
            document.getElementById('semTicket').classList.add("d-none");
        } else {
            document.getElementById('valorTicket').innerHTML = '';
            document.getElementById('isento').classList.add("d-none");
            document.
                getElementById('semTicket').classList.remove("d-none");
        }
    }

    // ====================================================================================================================
    //  Chamada de Inicialização e Event Listeners para Armazenamento em localStorage
    // ====================================================================================================================
    atualizarValoresNaTela();

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