function Matador(){
    const inputTarefa = document.querySelector('.NovaTarefa');
    const botaoTarefa = document.querySelector('.ButtonNovaTarefa');
    const tarefas = document.querySelector('.tarefas');

function criaLi(){
    const li = document.createElement('li');  // cria a tag (li) dentro da variável
    return li;
}

function salvarTarefas(){   
    const liTarefas = tarefas.querySelectorAll('li')   // seleciona todos as tags (li) que estão como child de tarefas
    const listaDeTarefas = [];        // lista de tarefas
    for (let tarefa of liTarefas){          // para cada indice em liTarefas, busca apenas o resultado 
        let tarefaTexto = tarefa.innerText  // cria uma variável com o texto da tag 
        tarefaTexto = tarefaTexto.replace('Remover', '').trim()  // procura "Remover" na string e substitui por '' (anula)
        listaDeTarefas.push(tarefaTexto)   // adiciona o texto de uma li para dentro de uma lista
                                                     // >>>>>>> a função .trim() remove o espaço da string <<<<<<<<
    const tarefasJSON = JSON.stringify(listaDeTarefas);  // JSON.stringify converte um elemento JS para uma string no formato JSON
    localStorage.setItem('tarefas', tarefasJSON);  // só pode ser salvo como string, por isso convertemos o JSON para string
    } // guarda os itens com o set
}

function criaBotaoApagar(li){
    li.innerText += ' ';  // apenas para dar um espaço entre a string e o botão
    const botaoApagar = document.createElement('button');     //  criação do botão em uma variável
    botaoApagar.innerText = 'Remover'    // mudando o texto do botão
    li.appendChild(botaoApagar)  // cria uma tag filha   (pai).appendChild(filho)
    botaoApagar.setAttribute('class', 'apagar')     // colocando a classe "apagar" no botão
    botaoApagar.setAttribute('title', 'Gabriel é viado')    // título interno
}

function limpaInput() {
    inputTarefa.value = '';  // limpa o campo do formulário
    inputTarefa.focus();    //põe o cursor no campo e fica piscando (também funciona no TAB)
}

function retornaTarefas(){
    const tarefas = localStorage.getItem('tarefas');   // pega os itens (tarefas) do storage e insere na variável
    const listaDeTarefas = JSON.parse(tarefas);  // converte uma string do formato JSON para um objeto JS
    for (let tarefa of listaDeTarefas){   // para cada tarefa na lista de tareas, retorne o value
        criaTarefa(tarefa);    // cria a tarefa para que ela possa ser copiada do storage para o html
    }
}
function criaTarefa(tarefa){
    const li = criaLi();    // usa a função de cirar Li
    li.innerText = tarefa   // coloca o conteúdo que foi puxado do botãoTarefa e passado como parametro
    tarefas.appendChild(li) // adiciona a tag li dentro de alguma que possui a classe tarefas
    limpaInput()            // usa a função de limpar o unput
    criaBotaoApagar(li);     // usa a função de criar o botão de apagar
    salvarTarefas();
}

    botaoTarefa.addEventListener('click', function(e) {     // captura o click e seu evento
        if (!inputTarefa.value) return;  // se o valor do input for fazio, retorne o input
        criaTarefa(inputTarefa.value)    // passa o valor do input para uma outra função        
    })

    inputTarefa.addEventListener('keypress', function(e){
        if(e.keyCode === 13){      // 13 é a key da tecla enter
        if (!inputTarefa.value) return;  // se o input tiver algum valor, o retorna
        criaTarefa(inputTarefa.value)    // usa a função cria tarefa
    }
    });

    document.addEventListener('click', function(e){
        const el = e.target;  // passa o valor do click do mouse para uma variável
        if (el.classList.contains('apagar')){   // se o objeto clicado tiver a classe "apagar" faça:
            // console.log(el.parentElement)    // podemos printar o pai do elemento
            el.parentElement.remove();  // remove o pai do elemento
            salvarTarefas();  // vai servir para atualizar o mini banco de dados do JSON  em Console > aplication > storage > local stroge > file
        }
        
    })
retornaTarefas()



}
Matador()    // usa a função completa