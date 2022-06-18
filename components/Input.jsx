import React from 'react'

export const Input = (props) => {
    const {
        selectedCurrency,
        currencyOptions,
        onChangeCurrency,
        amount,
        onChangeAmount
    } = props

    return (
    <>
        <input className='input'
            type='number'
            min='0'
            value={amount}
            onChange={onChangeAmount}
            onFocus={(e) => e.target.select()}
        />
        <select className='currencySelect' value={selectedCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </>
  )
}

