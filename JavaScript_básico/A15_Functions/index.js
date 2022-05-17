// ========================== Método 1 ===============================

// function soma(x = 1, y = 1){ // É possível atribuir valores nos parametros caso eles não sejam preenchidos
//     const resultado = x + y;
//     return resultado; // Return retorna o resultado e encerra a função instantaneamente
// }
// console.log(soma(2, 2));
// console.log(soma(75, 2215));
// console.log(soma(45, 66));
// console.log(soma(5, 7));

// ========================== Método 2 ===============================
// const raiz = function (n) {
//     return n ** 0.5;
// };  // atribuindo uma função auma variável

// console.log(raiz(9));
// console.log(raiz(16));
// console.log(raiz(25));
// console.log(raiz(27));

// ========================== Método 3 ===============================
                       // (Arroz Function)
const raiz = n => n ** 0.5; // quando temos um parametro não precisamos de parenteses

console.log(raiz(9));
console.log(raiz(16));
console.log(raiz(25));