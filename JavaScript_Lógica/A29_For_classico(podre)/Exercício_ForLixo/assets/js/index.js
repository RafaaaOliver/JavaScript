const chesque = document.querySelector('#here')
const nomes = [
    {tag:'h1', texto:'Rafael'},
    {tag:'h1', texto:'Gabriel'},
    {tag:'h1', texto:'Maurício'},
    {tag:'h1', texto:'João'},
];
function Rafael (nomes, chesque) {
    for (let i = 0; i < nomes.length; i++) {
        chesque.innerHTML += `<${nomes[i].tag}> ${nomes[i].texto} <${nomes[i].tag}/> `    
    }
}
Rafael(nomes, chesque)
