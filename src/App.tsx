/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'https://api.exchangerate.host/latest';

function App(): JSX.Element {
	const [currencyOptions, setCurrencyOptions] = useState<any>([]);
	const [fromCurrency, setFromCurrency] = useState();
	const [toCurrency, setToCurrency] = useState<any>();
	const [exchangeRate, setExchangeRate] = useState<any>();
	const [amount, setAmount] = useState<number>(1);
	const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

	let toAmount, fromAmount;

	if (amountInFromCurrency) {
		fromAmount = amount;
		toAmount = amount * exchangeRate;
	} else {
		toAmount = amount;
		fromAmount = amount / exchangeRate;
	}

	useEffect(() => {
		fetch(BASE_URL)
			.then(async res => await res.json())
			.then(data => {
				const firstcurrency = Object.keys(data.rates)[0];
				setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
				setFromCurrency(data.base);
				setToCurrency(firstcurrency);
				setExchangeRate(data.rates[firstcurrency]);
			});
	}, []);

	useEffect(() => {
		if (fromCurrency !== null && toCurrency !== null) {
			fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
				.then(async res => await res.json())
				.then(data => setExchangeRate(data.rates[toCurrency]));
		}
	}, [fromCurrency, toCurrency]);

	function handleFromAmountChange(e: {
		target: { value: React.SetStateAction<number> };
	}) {
		setAmount(e.target.value);
		setAmountInFromCurrency(true);
	}

	function handleToAmountChange(e: {
		target: { value: React.SetStateAction<number> };
	}) {
		setAmount(e.target.value);
		setAmountInFromCurrency(false);
	}

	return (
		<div className='container p-4'>
			<div className='row col-md-6 offset-md-3'>
				<div className='card card-body bg-primary text-white'>
					<h1 style={{ textAlign: 'center' }}>Currencys Exchanger 🪙</h1>
					<CurrencyRow
						currencyOptions={currencyOptions}
						selectedCurrency={fromCurrency}
						onChangeCurrency={(e: {
							target: { value: React.SetStateAction<undefined> };
						}) => setFromCurrency(e.target.value)}
						amount={fromAmount}
						onChangeAmount={handleFromAmountChange}
					/>
					<div>
						<h1 style={{ textAlign: 'center' }}>=</h1>
					</div>
					<CurrencyRow
						currencyOptions={currencyOptions}
						selectedCurrency={toCurrency}
						onChangeCurrency={(e: { target: { value: any } }) =>
							setToCurrency(e.target.value)
						}
						onChangeAmount={handleToAmountChange}
						amount={toAmount}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
