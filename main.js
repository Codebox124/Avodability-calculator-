const affordabilityForm = document.getElementById('affordability-form');
const monthlyPaymentElement = document.getElementById('monthly-payment');
const totalInterestElement = document.getElementById('total-interest');
const totalPaymentElement = document.getElementById('total-payment');
const resultElement = document.getElementById('result');
const affordabilityRange = document.getElementById('affordability-range');
const affordabilityOutput = document.getElementById('affordability-output');

function calculateAffordability(event) {
  event.preventDefault();

  const income = Number(document.getElementById('income').value);
  const expenses = Number(document.getElementById('expenses').value);
  const debtToIncomeRatio = Number(document.getElementById('debt-to-income').value);
  const interest = Number(document.getElementById('interest').value);
  const term = Number(document.getElementById('term').value);

  const monthlyIncome = income - expenses;
  const maxMonthlyPayment = monthlyIncome * (debtToIncomeRatio / 100);
  const monthlyInterestRate = (interest / 100) / 12;
  const totalPayments = term * 12;
  const discountFactor = (Math.pow(1 + monthlyInterestRate, totalPayments) - 1) /
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments));

  const monthlyPayment = (maxMonthlyPayment / discountFactor).toFixed(2);
  const totalPayment = (monthlyPayment * totalPayments).toFixed(2);
  const totalInterest = (totalPayment - (maxMonthlyPayment * totalPayments)).toFixed(2);

  monthlyPaymentElement.innerText = `$${monthlyPayment}`;
  totalInterestElement.innerText = `$${totalInterest}`;
  totalPaymentElement.innerText = `$${totalPayment}`;

  const maxHomePrice = (maxMonthlyPayment / (monthlyInterestRate * discountFactor)) *
    (1 - Math.pow((1 + monthlyInterestRate), -totalPayments)).toFixed(2);
  affordabilityRange.value = Math.floor((maxHomePrice / income) * 100);
  affordabilityOutput.innerText = `$${maxHomePrice}`;

  resultElement.style.display = 'block';
}

affordabilityForm.addEventListener('submit', calculateAffordability);

affordabilityRange.addEventListener('input', () => {
  const affordabilityValue = affordabilityRange.value;
  affordabilityOutput.innerText = `$${(affordabilityValue * document.getElementById('income').value / 100).toFixed(2)}`;
});