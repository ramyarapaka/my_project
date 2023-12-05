import React, { useState } from 'react';

const AddDate = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [numberOfDays, setNumberOfDays] = useState('');
    const [resultDateAddDays, setResultDateAddDays] = useState(null);
    const [saturdays, setSaturdays] = useState([]);
    const [sundays, setSundays] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [age, setAge] = useState(null);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleNumberOfDaysChange = (e) => {
        const input = e.target.value;
        if (/^-?\d+$/.test(input)) {
            setNumberOfDays(input);
        } else {
            setNumberOfDays('');
        }
    };

    const handleCalculateDays = () => {
        if (selectedDate && numberOfDays) {
            const inputDate = new Date(selectedDate);
            const daysToAdd = parseInt(numberOfDays);
            const resultDate = new Date(inputDate);
            resultDate.setDate(resultDate.getDate() + daysToAdd);
            setResultDateAddDays(resultDate.toLocaleDateString('en-IN'));

            calculateSaturdaysAndSundays(new Date(selectedDate), resultDate); // Pass both dates here.
            calculateRemainingDays(resultDate);
        }
    };

    const calculateSaturdaysAndSundays = (startDate, endDate) => {
        const saturdaysArr = [];
        const sundaysArr = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            if (currentDate.getDay() === 0) { // Sunday
                sundaysArr.push(currentDate.getDate());
            } else if (currentDate.getDay() === 6) { // Saturday
                saturdaysArr.push(currentDate.getDate());
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        setSaturdays(saturdaysArr);
        setSundays(sundaysArr);
    };

    const calculateRemainingDays = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
        const remainingDaysArr = [];

        for (let day = 1; day <= totalDaysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
                remainingDaysArr.push(currentDate.getDate());
            }
        }
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        calculateAge(e.target.value, endDate);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
        calculateAge(startDate, e.target.value);
    };

    const calculateAge = (start, end) => {
        if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);

            const diffInMilliseconds = endDate - startDate;

            const years = endDate.getFullYear() - startDate.getFullYear();
            const months = endDate.getMonth() - startDate.getMonth() + (endDate.getDate() < startDate.getDate() ? -1 : 0);
            const days = endDate.getDate() - startDate.getDate() + (endDate.getDate() < startDate.getDate() ? daysInMonth(startDate) : 0);

            setAge({
                years,
                months,
                days,
            });
        }
    };

    const daysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
    return (
        <div className="form">
            <div className="col-md-12 p-2">
                <h3>Showing Date by Adding Days </h3>
                <label><b>Date: </b></label>&nbsp;
                <input type="date" onChange={handleDateChange} />
            </div>
            <div className="col-md-12 p-2">
                <label><b>Enter Number of Days:  </b></label>&nbsp;
                <input type="text" value={numberOfDays} onChange={handleNumberOfDaysChange} />
                <button className="m-2" onClick={handleCalculateDays}>Calculate Days</button>
            </div>

            {resultDateAddDays && (
                <div>
                    <p><b style={{ color: 'Blue' }}>Result Date (Add Days - Indian Format): {resultDateAddDays}</b></p>
                </div>
            )}
            <div>
                <p><b style={{ color: 'green' }} >Count of Saturdays in the Selected Month: {saturdays.length}</b></p>

                {saturdays.map((saturdayDate, index) => (
                    <p key={index} style={{ float: 'left', color: 'green' }} >
                        {saturdayDate.toString().padStart(2, '0')}-{
                            (new Date(selectedDate).getMonth() + 1).toString().padStart(2, '0')}-{
                            new Date(selectedDate).getFullYear()
                        },&nbsp;
                    </p>
                ))}

            </div>
            <div>   <br />   <br />   <br />   <br />   <br />   <br />
                <p><b style={{ color: 'blue' }} >Count of Sundays in the Selected Month  : {sundays.length}</b></p>

                {sundays.map((sundayDate, index) => (
                    <p key={index} style={{ float: 'left', color: 'blue' }}>
                        {sundayDate.toString().padStart(2, '0')}-{
                            (new Date(selectedDate).getMonth() + 1).toString().padStart(2, '0')}-{
                            new Date(selectedDate).getFullYear()
                        },&nbsp;
                    </p>
                ))}

            </div><br />
            <br />   <br />   <br />   <br />
            <div className="col-md-12 p-2"><br />
                <h3>Calulating years,Months and Days</h3>
                <label><b>Start Date : </b></label>&nbsp;
                <input type="date" onChange={handleStartDateChange} />
            </div>
            <div className="col-md-12 p-2">
                <label><b>End Date : </b></label>&nbsp;
                <input type="date" onChange={handleEndDateChange} />
            </div>
            <div>
                {age !== null && (
                    <div>
                        <p style={{ color: 'purple' }} >
                            <b>Age : </b>{' '}
                            {age.years > 0 && `${age.years} years `}
                            {age.months > 0 && `${age.months} months `}
                            {age.days > 0 && `${age.days} days`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddDate;