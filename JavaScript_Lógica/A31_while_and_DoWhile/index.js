function random(min, max){
    const r = Math.random() * (max - min) + min;
    return Math.floor(r)
}

const min = 1;
const max = 50;
let rand = 10//random(1, 50);
let cont = 0;

while (rand !== 10){
    rand = random(min, max)  // o laço encerra quando é encontrado o número 10
    cont += 1                // exemplo usando uma função de números aleatórios
}
console.log(`A o while foi executado ${cont} vezes!`)

do {  // executa o código primeiro e depois veifica a condição
    rand = random(min, max)
    cont += 1  
} while (rand !== 10);



// const nome = 'Rafael Oliveira Santos'
// let i = 0;

// while (i < nome.length){   // igual ao do python, só muda o parenteses e chaves
//     console.log(nome)
//     i += 1
// }
