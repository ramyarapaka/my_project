import React, { useState, useRef, useEffect } from 'react';
import panCard from './pancard.jpg';

import './VoterCard.css'; // Import your CSS file

const PanCard = () => {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isEligible, setIsEligible] = useState(false);
  const [address, setAddress] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null); // Added state for signature
  const canvasRef = useRef(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleFatherNameChange = (event) => {
    setFatherName(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
    setIsEligible(calculateEligibility(event.target.value));
  };

  const calculateEligibility = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18;
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleSignatureChange = (event) => {
    const file = event.target.files[0];
    setSignature(file);
  };

  const generatePanNumber = () => {
    const uniqueId = Math.random().toString(36).substring(7).toUpperCase().slice(0, 10);
    setPanNumber(`ABCDE${uniqueId}F`);
  };

  const handleDownload = () => {
    if (
      name &&
      fatherName &&
      dateOfBirth &&
      isEligible &&
      address &&
      panNumber &&
      photo &&
      signature
    ) {
      const canvas = document.createElement('canvas');
      canvas.width = 350;
      canvas.height = 210;
      const context = canvas.getContext('2d');

      const img = new Image();
      img.src = panCard;

      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        context.fillStyle = 'Black';
        context.font = '11px Times New Roman';
        context.fillText(`${name}`, 15, 137);
        context.fillText(` ${fatherName}`, 14, 166);
        context.fillText(`${dateOfBirth}`, 15, 200);
        context.fillText(` ${panNumber}`, 105, 95);

        if (photo) {
          const imgData = URL.createObjectURL(photo);
          const photoImg = new Image();
          photoImg.src = imgData;
          context.drawImage(photoImg, 250, 30, 80, 80);
        }

        if (signature) {
          const signatureImg = new Image();
          signatureImg.src = URL.createObjectURL(signature);
          context.drawImage(signatureImg, 250, 120, 80, 30);
        }

        const dataURL = canvas.toDataURL('image/png');

        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = 'pan_card.png';

        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);
      };
    } else {
      console.log('Invalid input or not eligible.');
    }
  };

  useEffect(() => {
    if (isEligible) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      const img = new Image();
      img.src = panCard;

      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        context.fillStyle = 'Black';
        context.font = '10px Times New Roman';
        context.fillText(`${name}`, 15, 137);
        context.fillText(` ${fatherName}`, 14, 166);
        context.fillText(`${dateOfBirth}`, 15, 200);
        context.fillText(` ${panNumber}`, 105, 95);

        if (photo) {
          const photoImg = new Image();
          photoImg.src = URL.createObjectURL(photo);
          photoImg.onload = () => {
            context.drawImage(photoImg, 12, 53, 67, 66);
          };
        }

        if (signature) {
          const signatureImg = new Image();
          signatureImg.src = URL.createObjectURL(signature);
          signatureImg.onload = () => {
            context.drawImage(signatureImg, 127, 170, 65, 20);
          };
        }
      };
    }
  }, [isEligible, name, fatherName, dateOfBirth, address, panNumber, photo, signature]);

  return (
    <div className="pan-card-container">
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Father's Name:
        <input type="text" value={fatherName} onChange={handleFatherNameChange} />
      </label>
      <label>
        Date of Birth:
        <input type="date" value={dateOfBirth} onChange={handleDateOfBirthChange} />
      </label>
      <label>
        Address:
        <textarea value={address} onChange={handleAddressChange}></textarea>
      </label>
      <label>
        Photo:
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
      </label>
      <label>
        Signature:
        <input type="file" accept="image/*" onChange={handleSignatureChange} />
      </label>
      <button className="generate-pan-button" onClick={generatePanNumber}>
        Generate PAN Number
      </button>

      <div className="pan-card-details">
        <h2>Pan Card Details</h2>
        <canvas
          ref={canvasRef}
          width={350}
          height={210}
          style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>

      {isEligible && (
        <button className="download-button" onClick={handleDownload}>
          Download PAN Card
        </button>
      )}
    </div>
  );
};

export default PanCard;
