import React, { useState } from 'react';
import { Modal, Button, Typography, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IReceiptSaveModal } from './IReceiptSaveModal';

const ReceiptSaveModal: React.FC<IReceiptSaveModal> = ({
  receiptDetails,
  open,
  onClose,
  onSave,
  receiptImg
}) => {
  const [showImage, setShowImage] = useState(false);
  const [totalFoodItems, setTotalFoodItems] = useState([null]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box component="div"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90vw', sm: '70vw', md: 500 }, // Responsive width
          height: 'auto', // Auto height for better mobile experience
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '16px',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& img': {
            maxWidth: '100%',
            maxHeight: { xs: '50vh', sm: '60vh', md: '80vh' }, // Responsive image size
          }
        }}
      >
        {showImage ? (
          <>
            <img src={receiptImg} alt="Receipt" />
            <IconButton
              onClick={() => setShowImage(false)}
              sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="h6" component="h2">
              Receipt Details
            </Typography>
            <Typography component={'span'} sx={{ mt: 2 }}>
            {/* Create a page where you can edit the tabs, make it look modern */}
              Store: {receiptDetails.store}
              <br />
              Food Items Detected: {receiptDetails.foods ? receiptDetails.foods : "No Food Items Detected"}
              <ul>
                {receiptDetails.products.map((product, index) => (
                  <li key={index}>
                    {product.product} - 
                    {product.brand && product.brand !== "null" ? product.brand : "No Brand"} - 
                    ${product.price}
                  </li>
                ))}
              </ul>
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={onSave}
              sx={{ mt: 2 }}
            >
              Save
            </Button>
            <IconButton
              onClick={() => setShowImage(true)}
              sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ReceiptSaveModal;
