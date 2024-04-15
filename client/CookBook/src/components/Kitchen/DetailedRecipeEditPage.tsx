import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../Utilities/axiosConfig';
import { Container, Paper, Typography, TextField, Button, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PostModal from '../Post/PostModal';
import { RecipeDetails } from '../../models/RecipeDetails';

const DetailedRecipeEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const { data } = await axiosInstance.get<RecipeDetails>(`http://127.0.0.1:8000/api/recipe/${id}/`);
        setRecipe(data);
      } catch (error) {
        console.error('Failed to fetch recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleIngredientChange = (index: number, value: string) => {
    if (recipe) {
      const updatedIngredients = recipe.ingredients.map((ingredient, idx) => idx === index ? { ...ingredient, name: value } : ingredient);
      setRecipe({ ...recipe, ingredients: updatedIngredients });
    }
  };

  const handleAddIngredient = () => {
    const newIngredient = { name: '', measure: '' };
    if (recipe) {
      const updatedIngredients = [...recipe.ingredients, newIngredient];
      setRecipe({ ...recipe, ingredients: updatedIngredients });
    }
  };

  const handleRemoveIngredient = (index: number) => {
    if (recipe) {
      const updatedIngredients = recipe.ingredients.filter((_, idx) => idx !== index);
      setRecipe({ ...recipe, ingredients: updatedIngredients });
    }
  };

  const handleSaveChanges = async () => {
    // Save the changes made to the recipe
  };

  const handleCreatePost = () => {
    setPostModalOpen(true);
  };

  const handleCloseModal = () => {
    setPostModalOpen(false);
  };

  const handleMagicAIRecipe = () => {
    // Logic for generating magic AI recipe
  };

  return (
    <Container component={Paper} sx={{ padding: 4 }}>
      <Typography variant="h6">Recipe Details</Typography>
      <TextField
        fullWidth
        label="Title"
        value={recipe?.title || ''}
        onChange={(e) => recipe && setRecipe({ ...recipe, title: e.target.value })}
        margin="normal"
      />
      <List>
        {recipe?.ingredients.map((ingredient, index) => (
          <ListItem key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Ingredient"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              sx={{ mr: 2 }}
            />
            <IconButton onClick={() => handleRemoveIngredient(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
        <ListItem>
          <Button startIcon={<AddIcon />} onClick={handleAddIngredient}>
            Add Ingredient
          </Button>
        </ListItem>
      </List>
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={4}
        value={recipe?.description || ''}
        onChange={(e) => recipe && setRecipe({ ...recipe, description: e.target.value })}
        margin="normal"
      />
      <Button onClick={handleSaveChanges} sx={{ marginRight: 2 }}>
        Save
      </Button>
      <Button onClick={handleCreatePost}>
        Post
      </Button>
      <Button variant="contained" color="primary" onClick={handleMagicAIRecipe} sx={{ marginLeft: 2, width: 'auto' }}>
        Magic AI Recipe
      </Button>
      {postModalOpen && (
        <PostModal
          isOpen={postModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default DetailedRecipeEditPage;
