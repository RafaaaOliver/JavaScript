const pontuacaoUsuario = 1000;
const nivelUsuario = pontuacaoUsuario >= 1000 ? 'usuário VIP' : 'Usuário normal';
/** 
 * (condição) 
 * simbolo ? para valor verdadeiro 
 * simbolo : para valor falso
*/

const corUsuario = null;
const corPadrao = corUsuario || 'Preta';

console.log(nivelUsuario, corPadrao)




// if (pontuacaoUsuario >= 1000) {
//     console.log('Usuário VIP');
// }
// else{
//     console.log('Usuário padrão');
// }