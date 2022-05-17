/*
&& 
||
*/

/**FALSY  <- valores que se fazer por falsos
 * false  < esse é falso literal
 * 0
 * '' "" ``
 * null / undefined
 * NaN 
*/
console.log('Luiz' && 0 && 'Maria') // retorna o valor falso
 
// Curto - circuíto

function falaoi (){
    return 'oi';
}
const executar = false;

console.log(executar && falaoi());

const corUsuario = 'null' // se setarmos um valor, ele sairá da cor padrão para a cor do usuário
const corPadrao = corUsuario || 'Preto';

console.log(corPadrao)