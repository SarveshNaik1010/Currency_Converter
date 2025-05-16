const btnConvert = document.querySelector(".btn-convert");
const resultDiv = document.getElementById("result");

async function convertCurrency(from, to, amount) {
  const res = await fetch(
    `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
  );
  const data = await res.json();
  return data.rates[to];
}

async function handleConversion() {
  resultDiv.textContent = "Converting...";
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;

  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = "Please enter a valid amount.";
    return;
  }

  try {
    const result = await convertCurrency(from, to, amount);
    resultDiv.textContent = `${amount} ${from} = ${result} ${to}`;
  } catch (error) {
    resultDiv.textContent = error.message;
  }
}

btnConvert.addEventListener("click", handleConversion);
