// Obs: Colchetes são Arrays e chaves são objetos
// argumento é o valor que é passado para o parâmetro
function criaPessoa (nome, sobrenome, idade){
    return{ nome,
            sobrenome,  // quando o valor é direto, não precisa por dois pontos
            idade
    };
};

const pessoa1 = criaPessoa('Rafael', 'Olivera', 20)
console.log(pessoa1.nome)
console.log(pessoa1.sobrenome)
console.log(pessoa1.idade)
console.log(pessoa1)


// const pessoa1 = {
//     nome: 'Rafael',
//     sobrenome: 'Oliveira',
//     idade: 20
// };

// console.log(pessoa1.nome);
// console.log(pessoa1.sobrenome);
// b  