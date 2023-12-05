import React, { useState } from 'react';


const CurrencyConverter = () => {
  const staticExchangeRates = {
    USD: 0.012, // 1 INR = 0.012 USD
    EUR: 0.011, // 1 INR = 0.011 EUR
    GBP: 0.0096, // 1 INR = 0.0096 GBP
    INR: 1,
    // Add more currencies as needed
  };

  const countryNames = {
    USD: 'United States Dollar (USD)',
    EUR: 'Euro (EUR)',
    GBP: 'British Pound (GBP)',
    INR: 'Indian Rupee (INR)',
    // Add more currencies as needed
  };

  const baseAmounts = {
    USD: 100,
    EUR: 100,
    GBP: 100,
    INR: 100,
    // Add more currencies as needed
  };

  const defaultBaseCurrency = 'INR'; // Set the default base currency
  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState(defaultBaseCurrency);
  const [selectedTargetCurrency, setSelectedTargetCurrency] = useState('USD');

  // Dynamically set the base amount based on the selected base currency
  const baseAmount = baseAmounts[selectedBaseCurrency];

  // Calculate converted amount
  const convertedAmount = selectedBaseCurrency === selectedTargetCurrency
    ? baseAmount
    : baseAmount / staticExchangeRates[selectedBaseCurrency] * staticExchangeRates[selectedTargetCurrency];

  return (
    <div className='container p-4'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 p-1'>
            <label><b>Base Country : </b></label>
            <select
              id="baseCurrency"
              value={selectedBaseCurrency}
              onChange={(e) => setSelectedBaseCurrency(e.target.value)}
            >
              {Object.keys(countryNames).map((currency) => (
                <option key={currency} value={currency}>{countryNames[currency]}</option>
              ))}
            </select>
          </div>

          <div className='col-md-6 p-1'>
            <label><b>Convert Country : </b></label>
            <select
              id="targetCurrency"
              value={selectedTargetCurrency}
              onChange={(e) => setSelectedTargetCurrency(e.target.value)}
            >
              {Object.keys(countryNames).map((currency) => (
                <option key={currency} value={currency}>{countryNames[currency]}</option>
              ))}
            </select>
          </div>
        </div><br/>
        <div className='row'>
          <table className='table border'>
            <thead>
              <tr>
                <th>Base Country Name</th>
                <th>Base Number by Country {countryNames[selectedBaseCurrency]}</th>
                <th>Converted  Currency of {countryNames[selectedTargetCurrency]}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{countryNames[selectedBaseCurrency]}</td>
                <td>{baseAmount}</td>
                <td>{convertedAmount.toFixed(2)} {countryNames[selectedTargetCurrency]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
