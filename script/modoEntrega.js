function modoDeEntrega(){
    const finalizar = document.getElementById('finalizar-pedido');

    finalizar.addEventListener('click', () =>{
        
        const mensagem = document.querySelector('#mensagem');
        mensagem.innerHTML = '';

        const selecionado = document.querySelector('.check:checked');
        if (!selecionado) {
            alert('Por favor, selecione um modo de entrega!');
            return;
        }

        const tipoEntrega = selecionado.value;

        if (tipoEntrega === "Entrega"){
            const rua = document.getElementById('rua').value.trim();
            const numero = document.getElementById('numero').value.trim();
            const bairro = document.getElementById('bairro').value.trim();
            const referencia = document.getElementById('ref').value.trim();


            if (!rua || !numero || !bairro) {
                alert('Por favor, preencha com os dados para entrega!')
                return;
            } 
            
            const texto = document.createElement("p");
            texto.innerText = `Pedido finalizado! Prazo de entrega: 40 minutos.
            Endereço: ${rua}, ${numero}, ${bairro}. Referência: ${referencia}`;
            mensagem.appendChild(texto);
        } 
        else if (tipoEntrega === "Retirada") {
            const texto = document.createElement("p");
            texto.innerText = `Pedido finalizado! Prazo para retirada: 20 minutos.`;
            mensagem.appendChild(texto);
        }

        localStorage.removeItem('carrinho');
    });
}

export default modoDeEntrega;