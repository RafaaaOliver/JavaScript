try {  //É executado quando não há erros
    console.log(a);
    console.log('Abri um arquivo');
    console.log('Manipulei o arquivo e gerou erro');
    console.log('Fechei o arquivo');
} 
catch(e){
    console.log('Tratando o erro...')
    // É executado quando há erros
}
finally{  // dando erro ou não, o finally é sempre executado (é bom para fechar arquivos)
     console.log('FINALLY: eu sempre sou executado') // sempre é executado 
}