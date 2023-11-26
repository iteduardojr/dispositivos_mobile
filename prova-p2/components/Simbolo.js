function formatarComoDinheiro(valor) {
    if (typeof valor !== 'number') {
        console.error('O valor passado para a função formatarComoDinheiro não é um número.');
        return;
    }
    return "R$:" + ' ' + valor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export {formatarComoDinheiro}