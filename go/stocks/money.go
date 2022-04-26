package stocks

// Money 構造体は通貨の種類とその量のフィールドを持つ
type Money struct {
	amount   float64
	currency string
}

// Money 構造体の amount に対して multiplier を掛けた結果を amount として更新した Money 構造体を返す.
// currency フィールドは更新しない
func (m Money) Times(multiplier int) Money {
	return Money{amount: m.amount * float64(multiplier), currency: m.currency} // Money の amount フィールドが float64型 になるようにリファクタリングしたので、* の引数は float64 型でなくてはならない. 従って、multiplier は float64型にキャストする
}

func (m Money) Divide(divisor int) Money {
	return Money{amount: m.amount / float64(divisor), currency: m.currency}
}

// amount と currency を引数にとって、それをフィールドとして埋めた Money 構造体を返す。
// このようなメソッドを定義することで、テストコードに stocks モジュールをインポートした後、これらの引数を指定して、テストコード中でMoney 構造体の(immutableな)インスタンス
// を作成することを可能にする。テストコード中で、そのフィールドにアクセスすることはできない。これによってテストコードのstocksモジュールに対する一方向の依存性を注入することができる！
func NewMoney(amount float64, currency string) Money {
	return Money{amount, currency}
}
