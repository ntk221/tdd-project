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
		total = total + m.amount
	}
	return Money{amount: total, currency: currency} // 返り値の currency はEvaluate メソッドの第一引数にのみ依存しているため、この実装では不十分である
}
