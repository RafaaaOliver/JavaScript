const frutas = ['Pera', 'Maça', 'Uva'];

for (let i in frutas){  // sintaxe do for apenas usar parenteses, let e chaves
    console.log(frutas[i])
}

const pessoa = {
    nome: 'Rafael',
    sobrenome: 'Oliveira',
    idade: 20,
    CEP: 0000121245,
    PhoneNumber: 1212-4545
}
for (let i in pessoa){
    console.log(`${i}: ${pessoa[i]}`)
}
// console.log(pessoa.nome);
// console.log(pessoa['nome']);  // busca o índice através de uma String
