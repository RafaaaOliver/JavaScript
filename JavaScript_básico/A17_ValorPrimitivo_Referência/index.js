/*
Primitivos (imutáveis) - string, number, boolean, undefined,
null (bigint, symbol) --> Valores copiados <--

Referência (mutável) - Array, object, function --> Passados por referência <--
*/
let a = [1, 2, 3];
let b = [...a]; // o valor de a é copiado para b (que agora é independente)
let c = b;

// >>>>>>>>> Exemplo com objeto <<<<<<<<<

const pessoa = {
    nome: 'Rafael',
    sobrenome: 'Oliveira' 
};
const j = {...a}  // o valor de pessoa é copiado para j (que agora é independente)
const i = pessoa // aponta para o mesmo valor que pessoa