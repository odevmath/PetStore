document.addEventListener("DOMContentLoaded", function () {

    // ======================================================================================
    // Constantes e Elementos do DOM
    // ======================================================================================
    const valorTotal = document.getElementById('valorTotal');
    const formaPagamento = document.getElementById('formaPagamento');

    // ======================================================================================
    //  Recuperação de dados do localStorage
    // ======================================================================================
    const localValorTotal = localStorage.getItem('valorTotal');
    const localFormaPagamento = localStorage.getItem('formaPagamento');

    // ======================================================================================
    //  Atualização de valores da tela
    // ======================================================================================
    valorTotal.innerHTML += localValorTotal.replace('.',',');
    formaPagamento.innerHTML += localFormaPagamento;

    // ======================================================================================
    //  Navegação para próxima tela
    // ======================================================================================
    setTimeout(() => {
        window.location.href = "conclusao.html";
    }, 3000);

});