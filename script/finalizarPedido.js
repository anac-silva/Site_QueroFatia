export function configurarFinalizarPedido(modoDeEntrega) {
    const finalizar = document.getElementById('enviar');

    finalizar.addEventListener('click', () =>{
        const rua = document.getElementById('rua').value;
        const numero = document.getElementById('numero').value;
        const bairro = document.getElementById('bairro').value;
        const referencia = document.getElementById('ref').value;
        const mensagem = document.querySelector('#mensagem');

        if (modoDeEntrega === "Entrega"){
            if (!rua || !numero || !bairro) {
                alert('Por favor, preencha com os dados para entrega!')
                return;
            }

            const texto = document.createElement("p");
            texto.innerText = `Pedido finalizado, prazo de entrega de 40 min! A entrega será realizada no endereço: ${rua}, ${numero}, ${bairro}, ${referencia}`;

            mensagem.appendChild(texto);

        } else if (modoDeEntrega === "Retirada") {
            alert('Pedido finalizado, prazo de retirada é de 20 min!')
        } else {
            alert('Por favor, selecione um modo de entrega!')
            return;
        }
        
        localStorage.removeItem('carrinho');
    })
    
}
