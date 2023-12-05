import React, { useState } from 'react';

const EmployeeForm = () => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [pan, setPan] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [phone, setPhone] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dob, setDob] = useState('');

  const [employees, setEmployees] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [emailError, setEmailError] = useState('');
  const [panError, setPanError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [dobError, setDobError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePan = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    return panRegex.test(pan);
  };

  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateDates = (start, end) => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    if (startDateObj > endDateObj) {
      setDateError('Start date must be less than end date');
      return false;
    }

    setDateError('');
    return true;
  };

  const validateTimes = (start, end) => {
    // Implement your own validation logic for time if needed
    // For example, you could check if end time is greater than start time
    return true;
  };

  const validateDob = (dob) => {
    const dobObj = new Date(dob);
    const currentDate = new Date();
    const minDob = new Date(currentDate.getFullYear() - 20, currentDate.getMonth(), currentDate.getDate());

    if (dobObj > minDob) {
      setDobError('Must be above 20 years old');
      return false;
    }

    setDobError('');
    return true;
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }
    if (!validatePan(pan)) {
      setPanError('Invalid PAN format');
      return;
    }
    if (!validatePhone(phone)) {
      setPhoneError('Invalid phone number');
      return;
    }

    if (!validateDates(startDate, endDate) || !validateTimes(startTime, endTime) || !validateDob(dob)) {
      return;
    }

    setEmailError('');
    setPanError('');
    setPhoneError('');
    setDateError('');
    setTimeError('');
    setDobError('');

    if (isEditMode && editIndex !== null) {
      const updatedEmployees = [...employees];
      updatedEmployees[editIndex] = {
        name,
        designation,
        email,
        pan,
        startDate,
        endDate,
        phone,
        startTime,
        endTime,
        dob,
      };
      setEmployees(updatedEmployees);
      setIsEditMode(false);
      setEditIndex(null);
    } else {
      setEmployees([
        ...employees,
        { name, designation, email, pan, startDate, endDate, phone, startTime, endTime, dob },
      ]);
    }

    // Clear form fields
    setName('');
    setDesignation('');
    setEmail('');
    setPan('');
    setStartDate('');
    setEndDate('');
    setPhone('');
    setStartTime('');
    setEndTime('');
    setDob('');
  };

  const handleEditEmployee = (index) => {
    const selectedEmployee = employees[index];
    setName(selectedEmployee.name);
    setDesignation(selectedEmployee.designation);
    setEmail(selectedEmployee.email);
    setPan(selectedEmployee.pan);
    setStartDate(selectedEmployee.startDate);
    setEndDate(selectedEmployee.endDate);
    setPhone(selectedEmployee.phone);
    setStartTime(selectedEmployee.startTime);
    setEndTime(selectedEmployee.endTime);
    setDob(selectedEmployee.dob);

    setIsEditMode(true);
    setEditIndex(index);
  };

  const handleDeleteEmployee = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  };

  return (
    <div className='container'>
      <div className='card-e'>
        <form onSubmit={handleAddEmployee} className='text-center'>
          <h3>Employee Form</h3>
          <br />
          <div className='form-group'>
            <label>Name :</label>&nbsp;
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className='form-group'>
            <label>Designation:</label>&nbsp;
            <input type='text' value={designation} onChange={(e) => setDesignation(e.target.value)} required />
          </div>

          <div className='form-group'>
            <label>Email :</label>&nbsp;
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            {emailError && <p className='error-message'>{emailError}</p>}
          </div>

          <div className='form-group'>
            <label>PAN Card :</label> &nbsp;
            <input type='text' value={pan} onChange={(e) => setPan(e.target.value)} required />
            {panError && <p className='error-message'>{panError}</p>}
          </div>

          <div className='form-group'>
            <label>Phone Number :</label>&nbsp;
            <input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} required />
            {phoneError && <p className='error-message'>{phoneError}</p>}
          </div>

          <div className='form-group'>
            <label>Date of Birth :</label>&nbsp;
            <input
              type='date'
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
            {dobError && <p className='error-message'>{dobError}</p>}
          </div>

          <div className='form-group'>
            <label>Start Date :</label>&nbsp;
            <input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </div>

          <div className='form-group'>
            <label>End Date :</label>&nbsp;
            <input
              type='date'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate} // Set min attribute dynamically
              required
            />
            {dateError && <p className='error-message'>{dateError}</p>}
          </div>

          <div className='form-group'>
            <label>Start Time :</label>&nbsp;
            <input type='time' value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
          </div>

          <div className='form-group'>
            <label>End Time :</label>&nbsp;
            <input type='time' value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            {timeError && <p className='error-message'>{timeError}</p>}
          </div>

          <button type='submit'>{isEditMode ? 'Update Employee' : 'Submit'}</button>
        </form>
      </div>

      <div>
        <h2>Employee List</h2>
        <table className='employee-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Email</th>
              <th>PAN Card</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.designation}</td>
                <td>{employee.email}</td>
                <td>{employee.pan}</td>
                <td>{employee.phone}</td>
                <td>{employee.dob}</td>
                <td>{employee.startDate}</td>
                <td>{employee.endDate}</td>
                <td>{employee.startTime}</td>
                <td>{employee.endTime}</td>
                <td>
                  <button className='edit' onClick={() => handleEditEmployee(index)}>
                    E
                  </button>
                  <button className='delete' onClick={() => handleDeleteEmployee(index)}>
                    D
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeForm;
