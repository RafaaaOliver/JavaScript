/**
 * @NScriptType ClientScript
 * @NApiVersion 2.0
 */

 define([], function(){

    function fieldChanged(ctx){  // o script é executado toda vez que clickamos no campo
        var customer = ctx.currentRecord;  // variável com o conteúdo do evento
        var apply = customer.getValue('custentity_sdr_apply_coupon_rafael'); // campo checkbox (esse tipo de campo retorna booleano)
        var campoID = customer.getField('custentity_rsc_coupon_code');  // Id do campo do coupon
        
        if (ctx.fieldId == 'custentity_sdr_apply_coupon_rafael'){ // condição para saber se é o campo que quero executar o código
            if(apply == true){    // se o campo retornar true, faça:
                campoID.isDisabled = false;   // pega o campo e desabilita ele
                customer.setValue({          // sintaxe do setValue (dúvidas consultar o help do NetSuite)
                    fieldId: 'custentity_rsc_coupon_code',  // id do campo
                    value: null,                            // valor a ser inserido
                    ignoreFieldChange: false,               
                    forceSyncSourcing: false
                })            
            }
            else{
                campoID.isDisabled = true;  // habilita o campo 
            }
        }
    }

    function saveRecord(ctx){
        var customer = ctx.currentRecord;
        var field = customer.getValue('custentity_rsc_coupon_code');
        log.debug('tamanho da string', field.length)
        if (field.length > 5){
            alert('Por favor, digite no máximo cinco caracteres')
            return false
        }
        else{
            return true
        }
        
    }

    return{
        fieldChanged: fieldChanged,
        saveRecord: saveRecord
    }  
})
