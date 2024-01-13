import React, { useState } from 'react';
import { PinturaEditor } from '@pqina/react-pintura';
import '@pqina/pintura/pintura.css';
import { getEditorDefaults } from '@pqina/pintura';
import axiosInstance from '../Utilities/axiosConfig';
import { useAuth } from '../contexts/AuthContext';
import ReceiptDetails from '../../models/ReceiptDetails';
import { ISavedServices } from '../Services/ISavedServices';
import { SavedServices } from '../Services/SavedServices';

type CapturedImageProps = {
  image: string;
}

const CapturedImage: React.FC<CapturedImageProps> = ({ image }) => {
  const [inlineResult, setInlineResult] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const { csrfToken } = useAuth();
  const [receiptDetails, setReceiptDetails] = useState<ReceiptDetails | null>(null);

  const savedServices: ISavedServices = new SavedServices();

  const handleClick = async (imageFile: File) => {
    const formData = new FormData();
    imageFile = await urlToImage('https://live.staticflickr.com/5558/14600361669_b73b9e7f04_b.jpg');
    setInlineResult(URL.createObjectURL(imageFile));
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post('http://127.0.0.1:8000/api/detect-receipt/', formData, {
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'multipart/form-data',
            }
        });
        console.log(response.data);
        const receiptDetails = savedServices.createReceiptDetails(response.data);
        setReceiptDetails(receiptDetails);
        // convert data into ReceiptDetails
    } catch (error) {
        console.error("Error uploading image:", error);
    }
};


  const urlToImage = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
    return file;
  }
    
  return (
    <div style={{height: '80vh'}}>
    {/* <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}
      {/* Create a custom component to make edits on the image - copy snapchat in Features page */}
      <PinturaEditor
        {...getEditorDefaults()}
          src={image}
          onProcess={(res) =>
              // setInlineResult(URL.createObjectURL(res.dest))
              handleClick(res.dest)
          }
      />
      {inlineResult && <img src={inlineResult} alt="" />}
    {/* </div> */}
    </div>
  );
}

export default CapturedImage;
