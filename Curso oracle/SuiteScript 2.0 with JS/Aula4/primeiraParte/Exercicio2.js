/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */
 define([], function(){
    return {                 
        afterSubmit: function (context) {  // contexto é a página que eu irei colher a informação
            var customer = context.newRecord; // puxa a página ou registro para que possamos manipularS
            var idCustomer = customer.getValue('entityid');
            var customerEmail = customer.getValue('email');
            var salesREP = customer.getText('salesrep');
            var cuponCode = customer.getValue('custentity_rsc_coupon_code'); 

            log.audit('id do customer', idCustomer);
            log.audit('E-mail do customer', customerEmail);
            log.audit('Representante de vendas', salesREP);
            log.audit('Cupom Code:', cuponCode);
        }
    }
});     