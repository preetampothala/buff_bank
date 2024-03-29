let count = 1;
class account {
  constructor(name, interestrate, transactions) {
    this.name = name;
    this.transactions = transactions;
    this.interestrate = interestrate;
    this.calcBalance();
    this.calcSummary();
    this.generateusername();
    this.generatepin();
  }
  calcBalance() {
    this.balance = this.transactions.reduce((acc, cur) => acc + cur, 0);
    return this.balance;
  }
  calcSummary() {
    this.in = Math.abs(
      this.transactions
        .filter((transaction) => transaction > 0)
        .reduce((acc, cur) => acc + cur, 0)
    ).toFixed(2);
    this.out = Math.abs(
      this.transactions
        .filter((transaction) => transaction < 0)
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2)
    );
    this.interest = Math.abs(
      this.transactions
        .filter((transaction) => transaction > 0)
        .map((transaction) => (transaction * this.interestrate) / 100)
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2)
    );
    return { in: this.in, out: this.out, interest: this.interest };
  }

  generatepin() {
    this.pin = count * 1111;
    count++;
  }
  generateusername() {
    this.username = this.name
      .toLowerCase()
      .split(" ")
      .map((name) => name[0] + name[1])
      .join("");
  }
  loan(amount) {
    // console.log(`loan`);
    let result = ``;
    if (
      amount > 0 &&
      this.transactions.some((transaction) => transaction >= amount * 0.1)
    ) {
      // console.log(`loan valid`);
      this.transactions.push(amount);

      return (result = `success`);
    } else {
      // console.log(`loan invalid`);
      if (!(amount > 0 === true)) result = `Enter amount greater than Zero`;
      else if (
        !this.transactions.some((transaction) => transaction >= amount * 0.1)
      )
        result = `Your loan request has been rejected because it doesn't meet the criteria`;

      return result;
    }
  }
  sortTrans(sort) {
    // console.log(sort);
    return sort
      ? this.transactions.slice().sort((a, b) => a - b)
      : this.transactions;
  }
  transfer(amount, receiverAccount) {
    let text = ``;
    if (
      amount > 0 &&
      receiverAccount &&
      this.balance >= amount &&
      receiverAccount?.username !== this.username
    ) {
      // console.log("Transfer valid");
      receiverAccount.transactions.push(Number(amount));
      // console.log(receiverAccount.transactions);
      this.transactions.push(-Number(amount));
      return (text = `success`);
    } else {
      if (!amount > 0) text = `Please enter an amount greater than 0`;
      else if (!receiverAccount) text = `Please enter a valid To account name`;
      else if (!(this.balance >= amount))
        text = `Please enter an amount less than your current balance`;
      else if (!(receiverAccount?.username !== this.username))
        text = `Please enter a different To account name that your current account`;
      return text;
    }
  }
}

export default account;
