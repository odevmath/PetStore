document.addEventListener("DOMContentLoaded", function () {

    // ======================================================================================
    //  Limpa informações do Carrinho e localStorage
    // ======================================================================================
    fetch('http://localhost:3000/carrinho', {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.mensagem);
        })
        .catch(error => {
            console.error('Erro ao limpar o carrinho:', error);
        });

    localStorage.clear(); //limpa as informações salvas no navegador

    // ======================================================================================
    //  Navegação para o início da aplicação
    // ======================================================================================
    setTimeout(() => {
        window.location.href = "../index.html";
    }, 4500);
    
});