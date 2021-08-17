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

  const tableRows = populateTableRows(
    loanAmount,
    paymentPeriods,
    totalMonthlyPayment,
    rate
  );

  const totalInterest = tableRows[tableRows.length - 1].totalInterest;

  displayAmortizationTable(tableRows);
  displayTotalElement(loanAmount, 'totalPrincipalContainer');
  displayTotalElement(totalMonthlyPayment, 'monthlyPaymentContainer');
  
  
}

// logic functions

function calculateTotalMonthlyPayment(loanAmount, rate, paymentPeriods) {
  // total monthly payment = (amount loaned) * (rate / 1200) / (1 - (1 + rate / 1200)^(- Number of Months))
  const result =
    (loanAmount * (rate / 1200)) / (1 - (1 + rate / 1200) ** -paymentPeriods);

  return result;
}

function calculateRemainingBalance(
  previousRemainingBalance,
  principalPayments
) {
  return previousRemainingBalance - principalPayments;
}

function calculateInterestPayment(previousRemainingBalance, rate) {
  return (previousRemainingBalance * rate) / 1200;
}

function calculatePrincipalPayment(totalMonthlyPayment, interestPayment) {
  return totalMonthlyPayment - interestPayment;
}

function populateTableRows(
  loanAmount,
  paymentPeriods,
  totalMonthlyPayment,
  rate
) {
  const tableRows = [];

  // populate table columns
  for (let i = 0; i < paymentPeriods; i++) {
    const tableRow = calculateTableRow(
      i,
      tableRows[i - 1],
      loanAmount,
      rate,
      totalMonthlyPayment
    );

    tableRows.push(tableRow);
  }

  return tableRows;
}

function calculateTableRow(
  index,
  previousRow,
  loanAmount,
  rate,
  totalMonthlyPayment
) {
  // first row previous remaining balance and previous interest values cannot be read from previous row object
  let previousRemainingBalance = 0;
  let previousTotalInterest = 0;

  if (previousRow === undefined) {
    previousRemainingBalance = loanAmount;
    previousTotalInterest = 0;
  } else {
    previousRemainingBalance = previousRow.remainingBalance;
    previousTotalInterest = previousRow.totalInterest;
  }

  const tableRow = {
    month: index + 1,
    payment: Number(totalMonthlyPayment),
    interest: 0,
    principal: 0,
    totalInterest: 0,
    remainingBalance: 0,
  };

  tableRow.interest = Number(
    calculateInterestPayment(previousRemainingBalance, rate)
  );
  tableRow.principal = Number(
    calculatePrincipalPayment(totalMonthlyPayment, tableRow.interest)
  );
  tableRow.totalInterest = Number(previousTotalInterest) + tableRow.interest;
  tableRow.remainingBalance = Number(
    calculateRemainingBalance(previousRemainingBalance, tableRow.principal)
  );

  return tableRow;
}

// view functions

function displayAmortizationTable(tableRows) {
  // get the table body element from the page
  const tableBody = document.getElementById("results");

  // clear the table body before populating new data
  tableBody.innerHTML = "";

  tableRows.forEach((rowObj) => {
    // create <tr> document placeholder for <td> data
    const tr = document.createElement('tr');

    // populate <td> data (basically single row ) 
    const singleTableRow = `
        <td>${rowObj.month}</td>
        <td>${rowObj.payment.toFixed(2)}</td>
        <td>${rowObj.principal.toFixed(2)}</td>
        <td>${rowObj.interest.toFixed(2)}</td>
        <td>${rowObj.totalInterest.toFixed(2)}</td>
        <td>${rowObj.remainingBalance.toFixed(2)}</td>
      `;

    // complete single <tr> node
    tr.innerHTML = singleTableRow;

    // append single <tr> to the html table
    tableBody.appendChild(tr);
  });
}

function displayTotalElement(value, elementId) {
  const container = document.getElementById(elementId);
  const currency = value.toLocaleString('en', {style: 'currency',currency: 'USD', minimumFractionDigits: 2})

  container.innerText = `${currency}`;
}



