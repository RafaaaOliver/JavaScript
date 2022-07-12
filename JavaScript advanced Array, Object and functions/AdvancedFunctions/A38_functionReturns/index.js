function criaPessoa(nome, sobrenome) { 
    return {nome, sobrenome}; // construção de objeto diferente
}

const p1 = criaPessoa('Rafael', 'Santos')
const p2 = {
    nome: "Rafael",
    sobrenome: 'Santos'
};
console.log(p1)
console.log(p2)


function falaFrase(comeco) {
    function falaResto(resto){
        return comeco + ' ' + resto
    }
    return falaResto
}
const olaMundo = falaFrase('Olá')
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

/**
 * A constante está recebendo a função criaMultiplicador com o parâmetro que foi passado
 * então quando a const for chamada, usará o parâmetro setado quando ela foi criada.
 */
function criaMultiplicador(multiplicador) {
    return function(n) {
        return n * multiplicador;
    };
}

const duplica = criaMultiplicador(2);
const triplica = criaMultiplicador(3);
const quadriplica = criaMultiplicador(4);

console.log(duplica(2))
console.log(triplica(3))
console.log(quadriplica(10))