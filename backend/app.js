const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

const app = express();
app.use(cors());
app.use(express.json());

const shoppingListItemSchema = new mongoose.Schema({
  name: String,
  savedAt: Date,
});

const ShoppingListItem = mongoose.model('ShoppingListItem', shoppingListItemSchema);

app.get('/api/v1/shoppingList', async (req, res) => {
  const shoppingListItems = await ShoppingListItem.find({});
  res.json(shoppingListItems);
});

app.post('/api/v1/shoppingList', async (req, res) => {
  try {
    const newItem = new ShoppingListItem({
      name: req.body.name,
      savedAt: new Date(),
    });
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    res.send(error.message);
  }
});

app.delete('/api/v1/shoppingList/:itemId', async (req, res) => {
  const deletedItem = await ShoppingListItem.findByIdAndDelete(req.params.itemId);
  res.json(deletedItem);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((data) => {
  console.log(`MongoDb connected with server ${data.connection.host}`);
});

