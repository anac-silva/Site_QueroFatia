const caixaCheck = document.querySelectorAll(".check");
const checkEntrega = document.getElementById('check-entrega');
const enderecoEntrega = document.getElementById('endereco-entrega');
const checkRetirada = document.getElementById('check-retirada');
const enderecoRetirada = document.getElementById('endereco-retirada'); 

caixaCheck.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        if (checkbox.value === "Entrega"){
            enderecoEntrega.style.display = "block";
            enderecoRetirada.style.display = "none";
        } else {
            enderecoRetirada.style.display = "block";
            enderecoEntrega.style.display = "none";
        }
    })
})

