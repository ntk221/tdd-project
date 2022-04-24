package main

import (
	"testing"
)

func TestMultiplication(t *testing.T) {
	fiver := Dollar{ // USD 5 を表す構造体、最初の failing test を書く段階ではまだ存在しない
		amount: 5,
	}
	tenner := fiver.Times(2) // fiver に対するメソッド Times のテスト。もちろん、Times もまだ存在しない
	if tenner.amount != 10 { // 実際の結果と、予想した値が一致しているか比較
		t.Errorf("期待される答えは 10, got:[%d]", tenner.amount) // 実際の値と予想した値が一致しないときは test は失敗する
	}
}

// fiver を宣言するために必要な Dollar 構造体の型
type Dollar struct {
	// amount フィールドを埋めるには、当然そのフィールドが必要である
	amount int
}

func (d Dollar) Times(multiplier int) Dollar {
	// return Dollar{10}
	// return Dollar{5 * 2} // コード間の重複した部分を減らすことができた。
	return Dollar{d.amount * multiplier} // 5 はd.amount 2 は multiplier のこと
}
