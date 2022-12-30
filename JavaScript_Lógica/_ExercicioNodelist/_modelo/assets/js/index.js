const paragrafos = document.querySelector('.paragrafos');
const Ps = paragrafos.querySelectorAll('p'); // seleciona todos as tags dentro do div.

const estilosBody = getComputedStyle(document.body) // puxa todo o CSS do body.

const backgroundColorBody = estilosBody.backgroundColor;  // pega o tipo de estilo (pode ser vários)
// e atribui em uma variável.

console.log(backgroundColorBody)

for (let p of Ps){
    // função que está dentro de style que está dentro do p
                         // p.style.color
    p.style.color = "white"   // altera a cor do texto para uma cor específica
    p.style.background = backgroundColorBody  // altera a cor do fundo do paragráfo para a da variável
}