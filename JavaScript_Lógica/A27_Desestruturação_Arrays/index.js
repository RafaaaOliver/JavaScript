// ... "rest", mas também pode ser "spread"
const numeros = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];
// const [primeiroNumero, segundoNumero, ...resto] = numeros; // se colocado em ordem, pega o valor da posição do indice e já joga em uma variável
const [um, , tres, , cinco, , sete, ...resto] = numeros; // se atribuir valor vazio, o numero será pulado
console.log(um, tres, cinco, sete)      // três pontos e depois uma variável faz com que ela receba todo o resto de conteúdo da lista (ela vira outra lista)
console.log(resto);
