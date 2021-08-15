function handleCalculateBtnClick() {
    const loanAmount = Number(document.getElementById("loanAmountInput").value);
    const paymentPeriods = Number(document.getElementById("paymentsInput").value);
    const rate = Number(document.getElementById("rateInput").value);

    const totalMonthlyPayment = calculateTotalMonthlyPayment(loanAmount, rate, paymentPeriods).toFixed(2);




    
    displayTotalMonthlyPayment(totalMonthlyPayment);
    return
}

function calculateTotalMonthlyPayment(loanAmount, rate, paymentPeriods) {
  // total monthly payment = (amount loaned) * (rate / 1200) / (1 - (1 + rate / 1200)^(- Number of Months))
  return (
    (loanAmount * (rate / 1200)) / (1 - (1 + rate / 1200) ** (-paymentPeriods))
  );
}

function calculateRemainingBalance(previousRemainingBalance, principalPayments) {
  // before the very first month equals the amount of the loan

  return previousRemainingBalance - principalPayments;
}

function calculateInterestPayment(previousRemainingBalance, rate) {
  return (previousRemainingBalance * rate) / 1200;
}

function calculatePrincipalPayment(totalMonthlyPayment, interestPayment) {
    return totalMonthlyPayment - interestPayment;
}

function displayTotalMonthlyPayment(value) {
    var container = document.getElementById('monthlyPaymentContainer');

    container.innerText = `$${value}`;
}
