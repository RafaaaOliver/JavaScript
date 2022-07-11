const souUmDado = function() {
    console.log('Sou um dado.')
};

// function expression

function executaFuncao(funcao) {
    console.log('Vou executar sua função abaixo')
    funcao()
}
executaFuncao(souUmDado)

// Arrow function
const funcaoArrow = () => {
    console.log('Sou uma arrow function')
}

// Dentro de um objeto
const obj = {
    falar() {
        console.log('Estou falando...')
    }
};
obj.falar();