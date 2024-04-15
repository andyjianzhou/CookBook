  import React, { useEffect, useState } from 'react';
  import LoadFridgeReceiptService from '../Services/LoadFridgeReceiptService';
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

  const KitchenComponent = () => {
    const { currentUser } = useAuth();
    const [receipts, setReceipts] = useState<FetchedReceiptDetails[]>([]);
    const [fridgeData, setFridgeData] = useState<FetchedFridgeDetails[]>([]);
    const [selectedItem, setSelectedItem] = useState<FetchedReceiptDetails | FetchedFridgeDetails | null>(null);

    const navigate = useNavigate();

    const handleRowClick = (type: 'receipt' | 'fridge', id: string) => {
      navigate(`/${type}/${id}`); // This will navigate to /receipt/:id or /fridge/:id
    };
    useEffect(() => {
        const fetchData = async () => {
            if (currentUser?.uid) {
                const loadedData = await LoadFridgeReceiptService(currentUser.uid);
                if (loadedData) {
                    setReceipts(loadedData.receiptsDetails as FetchedReceiptDetails[]);
                    setFridgeData(loadedData.fridgeDataDetails as FetchedFridgeDetails[]);
                }
            }
        };

        fetchData();
    }, [currentUser?.uid]);

    const handleSelectItem = (item: FetchedReceiptDetails | FetchedFridgeDetails) => {
        setSelectedItem(item);
    };

    return (
      <div>
        <h1>Kitchen Data</h1>
        {/* Receipts Table */}
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
                  key={receipt.receipt_id} // Assuming you have a receipt_id field
                  hover
                  onClick={() => handleRowClick('receipt', receipt.receipt_id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell component="th" scope="row">
                    {receipt.store}
                  </TableCell>
                  <TableCell align="right">{receipt.foods.join(', ')}</TableCell>
                  <TableCell align="right">{receipt.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Fridge Data Table */}
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
                  key={fridge.fridge_id} // Assuming you have a fridge_id field
                  hover
                  onClick={() => handleRowClick('fridge', fridge.fridge_id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell component="th" scope="row">
                    {fridge.foods.join(', ')}
                  </TableCell>
                  <TableCell align="right">{fridge.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  export default KitchenComponent;