function retonaHora(data){
    if (data && !(data instanceof Date)){
        throw new TypeError('Esperando instãncia de Date');
    }
    if (!data){
        data = new Date();
    }
    return data.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}

try{
const data = new Date('01-01-1970 12:58:12');
const hora = retonaHora(12);
console.log(hora);
}
catch(e){
    console.log('Trata isso ai mermão')
}
finally{
    console.log('Encerrando...')
}
