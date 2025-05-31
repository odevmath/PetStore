document.addEventListener("DOMContentLoaded", function () {

    // ==========================================================
    // Variáveis Globais (acessíveis em todo o DOMContentLoaded)
    // ==========================================================
    // Elementos do DOM (inicializados globalmente, pois já existem no HTML)
    const modalAdicionarProdutoEl = document.getElementById('modalAdicionarProduto');
    const inputCodigoProduto = document.getElementById("inputCodigoProduto"); // Agora global
    // O tecladoVirtualContainer só existe no modalAdicionarProduto
    const tecladoVirtualContainer = modalAdicionarProdutoEl ? modalAdicionarProdutoEl.querySelector('.modal-body .d-grid.gap-2') : null;
    // O btnAdicionarNoModal só existe no modalAdicionarProduto
    const btnAdicionarNoModal = modalAdicionarProdutoEl ? modalAdicionarProdutoEl.querySelector('#btnAdicionarProduto') : null;

    // Outros elementos do DOM que podem existir em ambas as páginas ou apenas em uma
    const toastProdutoAdicionadoEl = document.getElementById('toastProdutoAdicionado');
    const toastProdutoRemovidoEl = document.getElementById('toastProdutoRemovido');
    const modalConfirmarRemocaoEl = document.getElementById('modalConfirmarRemocao'); // Referência ao modal de confirmação de remoção
    const btnConfirmarRemocao = document.getElementById('btnConfirmarRemocao');
    const btnConfirmarCancelamento = document.getElementById('btnConfirmarCancelamento');
    const overlayCancelamento = document.getElementById('overlayCancelamento');
    const toastCompraCanceladaEl = document.getElementById('toastCompraCancelada'); // Existe em ambas as páginas

    // Inicialização dos Toasts Bootstrap (apenas uma vez)
    let toastAdicionado;
    if (toastProdutoAdicionadoEl) {
        toastAdicionado = new bootstrap.Toast(toastProdutoAdicionadoEl, { delay: 3000 });
    }

    let toastRemovido;
    if (toastProdutoRemovidoEl) {
        toastRemovido = new bootstrap.Toast(toastProdutoRemovidoEl, { delay: 3000 });
    }

    // ==========================================================
    // Funções Principais
    // ==========================================================

    // Carrega e exibe os produtos no carrinho
    // Esta função será chamada CONDICIONALMENTE
    function carregarCarrinho() {
        const tbody = document.getElementById("listaCarrinho");
        const carrinhoVazio = document.getElementById("carrinhoVazio");
        const carrinhoComProduto = document.getElementById("carrinhoComProduto");

        // É importante verificar se os elementos existem antes de tentar manipulá-los
        if (!tbody || !carrinhoVazio || !carrinhoComProduto) {
            console.warn("Elementos do carrinho não encontrados. Carregar carrinho abortado.");
            return; // Sai da função se os elementos não estiverem na página
        }

        fetch('http://localhost:3000/carrinho')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(produtos => {
                tbody.innerHTML = ""; // Limpa o conteúdo atual da tabela
                let total = 0;

                if (produtos.length === 0) {
                    carrinhoVazio.classList.remove("d-none");
                    carrinhoComProduto.classList.add("d-none");
                } else {
                    carrinhoVazio.classList.add("d-none");
                    carrinhoComProduto.classList.remove("d-none");

                    produtos.forEach((produto, index) => {
                        const tr = document.createElement("tr");
                        tr.innerHTML = `
                            <td>${produto.nome}</td>
                            <td>R$ ${produto.preco.toFixed(2).replace('.', ',')}</td>
                            <td>
                                <button class="btn btn-link text-danger btn-remover" data-id="${index}" data-bs-toggle="modal"
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
                alert('Erro ao carregar os produtos do carrinho. Verifique o servidor e o arquivo produtos.json.');
            });
    }

    // Adiciona um produto ao carrinho
    function adicionarProduto() {
        const codigoDigitado = inputCodigoProduto ? inputCodigoProduto.value.trim() : '';

        if (!codigoDigitado) {
            alert('Por favor, digite o código do produto.');
            return;
        }

        fetch('http://localhost:3000/produtos')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(produtos => {
                // CORREÇÃO: Usar 'p.codigo' pois seu JSON usa "codigo" e não "Número"
                const produto = produtos.find(p => p.codigo === codigoDigitado);

                if (!produto) {
                    alert('Código inválido. Tente um dos produtos disponíveis.');
                    return;
                }

                return fetch('http://localhost:3000/carrinho', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nome: produto.Descrição, // Mapeia 'Descrição' do JSON para 'nome' do backend
                        preco: parseFloat(produto.Valor) // Mapeia 'Valor' do JSON para 'preco' e converte para número
                    })
                })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    if (data?.mensagem) {
                        const modalInstance = bootstrap.Modal.getInstance(modalAdicionarProdutoEl);
                        if (modalInstance) {
                            modalInstance.hide();
                            inputCodigoProduto.value = ""; // Limpa o campo após adicionar
                        }
                        if (toastAdicionado) {
                            toastAdicionado.show();
                        }
                        carregarCarrinho(); // Recarrega o carrinho
                    }
                });
            })
            .catch(err => {
                console.error('Erro ao adicionar produto:', err);
                alert('Erro ao comunicar com o servidor ou produto não encontrado. Verifique o console.');
            });
    }

    // Implementa a lógica de exclusão de produto do carrinho
    function excluirProduto(id) {
        fetch(`http://localhost:3000/carrinho/${id}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log(data.mensagem); // Mensagem do servidor
                if (toastRemovido) {
                    toastRemovido.show(); // Exibe o toast de "removido"
                }
                carregarCarrinho(); // Recarrega o carrinho para atualizar a lista
            })
            .catch(err => {
                console.error('Erro ao remover produto:', err);
                alert('Erro ao remover produto do carrinho. Verifique o servidor.');
            });
    }

    // ==========================================================
    // Event Listeners: Anexados UMA ÚNICA VEZ no DOMContentLoaded
    // ==========================================================

    // --- LÓGICA CONDICIONAL PARA O CARRINHO ---
    // SOMENTE se os elementos do carrinho existirem na página atual, carregue o carrinho e adicione listeners específicos.
    const listaCarrinhoBody = document.getElementById('listaCarrinho'); // Elemento que só existe no carrinho.html
    const carrinhoVazioSection = document.getElementById("carrinhoVazio"); // Outro elemento que só existe no carrinho.html

    if (listaCarrinhoBody && carrinhoVazioSection) { // Se estamos no carrinho.html
        carregarCarrinho(); // Chama a função para carregar o carrinho

        // Adiciona listener para os botões de remover produtos (usando delegação de eventos na tbody)
        if (modalConfirmarRemocaoEl) { // Garante que o modal de remoção exista
            listaCarrinhoBody.addEventListener('click', function(event) {
                const removeButton = event.target.closest('.btn-remover');
                if (removeButton) {
                    const productId = removeButton.getAttribute('data-id');
                    modalConfirmarRemocaoEl.setAttribute('data-product-id-to-remove', productId);
                }
            });
        }

        // Listener para o botão "Sim, Remover" dentro do modal de confirmação
        if (btnConfirmarRemocao && modalConfirmarRemocaoEl) {
            btnConfirmarRemocao.addEventListener('click', function () {
                const modalInstance = bootstrap.Modal.getInstance(modalConfirmarRemocaoEl);
                const productIdToRemove = modalConfirmarRemocaoEl.getAttribute('data-product-id-to-remove');

                if (productIdToRemove !== null) {
                    excluirProduto(productIdToRemove);
                    if (modalInstance) modalInstance.hide();
                } else {
                    console.warn("Nenhum ID de produto para remover foi encontrado no modal de confirmação.");
                    if (modalInstance) modalInstance.hide();
                }
            });
        }

        // --- Lógica de Adicionar Produto (se o modal existir nesta página) ---
        // Estes listeners só devem ser adicionados se o modal de adicionar produto estiver presente
        if (modalAdicionarProdutoEl && inputCodigoProduto) {
            // Delegação de Eventos para o Teclado Virtual
            if (tecladoVirtualContainer) {
                tecladoVirtualContainer.addEventListener('click', function(event) {
                    const targetButton = event.target.closest('button');
                    if (!targetButton) return;

                    if (targetButton.classList.contains('btn-numero')) {
                        const numero = targetButton.getAttribute("data-numero");
                        inputCodigoProduto.value += numero;
                    } else if (targetButton.id === 'btnBackspace') {
                        inputCodigoProduto.value = inputCodigoProduto.value.slice(0, -1);
                    }
                });
            }

            // Listener para o botão "Adicionar" DENTRO DO MODAL
            if (btnAdicionarNoModal) {
                btnAdicionarNoModal.addEventListener('click', adicionarProduto);
            }

            // Lógica para o modal de adicionar produto: limpar e focar campo ao abrir
            modalAdicionarProdutoEl.addEventListener('shown.bs.modal', function () {
                inputCodigoProduto.value = "";
                inputCodigoProduto.focus();
            });
        }
    }

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