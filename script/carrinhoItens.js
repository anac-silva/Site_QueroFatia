import selecionarEntrega from './selecionarEntrega.js';
import modoDeEntrega from './modoEntrega.js';

document.addEventListener('DOMContentLoaded', () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const conteudoCarrinho = document.querySelector('.conteudo-carrinho');
    const totalProdutos = document.getElementById('total-carrinho');

    if (carrinho.length === 0) {
        const itemCarrinho = document.createElement('div');
        itemCarrinho.classList.add('itens-carrinho');
        itemCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>';
        conteudoCarrinho.appendChild(itemCarrinho);
        const limparCarrinho = document.getElementById('limpar');
        if (limparCarrinho) limparCarrinho.style.display = 'none';
        return;
    }

    let valorTotal = 0;

    carrinho.forEach(item => {
        const itemCarrinho = document.createElement('div');
        itemCarrinho.classList.add('itens-carrinho');

        const imagemProduto = document.createElement('img');
        imagemProduto.src = '../assets/imagens/produtos/' + item.nome.toLowerCase().replace(/\s+/g, '_') + '.jpg';
        itemCarrinho.appendChild(imagemProduto);

        const itemProduto = document.createElement('div');
        itemProduto.classList.add('produto');
        itemProduto.innerHTML = `
            <h3>${item.nome}</h3>
            <h4>R$${item.valor.toFixed(2)}</h4>
        `;
        itemCarrinho.appendChild(itemProduto);

        const itemQuantidade = document.createElement('div');
        itemQuantidade.classList.add('quantidade');

        const campoQtd = document.createElement('p');
        campoQtd.textContent = `Qtd: ${item.quantidade}`;

        const campoSubtotal = document.createElement('p');
        campoSubtotal.textContent = `Subtotal: R$${(item.quantidade * item.valor).toFixed(2)}`;

        const removerItem = document.createElement('button');
        removerItem.classList.add('remove-carrinho');
        removerItem.innerHTML = `
            <img src="../assets/imagens/icones/lixeiras.png" alt="Logo de uma lixeira">
            <h5>Remover</h5>
        `;

        itemQuantidade.appendChild(campoQtd);
        itemQuantidade.appendChild(campoSubtotal);
        itemQuantidade.appendChild(removerItem);

        itemCarrinho.appendChild(itemQuantidade);

        conteudoCarrinho.insertBefore(itemCarrinho, totalProdutos);

        valorTotal += item.quantidade * item.valor;

        
    });

    const valorCarrinho = document.createElement('p');
    valorCarrinho.classList.add('valor-carrinho');
    valorCarrinho.textContent = `Total do carrinho: R$${valorTotal.toFixed(2)}`;
    totalProdutos.appendChild(valorCarrinho);

    atualizarTotalCarrinho();
    exibirFechamento();
    selecionarEntrega();
    modoDeEntrega();
});

function atualizarTotalCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const total = carrinho.reduce((soma, item) => soma + (item.valor * item.quantidade), 0);
    const campoTotal = document.querySelector('.valor-carrinho');

    if (campoTotal) {
        campoTotal.textContent = `Total do carrinho: R$${total.toFixed(2)}`;
    }
}

document.querySelector('.conteudo-carrinho').addEventListener('click', (event) => {;

    if (event.target.closest('.remove-carrinho')) {
        const botaoRemover = event.target.closest('.remove-carrinho');
        const produtoCarrinho = botaoRemover.closest('.itens-carrinho');
        const nomeProdutoCarrinho = produtoCarrinho.querySelector('.produto h3').textContent;

        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const index = carrinho.findIndex(item => item.nome === nomeProdutoCarrinho);
        

        if (index !== -1) {
            carrinho[index].quantidade--;
            
            if (carrinho[index].quantidade <= 0) {
                carrinho.splice(index, 1);
                produtoCarrinho.remove();
            } else {
                const campos = produtoCarrinho.querySelectorAll('.quantidade p');
                const campoQuantidade = campos[0];
                const campoSubtotal = campos[1];
                campoQuantidade.textContent = `Qtd: ${carrinho[index].quantidade}`;
                campoSubtotal.textContent = `Subtotal: R$${(carrinho[index].quantidade * carrinho[index].valor).toFixed(2)}`;
            }

            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            atualizarTotalCarrinho();
            exibirFechamento();
        }
    }
});


const limparCarrinho = document.getElementById('limpar');

limparCarrinho.addEventListener('click', () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
        document.querySelector('.conteudo-carrinho').innerHTML = '<p>Seu carrinho está vazio.</p>';
        limparCarrinho.style.display = 'none';
        return;
    } else {
        localStorage.removeItem('carrinho');
        document.querySelector('.conteudo-carrinho').innerHTML = '<p>Seu carrinho está vazio.</p>';
    }
});


function exibirFechamento() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const fechamento = document.getElementById('fechamento');
    if (carrinho.length > 0 && fechamento) {
        fechamento.style.display = 'flex';
    } else if (fechamento) {
        fechamento.style.display = 'none';
    }
}