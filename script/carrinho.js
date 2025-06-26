//const adicionar = document.getElementById("adicionar");
//const remover = document.getElementById("remover");
//const quantidade = document.getElementById("quantidade");

const botoes = document.querySelectorAll('button');

botoes.forEach((botao) =>{
    botao.addEventListener('click', ()=> {
        const button = botao.textContent.trim(); // + ou - ou adicionar
        const blocoProduto = botao.closest('.box-produto');
        const nomeProduto = blocoProduto.querySelector('h3').textContent;
        const textoValor = blocoProduto.querySelector('h4').textContent.trim();
        const valorProduto = parseFloat(textoValor.replace('R$', '').replace(',', '.').trim());

        //pegar a quantidade de cada produto 
        const blocoQuantidade = botao.closest('#compras'); //seleciona o elemento pai que está o span com a quantidade de produto
        const spanContador = blocoQuantidade.querySelector('span'); //pega texto precisa converter em numero
        let quantidadeProduto = parseInt (spanContador.textContent); //tranforma a stringo do spancontador em numero com o parseInt

        if (button === '+') {
            quantidadeProduto++;
            spanContador.textContent = quantidadeProduto;

        } else if (button === '-') {
            if (quantidadeProduto > 0) {
                quantidadeProduto--; // aqui estava errado
                spanContador.textContent = quantidadeProduto;
            }

        } else if (button === 'Adicionar') {
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