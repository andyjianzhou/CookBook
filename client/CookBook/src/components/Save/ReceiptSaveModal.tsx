// ReceiptSaveModal.tsx
import React from 'react';
import { Modal, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { IReceiptSaveModal } from './IReceiptSaveModal';

const ReceiptSaveModal: React.FC<IReceiptSaveModal> = ({ receiptDetails, open, onClose, onSave }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box component="div"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" component="h2">
                    Receipt Details
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Store: {receiptDetails.store}
                    <ul>
                        {receiptDetails.products.map((product, index) => (
                            <li key={index}>
                                {product.product} 
                                - 
                                {product.brand && product.brand !== "null" ? product.brand : "No Brand"
                                } 
                                - 
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
            </Box>
        </Modal>
    );
};

export default ReceiptSaveModal;
