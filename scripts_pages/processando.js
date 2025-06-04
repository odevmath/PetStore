document.addEventListener("DOMContentLoaded", function () {

    /* Valores de Local Storage */
    const valorTotal = localStorage.getItem('valorTotal');
    const formaPagamento = localStorage.getItem('formaPagamento');

    /* Adiciona os valores na tela */
    document.getElementById('valorTotal').innerHTML += valorTotal.replace('.',',');
    document.getElementById('formaPagamento').innerHTML += formaPagamento;

    setTimeout(() => {
        window.location.href = "conclusao.html";
    }, 3000);

});