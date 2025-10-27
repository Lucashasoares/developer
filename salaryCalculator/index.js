let teste;
const STORAGE_KEY = "salaryCalculatorData";

const horasTotais = {
  horaTotal: JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
};

const horaDigitada = document.getElementById("horaDigitada");
const resultado = document.getElementById("resultado");
const relatorio = document.getElementById("relatorio");
const dias = document.getElementById("dias");
const valorReceber = document.getElementById("valorReceber");
const areaDesfazerUltimoDia = document.getElementById("areaDesfazerUltimoDia");

let resultadoHoras = {};

// --- Botão "Erase Last Day" ---
let btnDesfazerUltimoDia = document.createElement("button");
btnDesfazerUltimoDia.innerText = "ERASE LAST DAY?";
btnDesfazerUltimoDia.classList.add("btn", "btn-warning", "mt-2");
btnDesfazerUltimoDia.style.display = "none";
btnDesfazerUltimoDia.addEventListener("click", desfazerUltimoDia);
areaDesfazerUltimoDia.appendChild(btnDesfazerUltimoDia);

// --- Ao carregar a página, exibe o que estiver salvo ---
if (horasTotais.horaTotal.length > 0) {
  resultadoHoras = tudo();
}

// --- Função para adicionar hora ---
function btnAdicionar() {
  const horaa = horaDigitada.value.trim().replace(',', '.');
  const duasCasasDecimais = /^\d{1,2}(\.\d{1,2})?$/;

  if (duasCasasDecimais.test(horaa)) {
    const valor = parseFloat(horaa); // converte corretamente para número

    if (valor <= 24) {
      horasTotais.horaTotal.push(valor);
      horaDigitada.value = "";

      salvarNoStorage();
      resultadoHoras = tudo();
    } else {
      alert("The number cannot be greater than 24.");
    }
  } else {
    alert("Please type a valid number for the hour (max 2 decimals).");
  }
}

// --- Salva os dados no localStorage ---
function salvarNoStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(horasTotais.horaTotal));
}

// --- Calcula totais e atualiza interface ---
function tudo() {
  dias.innerHTML = "";

  let horaExtra = 0;
  let total = 0;

  horasTotais.horaTotal.forEach((horas, index) => {
    dias.innerHTML += `<br>Day ${index + 1}: ${horas} hours`;

    if (horas > 8) horaExtra += horas - 8;
    total += horas;
  });

  const horaSemExtra = total - horaExtra;

  btnDesfazerUltimoDia.style.display = horasTotais.horaTotal.length
    ? "inline-block"
    : "none";

  relatorio.innerHTML = `
    <strong>Total hours:</strong> ${total.toFixed(2)}<br>
    <strong>Extra hours:</strong> ${horaExtra.toFixed(2)}<br>
    <strong>Regular hours:</strong> ${horaSemExtra.toFixed(2)}
  `;

  return { total, horaExtra, horaSemExtra };
}

// --- Calcula o valor do salário ---
function calcularValor() {
  const valorHoraStr = document.getElementById("valorHora").value.trim().replace(',', '.');

  const valorHoraDuasCasas = /^\d{1,2}(\.\d{1,2})?$/;

  if (!valorHoraDuasCasas.test(valorHoraStr)){
    valorReceber.innerHTML = `<div class="alert alert-danger">Type a valid hour value (max 2 digits before and 2 after the decimal)</div>`;
    return;
  }

  const valorHora = parseFloat(valorHoraStr);

  if (isNaN(valorHora)) {
    valorReceber.innerHTML = `<div class="alert alert-danger">Type hour value</div>`;
  } else if (!resultadoHoras.total) {
    valorReceber.innerHTML = `<div class="alert alert-warning">Type time hour</div>`;
  } else {
    // Valor normal (até 8h por dia)
    const valorReceberNormal = valorHora * resultadoHoras.horaSemExtra;

    // Valor das horas extras (1.5x)
    const valorReceberExtra = (valorHora * 1.5) * resultadoHoras.horaExtra;

    // Total final = normal + extra
    const valorTotal = valorReceberNormal + valorReceberExtra;

    valorReceber.innerHTML = `
      <div class="alert alert-success">
        Normal value to receive: $<strong>${valorReceberNormal.toFixed(2)}</strong><br>
        Extra value to receive: $<strong>${valorReceberExtra.toFixed(2)}</strong><br>
        Salary total (before deductions): $<strong>${valorTotal.toFixed(2)}</strong>
      </div>
    `;
  }
}


// --- Limpa tudo ---
function limpa() {
  dias.innerHTML = "";
  resultado.innerHTML = "";
  valorReceber.innerHTML = "";
  relatorio.innerHTML = "";

  horasTotais.horaTotal = [];
  resultadoHoras = {};

  localStorage.removeItem(STORAGE_KEY);

  horaDigitada.value = "";
  const valorHoraInput = document.getElementById("valorHora");
  if (valorHoraInput) valorHoraInput.value = "";

  btnDesfazerUltimoDia.style.display = "none";
}

// --- Remove o último dia adicionado ---
function desfazerUltimoDia() {
  if (horasTotais.horaTotal.length > 0) {
    horasTotais.horaTotal.pop();
    salvarNoStorage();
    resultadoHoras = tudo();
  } else {
    alert("Don't have time to remove!");
  }
}
