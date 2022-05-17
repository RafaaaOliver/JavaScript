function mostraHora() {
    let data = new Date('00: 00: 00');

    return data.toLocaleTimeString('pt-BR', {
        hour12: false
    })
}
// console.log(mostraHora())

function funcaDoInterval() {
    console.log(mostraHora());
}
const timer = setInterval(funcaDoInterval, 1000)  // para passar referência é só colocar afunção sem executar (sem os parenteses)
// setInterval repete tal função a cada tempo definido no parâmetro. 

setTimeout(function () {  // setTimeout é uma função de stop
    clearInterval(timer); // com uma função anonimada criada dentro do setTimeout
}, 6000);                // essa função irá interromper o Interval daqui a 5 segundos

setTimeout(function () {
    console.log('você ainda está ai?, a função já foi encerrada a 4 segundos...')
}, 10000)
setTimeout(function () {
    console.log('Não cansa de esperar?')
}, 12000)
setTimeout(function () {
    console.log('Não tem nada de melhor pra fazer???')
}, 14000)