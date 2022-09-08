import React from 'react';

const CurrencyRow = (props: {
	currencyOptions: any;
	selectedCurrency: any;
	onChangeCurrency: any;
	amount: any;
	onChangeAmount: any;
}) => {
	const {
		currencyOptions,
		selectedCurrency,
		onChangeCurrency,
		amount,
		onChangeAmount,
	} = props;

	return (
		<div className='input-group mb-3'>
			<input
				type='number'
				className='form-control form-control-lg'
				aria-describedby='selectbox'
				value={amount}
				onChange={onChangeAmount}
			/>
			<select
				value={selectedCurrency}
				onChange={onChangeCurrency}
				className='btn btn-secondary btn-lg'
				id='selectbox'
			>
				{currencyOptions.map((option: number, index: undefined) => (
					<option key={index} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
};

export default CurrencyRow;
