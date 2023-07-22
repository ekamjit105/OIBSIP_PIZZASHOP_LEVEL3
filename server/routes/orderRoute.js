const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

//GET ALL PIZZA || @GET REQUEST
router.post("/placeOrder", async (req, res) => {
  try {
    const order = req.body
    const neworder = new Order(order)
    neworder.save()
    res.send(200);
  } catch (error) {
    res.send(404)
  }
});

router.post("/myOrders", async (req, res) => {
  try {
    
    const {userId} = req.body
    const orders = await Order.find({userId}).sort({ _id: "-1" });
    res.send(orders);
  
  } catch (error) {
    res.status(404).json({message:"error in getting order"})
  }
});








router.get("/alluserorder", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wront",
      error: error.stack,
    });
  }
});

router.post("/deliverorder", async (req, res) => {
  const orderid = req.body.orderid;
  try {
    const order = await Order.findOne({ _id: orderid });
    order.isDelivered = true;
    await order.save();
    res.status(200).send("Order deliverd success");
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wront",
      error: error.stack,
    });
  }
});




module.exports = router;