// this, faz referência ao nome do objeto
const pessoa1 = {
    nome: 'Rafael',
    sobrenome: 'Oliveira',
    idade: 25,

    fala() {
        console.log(`${this.nome} ${this.sobrenome} está dizendo oi...`);
    },

    alteraNome(nome) {
        this.nome = nome
        console.log(`Meu novo nome é: ${this.nome}`)
    }
};
console.log(pessoa1.nome);
pessoa1.alteraNome('José');
