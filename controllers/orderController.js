import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

// placing user order from frontend
export const placeOrder = async(req, res) => {

    const frontendUrl = 'http://localhost:5173'

    const userId = req.body.userId;
    const items = req.body.items;
    const amount = req.body.amount;
    const address = req.body.address;
    // create order
    try {
        const newOrder = new orderModel({
            userId,items,amount,address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, {cartData:[]});
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
