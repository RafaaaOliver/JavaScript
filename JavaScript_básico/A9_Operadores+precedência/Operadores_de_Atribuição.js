// No JavaScript o auto incremento é feito com ++
// NaN = Not a Number - alguma conta com uma string dentro
let contador = 0;
contador ++;
console.log(contador);

// incremento de 1 em 1

let frescura = 1; 
++frescura;  // pré incremento faz primeiro a operação, depois retorna o valor
frescura ++; // pós incremento retorna o valor e depois mostra a operação
console.log(frescura);

let logica = 0;
let aux = 25;
logica += aux; 
logica += aux; // podemos usar += desde que a variável não esteja vazia!!! <-----------------------
logica += aux;
logica += aux;
console.log(logica);


