document.addEventListener("DOMContentLoaded", function () {

    carregarCarrinho();

    function carregarCarrinho() {
        fetch('http://localhost:3000/carrinho')
            .then(res => res.json())
            .then(produtos => {
                const tbody = document.getElementById("listaCarrinho");
                const carrinhoVazio = document.getElementById("carrinhoVazio");
                const carrinhoComProduto = document.getElementById("carrinhoComProduto");

                tbody.innerHTML = "";
                let total = 0;

                if (produtos.length === 0) {
                    carrinhoVazio.classList.remove("d-none");
                    carrinhoComProduto.classList.add("d-none");
                } else {
                    carrinhoVazio.classList.add("d-none");
                    carrinhoComProduto.classList.remove("d-none");

                    produtos.forEach(produto => {
                        const tr = document.createElement("tr");
                        tr.innerHTML = `
                        <td>${produto.nome}</td>
                        <td>R$ ${produto.preco.toFixed(2).replace('.', ',')}</td>
                        <td>
                            <button class="btn btn-link text-danger btn-remover" data-id="${produto.id}" data-bs-toggle="modal"
                                    data-bs-target="#modalConfirmarRemocao" title="Remover produto">
                                <i class="bi bi-trash-fill"></i>
                            </button>
                        </td>
                    `;
                        tbody.appendChild(tr);

                        total += produto.preco;
                    });

                    document.getElementById('valorTotal').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
                }
            })
            .catch(err => {
                console.error('Erro ao carregar carrinho:', err);
                alert('Erro ao carregar os produtos do carrinho.');
        });
    }

    function adicionarProduto() {
        // Pegue o valor digitado no campo de input
        const codigoDigitado = inputCodigoProduto.value.trim();
        
        // Busca todos os produtos disponíveis do servidor
        fetch('http://localhost:3000/produtos')
            .then(res => res.json())
            .then(produtos => {
                // Procura o produto correspondente ao código digitado
                 const produto = produtos.find(p => p.codigo === codigoDigitado);

                // Se o código for inválido, mostra alerta e interrompe o fluxo
                if (!produto) {
                    alert('Código inválido. Tente um dos produtos disponíveis.');
                    return;
                }

                // Envia o produto ao back-end para adicioná-lo ao carrinho
                return fetch('http://localhost:3000/carrinho', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nome: produto.Descrição, // Mapeia 'Descrição' do JSON para 'nome' do backend
                        preco: parseFloat(produto.Valor) // Mapeia 'Valor' do JSON para 'preco' e converte para número
                    })
})
            .then(res => res?.json?.())
            .then(data => {
                // Se o servidor respondeu positivamente, exibe toast e fecha modal
                if (data?.mensagem) {
                    // Fecha a modal de adicionar produto
                    const modalAdicionarProdutoEl = document.getElementById('modalAdicionarProduto');
                    const modalAdicionarProduto = bootstrap.Modal.getInstance(modalAdicionarProdutoEl);
                    if (modalAdicionarProduto) {
                        modalAdicionarProduto.hide();
                        inputCodigoProduto.value = "";
                    }

                    // Exibe o toast de produto adicionado
                    toastAdicionado.show();
                    carregarCarrinho();
                }
            })
        .catch(err => {
            // Caso aconteça algum erro na requisição, mostra erro no console e alerta
            console.error('Erro ao adicionar produto:', err);
            alert('Erro ao comunicar com o servidor.');
        });
    } // <-- Adiciona o fechamento da função adicionarProduto

    function excluirProduto() {
        // TODO: Implementar a lógica de exclusão de produto do carrinho
    }

    /* Funcionalidade Digitar Produto */
    const inputCodigoProduto = document.getElementById("inputCodigoProduto");
    const botaoBackspace = document.getElementById("btnBackspace");
    if (inputCodigoProduto) {
        const botoesNumeros = document.querySelectorAll(".btn-numero");
        botoesNumeros.forEach(botao => {
            botao.addEventListener("click", () => {
                const numero = botao.getAttribute("data-numero");
                inputCodigoProduto.value += numero;
            });
        });

        if (botaoBackspace) {
            botaoBackspace.addEventListener("click", () => {
                inputCodigoProduto.value = inputCodigoProduto.value.slice(0, -1);
            });
        }
    }

    /* Funcionalidade Digitar CPF */
    const inputCpf = document.getElementById("inputCpf");
    if (inputCpf) {
        const botoesNumeros = document.querySelectorAll(".btn-numero");
        botoesNumeros.forEach(botao => {
            botao.addEventListener("click", () => {
                const numero = botao.getAttribute("data-numero");
                if (inputCpf.value.length < 9) {
                    inputCpf.value += numero;
                }
            });
        });

        if (botaoBackspace) {
            botaoBackspace.addEventListener("click", () => {
                inputCpf.value = inputCpf.value.slice(0, -1);
            });
        }
    }

    // Toast de produto adicionado ao carrinho
    /* const botaoAdicionar = document.getElementById('btnAdicionarProduto');
    const toastProdutoAdicionadoEl = document.getElementById('toastProdutoAdicionado');
    if (botaoAdicionar && toastProdutoAdicionadoEl) {
        const toastAdicionado = new bootstrap.Toast(toastProdutoAdicionadoEl, { delay: 3000 });

        botaoAdicionar.addEventListener('click', function () {
            const modalAdicionarProdutoEl = document.getElementById('modalAdicionarProduto');
            const modalAdicionarProduto = bootstrap.Modal.getInstance(modalAdicionarProdutoEl);

            if (modalAdicionarProduto) {
                modalAdicionarProduto.hide();
                inputCodigoProduto.value = "";
            }

            toastAdicionado.show();
        });
    } */

    // Toast de produto adicionado ao carrinho
    const botaoAdicionar = document.getElementById('btnAdicionarProduto');
    const toastProdutoAdicionadoEl = document.getElementById('toastProdutoAdicionado');
    if (botaoAdicionar && toastProdutoAdicionadoEl) {
        const toastAdicionado = new bootstrap.Toast(toastProdutoAdicionadoEl, { delay: 3000 });

        botaoAdicionar.addEventListener('click', function () {
            const modalAdicionarProdutoEl = document.getElementById('modalAdicionarProduto');
            const modalAdicionarProduto = bootstrap.Modal.getInstance(modalAdicionarProdutoEl);
            const codigo = inputCodigoProduto.value.trim();// Pega o valor digitado e remove espaços

            adicionarProduto();
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
            }, 2000);
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