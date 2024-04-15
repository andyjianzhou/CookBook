import React, { useState } from 'react';
import { Modal, Button, Typography, IconButton, TextField, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { Box } from '@mui/system';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IFridgeSaveModal } from './IFridgeSaveModal';

const FridgeSaveModal: React.FC<IFridgeSaveModal> = ({
    fridgeDetails,
    updateFridgeDetails,
    open,
    onClose,
    onSave,
    fridgeImg
  }) => {
    const [showImage, setShowImage] = useState(false);
    const [foods, setFoods] = useState<string[]>(fridgeDetails.foods);
    const [newFoodItem, setNewFoodItem] = useState('');

    const handleAddFood = () => {
      if (newFoodItem.trim() !== '' && !foods.includes(newFoodItem.trim())) {
          const updatedFoods = [...foods, newFoodItem.trim()];
          setFoods(updatedFoods);
          updateFridgeDetails(updatedFoods);
          setNewFoodItem('');
      }
    };
  
  const handleRemoveFood = (foodToRemove: string) => {
      const updatedFoods = foods.filter(food => food !== foodToRemove);
      setFoods(updatedFoods);
      updateFridgeDetails(updatedFoods);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box component="div"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90vw', sm: '70vw', md: '500px' },
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {showImage ? (
                    <>
                        <img src={fridgeImg} alt="Fridge" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
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
                            Edit Fridge Contents
                        </Typography>
                        <List sx={{ width: '100%', maxHeight: '300px', overflow: 'auto', mt: 2 }}>
                            {foods.map((food, index) => (
                                <ListItem key={index} sx={{ pl: 0 }}>
                                    <ListItemText primary={food} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFood(food)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                        <TextField
                            fullWidth
                            label="Add Food Item"
                            value={newFoodItem}
                            onChange={(e) => setNewFoodItem(e.target.value)}
                            margin="normal"
                        />
                        <IconButton color="primary" onClick={handleAddFood} sx={{ mt: 1 }}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                        <Button variant="contained" color="primary" onClick={onSave} sx={{ mt: 2 }}>
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

export default FridgeSaveModal;
