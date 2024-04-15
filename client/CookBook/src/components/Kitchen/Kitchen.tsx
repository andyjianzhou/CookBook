import React, { useEffect, useState } from 'react';
import LoadFridgeReceiptService from '../Services/LoadFridgeReceiptService';
import { useAuth } from '../contexts/AuthContext';
import FridgeDetails from '../../models/FridgeDetails';
import ReceiptDetails from '../../models/ReceiptDetails';

const KitchenComponent = () => {
  const { currentUser } = useAuth();
  const [receipts, setReceipts] = useState<ReceiptDetails[]>([]);
  const [fridgeData, setFridgeData] = useState<FridgeDetails[]>([]);
  const [selectedItem, setSelectedItem] = useState<ReceiptDetails | FridgeDetails | null>(null);

  useEffect(() => {
      const fetchData = async () => {
          if (currentUser?.uid) {
              const loadedData = await LoadFridgeReceiptService(currentUser.uid);
              if (loadedData) {
                  setReceipts(loadedData.receiptsDetails);
                  setFridgeData(loadedData.fridgeDataDetails);
              }
          }
      };

      fetchData();
  }, [currentUser?.uid]);

  const handleSelectItem = (item: ReceiptDetails | FridgeDetails) => {
      setSelectedItem(item);
  };

  return (
      <div>
          <h1>Kitchen Data</h1>
          <div>
              <h2>Receipts</h2>
              <ul>
                  {receipts.map((receipt, index) => (
                      <li key={index} onClick={() => handleSelectItem(receipt)}>
                          {receipt.store} - Foods: {receipt.foods.join(', ')}
                      </li>
                  ))}
              </ul>
          </div>
          <div>
              <h2>Fridge Contents</h2>
              <ul>
                  {fridgeData.map((fridge, index) => (
                      <li key={index} onClick={() => handleSelectItem(fridge)}>
                          Foods: {fridge.foods.join(', ')}
                      </li>
                  ))}
              </ul>
          </div>

          {selectedItem && (
              <DetailedView item={selectedItem} onClose={() => setSelectedItem(null)} />
          )}
      </div>
  );
};

const DetailedView = ({ item, onClose }: { item: ReceiptDetails | FridgeDetails, onClose: () => void }) => {
  // Assuming a simple text display for now
  // You can replace this with a form for editing
  return (
      <div className="detailed-view">
          <h2>Details</h2>
          {/* Display the details of the selected item */}
          <p>{JSON.stringify(item, null, 2)}</p>
          <button onClick={onClose}>Close</button>
      </div>
  );
};

export default KitchenComponent;