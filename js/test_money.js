const assert = require('assert'); // assert パッケージのインポート

class Money {
    constructor(amount, currency){
        this.amount=amount;
        this.currency=currency;
    }

    times(multiplier) {
        return new Money(this.amount * multiplier, this.currency);
    }
}

let fiver = new Money(5, "USD"); // USD 5 を表すオブジェクト、テストの段階で未定義
let tenner = fiver.times(2); // fiverに対するメソッド
assert.strictEqual(tenner.amount, 10); // 実際の値と期待される値がstrict equal であることのアサーション
assert.strictEqual(tenner.currency, "USD");

let tenEuros = new Money(10, "EUR");
let twentyEuros = tenEuros.times(2);
assert.strictEqual(twentyEuros.amount, 20);
assert.strictEqual(twentyEuros.currency, "EUR");