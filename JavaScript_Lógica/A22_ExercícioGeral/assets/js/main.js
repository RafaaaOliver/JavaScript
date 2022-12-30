
function ExercicioDeMorte() {
    const form = document.querySelector('form');  // atribui os valores do HTML a uma variável
    const resultado = document.querySelector('#resultado')


    function RecebeBotao(evento) {
        evento.preventDefault();
        const pesoTrue = form.querySelector('#peso');
        const alturaTrue = form.querySelector('#altura');  // função para rceber o submit dá pagina e atribuir a variável
        const peso = Number(pesoTrue.value);
        const altura = Number(alturaTrue.value);
        confirmacao(peso, altura);
    }

        function AcharIMC(IMC) {
            if (IMC < 18.5) {
                resultado.innerHTML = `<p id="Grenn"> O seu IMC é: ${IMC.toFixed(2)} (Abaixo do peso) </p>`
            }
            else if (IMC > 18.5 && IMC < 24.9) {
                resultado.innerHTML = `<p id="Grenn"> O seu IMC é: ${IMC.toFixed(2)} (peso normal) </p>`
            }
            else if (IMC > 25 && IMC < 29.9) {
                resultado.innerHTML = `<p id="Grenn"> O seu IMC é: ${IMC.toFixed(2)} (Sobrepeso) </p>`   // função para achar o tipo de IMC
            }
            else if (IMC > 30 && IMC < 34.9) {
                resultado.innerHTML = `<p id="Grenn"> O seu IMC é: ${IMC.toFixed(2)} (Obesidade grau 1) </p>`
            }
            else if (IMC > 35 && IMC < 39.9) {
                resultado.innerHTML = `<p id="Grenn"> O seu IMC é: ${IMC.toFixed(2)} (Obesidade grau 2) </p>`
            }
            else if (IMC > 40) {
                resultado.innerHTML = `<p id="Grenn"> O seu IMC é: ${IMC.toFixed(2)} (Obesidade grau 3) </p>`
            }

        }

        function confirmacao(peso, altura) {
            if ((peso > 300 || peso < 0) || altura < 0) {
                resultado.innerHTML = `<p id="Red"> O Valor informado é inválido! </p>`  // função de confirmação 
            }
            else {
                const IMC = peso / ((altura / 100) ** 2);
                return AcharIMC(IMC); 
            }

        }
        
form.addEventListener('submit', RecebeBotao);  // comando para receber o submit e executar função
    }

ExercicioDeMorte()  // comando que vai ser rodado no console da web para iniciar meu código
