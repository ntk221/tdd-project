package stocks

// さまざまな currency の Money を要素として持つスライス
type Portfolio []Money

func (p Portfolio) Add(money Money) Portfolio {
	p = append(p, money)
	return p
}

func (p Portfolio) Evaluate(currency string) Money {
	// return Money{amount: 15, currency: "USD"}
	total := 0.0
	for _, m := range p {
		total = total + convert(m, currency)
	}
	return Money{amount: total, currency: currency} // 返り値の currency はEvaluate メソッドの第一引数にのみ依存しているため、この実装では不十分である
}

// money と 変換する通貨を選択すると、為替レートを使って変換を行う
func convert(money Money, currency string) float64 {
	// 為替レートを保存した hash map
	exchangeRates := map[string]float64{
		"EUR->USD": 1.2,
		"USD->KRW": 1100,
	}

	if money.currency == currency {
		return money.amount
	}

	key := money.currency + "->" + currency // money.currency と 　convertの引数にとった currency を用いて key を作る

	return money.amount * exchangeRates[key] // key を使って、exchangeRates に登録してある為替レートを取り出す
}
