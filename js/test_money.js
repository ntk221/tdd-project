const assert = require('assert'); // assert パッケージのインポート

class Dollar{
    constructor(amount){
        this.amount=amount;
    }

    times(multiplier){
        return new Dollar(10);
    }
}

let fiver = new Dollar(5); // USD 5 を表すオブジェクト、テストの段階で未定義
let tenner = fiver.times(2); // fiverに対するメソッド
assert.strictEqual(tenner.amount, 10); // 実際の値と期待される値がstrict equal であることのアサーション
