import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../Utilities/axiosConfig';
import {
  Container, Paper, Typography, TextField, Button
} from '@mui/material';
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
        const { data } = await axiosInstance.get<RecipeDetails>(`http://127.0.0.1:8000/api/recipe/${id}`);
        setRecipe(data);
      } catch (error) {
        console.error('Failed to fetch recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleRefresh = () => {
    // Refresh the recipe details
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

  return (
    <Container component={Paper} sx={{ padding: 4 }}>
      <Typography variant="h6">Recipe Details</Typography>
      <TextField
        fullWidth
        label="Title"
        value={recipe?.title || ''}
        onChange={(e) => setRecipe({ ...recipe, title: e.target.value } as RecipeDetails)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={4}
        value={recipe?.description || ''}
        onChange={(e) => setRecipe({ ...recipe, description: e.target.value } as RecipeDetails)}
        margin="normal"
      />
      <Button onClick={handleRefresh} sx={{ marginRight: 2 }}>
        Refresh
      </Button>
      <Button onClick={handleSaveChanges} sx={{ marginRight: 2 }}>
        Save
      </Button>
      <Button onClick={handleCreatePost}>
        Post
      </Button>
      {postModalOpen && (
        <PostModal
          isOpen={postModalOpen}
          onClose={handleCloseModal}
          // Add additional props as necessary
        />
      )}
    </Container>
  );
};

export default DetailedRecipeEditPage;
