class Money {
    constructor(amount, currency){
        this.amount=amount;
        this.currency=currency;
    }

    times(multiplier) {
        return new Money(this.amount * multiplier, this.currency);
    }

    divide(divisor) {
        return new Money(this.amount / divisor, this.currency) //JavaScript は動的型付け言語なので、go で必要になったキャストのリファクタは必要ない 
    }
}

module.exports = Money;