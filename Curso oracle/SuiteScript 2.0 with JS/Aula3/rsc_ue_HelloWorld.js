/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */
 define([], function(){
    return {
        afterSubmit: function helloWorld (context) {  // contexto é a página que eu irei colher a informação
            log.debug('Hello World');
        }
    }
});