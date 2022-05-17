let duasString = 'o rato roeu a roupa do rei de roma';
let umaString = "um \"Texto\"";   // a barra invertida atropela as aspas
                                 // de abertura e fechamento 

console.log(umaString[4]);                         // puxa o caracter de um indice especifico)
console.log(umaString.charAt(6));                  // se for um indice que não está na string, retorna vazio 
console.log(umaString.indexOf('to'));              // busca o indice da string  e se não for encontrado retorna -1
console.log(umaString.indexOf('T', 3));            // busca o indice a partir do escolhido, no caso o 3°
console.log(umaString.lastIndexOf('O', 3));        // busca o indice de trás para frente               
console.log(umaString.match(/[a-z]/g));            // Trecho de expressão regular / procura todas as letras minusculas            
console.log(umaString.search(/x/));                // Faz uma busca do item dentro da variável

console.log(duasString.replace(/r/g, 'g'));         // substitui a primeira ocorrencia pela segunda / com a flag 'G' seleciona todas               
console.log(duasString.length);                     // retorna o tamanho da String  <------------------------------------                     
console.log(duasString.slice(2, 6));                // corta um pedaço da string (start, end)   
console.log(duasString.slice(-3));                  // subtrai do tamanho da string, achando ás 3 ultimas letras                   
console.log(duasString.split(' '));                 // divide a string que possuem o parametro as separando ('' ,3 ) e também podemos escolher a quantidade de vezes que ocorrerá                   
console.log(duasString.toUpperCase());                // retorna a string maiuscula               
console.log(duasString.toLocaleLowerCase());          // retorna a string minuscula                    

