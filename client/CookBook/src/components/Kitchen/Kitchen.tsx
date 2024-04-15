import React, { useEffect, useState } from 'react';
import LoadDetailsServices from '../Services/LoadDetailsServices';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import FetchedFridgeDetails from '../../models/FetchedFridgeDetails';
import FetchedReceiptDetails from '../../models/FetchedReceiptDetails';
import { RecipeServices } from '../Services/RecipeServices';
import { RecipeDetails } from '../../models/RecipeDetails';

const KitchenComponent = () => {
  const { currentUser } = useAuth();
  const [receipts, setReceipts] = useState<FetchedReceiptDetails[]>([]);
  const [fridgeData, setFridgeData] = useState<FetchedFridgeDetails[]>([]);
  const [recipes, setRecipes] = useState<RecipeDetails[]>([]);
  const navigate = useNavigate();
  const recipeServices = new RecipeServices();

  const handleRowClick = (type: 'receipt' | 'fridge' | 'recipe', id: string) => {
    if (type !== 'recipe') {
      navigate(`details/${type}/${id}`);
    } else {
      navigate(`details/recipe/${id}`);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  }

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser?.uid) {
        const loadedData = await LoadDetailsServices(currentUser.uid);
        const allRecipes = await recipeServices.getAllRecipes(currentUser.uid);
        if (loadedData) {
          const sortedReceipts = (loadedData.receiptsDetails as FetchedReceiptDetails[]).sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          const sortedFridgeData = (loadedData.fridgeDataDetails as FetchedFridgeDetails[]).sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

          setReceipts(sortedReceipts);
          setFridgeData(sortedFridgeData);
          setRecipes(allRecipes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        }
      }
    };

    fetchData();
  }, [currentUser?.uid]);

  return (
    <div>
      <h1>Hello {currentUser?.displayName}! Welcome to your Kitchen</h1>
      <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Ingredients</TableCell>
              <TableCell align="right">Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((recipe) => (
              <TableRow
                key={recipe.id}
                hover
                onClick={() => handleRowClick('recipe', recipe.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell component="th" scope="row">{recipe.title}</TableCell>
                <TableCell align="right">{recipe.ingredients.map(ingredient => ingredient.name).join(', ')}</TableCell>
                <TableCell align="right">{formatDate(recipe.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Store</TableCell>
              <TableCell align="right">Foods</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receipts.map((receipt) => (
              <TableRow
                key={receipt.receipt_id} 
                hover
                onClick={() => handleRowClick('receipt', receipt.receipt_id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell component="th" scope="row">
                  {receipt.store}
                </TableCell>
                <TableCell align="right">{receipt.foods.join(', ')}</TableCell>
                <TableCell align="right">{formatDate(receipt.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Foods</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fridgeData.map((fridge) => (
              <TableRow
                key={fridge.fridge_id} 
                hover
                onClick={() => handleRowClick('fridge', fridge.fridge_id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell component="th" scope="row">
                  {fridge.foods.join(', ')}
                </TableCell>
                <TableCell align="right">{formatDate(fridge.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default KitchenComponent;
