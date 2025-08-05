function modoDeEntrega() {
    const finalizar = document.getElementById('finalizar-pedido');

    if (!finalizar) {
        console.error("Botão 'Finalizar Pedido' não encontrado");
        return;
    }

    finalizar.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("Clique detectado no botão Finalizar");

        const selecionado = document.querySelector('.check:checked');
        if (!selecionado) {
            alert('Por favor, selecione um modo de entrega!');
            return;
        }

        const tipoEntrega = selecionado.value;
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        let mensagemWhatsapp = '*Seu Pedido:*\n';
        carrinho.forEach(item => {
            mensagemWhatsapp += `- ${item.quantidade}x ${item.nome.toUpperCase()} (R$${item.valor.toFixed(2)})\n`;
        });

        if (tipoEntrega === "Entrega") {
            const rua = document.getElementById('rua').value.trim();
            const numero = document.getElementById('numero').value.trim();
            const bairro = document.getElementById('bairro').value.trim();
            const referencia = document.getElementById('ref').value.trim();

            if (!rua || !numero || !bairro) {
                alert('Por favor, preencha os campos de endereço!');
                return;
            }

            mensagemWhatsapp += `\n*Entrega ou Retirada:* Entrega\n Tempo estimado: 60 minutos\n`;
            mensagemWhatsapp += `*Endereço:* ${rua}, ${numero} - ${bairro}\n`;
            if (referencia) mensagemWhatsapp += `*Referência:* ${referencia}\n`;
        } else {
            mensagemWhatsapp += `\n*Entrega ou Retirada:* Retirada na loja\n Tempo estimado: 20 minutos\n`;
        }

        const total = carrinho.reduce((acc, item) => acc + item.valor * item.quantidade, 0);
        mensagemWhatsapp += `\n*Total:* R$${total.toFixed(2)}\n`;
        mensagemWhatsapp += `_Volte Sempre!_`;

        const telefoneLoja = '5518998219709';
        const linkWhatsapp = `https://wa.me/${telefoneLoja}?text=${encodeURIComponent(mensagemWhatsapp)}`;

        console.log("Redirecionando para:", linkWhatsapp);

        localStorage.removeItem('carrinho');
        window.open(linkWhatsapp, '_blank');
    });
}

export default modoDeEntrega;