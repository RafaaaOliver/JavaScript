const nomes = ['Rafael', 'Oliveira', 'Santos'];

for (let i = 0; i < nomes.length; i++){ // pode ser usado para começar com o indice a partir de de certo ponto
    console.log(nomes[i])
}

for (let i of nome) {  // pode ser usado para retornar apenas os valores
    console.log(nomes[i]);
}

for (let i in nomes){
    console.log(nomes[i])  // pesquisa indices dentro de uma lista
}