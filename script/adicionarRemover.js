export function adicionarRemover() {
    const botaoAdicionar = document.querySelectorAll('.adicionar'); 
    botaoAdicionar.forEach((adicao) => {
        adicao.addEventListener('click', () => { 
            const blocoItem = adicao.closest('.box-botoes'); 
            const spanContador = blocoItem.querySelector('.quantidade'); 
            let quantidadeProduto = parseInt(spanContador.textContent) || 0; 
            quantidadeProduto++;
            spanContador.textContent = quantidadeProduto;
        });
    });

    const botaoRemover = document.querySelectorAll('.remover'); 
    botaoRemover.forEach((remove) => {
        remove.addEventListener('click', () => {
            const blocoItem = remove.closest('.box-botoes'); 
            const spanContador = blocoItem.querySelector('.quantidade'); 
            let quantidadeProduto = parseInt(spanContador.textContent) || 0; 
            if (quantidadeProduto <= 0) return;
            quantidadeProduto--;
            spanContador.textContent = quantidadeProduto;
        });
    });

    const botoes = document.querySelectorAll('.add-carrinho');
    botoes.forEach((botao) => {
        botao.addEventListener('click', () => { 
            const boxProduto = botao.closest('.box-produto');
            const nomeProduto = boxProduto.querySelector('h3').textContent.trim();
            const textoValor = boxProduto.querySelector('h4').textContent.trim();
            const valorProduto = parseFloat(textoValor.replace('R$', '').replace(',', '.').trim());

            const boxBotoes = botao.closest('.box-botoes'); 
            const spanContador = boxBotoes.querySelector('.quantidade'); 
            let quantidadeProduto = parseInt(spanContador.textContent) || 0; 

            if (quantidadeProduto > 0){
                const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []; 
                const indexExistente = carrinho.findIndex(item => item.nome === nomeProduto); 
                
                if (indexExistente !== -1) {
                    carrinho[indexExistente].quantidade += quantidadeProduto;
                } else{
                    carrinho.push({
                        nome: nomeProduto,
                        valor: valorProduto,
                        quantidade: quantidadeProduto
                    });
                }
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                spanContador.textContent = 0;
            } else {
                alert('⚠️ Selecione ao menos 1 unidade antes de adicionar.');
            }
        });
    });
}