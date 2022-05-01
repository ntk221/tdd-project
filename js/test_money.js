const assert = require('assert'); // assert パッケージのインポート
const Money = require('./money');  // money モジュールのインポート
const Portfolio = require('./portfolio'); //Portfolio モジュールのインポート

// 各testを行うメソッドが定義されたクラス. テストを追加していって、すべてのテストを自動的に実行してくれる機能を持つ
class MoneyTest{
    testMultiplication(){
        let tenEuros = new Money(10, "EUR");
        let twentyEuros = new Money(20, "EUR");
        assert.deepStrictEqual(tenEuros.times(2), twentyEuros);
    }

    testDivision(){
        let originalMoney = new Money(4002, "KRW");
        let actualMoneyAfterDivision = originalMoney.divide(4);
        let expectedMoneyAfterDivision = new Money(1000.5, "KRW");
        assert.deepStrictEqual(actualMoneyAfterDivision, expectedMoneyAfterDivision); // assert.strictEqual を用いてオブジェクトのフィールドを個別にテストするのではなく、 assert.deepStrictEqual を用いて、オブジェクト単位で同じか（各フィールドの値が等しいか）テストしている
    }

    testAddition(){
        let tenDollars = new Money(10, "USD");
        let fiveDollars = new Money(5, "USD");
        let portfolio = new Portfolio();
        let fifteenDollars = new Money(15, "USD");
        portfolio.add(fiveDollars, tenDollars);
        assert.deepStrictEqual(portfolio.evaluate("USD"), fifteenDollars); 
    }

    testAdditionOfDollarsAndEuros() {
        let fiveDollars = new Money(5, "USD");
        let tenEuros = new Money(10, "EUR");
        let portfolio = new Portfolio();
        portfolio.add(fiveDollars, tenEuros);
        let expectedValue = new Money(17, "USD");

        assert.deepStrictEqual(portfolio.evaluate("USD"), expectedValue);
    }

    testAddtionOfDollarsAndWons() {
        let oneDollar = new Money(1, "USD");
        let elevenHundredWon = new Money(1100, "KRW");
        let portfolio = new Portfolio();
        portfolio.add(oneDollar, elevenHundredWon);
        let expectedValue = new Money(2200, "KRW");

        assert.deepStrictEqual(portfolio.evaluate("KRW"), expectedValue);
    }

    runAllTests(){
        let testMethods = this.getAllTestMethods(); // 全てのテストの名前を取得する
        testMethods.forEach(m => {
            console.log("Running:%s()", m); // これから実行するテストをコンソール上に表示する
            let method = Reflect.get(this, m); // Reflect オブジェクトを用いて、このクラスに含まれる、名前が m と一致するテストを取得する
            try {
                Reflect.apply(method, this, []); // Reflectオブジェクトを用いて、取得したテストメソッドを引数なしで呼び出す
            } catch(e) { //例外が投げられたらそれをキャッチする
                if (e  instanceof assert.AssertionError) { // アサーションエラーの時には、コンソールに出力する
                    console.log(e);
                } else {
                    throw e; // それ以外のエラーの時には、そのまま投げる
                }
            }
        });
    }
    
    // クラスに含まれるテストの名前を全て取得して、配列に並べて保存する
    getAllTestMethods() {
        let moneyPrototype = MoneyTest.prototype; // MoneyTestオブジェクトのプロトタイプを取得
        let allProps = Object.getOwnPropertyNames(moneyPrototype); // MoneyTest prototype に定義されているプロパティを全て取得
        let testMethods = allProps.filter(p => {
            return typeof moneyPrototype[p] === 'function' && p.startsWith("test");
        }); // testMethods として、関数であり、かつ、名前が"test"で始まるものだけをフィルタリングする。
        return testMethods;
    }
}

// MoneyTestをインスタンス化して全てのテストを実行
new MoneyTest().runAllTests();