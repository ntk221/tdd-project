package main

import (
	"testing"
)

func TestMultiplicationInDollars(t *testing.T) {
	fiver := Money{ // USD 5 を表す構造体、最初の failing test を書く段階ではまだ存在しない
		amount:   5,
		currency: "USD",
	}
	actualResult := fiver.Times(2)                       // fiver.Times(2)の結果を変数 actualResult として宣言
	expectedResult := Money{amount: 10, currency: "USD"} // expectedResultを変数として宣言

	assertEqual(t, expectedResult, actualResult)

}

func TestMultiplicationInEuros(t *testing.T) {
	tenEuros := Money{amount: 10, currency: "EUR"} // テストを書く段階では Money が未定義
	actualResult := tenEuros.Times(2)
	expectedResult := Money{amount: 20, currency: "EUR"}

	assertEqual(t, expectedResult, actualResult)
}

func TestDivision(t *testing.T) {
	originalMoney := Money{amount: 4002, currency: "KRW"}                 // Division する前の Money を変数として宣言
	actualMoneyAfterDivision := originalMoney.Divide(4)                   // originalMoney.Divide(4) した後の Money を変数として宣言
	expectedMoneyAfterDivisison := Money{amount: 1000.5, currency: "KRW"} // originalMoney.Divide(4)の結果として期待される Money を変数として宣言

	assertEqual(t, expectedMoneyAfterDivisison, actualMoneyAfterDivision)
}

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

// Money 型の引数を二つとって、それらが等しいか否かアサーションテストする
func assertEqual(t *testing.T, expected Money, actual Money) {
	if expected != actual {
		t.Errorf("期待される値は%+v Got %+v", expected, actual)
	}
}
