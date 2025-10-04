const horasTotais = {
    horaTotal: []
}

const horaDigitada = document.getElementById("horaDigitada");
const resultado = document.getElementById("resultado");
const relatorio = document.getElementById("relatorio");
const dias = document.getElementById("dias");
const valorReceber = document.getElementById("valorReceber");
const areaDesfazerUltimoDia = document.getElementById("areaDesfazerUltimoDia");

let resultadoHoras = {};

function btnAdicionar() {
    const horaa = horaDigitada.value.trim();

    if (horaa !== "") {
        horasTotais.horaTotal.push(horaa);

        horaDigitada.value = "";

        mostrarObjeto();
        resultadoHoras = tudo(); 
    }
}

function mostrarObjeto() {
    //resultado.textContent = JSON.stringify(horasTotais, null, 2);   
}


let btnDesfazerUltimoDia = document.createElement("button");
btnDesfazerUltimoDia.innerText = "ERASE LAST DAY";
areaDesfazerUltimoDia.appendChild(btnDesfazerUltimoDia);
btnDesfazerUltimoDia.style.display = "none";
btnDesfazerUltimoDia.addEventListener("click", desfazerUltimoDia);


function tudo() {

    dias.innerHTML = "";

    var horaExtra = 0;
    var total = 0;
    var horaSemExtra = 0;
    horasTotais.horaTotal.map((first, secound) => {
        console.log(`Day ${secound + 1}: ${first} hours`);
        dias.innerHTML += `<br>Day ${secound + 1}: ${first} hours`
        if (first > 8) {
            var extra = first - 8;
            horaExtra = horaExtra + extra;
            //console.log("hora extra: " + horaExtra);
            //console.log("extra " + extra);        
        }
        total = total + parseFloat(first);
        //console.log(" aqui e o total " + total);
        horaSemExtra = total - horaExtra;
        //console.log("Valor total sem Extra " + horaSemExtra)

    })

    if (horasTotais.horaTotal.length > 0){
        btnDesfazerUltimoDia.style.display = "inline-block";
    } else {
        btnDesfazerUltimoDia.style.display = "none";
    }

    relatorio.innerHTML = 
        "Hour total: " + total + " hours, </br>" +
        "Extra hours: " + horaExtra + " hours,  </br>" +
        "Normal hour without extra: " + horaSemExtra + " hours";

    console.log("Hora total " + total + " horas");
    console.log("Horas extras " + horaExtra + " horas");
    console.log("Hora normal sem extra " + horaSemExtra + " horas");

    return { total, horaExtra, horaSemExtra };

}

function calcularValor() {

    const valorHora = document.getElementById("valorHora").value;

    if (valorHora === "" || valorHora === NaN) {
        valorReceber.innerHTML = "Type hour value"
    } else {

        const valorSalario = valorHora * resultadoHoras.total;
        const valorReceberNormal = valorHora * resultadoHoras.horaSemExtra;
        const valorReceberExtra = (valorHora * 1.5) * resultadoHoras.horaExtra;
        const valorLiquido = valorSalario - (valorSalario * 0.0755);

        valorReceber.innerHTML =
            "Normal value to receive: $ <strong>" + valorReceberNormal.toFixed(2) + "</strong><br>" +
            "Extra value to receive: $ <strong>" + valorReceberExtra.toFixed(2) + "</strong><br>" +
            "Salary total without discount: $ <strong>" + valorSalario.toFixed(2) + "</strong>"+ "</strong><br>";
            //"Salary final: $ <strong>" + valorLiquido.toFixed(2) + "</strong>";
        //alert("valor resultadoHoras.total " + resultadoHoras.total)
    }
}

function limpa() {
    dias.innerHTML = "";
    resultado.innerHTML = "";
    valorReceber.innerHTML = "";
    relatorio.innerHTML = "";

    horasTotais.horaTotal = [];

    resultadoHoras = {}; 

    horaDigitada.value = "";
    const valorHoraInput = document.getElementById("valorHora");
    if (valorHoraInput) valorHoraInput.value = "";
}

function desfazerUltimoDia() {
    if (horasTotais.horaTotal.length > 0) {
        horasTotais.horaTotal.pop();
        resultadoHoras = tudo();
    } else {
        alert("Don't have time to remove!");
    }
}

//==================================================
// let numeros = [5, 3, 2, 5];

// let total = numeros.reduce((acumulador, numero, indice, original) => {
//     console.log(`${acumulador} - total ate o momento`);
//     console.log(`${numero} - valor atual`);
//     //console.log(`${indice} - indice atual`);
//     //console.log(`${original} - array original`);
//     console.log("========================")

//     return acumulador += numero;
// })

// console.log("O valor total foi " + total)

// let horas = [9, 6.5, 8, 5, 9, 8.5, 4, 7, 4.5];

// let horaTotal = horas.reduce((first, secound) =>{
//     return first += secound;
// });
// console.log("hora total " + horaTotal);