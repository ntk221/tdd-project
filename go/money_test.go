package main

import (
	s "tdd/stocks"
	"testing"
)

func TestMultiplication(t *testing.T) {
	tenEuros := s.NewMoney(10, "EUR") // テストを書く段階では Money が未定義
	actualResult := tenEuros.Times(2)
	expectedResult := s.NewMoney(20, "EUR")

	assertEqual(t, expectedResult, actualResult)
}

func TestDivision(t *testing.T) {
	originalMoney := s.NewMoney(4002, "KRW")                 // Division する前の Money を変数として宣言
	actualMoneyAfterDivision := originalMoney.Divide(4)      // originalMoney.Divide(4) した後の Money を変数として宣言
	expectedMoneyAfterDivisison := s.NewMoney(1000.5, "KRW") // originalMoney.Divide(4)の結果として期待される Money を変数として宣言

	assertEqual(t, expectedMoneyAfterDivisison, actualMoneyAfterDivision)
}

func TestAddition(t *testing.T) {
	var portfolio s.Portfolio
	var portfolioInDollars s.Money

	fiveDollars := s.NewMoney(5, "USD")
	tenDollars := s.NewMoney(10, "USD")
	fifteenDollars := s.NewMoney(15, "USD")

	portfolio = portfolio.Add(fiveDollars)
	portfolio = portfolio.Add(tenDollars)
	portfolioInDollars = portfolio.Evaluate("USD") // currency を USD としてportfolioを評価

	assertEqual(t, fifteenDollars, portfolioInDollars)
}

func TestAdditionOfDollarsAndEuros(t *testing.T) {
	var portfolio s.Portfolio

	fiveDollars := s.NewMoney(5, "USD")
	tenEuros := s.NewMoney(10, "EUR")
	portfolio = portfolio.Add(fiveDollars)
	portfolio = portfolio.Add(tenEuros)

	expectedValue := s.NewMoney(17, "USD")
	actualValue := portfolio.Evaluate("USD")

	assertEqual(t, expectedValue, actualValue)
}

func TestAdditionOfDollarsAndWons(t *testing.T) {
	var portfolio s.Portfolio

	oneDollar := s.NewMoney(1, "USD")
	elevenHundredWon := s.NewMoney(1100, "KRW")

	portfolio = portfolio.Add(oneDollar)
	portfolio = portfolio.Add(elevenHundredWon)

	expectedValue := s.NewMoney(2200, "KRW")
	actualValue := portfolio.Evaluate("KRW")

	assertEqual(t, expectedValue, actualValue)
}

// Money 型の引数を二つとって、それらが等しいか否かアサーションテストする
func assertEqual(t *testing.T, expected s.Money, actual s.Money) {
	if expected != actual {
		t.Errorf("期待される値は%+v Got %+v", expected, actual)
	}
}
