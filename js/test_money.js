const assert = require('assert'); // assert パッケージのインポート

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

let fiveDollars = new Money(5, "USD");
let tenDollars = new Money(10, "USD");
assert.deepStrictEqual(fiveDollars.times(2), tenDollars);


let tenEuros = new Money(10, "EUR");
let twentyEuros = new Money(20, "EUR");
assert.deepStrictEqual(tenEuros.times(2), twentyEuros);

let originalMoney = new Money(4002, "KRW");
let actualMoneyAfterDivision = originalMoney.divide(4);
let expectedMoneyAfterDivision = new Money(1000.5, "KRW");
assert.deepStrictEqual(actualMoneyAfterDivision, expectedMoneyAfterDivision); // assert.strictEqual を用いてオブジェクトのフィールドを個別にテストするのではなく、 assert.deepStrictEqual を用いて、オブジェクト単位で同じか（各フィールドの値が等しいか）テストしている