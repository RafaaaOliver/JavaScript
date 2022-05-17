Form.addEventListener('submit', // comando para ler o conteúdo do submit
 function (e) { 
    e.preventDefault();    // função para interromper o envio do formulário
    console.log('Evento previnido')
    setResultado('Olá mundo!');
});

function setResultado (msg) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';
    const p = document.createElement('p');  // comando para criar elementos de HTML dentro do js
    p.classList.add('paragrafo-rsultado') // adiciona uma classe no elemento
    p.innerHTML = 'Qualquer coisa';
    resultado.appendChild(p); // comando para inserir o conteúdo dentro do campo já existente
}