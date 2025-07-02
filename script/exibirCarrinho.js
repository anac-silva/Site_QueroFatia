export function exibirCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const conteudoCarrinho = document.querySelector('.conteudo-carrinho');


    if (!conteudoCarrinho) return;

    carrinho.forEach(item => {
        const imagemProduto = document.createElement('img');
        imagemProduto.src = '/assets/imagens/produtos/' + item.nome.toLowerCase().replace(/\s+/g, '_') + '.jpg';    

        const itemCarrinho = document.createElement('div');
        itemCarrinho.classList.add('itens-carrinho');

        const produto = document.createElement('div');
        produto.classList.add('produto');
        produto.innerHTML = `<h3>${item.nome}</h3>
                            <h4>R$${item.valor.toFixed(2)} cada</h4>`;

        const quantidadeItem = document.createElement('div');
        quantidadeItem.classList.add('quantidade');
        quantidadeItem.innerHTML = `<p>Qtd: ${item.quantidade}</p>
                                    <p>Subtotal: R$${(item.quantidade * item.valor).toFixed(2)}</p>`;

        const removeItemCarrinho = document.createElement('button');
        removeItemCarrinho.classList.add('remove-carrinho');    
        removeItemCarrinho.innerHTML = `<img src="/assets/imagens/icones/lixeiras.png" alt="Logo de uma lixeira"><p>Remover</p>`;

        itemCarrinho.appendChild(imagemProduto);
        itemCarrinho.appendChild(produto);
        itemCarrinho.appendChild(quantidadeItem);
        itemCarrinho.appendChild(removeItemCarrinho);
        let container = document.querySelector('#itens-carrinho');
        if (!container) {
            container = document.createElement('div');
            container.id = 'itens-carrinho';
            conteudoCarrinho.insertBefore(
                container,
                document.querySelector('#total-carrinho')
            );
        }

        container.appendChild(itemCarrinho);
    });
}