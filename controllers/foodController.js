import foodModel from "../models/foodModel.js";
import fs from 'fs';


// add food item
const addFood = async (req, res) => {

    let image_filename=`${req.file.filename}`

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });

  try {
    await food.save();
    res.status(201).json({ success:true , message: "Food added successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({success:false, message: err.message });
  }
};

// All Food List
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({ success:true, data: foods });
  } catch (err) {
    res.status(400).json({ success:false, message: err.message });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success:true, message: "Food removed successfully" });
  } catch (err) {
    res.status(400).json({ success:false, message: err.message });
  }
};

export {addFood,listFood,removeFood};