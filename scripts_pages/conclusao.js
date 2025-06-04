document.addEventListener("DOMContentLoaded", function () {

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 4500);


    fetch('http://localhost:3000/carrinho', {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.mensagem);
            //alert(data.mensagem);
        })
        .catch(error => {
            console.error('Erro ao limpar o carrinho:', error);
        });
});