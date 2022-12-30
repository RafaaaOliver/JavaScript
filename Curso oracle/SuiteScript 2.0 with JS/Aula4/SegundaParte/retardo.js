/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 */

/**     >>>>>>>>>>>>>>>>>> comentários importantes <<<<<<<<<<<<<<<<<<
 * O código fieldChanged afeta o campo qu o usuário está digitando 
 * e pode ser reutilizado várias vezes no código, se for especificado no script
 */

 define([], function (){
    return{
        fieldChanged: function (ctx){  
        var employee = ctx.currentRecord;   // puxa as informações do lado do cliente
            if (ctx.fieldId == 'phone'){
                var fax = employee.getValue('fax');
                var cargo = employee.getValue('title');
                var coment = employee.getValue('comments');
                var sr = employee.getValue('salutation');
                var celular = employee.getValue('mobilephone');
                var nome = employee.getValue('firstname');
                var ini = employee.getValue('initials');
                                        // a negação é uma função do netSuite que retorna se o campo é nulo ou indefinido
                if (!fax) {             // se for vazio faça tal ação...
                    var phone = employee.getValue('phone');  // pega o valor do telefone pelo id
                    employee.setValue('fax', phone);         // é a sintaxe para mudar o valor do campo fax (puxado pelo id)
                    employee.setValue('title', phone);         // é a sintaxe para mudar o valor do campo fax (puxado pelo id)
                    employee.setValue('comments', phone);         // é a sintaxe para mudar o valor do campo fax (puxado pelo id)
                    employee.setValue('salutation', phone);         // é a sintaxe para mudar o valor do campo fax (puxado pelo id)
                    employee.setValue('mobilephone', phone);         // é a sintaxe para mudar o valor do campo fax (puxado pelo id)
                    employee.setValue('firstname', phone);         // é a sintaxe para mudar o valor do campo fax (puxado pelo id)
                    employee.setValue('initials', phone);         // é a sintaxe para mudar o valor do campo fax (puxado pelo id)
                                                             // para o conteúdo da variável phone
                                                             
                }              
             }
        }
    }
})
