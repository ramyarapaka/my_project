import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const BankSystem = () => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('withdrawal');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [error, setError] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  const handleTransactionSubmit = (e) => {
    e.preventDefault();

    if (!name || !balance || !amount) {
      setError('Please fill out all fields.');
      return;
    }

    setError('');

    let newBalance;

    if (transactionType === 'withdrawal' && amount > balance) {
      setError('Insufficient funds for withdrawal');
      return;
    }

    if (transactionType === 'withdrawal') {
      newBalance = balance - parseFloat(amount);
    } else {
      newBalance = parseFloat(balance) + parseFloat(amount);

      if (parseFloat(balance) === 0) {
        setBalance(newBalance);
        return;
      }
    }

    const transaction = {
      type: transactionType,
      amount,
      date: new Date().toLocaleString(),
      name,
    };

    setTransactionHistory((prevHistory) => [transaction, ...prevHistory]);
    setBalance(newBalance);

    setName('');
    setAmount(0);
    setTransactionType('withdrawal');
  };

  const handleDeleteTransaction = (index) => {
    // Display a confirmation prompt
    const isConfirmed = window.confirm('Are you sure you want to delete this transaction?');

    if (isConfirmed) {
      const updatedTransactionHistory = [...transactionHistory];
      updatedTransactionHistory.splice(index, 1);
      setTransactionHistory(updatedTransactionHistory);
    }
  };

  return (
    <div className="container p-2">
      <h2>Bank System</h2>
      <form onSubmit={handleTransactionSubmit} className="transaction-form">
        <div className="form-field">
          <label>
            Name :&nbsp;
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
        </div>
        <div className="form-field">
          <label>
            Bank Balance : &nbsp;
            <input type="number" value={balance} onChange={handleBalanceChange} />
          </label>
        </div>
        <div className="form-field">
          <label>
            Enter Amount : &nbsp;
            <input type="number" value={amount} onChange={handleAmountChange} />
          </label>
        </div>
        <div className="transaction-type">
          <label>
            <input
              type="radio"
              value="withdrawal"
              checked={transactionType === 'withdrawal'}
              onChange={handleTransactionTypeChange}
            />
            &nbsp;Withdrawal
          </label>
          &nbsp;&nbsp;
          <label>
            <input
              type="radio"
              value="deposit"
              checked={transactionType === 'deposit'}
              onChange={handleTransactionTypeChange}
            />
            &nbsp;Deposit
          </label>
        </div>
        <div className="">
          <button type="submit">Submit Transaction</button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
      {balance !== undefined && <h3> Bank Balance : {balance}Rs </h3>}

      {transactionHistory.length > 0 && (
        <div>
          <h3>Transaction History</h3>
          <table className="transaction-history-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.type}</td>
                  <td>{transaction.name}</td>
                  <td>{transaction.amount}rs</td>
                  <td>{transaction.date}</td>
                  <td>
                    <span
                      onClick={() => handleDeleteTransaction(index)}
                      className="delete-button"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BankSystem;
