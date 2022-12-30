function relogiao (){
    function criaHoraDosSegundos(segundos) {
        const data = new Date(segundos * 1000); // o objeto date recebe sempre em mili segundos, então multipliquei por mil para ele receber em segundos
        return data.toLocaleTimeString('pt-BR', {
            hour12: false,      // retorna no formato 24hrs
            timeZone: 'GMT'     // tira o -3 de horário de brasilia (apenas diminuiu o número)
        })
    }
    const relogio = document.querySelector('.relogio');  // atribui o html para a variável atráves da classe

    let segundos = 0;  // variáveis globais
    let timer;

    function iniciaRelogio() {
        timer = setInterval(function () {  // função que vai atualizar o valor de segundos
            segundos += 1;           // atualiza a variável segundo
            relogio.innerHTML = criaHoraDosSegundos(segundos)     // insere a função e o parametro como string do html
        }, 1000)  // definido para atualizar de 1 em 1 segundo
    }

    function stop() {
        clearInterval(timer)  // função que interrompe o setInterval (pausa o timer)
    }

    function reset() {
        clearInterval(timer)  // pausa o timer
        relogio.innerHTML = '00:00:00'  // reseta o que está no html
        segundos = 0;
    }

    document.addEventListener('click', function (e) {
        const achei = e.target;

        if (achei.classList.contains('iniciar')) {
            stop();
            iniciaRelogio();
            relogio.style.color = 'Yellow';
        }

        if (achei.classList.contains('pausar')) {
            stop()
            relogio.style.color = 'Red';
        }

        if (achei.classList.contains('resetar')) {
            reset()
            relogio.style.color = 'Black';
        }
    })

}

relogiao()