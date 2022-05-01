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
            return sum + this.convert(money, currency); // 配列 moneys の 要素のmoney は evaluate の引数として与えられた通貨に対応して,convertされてから、足されていく
        }, 0);
        return new Money(total, currency); // ここで、Money モジュールに依存している
    }

    convert(money, currency) {
        // 為替レートを保存するマップを用意
        let exchangeRates = new Map();
        exchangeRates.set("EUR->USD", 1.2);
        exchangeRates.set("USD->KRW", 1100);
        if(money.currency === currency) {
            return money.amount;
        }
        let key = money.currency + "->" + currency;
        return money.amount * exchangeRates.get(key);
    }
}

module.exports = Portfolio;