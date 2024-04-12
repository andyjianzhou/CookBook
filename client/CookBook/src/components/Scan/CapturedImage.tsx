import React, { useState } from 'react';
import { PinturaEditor } from '@pqina/react-pintura';
import '@pqina/pintura/pintura.css';
import { getEditorDefaults } from '@pqina/pintura';
import axiosInstance from '../Utilities/axiosConfig';
import { useAuth } from '../contexts/AuthContext';
import ReceiptDetails from '../../models/ReceiptDetails';
import { ISavedServices } from '../Services/ISavedServices';
import { SavedServices } from '../Services/SavedServices';
import ReceiptSaveModal from '../Save/ReceiptSaveModal';
import LoadingOverlay from './LoadingOverlay';
import { v4 as uuidv4 } from 'uuid';
import ConfirmationModal from '../Save/ConfirmationModal';

type CapturedImageProps = {
  image: string;
  mode: string;
}

const CapturedImage: React.FC<CapturedImageProps> = ({ image, mode }) => {
  const [inlineResult, setInlineResult] = useState<string | undefined>(undefined);
  const { csrfToken, currentUser } = useAuth();
  const [receiptDetails, setReceiptDetails] = useState<ReceiptDetails | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const savedServices: ISavedServices = new SavedServices();
  const [receiptId] = useState<string>(uuidv4());

  const handleClick = async (imageFile: File) => {
    const formData = new FormData();
    // change this to the image file read from webcam
    imageFile = await urlToImage('https://live.staticflickr.com/5558/14600361669_b73b9e7f04_b.jpg');
    // imageFile = await urlToImage(image);
    setInlineResult(URL.createObjectURL(imageFile));
    formData.append("image", imageFile);
    setLoading(true);
    // set conditional here
    try {
        const response = await axiosInstance.post('http://127.0.0.1:8000/api/detect-receipt/', formData, {
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'multipart/form-data',
            }
        });
        setLoading(false);
        // Convert ReceiptData to ReceiptDetails
        const receiptDetails = savedServices.createReceiptDetails(response.data);
        console.log("Receipt Details: ", receiptDetails);
        setReceiptDetails(receiptDetails);
        setModalOpen(true);
    } catch (error) {
        console.error("Error uploading image:", error);
    }
  };

  const handleSave = () => {
    setShowConfirmationModal(true);
  };

  const onConfirmSave = () => {
    const userId = currentUser?.uid;
    const currentDateTime = new Date().toISOString();
    if (mode === "receipts") {
      savedServices.saveReceiptDetection(receiptId, userId, receiptDetails, csrfToken, currentDateTime)
        .then(() => {
          // Close the recipe modal
          setModalOpen(false)
        })
        .catch((error) => {
          console.error("Error saving receipt:", error);
        });
      } else {
        // save to fridge
        console.log("Save to fridge")
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
      {loading && <LoadingOverlay />}
      

      {receiptDetails && mode === 'receipts' && (
        <ReceiptSaveModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          receiptDetails={receiptDetails}
          onSave={handleSave}
          receiptImg={inlineResult}
        />
      )}
      {showConfirmationModal && (
        <ConfirmationModal
          open={showConfirmationModal}
          onSave={onConfirmSave}
          onClose={() => setShowConfirmationModal(false)}
        />
      )}
    </div>
  );
}

export default CapturedImage;
