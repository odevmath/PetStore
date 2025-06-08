const fs = require('fs');
const path = require('path');

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Dados simulados
let carrinho = [];
let cpfInformado = '';
let ticketUsado = false;

// Rota de teste
app.get('/', (req, res) => {
    res.send('Servidor PetStore ativo!');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// ========== CARRINHO ==========

// Adiciona produto
app.post('/carrinho', (req, res) => {
    const { nome, preco } = req.body;
    if (!nome || preco === undefined) { // Verifique se preco é undefined, não apenas !preco
        return res.status(400).json({ erro: 'Nome e preço são obrigatórios.' });
    }

    carrinho.push({ nome, preco });
    res.status(201).json({ mensagem: 'Produto adicionado ao carrinho.' });
});

// Lista produtos
app.get('/carrinho', (req, res) => {
    res.json(carrinho);
});

// Remove um produto específico do carrinho pelo seu índice (posição no array)
app.delete('/carrinho/:indice', (req, res) => {
    const indice = parseInt(req.params.indice); // <-- Usando 'indice' para consistência

    // Verifica se o índice é válido
    if (isNaN(indice) || indice < 0 || indice >= carrinho.length) {
        return res.status(404).json({ erro: 'Produto não encontrado no carrinho ou índice inválido.' });
    }

    carrinho.splice(indice, 1); // Remove o produto do carrinho a partir do índice especificado
    res.json({ mensagem: 'Produto removido do carrinho.' });
});

// Limpa carrinho
app.delete('/carrinho', (req, res) => {
    carrinho = [];
    res.json({ mensagem: 'Carrinho esvaziado.' });
});

// ===================PRODUTOS===================
app.get('/produtos', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'produtos.json');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Erro ao ler produtos.json:', err);
            return res.status(500).json({ erro: 'Erro ao ler produtos.' });
        }

        try {
            const produtos = JSON.parse(data);
            res.json(produtos);
        } catch (parseError) {
            console.error('Erro ao converter JSON:', parseError);
            res.status(500).json({ erro: 'Erro ao processar os produtos.' });
        }
    });
});
