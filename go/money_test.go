package main

import (
	"testing"
)

func TestMultiplicationInDollars(t *testing.T) {
	fiver := Money{ // USD 5 を表す構造体、最初の failing test を書く段階ではまだ存在しない
		amount:   5,
		currency: "USD",
	}
	tenner := fiver.Times(2) // fiver に対するメソッド Times のテスト。もちろん、Times もまだ存在しない
	if tenner.amount != 10 { // 実際の結果と、予想した値が一致しているか比較
		t.Errorf("期待される答えは 10, got:[%d]", tenner.amount) // 実際の値と予想した値が一致しないときは test は失敗する
	}
	if tenner.currency != "USD" {
		t.Errorf("期待される答えは USD, got:[%s]", tenner.currency)
	}
}

func TestMultiplicationInEuros(t *testing.T) {
	tenEuros := Money{amount: 10, currency: "EUR"} // テストを書く段階では Money が未定義
	twentyEuros := tenEuros.Times(2)

	if twentyEuros.amount != 20 {
		t.Errorf("期待されるのは 20 , got:[%d]", twentyEuros.amount)
	}
	if twentyEuros.currency != "EUR" {
		t.Errorf("期待されるのは EUR , got:[%s]", twentyEuros.currency)
	}
}

// Money 構造体は通貨の種類とその量のフィールドを持つ
type Money struct {
	amount   int
	currency string
}

// Money 構造体の amount に対して multiplier を掛けた結果を amount として更新した Money 構造体を返す.
// currency フィールドは更新しない
func (m Money) Times(multiplier int) Money {
	return Money{amount: m.amount * multiplier, currency: m.currency}
}
