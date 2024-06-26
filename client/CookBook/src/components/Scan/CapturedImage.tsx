import React, { useState } from 'react';
import { PinturaEditor } from '@pqina/react-pintura';
import '@pqina/pintura/pintura.css';
import { getEditorDefaults } from '@pqina/pintura';
import { useAuth } from '../contexts/AuthContext';
import ReceiptDetails from '../../models/ReceiptDetails';
import { ISavedServices } from '../Services/ISavedServices';
import { SavedServices } from '../Services/SavedServices';
import ReceiptSaveModal from '../Save/ReceiptSaveModal';
import LoadingOverlay from './LoadingOverlay';
import { v4 as uuidv4 } from 'uuid';
import ConfirmationModal from '../Save/ConfirmationModal';
import { uploadImageForDetection } from '../Services/AIServices';
import FridgeDetails from '../../models/FridgeDetails';
import FridgeSaveModal from '../Save/FridgeSaveModal';

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
  const savedServices: ISavedServices = new SavedServices(); // Replicates Dependency Injection
  const [receiptId] = useState<string>(uuidv4());


  const handleClick = async (imageFile: File) => {
    const formData = new FormData();
    // change this to the image file read from webcam
    if (mode === 'receipts') {
      imageFile = await urlToImage('https://live.staticflickr.com/5558/14600361669_b73b9e7f04_b.jpg');
    } else {
      imageFile = await urlToImage('https://cdn.discordapp.com/attachments/700087629323960351/1229263695578927104/test.jpg?ex=662f0c07&is=661c9707&hm=872fafb768f4a62744b66173c5085d0267c2f73601f8daece861bfacfdaea7b2&');
    }
    // imageFile = await urlToImage(image);
    setInlineResult(URL.createObjectURL(imageFile));
    formData.append("image", imageFile);
    setLoading(true);
    try {
      const data = await uploadImageForDetection(formData, mode, csrfToken);
      const detectedImage = data.image_with_detections

      if (mode === 'receipts') {
        const receiptDetails = savedServices.createReceiptDetails(data);
        setReceiptDetails(receiptDetails);
      } else {
        const fridgeDetails = savedServices.createFridgeDetails(data);
        console.log("FridgeDetails:", fridgeDetails)
        setFridgeDetails(fridgeDetails);
        setInlineResult(detectedImage) 
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
    console.log("Current date", currentDateTime)
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
        savedServices.saveFridgeDetection(receiptId, userId, fridgeDetails, csrfToken, currentDateTime)
          .then(() => {
            // Close the recipe modal
            setModalOpen(false)
          })
          .catch((error) => {
            console.error("Error saving fridge:", error);
          }
        );
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
      <PinturaEditor
        {...getEditorDefaults()}
          src={image}
          onProcess={(res) =>
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
      {fridgeDetails && mode === 'fridge' && (
        <FridgeSaveModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        fridgeDetails={fridgeDetails}
        updateFridgeDetails={(updatedFoods) => setFridgeDetails({ ...fridgeDetails, foods: updatedFoods })}
        fridgeImg={inlineResult}
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
