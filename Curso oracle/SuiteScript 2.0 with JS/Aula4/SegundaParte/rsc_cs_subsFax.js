/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 */

/**     >>>>>>>>>>>>>>>>>> comentários importantes <<<<<<<<<<<<<<<<<<
 * O código fieldChanged afeta o campo qu o usuário está digitando 
 * e pode ser reutilizado várias vezes no código, se for especificado no script
 */

define([], function (){
    function fieldChanged(ctx){  
        var employee = ctx.currentRecord;   // puxa as informações do lado do cliente
            if (ctx.fieldId == 'phone'){
                var fax = employee.getValue('fax');
                                        // a negação é uma função do netSuite que retorna se o campo é nulo ou indefinido
                if (!fax) {             // se for vazio faça tal ação...
                    var phone = employee.getValue('phone');  // pega o valor do telefone pelo id
                    employee.setValue('fax', phone);         // é a sintaxe para mudar o valor do campo fax (puxado pelo id)
                                                             // para o conteúdo da variável phone
                    }    
             }
        }
        function saveRecord(ctx){    // é usado para validação, é o ultimo ponto antes de ser enviado para o servidor
                                     // é uma confirmação, onde podemos passar alerts para fazer uma ação antes de enviar
            var employee = ctx.currentRecord;
            var empCode = employee.getValue('custentity_rsc_employee_code')
            if (!empCode){
                alert('Preencha a merda do campo: EMPLOYEE CODE!!!')
                return false
            }
            if (empCode == 'gabriel'){    
                alert('Opa, parado ai amigão, Esse cara é viado!!!')
                return false    // se falso, o campo não será preenchido
            }
            if (empCode == 'rafael'){
                alert('Esse ai é do bão, pode passar :)')
                return true     // se verdadeiro, o campo será preenchido
            }
        }

        function validateField(ctx){  // cobra o campo sempre que o usuário clicka fora dele
            var employee = ctx.currentRecord

            if(ctx.fieldId == 'title') {
                var cargo = employee.getValue('title');
                if (cargo == 'x') {
                    alert('Invalid Employee Code value. por favor, tente novamente.');
                    return false
                }

            }
            return true
        }

    return{
        fieldChanged: fieldChanged,   // para chamar a função em SuiteScript, nós chamamos a função assim
        saveRecord: saveRecord,       // a chamamos como objetos (separados por virgula)
        validateField: validateField
    }
})
