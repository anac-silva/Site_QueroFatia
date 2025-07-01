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

        // Verifica pelo nome da classe, não pelo texto do botão
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

const iconeCarrinho = document.querySelector('#icone-carrinho');

if (iconeCarrinho) {
    iconeCarrinho.addEventListener('click', () => {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

        if (carrinho.length === 0) {
            alert("🛒 O carrinho está vazio.");
            return;
        }

        let resumo = '🧾 Resumo do pedido:\n\n';
        let total = 0;

        carrinho.forEach(item => {
            const subtotal = item.quantidade * item.valor;
            total += subtotal;

            resumo +=
                `🧁 ${item.nome}\n` +
                `Qtd: ${item.quantidade} | R$${item.valor.toFixed(2)} cada\n` +
                `Subtotal: R$${subtotal.toFixed(2)}\n\n`;
        });

        resumo += `🟰 Total: R$${total.toFixed(2)}`;

        alert(resumo);
    });
}


