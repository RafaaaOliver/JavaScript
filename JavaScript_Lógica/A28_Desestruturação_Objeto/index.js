const pessoa = {
    nome: 'Luiz',
    sobrenome: 'Miranda',
    idade: 300,
    endereco: {
        rua: 'Av Brasil',
        numero: 320
    }
}
// console.log(pessoa.endereco.rua)

// atribuição via desestruturação
const { nome, ...resto} = pessoa;  // cria uma variável com o valor do objeto
console.log(nome, resto)