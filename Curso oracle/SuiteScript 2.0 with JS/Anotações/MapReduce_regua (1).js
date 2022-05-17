/**
* @NApiVersion 2.x
* @NScriptType MapReduceScript
*
* Régua Cobrança - Refatorada
* @author Alexandre J. Corrêa (https://github.com/AlexandreD3v)
* Refatorado em 24/02/2022
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "N/search", "N/email", "N/render", "N/runtime", "N/log", "N/https", "N/record"], function (require, exports, search_1, email_1, render_1, runtime_1, log_1, https_1, record_1) {
    "use strict";                           
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.map = exports.getInputData = void 0;
    search_1 = __importDefault(search_1);
    email_1 = __importDefault(email_1);
    render_1 = __importDefault(render_1);
    runtime_1 = __importDefault(runtime_1);
    log_1 = __importDefault(log_1);
    https_1 = __importDefault(https_1);
    record_1 = __importDefault(record_1);
    var getInputData = function () {
        try {
            // Correção - Impleentação de script da busca salva
            var dataMais10 = new Date(), diasCont = 0, dataMenos6m = new Date();
            dataMenos6m.setMonth(dataMenos6m.getMonth() - 6);
            // Verifica as faturas que vencem em até 10 dias úteis futuros
            // Enquanto o contador for menor que 10
            while (diasCont < 10) {
                //Verifica se for sábado ou domingo
                //Caso seja dia útil( ou não seja sab ou dom)
                //adiciona +1 dia ao contador e também seta 
                // o proximo dia da semana
                if (dataMais10.getDay() != 6 || dataMais10.getDay() != 0)
                    diasCont++;
                //caso seja sab ou dom, apenas segue para o proximo dia
                dataMais10.setDate(dataMais10.getDate() + 1);
            }
            var sDataConsulta10d = dateToString(dataMais10), sDataConsulta6m = dateToString(dataMenos6m);
            return search_1.default.create({
                type: "customrecord_sit_parcela",
                filters: [
                    ["custrecord_sit_parcela_l_transacao.type", "anyof", "CustInvc"],
                    "AND",
                    ["custrecord_sit_parcela_l_subsidiaria", "anyof", "1"],
                    "AND",
                    ["custrecord_sit_parcela_qui_l_parcela.custrecord_sit_parcela_qui_t_efetivado", "doesnotcontain", "S"],
                    "AND",
                    ["custrecord_rsc_status_cobranca_regua", "noneof", "3", "19", "25", "26"],
                    "AND",
                    ["custrecord_sit_parcela_d_dt_vencimen", "within", sDataConsulta6m, sDataConsulta10d],
                  	"AND",
                  	["internalid", "anyof", 500232]
                ],
                columns: [
                    search_1.default.createColumn({
                        name: "custrecord_sit_parcela_d_dt_vencimen",
                        sort: search_1.default.Sort.DESC, label: "Data de Vencimento"
                    })
                ]
            });
        }
        catch (gierror) {
            log_1.default.error('gierror', gierror);
            return false;
        }
    };
    exports.getInputData = getInputData;
    var map = function (ctx) {
        // Configuração para o map tentar rodar novamente em caso de falha
        config: {
            retryCount: 3;
            exitOnError: true;
        }
        ;
        try {
            // Resultado a ser processado e declaração de variáveis
            var reqRes = JSON.parse(ctx.value), parcela = record_1.default.load({ id: reqRes.id, type: 'customrecord_sit_parcela' }), dtVencimentoGv = parcela.getValue({ fieldId: 'custrecord_sit_parcela_d_dt_vencimen' }), dias = calculateDaysDiff(dtVencimentoGv), data_prorrogada = parcela.getValue('custrecord_rsc_data_prorrogada_parcela') != '' ? new Date(String(parcela.getValue('custrecord_rsc_data_prorrogada_parcela'))) : '', invoiceRec = record_1.default.load({
                type: 'invoice',
                id: parcela.getValue({ fieldId: 'custrecord_sit_parcela_l_transacao' }) 
            }), customer = record_1.default.load({
                type: 'customer',
                id: invoiceRec.getValue({ fieldId: 'entity' })
            }), quantidadeEmails = customer.getLineCount({ sublistId: 'contactroles' }), listaEnvioEmail = getListEmail(quantidadeEmails, customer), dadosEmail = {
                author: runtime_1.default.getCurrentScript().getParameter({ name: 'custscript_rsc_autor' }) ? runtime_1.default.getCurrentScript().getParameter({ name: 'custscript_rsc_autor' }) : "",
                recipients: ['joao.silva@runsmart.cloud'],
                modeloId: 0,
                body: '',
                subject: '',
                faturaId: Number(parcela.getValue({ fieldId: 'custrecord_sit_parcela_l_transacao' }))
            }, feriadosList = feriados(), EMAIL_PREVENTIVO = EmailPreventivo(dtVencimentoGv, invoiceRec.getValue({ fieldId: 'total' })), EMAIL_REATIVO = EmailReativo(dtVencimentoGv, Number(invoiceRec.getValue({ fieldId: 'total' })));
            if (!data_prorrogada) {
                log_1.default.audit('Audit 1 - data_prorrogada:101 - let dias', dias);
                funcaoCanaleta(dias, dadosEmail, parcela, EMAIL_PREVENTIVO, EMAIL_REATIVO, dtVencimentoGv, feriadosList, reqRes);
            }
            else {
                //Verificar se a data está dentro do periodo de processamento (prorrogada >= data_processamento)
                //se possuir prorrogação ativa, o registro não é processado 
                var vencimentoProrrog = calculateDaysDiff(data_prorrogada);
                log_1.default.error('vencimentoProrrog: ', vencimentoProrrog);
                if (Number(vencimentoProrrog) >= 0) {
                    log_1.default.error('Fatura não processada: ', reqRes);
                }
                else {
                    //Se ultrapassar a prorrogação (prorrogada < data_processamento)
                    funcaoCanaleta(dias, dadosEmail, parcela, EMAIL_PREVENTIVO, EMAIL_REATIVO, dtVencimentoGv, feriadosList, reqRes);
                }
            }
        }
        catch (error) {
            log_1.default.error('Resultado dias', error);
        }
    };
    exports.map = map;
    var funcaoCanaleta = function (dias, dadosEmail, parcela, EMAIL_PREVENTIVO, EMAIL_REATIVO, dtVencimentoGv, feriadosList, reqRes) {
        switch (dias) {
            case 10:SS
            case 1:    // Ma <<<< 
                log_1.default.audit('Aviso preventivo ', '1/10 dias antes');
                dadosEmail.modeloId = runtime_1.default.getCurrentScript().getParameter({ name: 'custscript_email_de_cobranca_preventiva' }) ? Number(runtime_1.default.getCurrentScript().getParameter({ name: 'custscript_email_de_cobranca_preventiva' })) : 1;
                dadosEmail.body = EMAIL_PREVENTIVO.body;
                dadosEmail.subject = EMAIL_PREVENTIVO.subject;
                parcela.setValue({
                    fieldId: 'custrecord_rsc_status_cobranca_regua',
                    value: 21
                });
                parcela.setValue({
                    fieldId: 'custrecord_rsc_descricao_da_fatura_parce',
                    value: 'E-mail Preventivo'
                });
                parcela.save({
                    ignoreMandatoryFields: true
                });
                break;
            default:
                log_1.default.audit('Audit 2 - switch default dias:123 - DIAS CORRIDOS', dias);
                if (Number(dias) < -1) {
                    var qtdeDiasUteis = getDiaUtilVencimento(dtVencimentoGv, feriadosList, dias);
                    log_1.default.audit('Audit 3 - switch default dias - qtdeDiasUteis:126', qtdeDiasUteis);
                    switch (qtdeDiasUteis) {
                        case 2:
                        case 3:
                            log_1.default.audit('Aviso reativo ', '2° e 3° dia');
                            dadosEmail.modeloId = runtime_1.default.getCurrentScript().getParameter({ name: 'custscript_rsc_modelo_de_cobraca' }) ? Number(runtime_1.default.getCurrentScript().getParameter({ name: 'custscript_rsc_modelo_de_cobraca' })) : -1;
                            dadosEmail.body = EMAIL_REATIVO.body;
                            dadosEmail.subject = EMAIL_REATIVO.subject;
                            parcela.setValue({
                                fieldId: 'custrecord_rsc_status_cobranca_regua',
                                value: 22
                            });
                            parcela.setValue({
                                fieldId: 'custrecord_rsc_descricao_da_fatura_parce',
                                value: 'E-mail Cobrança'
                            });
                            parcela.save({
                                ignoreMandatoryFields: true
                            });
                            break;
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                            log_1.default.audit('Aviso reativo ', '4 a 9 dias');
                            dadosEmail.modeloId = runtime_1.default.getCurrentScript().getParameter({ name: 'custscript_rsc_modelo_de_cobraca' }) ? Number(runtime_1.default.getCurrentScript().getParameter({ name: 'custscript_rsc_modelo_de_cobraca' })) : -1;
                            dadosEmail.body = EMAIL_REATIVO.body;
                            dadosEmail.subject = EMAIL_REATIVO.subject;
                            parcela.setValue({
                                fieldId: 'custrecord_rsc_status_cobranca_regua',
                                value: 23
                            });
                            parcela.setValue({
                                fieldId: 'custrecord_rsc_descricao_da_fatura_parce',
                                value: 'Contato Telefônico'
                            });
                            parcela.save({
                                ignoreMandatoryFields: true
                            });
                            break;
                        case 10:  
                            log_1.default.audit('Aviso reativo ', '10 dias');
                            dadosEmail.modeloId = runtime_1.default.getCurrentScript().getParameter({ name: 'custscript_rsc_aviso_supencao_email' }) ? Number(runtime_1.default.getCurrentScript().getParameter({ name: 'custscript_rsc_aviso_supencao_email' })) : -2;
                            var mergeResult = render_1.default.mergeEmail({
                                templateId: dadosEmail.modeloId,
                                transactionId: dadosEmail.faturaId,
                                customRecord: { id: reqRes.id, type: 'customrecord_sit_parcela' }
                            });
                            dadosEmail.body = mergeResult.body;
                            dadosEmail.body = dadosEmail.body;
                            dadosEmail.subject = EMAIL_REATIVO.subject;
                            parcela.setValue({
                                fieldId: 'custrecord_rsc_status_cobranca_regua',
                                value: 24
                            });
                            parcela.setValue({
                                fieldId: 'custrecord_rsc_descricao_da_fatura_parce',
                                value: 'Aviso Suspensão'
                            });
                            parcela.save({
                                ignoreMandatoryFields: true
                            });
                            break;
                        case 20:
                            log_1.default.audit('Aviso reativo ', '20 dias');
                            dadosEmail.modeloId = runtime_1.default.getCurrentScript().getParameter({ name: 'custscript_rsc_modelo_suspensao' }) ? Number(runtime_1.default.getCurrentScript().getParameter({ name: 'custscript_rsc_modelo_suspensao' })) : -3;
                            mergeResult = render_1.default.mergeEmail({
                                templateId: dadosEmail.modeloId,
                                transactionId: dadosEmail.faturaId
                            });
                            dadosEmail.body = mergeResult.body;
                            dadosEmail.body = dadosEmail.body;
                            dadosEmail.subject = EMAIL_REATIVO.subject;
                            parcela.setValue({
                                fieldId: 'custrecord_rsc_status_cobranca_regua',
                                value: 25
                            });
                            parcela.setValue({
                                fieldId: 'custrecord_rsc_descricao_da_fatura_parce',
                                value: 'Suspensão Serviços'
                            });
                            parcela.save({
                                ignoreMandatoryFields: true
                            });
                            break;
                        default:
                            if (qtdeDiasUteis > 20) {
                                log_1.default.audit('Aviso reativo ', '20+');
                                parcela.setValue({
                                    fieldId: 'custrecord_rsc_status_cobranca_regua',
                                    value: 25
                                });
                                parcela.setValue({
                                    fieldId: 'custrecord_rsc_descricao_da_fatura_parce',
                                    value: 'Suspensão Serviços'
                                });
                                parcela.save({
                                    ignoreMandatoryFields: true
                                });
                            }
                            break;
                    }
                }
                break;
        }
        log_1.default.audit('Audit 4 - Final parcela', parcela);
        if (dadosEmail.modeloId != 0) {
            sendEmail(dadosEmail);
            log_1.default.audit('Audit 5 - Sucesso dadosEmail', dadosEmail);
            log_1.default.error('Resultado', "Enviaria");
        }
    };
    var getListEmail = function (quantidadeEmails, customer) {
        // Correção - Todos os emails do cliente devem receber o email - 16/03
        try {
            var listaEnvioEmail = [], idContact = void 0, isFiscal = void 0;
            for (var index = 0; index < quantidadeEmails; index++) {
                // Correção para selecionar apenas contatos fiscais
                // Recupera  id do Contato
                idContact = customer.getSublistValue({ sublistId: 'contactroles', fieldId: 'contact', line: index });
                // Então, busca se este contato é um contato fiscal ou não
                isFiscal = search_1.default.lookupFields({ id: idContact, type: 'contact', columns: 'custentity_acs_isrecipientfiscalemail_fl' });
                // Se for um contato fiscal, então é adicionado na lista de envio de email.
                if (isFiscal.custentity_acs_isrecipientfiscalemail_fl) {
                    listaEnvioEmail.push(idContact);
                    log_1.default.audit('Contato fiscal', idContact);
                }
                else {
                    log_1.default.audit('Contato não fiscal', idContact);
                }
            }
            return listaEnvioEmail;
        }
        catch (e) {
            log_1.default.error('Error getListEmail', e);
            return null;
        }
    };
    var EmailPreventivo = function (data_de_vencimento, valor) {
        valor = Number(valor).toFixed(2);
        var formatDate = strinfiedDate(new Date(data_de_vencimento)), body = "Ol\u00E1 prezado cliente, tudo bem? <br>\n        Para a sua comodidade, lembramos que sua fatura vencer\u00E1 em ".concat(formatDate, ", no valor de R$ ").concat(valor, ".<br>\n        <br>\n\n        Caso tenha alguma d\u00FAvida ou quiser saber sobre seus pr\u00F3ximos vencimentos, \u00E9 s\u00F3 entrar em contato com a gente pelo e-mail faturamento@intelipost.com.br ou telefone.\n        Conte sempre conosco! \n\n        <br>\n        <br>\n        Equipe de Faturamento Intelipost.<br>\n        +55 (11) 4210-2822\n\n        "), subject = "Intelipost - Lembrete de vencimento da sua fatura em ".concat(formatDate);
        return { body: body, subject: subject };
    };
    var EmailReativo = function (data_de_vencimento, valor) {
        valor = Number(valor).toFixed(2);
        var formatDate = strinfiedDate(new Date(data_de_vencimento)), body = "Ol\u00E1, prezado cliente. <br>\n        <br>\n        N\u00F3s sabemos que imprevistos acontecem, n\u00E3o \u00E9 mesmo? \u00C9 por isso que estamos entrando em contato para avis\u00E1-lo que sua fatura venceu em ".concat(formatDate, ", no valor de R$ ").concat(valor, ".<br>\n        Para regularizar seu d\u00E9bito voc\u00EA pode utilizar o mesmo boleto encaminhado no momento do faturamento.<br>\n        <br>\n        Precisa de ajuda? Entre em contato atrav\u00E9s do nosso telefone ou mande um e-mail para faturamento@intelipost.com.br.<br>\n\n        <br>\n        Conte sempre conosco! <br>\n        Equipe de Faturamento Intelipost.<br>\n        +55 (11) 4210-2822\n        "), subject = "Intelipost - Sua fatura venceu em ".concat(formatDate);
        return { body: body, subject: subject };
    };
    var strinfiedDate = function (date) {
        // Se o número for menor que 10, concatena-se o '0' na frente
        // caso seja maior, somente se retorna o valor
        try {
            var sDate = String(date).replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"), dataFinalObj = new Date(sDate);
            return dateToString(dataFinalObj);
        }
        catch (e) {
            log_1.default.error('Erro strinfiedDate', e);
            return false;
        }
    };
    var dateToString = function (date) {
        var day = date.getDate(), sday = (day < 10) ? "0".concat(day) : "".concat(day), month = date.getMonth() + 1, smonth = (month < 10) ? "0".concat(month) : "".concat(month), year = date.getFullYear();
        return " ".concat(sday, "/").concat(smonth, "/").concat(year);
    };
    var feriados = function () {
        try {
            var ano_param = runtime_1.default.getCurrentScript().getParameter({ name: 'custscript_rsc_ano_param' }) ? runtime_1.default.getCurrentScript().getParameter({ name: 'custscript_rsc_ano_param' }) : 2022, urlp = "https://brasilapi.com.br/api/feriados/v1/".concat(ano_param), api = https_1.default.get({
                url: urlp
            }), api_json = JSON.parse(api.body);
            return api_json;
        }
        catch (error) {
            log_1.default.error('Erro feriado', error);
            return false;
        }
    };
    var calculateDaysDiff = function (date) {
        // Criando objeto de data com regex
        try {
            var sDate = String(date).replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"), dataFinalObj = new Date(sDate), diffInMiliseconds = Math.abs(new Date().getTime() - dataFinalObj.getTime()), retorno = Math.ceil(diffInMiliseconds / (1000 * 60 * 60 * 24));
            log_1.default.error('dataFinalObj', dataFinalObj);
            return (new Date() > dataFinalObj) ? -(retorno - 1) : retorno;
        }
        catch (e) {
            log_1.default.error('Error calculateDaysDiff', e);
            return null;
        }
    };
    var getDiaUtilVencimento = function (dtVencimentoGv, feriadosList, diasCont) {
        try {
            var s_date_vencimento_1 = String(dtVencimentoGv).replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"), dtVencimento = new Date(s_date_vencimento_1), diasUteis = 0, diasFeriados_1 = 0;
            if (diasCont < 0)
                diasCont = -1 * diasCont;
            if (diasCont > 30)
                return diasCont;
            dtVencimento.setDate(dtVencimento.getDate() + 1);
            for (var index = 0; index < diasCont; index++) {
                if (!(dtVencimento.getDay() == 6 || dtVencimento.getDay() == 0))
                    diasUteis++;
                dtVencimento.setDate(dtVencimento.getDate() + 1);
            }
            ;
            feriadosList.forEach(function (value_feriado) {
                var s_dt_value_feriado = String(value_feriado["date"]).replace(/(\d{4})-(\d{2})-(\d{2})/, "$2/$1/$3"), feriadoP = new Date(s_dt_value_feriado);
                if (new Date(s_date_vencimento_1).getTime() < feriadoP.getTime() && feriadoP.getTime() < new Date().getTime())
                    diasFeriados_1++;
            });
            return diasUteis - diasFeriados_1;
        }
        catch (e) {
            log_1.default.error('Eroor getDiaUtilVencimento', e);
            return false;
        }
    };
    var sendEmail = function (dadosEmail) {
        log_1.default.debug('Dados', dadosEmail);
        var mergeResult = render_1.default.mergeEmail({
            templateId: dadosEmail.modeloId,
            transactionId: Number(dadosEmail.faturaId)
        });
        log_1.default.debug('Merger', mergeResult);
        try {
            email_1.default.send({
                author: dadosEmail.author,
                recipients: [dadosEmail.recipients],
                //recipients: ['joao.silva@runsmart.cloud'], //TESTE - DEVE SER APAGADO
                //bcc: ['faturamento@intelipost.com.br', 'larissa.pereira@intelipost.com.br'],
                subject: dadosEmail.subject,
                body: dadosEmail.body,
                relatedRecords: {
                    transactionId: dadosEmail.faturaId
                },
                attachments: dadosEmail.hasOwnProperty('attachments') ? dadosEmail.attachments : ''
            });
        }
        catch (e) {
            log_1.default.debug('Eroor', e);
        }
    };
});
