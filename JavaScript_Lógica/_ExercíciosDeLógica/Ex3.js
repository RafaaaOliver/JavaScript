function Peixe(x){
    console.log(x)
    if (x > 100 || x < 0){
        return `número inválido!!! (Dica: Escolha um número entre 0 e 100)`;
    }
    if (typeof (x) !== 'number'){  // nesse caso o numbe precisa ser minúsculo
        return `Digite apenas números!!!)`;
    }
    if (x % 3 !== 0 && x % 5 !== 0){
        return `Não serve pra nada`;
    }
    if (x % 3 === 0 && x % 5 === 0){
        return "FizzBuzz";
    }
    if (x % 3 === 0){
        return "Fizz";
    }
    if (x % 5 === 0){
        return "Buzz";
    }

};

let i = 0
while (i < 200){
    console.log(i, Peixe(i))
    i += 1
}

