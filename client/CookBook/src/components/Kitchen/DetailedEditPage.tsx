import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  TextField,
  IconButton,
  Button,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from '../Utilities/axiosConfig';
import { useAuth } from '../contexts/AuthContext';
import { IRecipeServices } from '../Services/IRecipeServices';
import { RecipeServices } from '../Services/RecipeServices';

interface KitchenItemDetails {
  foods: string[];
}

interface FoodItem {
  name: string;
  measure: string;
}

const DetailedKitchenPage = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [editFoods, setEditFoods] = useState<FoodItem[]>([{ name: '', measure: '' }]);
  const { csrfToken, currentUser } = useAuth();
  const recipeServices: IRecipeServices = new RecipeServices();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const url = `http://127.0.0.1:8000/api/${type}/${id}/`;
        const response = await axiosInstance.get<KitchenItemDetails>(url);
        if (response.data && response.data.foods) {
          setEditFoods(response.data.foods.map(food => ({ name: food, measure: '' })));
        }
      } catch (error) {
        console.error('Failed to fetch item details', error);
      }
    };
    fetchItemDetails();
  }, [type, id]);

  const handleNameChange = (index: number, name: string) => {
    const newFoods = [...editFoods];
    newFoods[index].name = name;
    setEditFoods(newFoods);
  };

  const handleMeasureChange = (index: number, measure: string) => {
    const newFoods = [...editFoods];
    newFoods[index].measure = measure;
    setEditFoods(newFoods);
    console.log('newFoods:', newFoods)
  };

  const handleAddFood = () => {
    setEditFoods([...editFoods, { name: '', measure: '' }]);
  };

  const handleRemoveFood = (index: number) => {
    const newFoods = [...editFoods];
    newFoods.splice(index, 1);
    setEditFoods(newFoods);
  };

  const handleCreateRecipe = async () => {
    const currentDateTime = new Date().toISOString();

    try {
        const recipeDetails = {
            userId: currentUser?.uid,
            title: 'New Recipe from Kitchen',
            ingredients: editFoods,
            description: 'Generated from kitchen inventory.',
            createdAt: currentDateTime,
        };
        
        const response = recipeServices.createRecipe(recipeDetails, csrfToken);
        console.log('Recipe created:', response);
        navigate(`/dashboard/kitchen`);
    } catch (error) {
        console.error('Error creating recipe:', error);
    }
};

  const handleSaveChanges = async () => {
    try {
        const url = `http://127.0.0.1:8000/api/${type}/${id}/`;
        const updatedFoods = editFoods.map(food => food.name);
        console.log('Saving changes to the database:', updatedFoods);
        await axiosInstance.patch(url, JSON.stringify({updated_foods: updatedFoods}), {
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json',
            }
        });
        console.log('Changes saved to the database:', updatedFoods);
    } catch (error) {
        console.error('Failed to save changes', error);
    }
};

  return (
    <Container component={Paper} sx={{ padding: 4 }}>
      <Typography variant="h6">Edit Kitchen Item Details</Typography>
      <List>
        {editFoods.map((food, index) => (
          <ListItem key={index} sx={{ pb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Food Name"
              value={food.name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              sx={{ mr: 2 }}
            />
            <TextField
              select
              label="Measure"
              value={food.measure}
              onChange={(e) => handleMeasureChange(index, e.target.value)}
              sx={{ width: '150px', mr: 2 }}
            >
              <MenuItem value="1 tbsp">1 tbsp</MenuItem>
              <MenuItem value="2 tbsp">2 tbsp</MenuItem>
              <MenuItem value="3 tbsp">3 tbsp</MenuItem>
              <MenuItem value="1 cup">1 cup</MenuItem>
              <MenuItem value="2 cups">2 cups</MenuItem>
              <MenuItem value="3 cups">3 cups</MenuItem>
              <MenuItem value="1 item">1 item</MenuItem>
              <MenuItem value="2 items">2 items</MenuItem>
              <MenuItem value="3 items">3 items</MenuItem>
              <MenuItem value="1 lb">1 lb</MenuItem>
              <MenuItem value="2 lbs">2 lbs</MenuItem>
              <MenuItem value="3 lbs">3 lbs</MenuItem>
              <MenuItem value="1 oz">1 oz</MenuItem>
              <MenuItem value="2 oz">2 oz</MenuItem>
              <MenuItem value="3 oz">3 oz</MenuItem>
            </TextField>
            <IconButton edge="end" onClick={() => handleRemoveFood(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
        <ListItem>
          <Button startIcon={<AddIcon />} onClick={handleAddFood}>
            Add Food
          </Button>
        </ListItem>
      </List>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        <Button variant="contained" color="primary" onClick={handleSaveChanges} sx={{ mt: 2 }}>
          Save Changes
        </Button>
        <Button variant="contained" color="primary" onClick={handleCreateRecipe} sx={{ mt: 2 }}>
          Create Recipe
        </Button>
      </div>
    </Container>
  );
};

export default DetailedKitchenPage;
