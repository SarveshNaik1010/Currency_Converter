const btnConvert = document.querySelector(".btn-convert");
const resultDiv = document.getElementById("result");

// async function convertCurrency(from, to, amount) {
//   // Dummy conversion rates
//   const rates = {
//     USD: { EUR: 0.91, INR: 83, JPY: 154 },
//     EUR: { USD: 1.1, INR: 91, JPY: 170 },
//     INR: { USD: 0.012, EUR: 0.011, JPY: 1.87 },
//     JPY: { USD: 0.0065, EUR: 0.0058, INR: 0.53 },
//   };

//   console.log(convert(from, to, amount));

//   if (from === to) return amount;
//   const rate = rates[from]?.[to];

//   if (!rate) {
//     throw new Error("Conversion rate is not available");
//   }

//   return (amount * rate).toFixed(2);
// }

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
