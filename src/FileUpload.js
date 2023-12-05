import React, { useState } from 'react';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInfoVisible, setFileInfoVisible] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileInfoVisible(false); // Hide file information when a new file is selected
  };

  const handleUpload = () => {
    if (selectedFile) {
      setFileInfoVisible(true);
    } else {
      console.warn('No file selected for upload.');
    }
  };

  return (
    <center>
      <div className='fileupload'>
        <h3><b>File Upload</b></h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Submit</button>

        {/* Display the selected file information (if any) */}
        {fileInfoVisible && selectedFile && (
          <div className='fileupload'>
            <h3><b>Selected File Information:</b></h3>
            <h5><b>File Name:</b> {selectedFile.name}</h5>
            <h5><b>File Extension:</b> {selectedFile.name.split('.').pop()}</h5>
            <h5><b>File Size:</b> {selectedFile.size} bytes</h5>
  
            {/* Add more information as needed */}
          </div>
        )}
      </div>
    </center>
  );
};

export default FileUpload;
