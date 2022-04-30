const Money = require('./money'); // Prtofolio モジュールは Money モジュールに依存性があるため require しなければ ならない
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
        return new Money(total, currency); // ここで、Money モジュールに依存している
    }
}

module.exports = Portfolio;