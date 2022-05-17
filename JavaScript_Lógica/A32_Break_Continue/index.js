const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

for (let i of numeros){
    if (i === 3 || i === 7 ){
        console.log(`pulei o número:${i}`)
        continue;  // a palavra continue executa o que está antes dela e mata o que está na frente
                   // é uma maneira de pular a interação e executar uma ação
    }

    if (i === 10){
        console.log(`sou nervoso, quero terminar no ${i} :)`)
        break;   // para o laço
    }
    console.log(i)
}

console.log("===============================================================")
console.log("===================== separador =================================")
console.log("===============================================================")

for (let i in numeros){   // << o mesmo comando, porém no for in
    if (numeros[i] === 3 || numeros[i] === 7 ){
        console.log(`pulei o número:${numeros[i]}`)
        continue;  // a palavra continue executa o que está antes dela e mata o que está na frente
                   // é uma maneira de pular a interação e executar uma ação
    }

    if (numeros[i] === 10){
        console.log(`sou nervoso, quero terminar no ${numeros[i]} :)`)
        break;   // para o laço
    }
    console.log(numeros[i])
}