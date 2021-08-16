// controller function

function handleCalculateBtnClick() {
  const loanAmount = Number(document.getElementById("loanAmountInput").value);
  const paymentPeriods = Number(document.getElementById("paymentsInput").value);
  const rate = Number(document.getElementById("rateInput").value);

  const totalMonthlyPayment = calculateTotalMonthlyPayment(
    loanAmount,
    rate,
    paymentPeriods
  );
   
  const tableRows = populateTableRows(loanAmount, paymentPeriods, totalMonthlyPayment, rate);

  

  displayTotalMonthlyPayment(totalMonthlyPayment);
}

// logic functions

function calculateTotalMonthlyPayment(loanAmount, rate, paymentPeriods) {
  // total monthly payment = (amount loaned) * (rate / 1200) / (1 - (1 + rate / 1200)^(- Number of Months))
  const result = (
    (loanAmount * (rate / 1200)) / (1 - (1 + rate / 1200) ** (-paymentPeriods))
  );

  return result.toFixed(2);
}

function calculateRemainingBalance(
  previousRemainingBalance,
  principalPayments
) {
  return (previousRemainingBalance - principalPayments).toFixed(2)
}

function calculateInterestPayment(previousRemainingBalance, rate) {
  return ((previousRemainingBalance * rate) / 1200).toFixed(2);
}

function calculatePrincipalPayment(totalMonthlyPayment, interestPayment) {
  return (totalMonthlyPayment - interestPayment).toFixed(2);
}

function populateTableRows(loanAmount, paymentPeriods, totalMonthlyPayment, rate) {
  const tableRows = [];

  // populate table columns
  for (let i = 0; i < paymentPeriods; i++) {
    const tableRow = calculateTableRow(i, tableRows[i - 1], loanAmount, rate, totalMonthlyPayment)

    tableRows.push(tableRow);
  }

  return tableRows;
}

function calculateTableRow(index, previousRow, loanAmount, rate, totalMonthlyPayment) {
  // first row previous remaining balance and previous interest values cannot be read from previous row object 
  let previousRemainingBalance = 0;
  let previousInterest = 0;

  if(previousRow === undefined) {
    previousRemainingBalance = loanAmount;
    previousInterest = 0;
  }else {
    previousRemainingBalance = previousRow.remainingBalance;
    previousInterest = previousRow.interest;
  }

  

  const tableRow = {
    month: index + 1,
    payment: Number(totalMonthlyPayment),
    interest: 0,
    principal: 0,
    totalInterest: 0,
    remainingBalance: 0,
  }

  tableRow.interest = Number(calculateInterestPayment(previousRemainingBalance, rate));
  tableRow.principal = Number(calculatePrincipalPayment(totalMonthlyPayment, tableRow.interest));
  tableRow.totalInterest = Number(previousInterest) + tableRow.interest;
  tableRow.remainingBalance = Number(calculateRemainingBalance(previousRemainingBalance, tableRow.principal));

  return tableRow;
}

// view functions

function displayTotalMonthlyPayment(value) {
  var container = document.getElementById("monthlyPaymentContainer");

  container.innerText = `$${value}`;
}
