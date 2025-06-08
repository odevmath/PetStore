# 🐾 PETSTORE - Aplicação web para autoatendimento

> Projeto acadêmico desenvolvido com o objetivo de propor uma solução web dinâmica, funcional e intuitiva voltada para o autoatendimento em lojas do setor pet. Inspirado na Cobasi, o sistema foca na experiência do usuário e otimização do processo de pagamento.

---


## 📑 Sumário

- [🌟 Visão Geral](#-visão-geral)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [✅ Funcionalidades Implementadas](#-funcionalidades-implementadas)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [🚀 Como Usar o Sistema](#-como-usar-o-sistema)
- [📋 Requisitos](#-requisitos)
- [👨‍💻 Autores](#-autores)
- [📄 Licença](#-licença)

---

## 🌟 Visão Geral

O PETSTORE oferece uma experiência de compra intuitiva, desde a seleção de produtos até a finalização do pedido. O projeto demonstra a integração entre um frontend dinâmico (HTML, CSS, JavaScript puro) e um backend robusto (Node.js com Express) para simular um fluxo de compra completo, incluindo gerenciamento de produtos e carrinho.

## 📁 Estrutura do Projeto

A estrutura do projeto está organizada para separar claramente as responsabilidades do frontend e do backend, além de recursos estáticos:

```
PetStore/
├── index.html
├── assets/
│   ├── css/
│   ├── img/
│   └── fonts/
├── backend/
│   ├── data/
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── pages/
│   ├── carrinho.html
│   ├── conclusao.html
│   ├── cpf.html
│   ├── pagamento.html
│   ├── processando.html
│   └── ticket.html
├── scripts_pages/
│   ├── carrinho.js
│   ├── conclusao.js
│   ├── cpf.js
│   ├── pagamento.js
│   ├── processando.js
│   └── ticket.js
├── script.js
├── styles.css
├── README.md
└── .gitignore
```

## ✅ Funcionalidades Implementadas

- **Página Inicial (`index.html`):** Interface de boas-vindas e tela principal para exibição e adição de produtos ao carrinho.
- **Gestão de Produtos:** Carregamento dinâmico de produtos a partir de `backend/data/produtos.json`.
- **Carrinho de Compras (`pages/carrinho.html`):**
  - Exibe produtos adicionados com valores individuais e cálculo automático do valor total.
  - Permite adicionar e remover produtos do carrinho.
  - O valor total do carrinho é transportado dinamicamente para a página de pagamento.
- **Backend Robusto (Node.js/Express):** Gerencia as operações do carrinho (adicionar, listar, remover por índice, esvaziar) e a entrega de dados de produtos.
- **Fluxo de Finalização de Compra:** Uma sequência de páginas para simular o checkout:
  - `pages/cpf.html`: Inserção do CPF com suporte para 11 dígitos.
  - `pages/pagamento.html`: Exibição do valor total do carrinho e simulação de métodos de pagamento.
  - `pages/processando.html`: Tela de transição para simular o processamento.
  - `pages/conclusao.html`: Mensagem final de agradecimento e confirmação.
- **Lógica de Ticket de Estacionamento:** Aplicação da lógica de ticket se informado, com isenção para compras acima de R$ 60,00.
- **Controle de Fluxo:** Botões de retorno/aborto em cada etapa.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (DOM, eventos, lógica condicional), Bootstrap
- **Backend:** Node.js, Express.js, `cors` (para comunicação frontend-backend), `fs` e `path` (para manipulação de arquivos).
- **Ferramentas:** Figma (protótipo de telas), Editor de código VSCode.

## 🚀 Como Usar o Sistema

Para rodar o PETSTORE localmente e testar todas as funcionalidades, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/en/download/) instalado em sua máquina. O Node.js já vem com o `npm` (Node Package Manager).

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/en/download/) instalado em sua máquina. O Node.js já vem com o `npm` (Node Package Manager).

### Instalação e Execução

1.  **Clone o repositório:**
    Se você ainda não clonou o projeto, faça-o em seu terminal:

    ```bash
    git clone [https://github.com/odevmath/PetStore.git](https://github.com/odevmath/PetStore.git)
    cd PetStore
    ```

2.  **Instale as dependências do Backend:**
    O backend utiliza pacotes Node.js (Express, CORS). Navegue até a pasta `backend` e instale as dependências:

    ```bash
    cd backend
    npm install
    npm install express cors
    ```

    Após a instalação, você verá uma pasta `node_modules/` criada dentro de `backend/`.

3.  **Inicie o Servidor Backend:**
    Com as dependências instaladas, você pode iniciar o servidor Node.js. Certifique-se de estar dentro da pasta `backend`:

    ```bash
    node server.js
    ```

    Você deverá ver a mensagem `Servidor rodando em http://localhost:3000` no seu terminal. Mantenha este terminal aberto enquanto estiver usando o sistema.

4.  **Acesse o Frontend:**
    Abra a página principal do projeto em seu navegador. Você pode fazer isso de duas maneiras:

    - Navegue até a pasta `PetStore` em seu explorador de arquivos e clique duas vezes em `index.html`.
    - Ou, no seu navegador, digite o caminho completo para o arquivo `index.html` (ex: `file:///C:/Users/SeuUsuario/Desktop/PetStore/index.html`).

    **Recomendação:** Para uma melhor experiência de desenvolvimento, é altamente recomendado usar uma extensão de servidor local para VS Code (como "Live Server") ou similar para servir seus arquivos HTML. Isso evita problemas de CORS em algumas situações, especialmente ao acessar arquivos localmente.

### Navegação de Páginas e Fluxo do Sistema

O sistema foi projetado para um fluxo sequencial de compra, refletindo a experiência de autoatendimento:

1.  **`index.html` (Página Inicial):**

    - Ponto de entrada do sistema, apresentando a interface de boas-vindas e os produtos.
    - Permite adicionar produtos ao carrinho.
    - **Próximo Passo:** O botão "Ver Carrinho" ou "Finalizar Compra" direciona para `pages/carrinho.html`.

2.  **`pages/carrinho.html` (Carrinho de Compras):**

    - Exibe detalhadamente os produtos selecionados.
    - Permite ajustar quantidades (se implementado) ou remover itens.
    - Calcula e exibe o valor total da compra.
    - **Próximo Passo:** O botão "Finalizar Compra" direciona para `pages/cpf.html`.

3.  **`pages/cpf.html` (Informações de CPF):**

    - Etapa para o cliente inserir seu CPF, com validação de 11 dígitos.
    - **Próximo Passo:** O botão "Avançar" direciona para `pages/pagamento.html`.

4.  **`pages/pagamento.html` (Pagamento):**

    - Mostra o valor total a ser pago (importado dinamicamente do carrinho).
    - Simula as opções de método de pagamento (crédito, débito, PIX, voucher).
    - **Próximo Passo:** O botão "Pagar" ou "Avançar" direciona para `pages/processando.html`.

5.  **`pages/processando.html` (Processando Pagamento):**

    - Uma tela de transição que simula o processamento da transação.
    - **Próximo Passo:** Redireciona automaticamente para `pages/conclusao.html`.

6.  **`pages/conclusao.html` (Conclusão do Pedido):**

    - Confirmação de que a compra foi realizada com sucesso.
    - Oferece opções como "Retornar ao Início".

7.  **`pages/ticket.html` (Tela de Ticket - Uso Opcional):**
    - Página dedicada à funcionalidade de ticket de estacionamento, acessível de forma independente do fluxo principal de checkout, conforme a lógica de isenção.

## 📋 Requisitos

- Navegador atualizado (Chrome, Firefox, Edge)
- Resolução mínima recomendada: 1280x720
- JavaScript ativado no navegador.
- Node.js instalado para rodar o backend.

## 👨‍💻 Autores

- **Julie Godoi**
  [GitHub](https://github.com/juliegodoi) | [LinkedIn](https://www.linkedin.com/in/juliegodoi/)

- **Maria Fernanda Wilhelms**
  [GitHub](https://github.com/Maria-Fernanda-W) | [LinkedIn](https://www.linkedin.com/in/maria-fernanda-wilhelms/)

- **Matheus R. Santos**
  [GitHub](https://github.com/odevmath) | [LinkedIn](https://www.linkedin.com/in/odevmath)

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos e não possui fins comerciais.
Todos os direitos reservados aos autores.

---
