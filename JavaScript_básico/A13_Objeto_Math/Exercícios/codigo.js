const numero = Number(prompt('Digite um número:'));
const numeroTitulo = document.getElementById('PeixinhoDourado');
const texto = document.getElementById('Douradinho');



numeroTitulo.innerHTML = numero;
texto.innerHTML = `Raiz quadrada: <strong>${Math.round(numero ** 0.5)} </strong> <br>
<strong> ${numero} </strong> é inteiro: <strong> ${Number.isInteger(numero)} </strong> <br> 
É NaN: <strong> ${Number.isNaN(numero)} </strong> <br>
Arredondando para baixo:<strong> ${Math.floor(numero)} </strong> <br>
Arredondando para cima:<strong> ${Math.ceil(numero)} </strong> <br>
Com duas casas decimais: <strong> ${numero.toFixed(2)} </strong>`;


        