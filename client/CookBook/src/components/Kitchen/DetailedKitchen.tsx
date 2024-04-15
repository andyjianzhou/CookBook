import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../Utilities/axiosConfig';
import { Container, FormControl, InputLabel, MenuItem, Paper, Select, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Button } from '@mui/material';

type FoodItem = {
  name: string;
  measure: string;
};

const DetailedKitchenPage = () => {
  const { type, id } = useParams();
  const [itemDetails, setItemDetails] = useState<any | null>(null);
  const [editFoods, setEditFoods] = useState<FoodItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        // Construct the URL based on the type and id provided in the URL
        const url = `dashboard/detail/${type}/${id}`;
        const response = await axiosInstance.get(url); 
        setItemDetails(response.data);

        if (response.data.foods) {
          const foodsWithMeasures = response.data.foods.map((food: any) => ({
            name: food, 
            measure: '' 
          }));
          setEditFoods(foodsWithMeasures);
        }
      } catch (error) {
        console.error('Failed to fetch item details', error);
      }
    };

    fetchItemDetails();
  }, [type, id]); 

  const handleMeasureChange = (index: number, measure: string) => {
    const newFoods = [...editFoods];
    newFoods[index].measure = measure;
    setEditFoods(newFoods);
  };

  const handleSaveRecipe = async () => {
    console.log('Recipe data to save:', editFoods);
    console.log("Generated button pressed")
    // navigate('/'); // Navigate to relevant page
  };

  return (
    <Container component={Paper} sx={{ padding: 4 }}>
      <Typography variant="h6">Edit Kitchen Item Details</Typography>
      <List>
        {editFoods.map((food, index) => (
          <ListItem key={index}>
            <ListItemText primary={food.name} />
            <ListItemSecondaryAction>
              <FormControl fullWidth>
                <InputLabel>Measure</InputLabel>
                <Select
                  value={food.measure}
                  label="Measure"
                  onChange={(e) => handleMeasureChange(index, e.target.value)}
                >
                  <MenuItem value={"1 tbsp"}>1 tbsp</MenuItem>
                  <MenuItem value={"2 tbsp"}>2 tbsp</MenuItem>
                  <MenuItem value={"3 tbsp"}>3 tbsp</MenuItem>
                </Select>
              </FormControl>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={handleSaveRecipe}>
        Generate Recipe
      </Button>
    </Container>
  );
};

export default DetailedKitchenPage;
