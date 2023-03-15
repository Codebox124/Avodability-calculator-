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



// Get input elements
const incomeInput = document.getElementById("income");
const expensesInput = document.getElementById("expenses");
const interestInput = document.getElementById("interest");
const dtiInput = document.getElementById("debt-to-income");
const slider = document.getElementById("slider");
const output = document.getElementById("output");

// Add event listener to expenses input
expensesInput.addEventListener("input", function() {
  // Calculate DTI ratio
  const income = Number(incomeInput.value);
  const expenses = Number(expensesInput.value);
  const dti = expenses > 0 ? ((income / expenses) * 100).toFixed(2) : 0;

  // Update DTI input field
  dtiInput.value = dti;

  // Update slider position and output message
  slider.value = dti;
  output.innerHTML = `Based on the information you provided, a house at this price should fit comfortably within your budget with a DTI ratio of ${dti}%.`;
});

// Add event listener to interest input
interestInput.addEventListener("input", function() {
  // Calculate monthly interest rate
  const interest = Number(interestInput.value) / 100 / 12;

  // Update slider maximum value
  const maxPrice = calculateMaxPrice();
  slider.max = maxPrice;

  // Update output message
  const dti = Number(dtiInput.value);
  output.innerHTML = `Based on the information you provided, a house at this price should fit comfortably within your budget with a DTI ratio of ${dti}%. The maximum house price you can afford with a ${interestInput.value}% interest rate and a DTI ratio of ${dti}% is $${maxPrice.toFixed(2)}.`;
});

// Add event listener to slider
slider.addEventListener("input", function() {
  // Update output message
  const dti = Number(dtiInput.value);
  const price = Number(slider.value);
  output.innerHTML = `Based on the information you provided, a house at this price should fit comfortably within your budget with a DTI ratio of ${dti}%. You can afford a house up to $${price}.`;
});

// Calculate maximum house price based on input values
function calculateMaxPrice() {
  const income = Number(incomeInput.value);
  const expenses = Number(expensesInput.value);
  const interest = Number(interestInput.value) / 100 / 12;
  const dti = Number(dtiInput.value) / 100;

  return ((income * dti - expenses) / interest).toFixed(2);
}
