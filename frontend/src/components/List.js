import React, { useState, useEffect } from 'react';
import { CButton } from '@coreui/react';
import { Input } from 'antd';
import axios from 'axios';

function List() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  let added = false;
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get('/api/v1/shoppingList');
    setItems(response.data);
  };

  const addItem = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line array-callback-return
    (items.map((item) => {
      if (item.name === newItem) {
        added = true;
        alert('its already added');
      }
    }))
    if (!added) {
      const newItemObject = { name: newItem, savedAt: new Date() };
      await axios.post('/api/v1/shoppingList', newItemObject);
      fetchItems();
      setNewItem('');
    }
  }
  const removeItem = async (itemId) => {
    await axios.delete(`/api/v1/shoppingList/${itemId}`);
    fetchItems();
  };

  return (
    <div>
      <h2>Shopping List</h2>
        <form onSubmit={addItem}>
         <label>
              Enter item
              <Input
                type="text"
                value={newItem}
                onChange={(event) => setNewItem(event.target.value)}
                placeholder="Enter an item"
              />
        </label>
      <CButton type="submit">Add</CButton>
      </form>
      { !items ? <h3> hey your shopping list is empty</h3> :
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              {item.name} (saved at {item.savedAt.toString()})
              <CButton type="submit" onClick={() => removeItem(item._id)}>Remove</CButton>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}

export default List;