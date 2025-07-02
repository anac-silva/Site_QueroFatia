export function adicionarItemCarrinho() {
    const botoes = document.querySelectorAll('button');

    botoes.forEach((botao) => {
        botao.addEventListener('click', () => {
            const blocoProduto = botao.closest('.box-produto');
            const nomeProduto = blocoProduto.querySelector('h3').textContent;
            const textoValor = blocoProduto.querySelector('h4').textContent.trim();
            const valorProduto = parseFloat(textoValor.replace('R$', '').replace(',', '.').trim());

            const blocoQuantidade = botao.closest('.compras');
            const spanContador = blocoQuantidade.querySelector('.quantidade');
            let quantidadeProduto = parseInt(spanContador.textContent) || 0;

            if (botao.classList.contains('adicionar')) {
                quantidadeProduto++;
                spanContador.textContent = quantidadeProduto;
                
            } else if (botao.classList.contains('remover')) {
                if (quantidadeProduto > 0) {
                    quantidadeProduto--;
                    spanContador.textContent = quantidadeProduto;
                }

            } else if (botao.classList.contains('add-carrinho')) {
                if (quantidadeProduto > 0) {
                    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

                    const indexExistente = carrinho.findIndex(item => item.nome === nomeProduto);

                    if (indexExistente !== -1) {
                        carrinho[indexExistente].quantidade += quantidadeProduto;
                    } else {
                        carrinho.push({
                            nome: nomeProduto,
                            valor: valorProduto,
                            quantidade: quantidadeProduto
                        });
                    }

                    localStorage.setItem('carrinho', JSON.stringify(carrinho));
                    spanContador.textContent = 0;

                    alert(`${quantidadeProduto} un. ${nomeProduto} adicionado ao carrinho!`);
                    
                } else {
                    alert('⚠️ Selecione ao menos 1 unidade antes de adicionar.');
                }
            }
        });
    });
};