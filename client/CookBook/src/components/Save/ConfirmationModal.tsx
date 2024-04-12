import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 5
};

interface ConfirmationModalProps {
    onSave: () => void;
    open: boolean;
    onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onSave,
  open,
  onClose
}) => {

  const handleSave = () => {
    onSave(); 
    onClose();
    // navigate to another page after
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="div" sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Save
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Are you sure you want to save this recipe? You can edit your saved recipes later.
          </Typography>
          <Box component="div" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={onClose} sx={{ mr: 1 }}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
