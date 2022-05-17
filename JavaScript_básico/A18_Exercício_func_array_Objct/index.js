function meuEscopo () {
    const form = document.querySelector('form'); // pode selecionar pelo nome da tag, pela classe ou id
    const resultado = document.querySelector('.resultado');
    const pessoa = [];

    function recebeEventoForm (evento) {
        evento.preventDefault();
        const nome = form.querySelector('.Nome');
        const sobrenome = form.querySelector('.Sobrenome');
        const peso = form.querySelector('.Peso');
        const altura = form.querySelector('.Altura');

        function criarPessoa (nome, sobrenome, peso, altura){
            return{ nome: nome.value,
                    sobrenome: sobrenome.value,
                    peso: peso.value,
                    altura: altura.value
            }
        }
        const pessoa1 = criarPessoa (nome, sobrenome, peso, altura)
        pessoa.push(pessoa1)
        console.log(pessoa1)
        console.log(pessoa)
        resultado.innerHTML = `<h1> Informações de: ${pessoa1.nome} </h1> <ul>
        <p> <li> sobrenome:${pessoa1.sobrenome} </li> </p>
        <p> <li> Peso:${pessoa1.peso} </li> </p>
        <p><li> Altura:${pessoa1.altura}</li> </p>
        <ul>`;
    }   
    form.addEventListener('submit', recebeEventoForm);
}
meuEscopo(); 