import React, { useEffect, useState } from 'react';
import { Modal, Button, Typography, IconButton, TextField, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { Box } from '@mui/system';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Divider from '@mui/material/Divider';
import { IReceiptSaveModal } from './IReceiptSaveModal';

const ReceiptSaveModal: React.FC<IReceiptSaveModal> = ({
  receiptDetails,
  open,
  onClose,
  onSave,
  receiptImg
}) => {
  const [showImage, setShowImage] = useState(false);
  const [products, setProducts] = useState(receiptDetails.products);
  const [newFoodItem, setNewFoodItem] = useState('');
  const [foodBasket, setFoodBasket] = useState(receiptDetails.foods);

  useEffect(() => {
    receiptDetails.products = products;
    receiptDetails.foods = foodBasket;
    }, [products, foodBasket])


  const handleProductChange = (index: number, field: keyof IReceiptSaveModal['receiptDetails']['products'][number], value: string) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const addFoodItem = () => {
    if (newFoodItem) {
      setProducts([...products, { product: newFoodItem, brand: null, price: ''}]);
      setNewFoodItem('');
    }
  };

  const removeFoodItem = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
    receiptDetails.products = updatedProducts;
  };

  const checkMarkFoodItem = (index: number) => {
    const chosenProduct = products[index];
    setFoodBasket([...foodBasket, chosenProduct.product]);
  }

  const getFoodCounts = (foods: string[]) => {
    return foods.reduce((acc:any, food:any) => {
      acc[food] = (acc[food] || 0) + 1;
      return acc;
    }, {});
  };
  

  return (
    <Modal open={open} onClose={onClose}>
      <Box component="div"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90vw', sm: '70vw', md: '500px' }, // Responsive width
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '16px',
          overflow: 'hidden', // Prevent overflow to enable scrolling within the List component
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
          <Typography component={'span'} sx={{ mt: 2, width: '100%' }}>
            Store: {receiptDetails.store}
            <br />
            <Box component="div" sx={{ maxHeight: '100px', overflow: 'auto', width: '100%', mt: 1 }}>
              Food Items:
              <List dense>
                {Object.entries(getFoodCounts(foodBasket)).map(([food, count], index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${food}: ${count}`} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => setFoodBasket(foodBasket.filter((item) => item !== food))}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box component = "div" sx={{ width: '100%', maxHeight: '50vh', overflow: 'auto' }}>
              <List dense>
                {products.map((product, index) => (
                  <React.Fragment key={index}>
                    <ListItem key={index} sx={{ pl: 0 }}>
                      <ListItemText>
                        <TextField
                          label="Product"
                          value={product.product}
                          onChange={(e) => handleProductChange(index, 'product', e.target.value)}
                          size="small"
                          margin="dense"
                        />
                        <TextField
                          label="Brand"
                          value={product.brand || ''}
                          onChange={(e) => handleProductChange(index, 'brand', e.target.value)}
                          size="small"
                          margin="dense"
                        />
                        <TextField
                          label="Price"
                          value={product.price}
                          onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                          size="small"
                          margin="dense"
                          type="number"
                        />
                      </ListItemText>
                      <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="check" onClick={() => checkMarkFoodItem(index)}>
                          <CheckCircleOutlineIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => removeFoodItem(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < products.length - 1 && <Divider />}
                  </React.Fragment>
                  ))}
              </List>
            </Box>
            <Box component = "div" display="flex" alignItems="center">
              <TextField
                label="Add Product"
                value={newFoodItem}
                onChange={(e) => setNewFoodItem(e.target.value)}
                size="small"
                margin="normal"
              />
              <IconButton color="primary" onClick={addFoodItem}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>
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
