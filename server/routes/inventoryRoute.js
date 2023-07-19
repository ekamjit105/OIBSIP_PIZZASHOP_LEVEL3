const express = require("express");
const router = express.Router();
const inventoryModel = require("../models/inventoryModel");
//const pizzaModel = require("../models/pizzaModel");

//GET ALL STOCK || @GET REQUEST
router.get("/getAllStock", async (req, res) => {
  try {
    const stock = await inventoryModel.find({});
    console.log("found stock.. ")
    console.log(stock)
    res.send(stock);
  } catch (error) {
    res.json({ message: error });
    console.log("hello here")
  }
});





module.exports = router;