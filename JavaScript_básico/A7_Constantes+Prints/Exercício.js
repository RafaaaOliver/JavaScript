const nome = 'Rafael';
const sobrenome = 'Oliveira';
const idade = 20;
const peso = 75;
const altura = 1.80;
let imc;
const anoNascimento = 2002;

imc = peso / altura ** 2 

console.log(nome, sobrenome,'tem', idade, 'anos, pesa', peso, 'kg')
console.log(`tem ${altura} de altura e seu IMC é de ${imc}`)
console.log(nome, sobrenome, 'nasceu em ',anoNascimento + '.')

// ----------->> template strings <<------------------
console.log(`tem ${altura} de altura e seu IMC é de ${imc}----------`)
// para colocar as variáveis na crase é só usar cifrão e chaves
// ${nome do variável}