import React, { useState } from 'react';
import { PinturaEditor } from '@pqina/react-pintura';
import '@pqina/pintura/pintura.css';
import { getEditorDefaults } from '@pqina/pintura';
import axiosInstance from '../Utilities/axiosConfig';
import { useAuth } from '../contexts/AuthContext';

type CapturedImageProps = {
  image: string;
}

const CapturedImage: React.FC<CapturedImageProps> = ({ image }) => {
  const [inlineResult, setInlineResult] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const { csrfToken } = useAuth();
  
  const handleClick = async (imageFile: File) => {
    const formData = new FormData();
    imageFile = await urlToImage('https://as1.ftcdn.net/v2/jpg/01/82/01/18/1000_F_182011806_mxcDzt9ckBYbGpxAne8o73DbyDHpXOe9.jpg');
    setInlineResult(URL.createObjectURL(imageFile));
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post('http://127.0.0.1:8000/api/detect-receipt/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
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
