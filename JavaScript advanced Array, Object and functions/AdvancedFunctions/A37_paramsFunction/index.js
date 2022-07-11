/**
 * o comando arguments sustenta todos os parâmetros passados na função
 * os argumentos são passados em formato de objeto, porém com indices de array
 * Funciona apenas com function normal
 */

function funcao() { // funciona apenas com a function normal
    let total = 0;
    for (let argumento of arguments) {
        total += argumento
    } 
    console.log(total)
}
funcao(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
/**
 * se for criada uma função e não for passado parâmetros suficientes, o valor será undefined
 */

function semArgs(a, b, c, d, e, f) {
    console.log(a, b, c, d, e, f)
}
semArgs(1, 2, 3)
/**
 * se não for passado o parâmetro para a função, ela assumirá o valor padrão.
 * a única forma de usar o valor padrão é passar undefined como parâmetro
 */
function umOuOutro(a, b = 12) {
    console.log('A: ', a)
    console.log('B: ', b)
}
umOuOutro(25)

/**
 * o rest operator cria um array com os parametros 
 */

function conta(operador, acumulador, ...numeros) {
    for(let numero of numeros) {
        if (operador === '+') acumulador += numero;
        if (operador === '-') acumulador -= numero;
        if (operador === '*') acumulador *= numero;
        if (operador === '/') acumulador /= numero;
    }
    console.log(acumulador)
}

conta('*', 55, 20, 30, 40, 5000)