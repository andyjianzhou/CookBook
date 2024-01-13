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

  return (
    <Modal open={open} onClose={onClose}>
      <Box component="div"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500, // Set a fixed width
          height: 600, // Set a fixed height
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '16px', // Rounded corners
          overflow: 'auto', // Add scroll if content is larger than the modal
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {showImage ? (
          <>
            <img src={receiptImg} alt="Receipt" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
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
            <Typography sx={{ mt: 2 }}>
              Store: {receiptDetails.store}
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
