/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */
 define([], function(){
    return {                 
        beforeSubmit: function (context) {  // contexto é a página que eu irei colher a informação
            log.audit('id do customer', idCustomer);
        }
    }
});     