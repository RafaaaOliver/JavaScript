/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */
 define([], function(){
    return {
        afterSubmit: function helloWorld (context) {
            log.debug('Primeiro teste de log - Rafael Oliveira');
        }
    }
});