import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '../components/Input';
import { convertCurrency, getUsdCurrency, getEurCurrency } from './currency-slice';

export const Currency = () => {
    const dispatch = useDispatch();
    const {usd, eur, convert} = useSelector(state => state.currency)

    const currencyOptions = ['USD', 'UAH', 'EUR'];

    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('UAH');
    const [amount, setAmount] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [amountFromCurrency, setAmountFromCurrency] = useState(true);
   
    
    const convertToCurrency = () => {
        if(amountFromCurrency && amount > 0) {
            dispatch(convertCurrency({toCurrency, fromCurrency, amount}))
            setConvertedAmount(convert);
        }
        else if (convertedAmount > 0) {
            dispatch(convertCurrency({toCurrency: fromCurrency, fromCurrency: toCurrency, amount: convertedAmount}));
            setAmount(convert);
        }
        else {
            setAmount(0);
            setConvertedAmount(0);
        }
    };

    useEffect(() => {
        dispatch(getUsdCurrency());
        dispatch(getEurCurrency())
    }, [])

    
    useEffect(() => {
    
        convertToCurrency()
       
    }, [amount, convert, convertedAmount, amountFromCurrency, fromCurrency, toCurrency])

    const handleFromAmountChange = (e) => {
        setAmount(e.target.value);
        setAmountFromCurrency(true);
    }

     const handleToAmountChange = (e) => { 
        setConvertedAmount(e.target.value);
        setAmountFromCurrency(false);
    }

    return (
    <div className='currencyWrapper'>
        <div className="header">
            <div className="logo">
                [CURRENCY CONVERTER]
            </div>
            <div className="current">
                <div className='usdCurrency'>
                    USD {usd ?
                    usd.toFixed(2)
                        : <span>Loading</span>
                    }
                </div>
                <div className="euroCurrency">
                    EUR {eur ?
                    eur.toFixed(2)
                    : <span>Loading</span>
                    }
                </div>
            </div>
        </div>
        <div className="content">
            <div className="element">
                <div className="firstInput">
                    <div className='label'> First Currency </div>
                    <Input 
                    amount={amount} 
                    selectedCurrency={fromCurrency} 
                    currencyOptions={currencyOptions}
                    onChangeCurrency={(e) => setFromCurrency(e.target.value)}
                    onChangeAmount={handleFromAmountChange}
                    />
                </div>
                <div className="secondInput">
                    <div className='label'> Second Currency </div>
                    <Input 
                    amount={convertedAmount} 
                    selectedCurrency={toCurrency} 
                    currencyOptions={currencyOptions}  
                    onChangeCurrency={(e) => setToCurrency(e.target.value)}
                    onChangeAmount={handleToAmountChange}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

