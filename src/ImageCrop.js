import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCrop = () => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [imageRef, setImageRef] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setSrc(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoaded = (image) => {
    setImageRef(image);
  };

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImg(imageRef, crop);
      setCroppedImageUrl(croppedImage);
    }
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        resolve(blob);
      }, 'image/jpeg');
    });
  };

  const downloadCroppedImage = () => {
    if (croppedImageUrl) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(croppedImageUrl);
      a.download = 'cropped-image.jpg';
      a.click();
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Image Crop and Download</h1>
      <input type="file" onChange={onSelectFile} style={{ marginBottom: '20px' }} />
      {src && (
        <div>
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={onImageLoaded}
            onComplete={onCropComplete}
            onChange={(newCrop) => setCrop(newCrop)}
            style={{ maxWidth: '100%' }}
          />
          <br />
          <button onClick={downloadCroppedImage} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
            Download Cropped Image
          </button>
        </div>
      )}
      {croppedImageUrl && (
        <div style={{ marginTop: '20px' }}>
          <h2>Cropped Image</h2>
          <img alt="Crop" style={{ maxWidth: '100%' }} src={URL.createObjectURL(croppedImageUrl)} />
        </div>
      )}
    </div>
  );
};

export default ImageCrop;
