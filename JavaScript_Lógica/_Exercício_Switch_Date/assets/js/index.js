// const divao = document.getElementById('HorarioAtual');
// const data = new Date();
// divao.innerHTML = data.toLocaleDateString(pt-BroadcastChannel, { dateStyle: 'full', timeStyle: 'short' });



 const divao = document.getElementById('divao')
 const HorarioAtual = document.getElementById('HorarioAtual')
 const data = new Date();
 const dia = data.getDate();
 const diaString = data.getDay(); 
 const mes = data.getMonth();  // fazer função
 const ano = data.getFullYear();
 const hora = data.getHours();
 const minuto = data.getMinutes();

 function ZeroAEsquerda(hora){
     if(hora >= 10){
     return hora
     }
     else{
         return `0${minuto}`
     }
 }   

 function ZerinhoAEsquerda(minuto){
     if(minuto >= 10){
     return minuto
     }
     else{
         return `0${minuto}`
     }
 } 


 function Month(mes){
     if (mes === 0){
         return 'Janeiro'
     }
     else if (mes === 1){
         return 'Fevereiro'
     }
     else if (mes === 2){
         return 'Março'
     }
     else if (mes === 3){
         return 'Abril'
     }
     else if (mes === 4){
         return 'Maio'
     }
     else if (mes === 5){
         return 'Junho'
     }
     else if (mes === 6){
         return 'Julho'
     }
     else if (mes === 7){
         return 'Agosto'
     }
     else if (mes === 8){
         return 'Setembro'
     }
     else if (mes === 9){
         return 'Outubro'
     }
     else if (mes === 10){
         return 'Novembro'
     }
     else if (mes === 11){
         return 'December'
     }
 }

 function WeekDay (diaString){
     if (diaString === 0){
         return 'Domingo'
     }

     else if (diaString === 1){
         return 'Segunda-Feira'
     }

     else if (diaString === 2){
         return 'Terça-Feira'
     }
    
     else if (diaString === 3){
         return 'Quarta-Feira'
     }
    
     else if (diaString === 4){
         return 'Quinta-Feira'
     }
    
     else if (diaString === 5){
         return 'Sexta-Feira'
     }
    
     else if (diaString === 6){
         return 'Sábado-Feira'
     }
    
 };


 HorarioAtual.innerHTML = `${WeekDay(diaString)}, ${dia} de ${Month(mes)} de ${ano} <br> Horário: ${ZeroAEsquerda(hora)}:${ZerinhoAEsquerda(minuto)} `