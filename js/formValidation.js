function handleFormInputChange() {
  const alertContainer = document.getElementById('alertContainer');
  const button = document.getElementById('calculateBtn');
  const loanAmount = Number(document.getElementById('loanAmountInput').value);
  const tableBody = document.getElementById('results');
  const payments = Number(document.getElementById('paymentsInput').value);
  const rate = Number(document.getElementById('rateInput').value);
  const totalMonthlyPayment = document.getElementById('monthlyPaymentContainer');
  const totalPrincipal = document.getElementById('totalPrincipalContainer');
  const totalInterest = document.getElementById('totalInterestContainer');
  const totalCost = document.getElementById('totalCostContainer');


  button.classList.remove('disabled');
  alertContainer.innerHTML = '';
  tableBody.innerHTML = '';
  totalMonthlyPayment.innerText = '';
  totalPrincipal.innerText = '';
  totalInterest.innerText = '';
  totalCost.innerText = '';

  try {
    validateLoanAmount(loanAmount);
    validatePayments(payments);
    validateRate(rate);
  } catch (error) {
    button.classList.add('disabled');
    displayValidationAlert(error.message);
  }
}

// validating user input
/* validations performed:
    - Loan Amount:
      - range 100.00 - 300 000.00
    - Payments:
      - integer
      - range 1 - 120
    - Rate
      - range 1 - 9
  */

function isInt(input) {
  const number = Number(input);

  return Number.isInteger(number);
}

function isInRange(number, lowerValue, upperValue) {
  return number >= lowerValue && number <= upperValue;
}

function validateLoanAmount(loanAmount) {
  if (isInRange(loanAmount, 100, 300000) === false) {
    throw new Error('Loan amount has to be in 100 - 300 000 range');
  }
}

function validatePayments(paymentsValue) {
  if (isInt(paymentsValue) === false) {
    throw new Error('Payments value has to be an integer');
  }

  if (isInRange(paymentsValue, 1, 120) === false) {
    throw new Error('Payments Value has to be in 1 - 120 range');
  }
}

function validateRate(rateAmount) {
  if (isInRange(rateAmount, 1, 9) === false) {
    throw new Error('Rate % has to be in 1 - 9 range');
  }
}

function displayValidationAlert(message) {
  const alertContainer = document.getElementById('alertContainer');
  const alertTemplate = document.getElementById('alertTemplate');
  const templateContent = document.importNode(alertTemplate.content, true);
  const messageParagraph = templateContent.querySelector('p');

  alertContainer.innerHTML = '';
  messageParagraph.innerText = message;
  alertContainer.appendChild(templateContent);
}
