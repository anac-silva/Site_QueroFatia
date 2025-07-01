const caixaCheck = document.querySelectorAll(".check");
const checkEntrega = document.getElementById('check-entrega');
const enderecoEntrega = document.getElementById('endereco-entrega');
const checkRetirada = document.getElementById('check-retirada');
const enderecoRetirada = document.getElementById('endereco-retirada'); 

const finalizar = document.getElementById('enviar');

caixaCheck.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {

        if (checkbox.checked) {
            caixaCheck.forEach( cb => cb !== checkbox && (cb.checked = false))
            mododeentrega = checkbox.value;
            if (checkbox.value === "Entrega"){
                enderecoEntrega.style.display = "block";
                enderecoRetirada.style.display = "none";
                finalizarPedido();
            } else {
                enderecoRetirada.style.display = "block";
                enderecoEntrega.style.display = "none";
                finalizarPedido();
            }
        } else {
            enderecoEntrega.style.display = "none";
            enderecoRetirada.style.display = "none"
        }       
    })
})


function finalizarPedido(){

    finalizar.addEventListener('click', () =>{
        const rua = document.getElementById('rua').value;
        const numero = document.getElementById('numero').value;
        const bairro = document.getElementById('bairro').value;
        const referencia = document.getElementById('ref').value;

        const mensagem = document.querySelector('#mensagem');

        if (mododeentrega === "Entrega"){
            if (rua === "" || numero ==="" || bairro === "") {
                alert('Por favor, preencha com os dados para entrega!')
            } else {
                const texto = document.createElement("p");
                texto.innerText = `Pedido finalizado, prazo de entrega de 40 min! A entrega será realizada no endereço: ${rua}, ${numero}, ${bairro}, ${referencia}`;

                mensagem.appendChild(texto);
                texto.appendChild(texto.value);
                //alert('Pedido finalizado, prazo de entrega de 40 min!')
                //alert(`Entrega será realizada no endereço: ${rua}, ${numero}, ${bairro}, ${referencia}.`)
            }
        } else{
            alert('Pedido finalizado, prazo de retirada é de 20 min!')
        }
        
        localStorage.removeItem('carrinho');
    })
    
}


