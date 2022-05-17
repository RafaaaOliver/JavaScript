// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date
// Date(0) é o primeiro registro de hora existente 
 
// const data = new Date();  // colocar o horário atual em uma viariável
// console.log(data.toString())   // formata a data com horário e fuso-horário
// console.log(data.toDateString())   // formata a data para MM/DD//AA

// const data = new Date(2002, 0, 29, 11);  // Ano, Mês, Dia, Hora, Minuto, Segundo, Mili segundo

// em formato de input, os meses vão de 0 - 11

const data = new Date('2002-1-29 11:00:00');  // em formato de string, os meses vão de 1 - 12
console.log('Dia', data.getDate());
console.log('Mês', data.getMonth() +1);  // Mês começa do zero
console.log('Ano', data.getFullYear());
console.log('Hora', data.getHours());
console.log('Min', data.getMinutes());
console.log('Seg', data.getSeconds());
console.log('ms', data.getMilliseconds());
console.log('Dia semana', data.getDay());  // 0 é domingo, 6 é Sábado
console.log(data.toString());

console.log(Date.now()); // retorna a data em mili segundos
const dataMili = new Date(1649256737628);
console.log(dataMili.toString());