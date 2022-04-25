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

class Portfolio{

    constructor(){
        this.moneys = [];
    }

    add(...moneys){ // money を複数引数としてとることを表す. rest parameter syntax
        this.moneys = this.moneys.concat(moneys); // 引数にとった money の列を連結して,moneys フィールドに格納する
    }

    evaluate(currency) {
        // return new Money(15, "USD"); // テストを通すためだけにハードコードしている(リファクタの段階で修正)
        let total = this.moneys.reduce((sum, money) => { // reduce は配列 moneys に対して定義されている組み込みメソッドで、sum の初期値を 0 として、moneysの各要素の money を用いて計算を"畳み込んでいく". 関数型でいうと foldleft  
            return sum + money.amount;
        }, 0);
        return new Money(total, currency);
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

let fifteenDollars = new Money(15, "USD");
let portfolio = new Portfolio();
portfolio.add(fiveDollars, tenDollars);
assert.deepStrictEqual(portfolio.evaluate("USD"), fifteenDollars); 