//Call HelloWorld
function HelloWorld() {
  alert("Hello World");
}

function calculateTotalMonthlyPayment(loanAmount, rate, numberOfMonths) {
  // total monthly payment = (amount loaned) * (rate / 1200) / (1 - (1 + rate / 1200)^(- Number of Months))
  return (
    (loanAmount * (rate / 1200)) / (1 - (1 + rate / 1200) ** (-numberOfMonths))
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
