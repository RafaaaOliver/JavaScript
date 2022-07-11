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
 * 
 */