let num1 = 0.7;
let num2 = 0.1;
 num1 += num2 // 0.8
 num1 += num2 // 0.9
 num1 += num2 // 1.0
 num1 = Number(num1.toFixed(2)); // Transforma o número em inteiro corrigindo 
                                //a falha soma dos números decimais do js

console.log(num1);
console.log(typeof (num1)); // mostra o tipo de variável 

