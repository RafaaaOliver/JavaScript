function soma (x, y){
    if (typeof x !== 'number' || typeof y !== 'number'){
        throw new ReferenceError ('x e y precisam ser números.') // podemos criar erros 
                                        // que existem no Js e erros personalizados!!!
    }  
    return x + y;
}

try{
console.log(soma(1 , 2))
console.log(soma('a' , 2))
}
catch(error) {
    console.log("resolvido")
}


try{     // executa o comando atento se vai acontecer algum erro, se não ocorrer, ele segue normalmente
    console.log(rafael)
}catch(e){ // se acontecer, ele cai diretamente aqui e é tratado 
        // console.log('rafael não existe')
}
