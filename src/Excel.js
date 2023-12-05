import React, { useState } from "react";
import * as XLSX from 'xlsx';

const Excel = () => {
  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit states
  const [excelData, setExcelData] = useState(null);
  const [selectedSheet, setSelectedSheet] = useState(null);

  // onchange event
  const handleFile = (e) => {
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        }
      } else {
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    } else {
      console.log('Please select your file');
    }
  }

  // submit event
  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data.slice(0, 10000));
    }
  }

  // handle sheet change
  const handleSheetChange = (sheet) => {
    setSelectedSheet(sheet);
    const workbook = XLSX.read(excelFile, { type: 'buffer' });
    const worksheet = workbook.Sheets[sheet];
    const data = XLSX.utils.sheet_to_json(worksheet);
    setExcelData(data.slice(0, 10000));
  }

  return (
    <div className="wrapper">

      <h3>Upload & View Excel Sheets</h3>

      {/* form */}
      <form className="form-group custom-form" onSubmit={handleFileSubmit}>
        <input type="file" className="form-control" required onChange={handleFile} />
        <button type="submit" className="btn btn-success btn-md">UPLOAD</button>
        {typeError && (
          <div className="alert alert-danger" role="alert">{typeError}</div>
        )}
      </form>

      {/* view data */}
      <div className="">
        {excelData ? (
          <div className="table-responsive">
            {excelFile && (
              <div>
                <label>Select Sheet : </label>
                <select onChange={(e) => handleSheetChange(e.target.value)} value={selectedSheet}>
                  {XLSX.read(excelFile, { type: 'buffer' }).SheetNames.map((sheet) => (
                    <option key={sheet} value={sheet}>{sheet}</option>
                  ))}
                </select> 
              </div>
            )} <br/>
            <table className="table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>

              <thead>
                <tr>
                  {Object.keys(excelData[0]).map((key) => (
                    <th key={key} style={{ border: '1px solid black', padding: '8px' }}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {excelData.map((individualExcelData, index) => (
                  <tr key={index}>
                    {Object.keys(individualExcelData).map((key) => (
                      <td key={key} style={{ border: '1px solid black', padding: '8px' }}>{individualExcelData[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        ) : (
          <div>No File is uploaded yet!</div>
        )}
      </div>

    </div>
  );
}

export default Excel;
