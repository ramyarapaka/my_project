import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDownload, FaPencilAlt, FaTimes } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [file, setFile] = useState(null);
  const [limit, setLimit] = useState("5");

  const fetchTypeMasterData = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token is missing or invalid. Redirect to login.');
        return;
      }

      const headers = {
        Authorization: `${token}`,
      };

      const postData = {
        client_id: 1,
        status: 1,
        q: searchTerm,
        limit: limit, // Include the limit parameter in the request
      };

      const response = await axios.post(
        'https://afs.anyaudit.in/anyfinancials/AfsTypeOfSharesMasterApi/getTypeOfSharesMaster',
        postData,
        {
          headers: headers,
        }
      );

      console.log('API Response:', response.data);
      setClients(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      console.error('Error response data:', error.response?.data);
      console.error('Error response status:', error.response?.status);
      console.error('Error response headers:', error.response?.headers);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypeMasterData();
  }, [searchTerm, limit]); // Include limit in the dependency array

  const handleCheckboxChange = (recordId) => {
    setSelectedRecords((prevSelectedRecords) => {
      if (prevSelectedRecords.includes(recordId)) {
        return prevSelectedRecords.filter((id) => id !== recordId);
      } else {
        return [...prevSelectedRecords, recordId];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedRecords(selectedRecords.length === clients.length ? [] : clients.map((data) => data.id));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log('Search Term:', e.target.value);
  };

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    try {
      const fileData = await readFile(selectedFile);
      // You can set the file data in state or process it as needed
      console.log('File Data:', fileData);
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Error reading file. Please try again.');
    }
  };

  // New function to read Excel file
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0]; // Assuming there's only one sheet
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          const fileData = jsonData.map((row) => ({
            created_by: row[0],
            typeof_share_master_name: row[1],
          }));

          resolve(fileData);
        } catch (error) {
          reject(error);
        }
      };

      reader.readAsBinaryString(file);
    });
  };

  const uploadRecordsToApi = async (fileData) => {
    if (!file) {
      alert('Please select a file before uploading.');
      return;
    }

    try {
      const fileData = await readFile(file);

      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `${token}`,
        'Content-Type': 'application/json', // Adjust the content type as needed
      };
      const formattedArray = []

      for (const row of fileData) {
        // Convert the row data to the desired format
        const formattedData = {
          created_by: row.created_by,
          typeof_share_master_name: row.typeof_share_master_name, // Assuming the second column is the typeof_share_master_name
          // You can adjust the value of created_by as needed
        };
        formattedArray.push(formattedData)


        // Hit your insert API with the formatted data
        await axios.post(
          'https://afs.anyaudit.in/anyfinancials/AfsTypeOfSharesMasterApi/insertTypeOfSharesMaster', // Replace with your actual insert API endpoint
          formattedData,
          { headers }
        );
      }

      // You may want to fetch updated data after successful upload
      fetchTypeMasterData();

      alert('File uploaded and records inserted successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('File upload failed. Please try again.');
    }
  };

  const downloadSelectedRecords = () => {
    if (selectedRecords.length === 0) {
      alert('Please select records before downloading.');
      return;
    }

    try {
      const selectedData = clients
        .filter((data) => selectedRecords.includes(data.id))
        .filter((data) => data.typeof_share_master_name.toLowerCase().includes(searchTerm.toLowerCase()));

      console.log('Selected Data:', selectedData);

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(selectedData);
      XLSX.utils.book_append_sheet(wb, ws, 'Selected Records');
      XLSX.writeFile(wb, 'selected_records.xlsx');
    } catch (error) {
      console.error('Error filtering or creating Excel file:', error);
    }
  };

  const downloadSearchRecords = () => {
    if (searchTerm.trim() === '') {
      alert('Please enter a search term.');
      return;
    }

    try {
      const searchResults = clients.filter((data) =>
        data.typeof_share_master_name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (searchResults.length === 0) {
        alert('No matching records found.');
        return;
      }

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(searchResults);
      XLSX.utils.book_append_sheet(wb, ws, 'Search Results');
      XLSX.writeFile(wb, 'search_results.xlsx');
    } catch (error) {
      console.error('Error creating Excel file:', error);
    }
  };
  const downloadAllRecords = () => {
    try {
      const allData = clients
        .slice(0, parseInt(limit))
        .filter((data) => data.typeof_share_master_name.toLowerCase().includes(searchTerm.toLowerCase()));
  
      if (allData.length === 0) {
        alert('No matching records found for download.');
        return;
      }
  
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(allData);
      XLSX.utils.book_append_sheet(wb, ws, 'All Records');
      XLSX.writeFile(wb, 'all_records.xlsx');
    } catch (error) {
      console.error('Error creating Excel file:', error);
    }
  };

  return (
    <div className="col-md-12 p-2 container">
      {/* <div className='d-flex'>
      <button className='link' > <Link to="/image_upload">File Information </Link></button>
      <button className='link' > <Link to="/date">Date </Link></button>
      <button className='link' > <Link to="/adddate">Date Information </Link></button>
      <button className='link' > <Link to="/excel">Excel Display </Link></button>
      <button className='link' > <Link to="/image_crop">Image Cropping </Link></button>
      <button className='link' > <Link to="/Que_ans"> Dynamic Ques-Ans </Link></button>
      <button className='link' > <Link to="/Currency"> Currency </Link></button>
      <button className='link' > <Link to="/bank_system"> Bank System </Link></button>
      <button className='link' > <Link to="/employ_form"> EmployeeForm </Link></button>
      </div>
       */}
     
      <h2>List page</h2>
      <div className='row  p-1 m-1'>
        <label htmlFor="fileInput" className="ml-4 p-1" title="Upload Excel File">
          Upload Excel File:
          <input
            type="file"
            id="fileInput"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
          <button className="uplaod-excel" onClick={uploadRecordsToApi}>Upload Excel</button>
        </label>
<br/>
       
        <div>
        <label className="ml-4">
          Show &nbsp;
          <select
            className="search pr-3"
            autoComplete="off"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          &nbsp; entries
        </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <label className="ml-4" title="Search">
          Search:
          <input
            type="text"
            className="excel"
            value={searchTerm}
            onChange={handleSearch}
          />
        </label>
        <button className="excel" onClick={downloadSelectedRecords}>Download Excel</button>
        <button className="excel" onClick={downloadSearchRecords}>Download Search Results</button>
        <button className="excel" onClick={downloadAllRecords}>
         <FaDownload/>
        </button>
        </div>
      </div>

      <table className="border table-striped table">
        <thead className="thclass border">
          <tr>
            <th width="5%">S.No</th>
            <th width="1%">
              <input
                type="checkbox"
                checked={selectedRecords.length === clients.length}
                onChange={handleSelectAll}
              />
            </th>
            <th width="20%">Type Name</th>
            <th width="20%">Client Id</th>
            <th width="20%">Parent_Id</th>
            <th width="5%">Status</th>
          </tr>
        </thead>

        <tbody className="table-bordered tbclass">
          {loading ? (
            <tr>
              <td colSpan="6">Loading data...</td>
            </tr>
          ) : (
            Array.isArray(clients) && clients.length > 0 ? (
              clients.map((data, index) => {
                const sNo = index + 1;

                return (
                  <tr key={data.id}>
                    <td>{sNo}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRecords.includes(data.id)}
                        onChange={() => handleCheckboxChange(data.id)}
                      />
                    </td>
                    <td>{data.typeof_share_master_name}</td>
                    <td>{data.client_id}</td>
                    <td>{data.parent_id}</td>
                    <td>
                      <FaPencilAlt className="" /> | <FaTimes className="pencil" />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6">No records found.</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
