import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../Utilities/axiosConfig';
import { Container, Paper, Typography, TextField, Button, List, ListItem, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PostModal from '../Post/PostModal';
import { RecipeDetails } from '../../models/RecipeDetails';
import { ISavedServices } from '../Services/ISavedServices';
import { SavedServices } from '../Services/SavedServices';
import { useAuth } from '../contexts/AuthContext';
import { generateRecipe } from '../Services/AIServices';
import LoadingOverlay from '../Scan/LoadingOverlay';

const DetailedRecipeEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postInitialContent, setPostInitialContent] = useState('');
  const savedServices: ISavedServices = new SavedServices();
  const [refreshKey, setRefreshKey] = useState(0);
  const { csrfToken } = useAuth();

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
  }, [id, refreshKey]);

  const handleIngredientChange = (index: number, part: 'name' | 'measure', value: string) => {
    if (recipe) {
      const updatedIngredients = recipe.ingredients.map((ingredient, idx) =>
        idx === index ? { ...ingredient, [part]: value } : ingredient
      );
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

  const handleRefreshPage = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleSaveChanges = async () => {
    if (!recipe) return;
    try {
      await savedServices.updateRecipeDetails(recipe, csrfToken, `http://127.0.0.1:8000/api/recipe/${id}/`);
    } catch (error) {
      console.error('Failed to save changes:', error);
    }
  };

  const handleCreatePost = () => {
    if (!recipe) return;
  
    const titleMarkdown = `#### ${recipe.title.trim()}`;
    const ingredientsMarkdown = `##### Ingredients\n${recipe.ingredients.map(ing => `- **${ing.name.trim()}**: ${ing.measure.trim()}`).join('\n')}`;
    const instructionsMarkdown = `##### Instructions\n${recipe.description.trim()}`;
    const postContent = [titleMarkdown, ingredientsMarkdown, instructionsMarkdown].join('\n\n');
    setPostModalOpen(true);
    setPostInitialContent(postContent); // Assuming you add a state to hold this
  };
  
  

  const handleCloseModal = () => {
    setPostModalOpen(false);
  };

  const handleMagicAIRecipe = async () => {
    if (!recipe) return;
    const recipeJson = JSON.stringify(recipe);
    setLoading(true);
    const recipeResults: RecipeDetails = await generateRecipe(recipeJson, csrfToken);
    setLoading(false);
    setRecipe(recipeResults);
  };

  return (
    <Container component={Paper} sx={{ padding: 4 }}>
      {loading && <LoadingOverlay />}

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
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              sx={{ mr: 2 }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Measure"
              value={ingredient.measure}
              onChange={(e) => handleIngredientChange(index, 'measure', e.target.value)}
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
      <Grid container justifyContent="space-between">
        <Grid item>
          <Button onClick={handleSaveChanges} variant="contained" sx={{ mt: 2 }}>
            Save
          </Button>
          <Button onClick={handleRefreshPage} variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>
            Refresh
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={handleMagicAIRecipe} variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
            Magic AI Recipe
          </Button>
          <Button onClick={handleCreatePost} variant="contained" color="primary" sx={{ mt: 2 }}>
            Post
          </Button>
        </Grid>
      </Grid>
      {postModalOpen && (
        <PostModal
          isOpen={postModalOpen}
          onClose={handleCloseModal}
          initialContent={postInitialContent}
        />
      )}
    </Container>
  );
};

export default DetailedRecipeEditPage;
