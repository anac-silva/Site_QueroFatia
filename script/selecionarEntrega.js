
function selecionarEntrega() {
    const caixaCheck = document.querySelectorAll(".check");
    const enderecoEntrega = document.getElementById('endereco-entrega');
    const enderecoRetirada = document.getElementById('endereco-retirada'); 

    let modoSelecionado = '';

    caixaCheck.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            
            if (checkbox.checked) {
                caixaCheck.forEach( cb => cb !== checkbox && (cb.checked = false))
                modoSelecionado = checkbox.value;
                if (checkbox.value === "Entrega"){
                    enderecoEntrega.style.display = "flex";
                    enderecoRetirada.style.display = "none";
                } else {
                    enderecoRetirada.style.display = "flex";
                    enderecoEntrega.style.display = "none";
                }

                
            } else {
                enderecoEntrega.style.display = "none";
                enderecoRetirada.style.display = "none";
            }       
        });
    });
};

export default selecionarEntrega;