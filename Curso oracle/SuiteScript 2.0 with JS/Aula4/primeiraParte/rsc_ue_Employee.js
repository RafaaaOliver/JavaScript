    /**
     * @NApiVersion 2.0
     * @NScriptType UserEventScript
     */
 define([], function(){
    return {                 
        beforeSubmit: function (context) {  // contexto é a página que eu irei colher a informação
            var employee = context.newRecord; // puxa a página ou registro para que possamos manipularS
            var empCode = employee.getValue('custentity_rsc_employee_code');   // pega o conteúdo do campo employee code
            var supervisorName = employee.getText('supervisor');  // pega o conteúdo do campo supervisor
            var supervisorID =  employee.getValue('supervisor');  // pega o ID interno do campo supervisor
            
            var moeda = employee.getText('currency')   // pega o conteúdo do campo moeda
            var notas = employee.getValue('comments')   // pega o conteúdo do campo subsidiária 

            notas = moeda;  // substutui o conteúdo da subsidiária pela moeda
            notas = 'agora isso aqui vale centavos!!!'  // atribui o valor de uma string para o campo

            var TesteSub = employee.setValue('comments', notas) // tentativa de mudar o campo

            log.debug('arrependimento', TesteSub);
            log.debug('Employee Code', empCode);  // o log.debug(titulo, detalhe) no detalhe podem ser inseridos strings e variáveis
                                                  // e tem um limite de caracter maior
            log.debug('Nome do surpervisor', supervisorName);
            log.debug('ID do supervisor', supervisorID);
                                                            // o log.debug printa as ações dentro do NetSuite 
                                                            // em script > histórico de execução
            log.debug('Valor da moeda', moeda);
            log.debug('notas substituida por moeda', notas);
       
        }
    }
});