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
import { uploadImageForDetection } from '../Services/ImageService';
import FridgeDetails from '../../models/FridgeDetails';

type CapturedImageProps = {
  image: string;
  mode: string;
}

export interface ApiResponse {
  classes: number[];
  names: { [key: number]: string };
  imageWithDetections: string;
}

const CapturedImage: React.FC<CapturedImageProps> = ({ image, mode }) => {
  const [inlineResult, setInlineResult] = useState<string | undefined>(undefined);
  const { csrfToken, currentUser } = useAuth();
  const [receiptDetails, setReceiptDetails] = useState<ReceiptDetails | null>(null);
  const [fridgeDetails, setFridgeDetails] = useState<FridgeDetails | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const savedServices: ISavedServices = new SavedServices();
  const [receiptId] = useState<string>(uuidv4());


  const handleClick = async (imageFile: File) => {
    const formData = new FormData();
    // change this to the image file read from webcam
    if (mode === 'receipts') {
      imageFile = await urlToImage('https://live.staticflickr.com/5558/14600361669_b73b9e7f04_b.jpg');
    } else {
      imageFile = await urlToImage('https://live.staticflickr.com/5558/14600361669_b73b9e7f04_b.jpg');
    }
    // imageFile = await urlToImage(image);
    setInlineResult(URL.createObjectURL(imageFile));
    formData.append("image", imageFile);
    setLoading(true);
    try {
      const data = await uploadImageForDetection(formData, mode, csrfToken);
      if (mode === 'receipts') {
        const receiptDetails = savedServices.createReceiptDetails(data);
        setReceiptDetails(receiptDetails);
      } else {
        const fridgeDetails = savedServices.createFridgeDetails(data);
        setFridgeDetails(fridgeDetails);
      }
      setModalOpen(true);
    } catch (error) {
      console.error(`Error in handling the image:`, error);
    } finally {
      setLoading(false);
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
      {/* {fridgeDetails && mode === 'fridge' && (
        <FridgeSaveModal>
        
      )} */}
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
