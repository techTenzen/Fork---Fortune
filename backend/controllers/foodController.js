import fs from 'fs';
import { foodModel } from '../models/foodModel.js';

const addFood = async (req, res) => {
  const { name, description, price, category } = req.body;
  const image = req.file;

  if (!name || !description || !price || !category || !image) {
    return res.status(400).json({ success: false, msg: 'Fill all fields' });
  }

  const food = new foodModel({
    name,
    description,
    price,
    category,
    image: image.filename,
  });

  try {
    await food.save();
    res.json({ success: true, msg: 'New Items Added to Menu' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: 'Error' });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: 'Error' });
  }
};

const removeFood = async (req, res) => {
  try {
    // Find the food item by ID
    const meal = await foodModel.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ success: false, msg: 'Food not found' });
    }

    // Delete the associated image file
    fs.unlink(`uploads/${meal.image}`, async (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, msg: 'Error deleting image' });
      }

      // Delete the food item from the database
      try {
        await foodModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, msg: 'Item removed' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Error removing food' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Error removing food' });
  }
};

export { addFood, listFood, removeFood };
