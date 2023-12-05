import React, { useState } from 'react';

const DatePicker = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [numberOfDays, setNumberOfDays] = useState('');
    const [numberOfMonths, setNumberOfMonths] = useState('');
    const [resultDateAddDays, setResultDateAddDays] = useState(null);
    const [resultDateSubtractDays, setResultDateSubtractDays] = useState(null);
    const [resultDateAddMonths, setResultDateAddMonths] = useState(null);
    const [resultDateSubtractMonths, setResultDateSubtractMonths] = useState(null);
    const [isLeapYear, setIsLeapYear] = useState(false);
    const [errorDays, setErrorDays] = useState('');
    const [errorMonths, setErrorMonths] = useState('');
    const [dateSelectionError, setDateSelectionError] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [saturdays, setSaturdays] = useState([]);
    const [sundays, setSundays] = useState([]);
    
    

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        const year = new Date(e.target.value).getFullYear();
        setIsLeapYear((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
        calculateStartAndEndDates(e.target.value);
        calculateSaturdaysAndSundays(e.target.value);
        // Reset date selection error when the user selects a date.
        setDateSelectionError('');

    };

    const handleNumberOfDaysChange = (e) => {
        const input = e.target.value;
        if (/^-?\d+$/.test(input)) { // Allow negative values for subtraction
            setNumberOfDays(input);
            setErrorDays('');
        } else {
            setNumberOfDays('');
            setErrorDays('Please enter a valid number of days.');
        }
    };

    const handleNumberOfMonthsChange = (e) => {
        const input = e.target.value;
        if (/^-?\d+$/.test(input)) { // Allow negative values for subtraction
            setNumberOfMonths(input);
            setErrorMonths('');
        } else {
            setNumberOfMonths('');
            setErrorMonths('Please enter a valid number of months.');
        }
    };

    const isLeapYearString = isLeapYear ? 'Yes' : 'No';

    const handleCalculateDays = () => {
        if (selectedDate && numberOfDays) {
            const inputDate = new Date(selectedDate);
            const daysToAdd = parseInt(numberOfDays);
            const resultDateAdd = new Date(inputDate);
            const resultDateSubtract = new Date(inputDate);

            resultDateAdd.setDate(resultDateAdd.getDate() + daysToAdd);

            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            setResultDateAddDays(resultDateAdd.toLocaleDateString('en-IN', options));

            resultDateSubtract.setDate(resultDateSubtract.getDate() - daysToAdd);
            setResultDateSubtractDays(resultDateSubtract.toLocaleDateString('en-IN', options));
        } else {
            // Set the date selection error when the user hasn't selected a date.
            setDateSelectionError('Please select a date before calculating.');
        }
    };

    const calculateStartAndEndDates = (date) => {
        const selectedDate = new Date(date);
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const startDate = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        setStartDate(startDate.toLocaleDateString('en-IN'));
        setEndDate(lastDay.toLocaleDateString('en-IN'));
    };

    const handleCalculateMonths = () => {
        if (selectedDate && numberOfMonths) {
            const inputDate = new Date(selectedDate);
            const monthsToAdd = parseInt(numberOfMonths);
            const resultDateAdd = new Date(inputDate);
            const resultDateSubtract = new Date(inputDate);

            resultDateAdd.setMonth(resultDateAdd.getMonth() + monthsToAdd);

            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            setResultDateAddMonths(resultDateAdd.toLocaleDateString('en-IN', options));

            resultDateSubtract.setMonth(resultDateSubtract.getMonth() - monthsToAdd);
            setResultDateSubtractMonths(resultDateSubtract.toLocaleDateString('en-IN', options));
        } else {
            // Set the date selection error when the user hasn't selected a date.
            setDateSelectionError('Please select a date before calculating.');
        }
    };

    const calculateSaturdaysAndSundays = (datee) => {
        const selectedDate = new Date(datee);
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        let date = new Date(year, month, 1);
        let saturdaysArr = [];
        let sundaysArr = [];

        while (date.getMonth() === month) {
            if (date.getDay() === 0) { // Sunday
                sundaysArr.push(date.getDate());
            } else if (date.getDay() === 6) { // Saturday
                saturdaysArr.push(date.getDate());
            }
            date.setDate(date.getDate() + 1);
        }

        setSaturdays(saturdaysArr);
        setSundays(sundaysArr);
    };
    const getTotalDaysInMonth = () => {
        const year = new Date(selectedDate).getFullYear();
        const month = new Date(selectedDate).getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getRemainingDays = () => {
        const totalDays = getTotalDaysInMonth();
        const remainingDays = [];
        for (let day = 1; day <= totalDays; day++) {
            const currentDate = new Date(new Date(selectedDate).getFullYear(), new Date(selectedDate).getMonth(), day);
            if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
                remainingDays.push(day);
            }
        }
        return remainingDays;
    };
     const remainingDays = getRemainingDays();
     

    
     

    return (
        <div className="form">
            <div className="col-md-12 p-2">
                <h1>Date Picker Form</h1>
                <label><b>Date: </b></label>&nbsp;
                <input type="date" onChange={handleDateChange} />
            </div>
            {dateSelectionError && (
                <div className="col-md-12 p-2">
                    <p style={{ color: 'red' }}>{dateSelectionError}</p>
                </div>
            )}
            <div className="col-md-12 p-2">
                <label><b>Enter Number of Days:  </b></label>&nbsp;
                <input type="text" value={numberOfDays} onChange={handleNumberOfDaysChange} />
                {errorDays && <p style={{ color: 'red' }}>{errorDays}</p>}
                <button className="m-2" onClick={handleCalculateDays}>Calculate Days</button>
            </div>
            <div className="col-md-12 p-2">
                <label><b>Enter Number of Months:  </b></label>&nbsp;
                <input type="text" value={numberOfMonths} onChange={handleNumberOfMonthsChange} />
                {errorMonths && <p style={{ color: 'red' }}>{errorMonths}</p>}
                <button className="m-2" onClick={handleCalculateMonths}>Calculate Months</button>
            </div>
            <div>
                <p style={{ color: 'purple' }} ><b>Is Leap Year: {isLeapYearString}</b></p>
            </div>
            {resultDateAddDays && (
                <div>
                    <p><b style={{ color: 'Blue' }}>Result Date (Add Days - Indian Format): {resultDateAddDays}</b></p>
                    <p><b style={{ color: 'Blue' }}>Result Date (Subtract Days - Indian Format): {resultDateSubtractDays}</b></p>
                </div>
            )}
            {resultDateAddMonths && (
                <div>
                    <p><b style={{ color: 'green' }}>Result Date (Add Months - Indian Format): {resultDateAddMonths}</b></p>
                    <p><b style={{ color: 'green' }}>Result Date (Subtract Months - Indian Format): {resultDateSubtractMonths}</b></p>
                </div>
            )}
            {startDate && endDate && (
                <div>
                    <p><b style={{ color: 'Blue' }}> Selected Date: {selectedDate}</b></p>
                    <p><b style={{ color: 'Blue' }}>Start Date of Selected Month: {startDate}</b></p>
                    <p><b style={{ color: 'Blue' }}>End Date of Selected Month: {endDate}</b></p>
                </div>
            )}
            

            <div>
                <p><b style={{ color: 'green' }} >Count of Saturdays in the Selected Month: {saturdays.length}</b></p>
                <ul>
                    {saturdays.map((saturdayDate, index) => (
                        <p key={index } style={{float:'left', color: 'green'}} >
                            {saturdayDate.toString().padStart(2, '0')}-{
                                (new Date(selectedDate).getMonth() + 1).toString().padStart(2, '0')}-{
                                new Date(selectedDate).getFullYear()
                            },&nbsp;
                        </p>
                    ))}
                </ul>
                <br/>
            <br/>
                <p><b style={{ color: 'blue' }} >Count of Sundays in the Selected Month  : {sundays.length}</b></p>
                <ul>
                    {sundays.map((sundayDate, index) => (
                        <p key={index} style={{float:'left', color: 'blue'}}>
                            {sundayDate.toString().padStart(2, '0')}-{
                                (new Date(selectedDate).getMonth() + 1).toString().padStart(2, '0')}-{
                                new Date(selectedDate).getFullYear()
                            },&nbsp;
                        </p>
                    ))}
                </ul>
            </div>
            <br/>
            <br/>
            <div>
                <p><b style={{ color: 'green' }} >Remaining Days (Excluding Sundays and Saturdays): {remainingDays.length}</b></p>
                <ul>
                    {remainingDays.map((day, index) => (
                        <p key={index} style={{float:'left', color: 'green'}}>
                            {day.toString().padStart(2, '0')}-{
                                (new Date(selectedDate).getMonth() + 1).toString().padStart(2, '0')}-{
                                new Date(selectedDate).getFullYear()
                            },&nbsp;
                        </p>
                    ))}
                </ul>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    );
}

export default DatePicker;
