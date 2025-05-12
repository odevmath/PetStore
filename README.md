# 🐾 AutoPet - Sistema de Autoatendimento Petshop | v1.0

> Projeto acadêmico desenvolvido com o objetivo de propor uma solução web dinâmica, funcional e intuitiva voltada para o autoatendimento em lojas do setor pet. Inspirado na Cobasi, o sistema foca na experiência do usuário e otimização do processo de pagamento.

---

<!-- 
## 🆕 Novidades da versão

- Primeira versão do sistema de autoatendimento;
- Estrutura de telas inicial definida;
- Fluxo de interação com CPF, pagamento e ticket incluído.
-->

## 📁 Estrutura do Projeto

- `/index.html` – Tela inicial com logo e botão de início;
- `/src/` – Scripts e lógica em JavaScript;
- `/assets/` – Imagens, ícones e estilos visuais (CSS);
- `/pages/` – Telas separadas: produtos, pagamento, CPF, finalização;
- `/prototype/` – Arquivos de protótipo e planejamento visual;
- `/video/` – Apresentação explicativa do sistema em formato `.mp4`.

### 📁 Mapa de Diretórios do Projeto

```
AutoPet/
├── index.html
├── assets/
│   ├── css/
│   ├── img/
│   └── fonts/
├── src/
│   └── scripts.js
├── pages/
│   ├── produtos.html
│   ├── ticket.html
│   ├── cpf.html
│   ├── pagamento.html
│   └── finalizacao.html
├── prototype/
│   └── AutoPet_Figma.fig
└── video/
    └── apresentacao.mp4
```

## ✅ Funcionalidades
**PROPOSTA INICIAL**
- Interface de boas-vindas com navegação intuitiva;
- Leitura e visualização de produtos com valores individuais;
- Cálculo automático do valor total e integração com ticket de estacionamento;
- Inserção opcional de CPF com teclado numérico;
- Tela de pagamento com escolha do método (crédito, débito, pix, voucher);
- Mensagem final de agradecimento ou retorno em caso de falha;
- Controle de fluxo com botões de retorno/aborto em cada etapa.

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (DOM, eventos, lógica condicional)
- Figma (protótipo de telas)
- Editor de código VSCode

## 🚀 Como Usar

1. Clone ou baixe este repositório.
2. Navegue até a pasta raiz do projeto.
3. Abra o arquivo `index.html` com seu navegador.
4. Interaja com as etapas simulando um fluxo real de autoatendimento.

> Não é necessário instalar dependências ou servidores locais.

## 📋 Requisitos

- Navegador atualizado (Chrome, Firefox, Edge)
- Resolução mínima recomendada: 1280x720
- JavaScript ativado

## ⚙️ Detalhes Técnicos

- A leitura de produtos simula a entrada via código;
- A lógica de valor do ticket é aplicada somente se informado pelo usuário (`R$ 10,00`);
- Compras acima de `R$ 60,00` isentam o ticket de estacionamento;
- Cada tela pode ser convertida em modal conforme proposta UX;
- Todas as funcionalidades foram validadas de forma incremental.

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