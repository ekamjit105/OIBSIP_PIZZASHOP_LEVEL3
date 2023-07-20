const express = require("express");
const router = express.Router();
const inventoryModel = require("../models/inventoryModel");

//GET ALL STOCK || @GET REQUEST
router.get("/getAllStock", async (req, res) => {
  try {
    const stock = await inventoryModel.find({});
    res.send(stock);
  } catch (error) {
    res.json({ message: error });
  }
});


router.post("/updatestock", async (req, res) => {
  const stockobject = req.body;
  const {base,sauce,cheese,veggies,qty} = stockobject;
//stockobject = {base:base, sauce:sauce, cheese:cheese, veggies:veggies, qty:1/-1}
    try {
    const baseobj = await inventoryModel.findOne({name:"bases"});
    const newvar = baseobj.varqty;
    newvar[0][base]+=qty;
    newvarobj = newvar[0];
    (baseobj.varqty[0] = newvarobj);
    await baseobj.save();
    /* 
   WORKING:
   (baseobj.varqty[0] = {classic:120,cheesemax:130,thincrust:140,pan:150,mexican:160});
    */

    res.status(200).send("Stock Update Success");
  }
  catch (error) {
    res.status(400).json({ message: error });
  }


  try{
    const sauceobj = await inventoryModel.findOne({name:"sauces"});
    newvar = sauceobj.varqty;
    newvar[0][sauce]+=qty;
    newvarobj = newvar[0];
    (sauceobj.varqty[0] = newvarobj);
    await sauceobj.save();
  }
  catch (error) {
    res.status(400).json({ message: error });
  }

  try{
    const cheeseobj = await inventoryModel.findOne({name:"cheese"});
    newvar = cheeseobj.varqty;
    newvar[0][cheese]+=qty;
    newvarobj = newvar[0];
    (cheeseobj.varqty[0] = newvarobj);
    await cheeseobj.save();
  }
  catch (error) {
    res.status(400).json({ message: error });
  }

  try{
    const veggiesobj = await inventoryModel.findOne({name:"veggies"});
    newvar = veggiesobj.varqty;
    newvar[0][veggies]+=qty;
    newvarobj = newvar[0];
    (veggiesobj.varqty[0] = newvarobj);
    await veggiesobj.save();
  }
  catch (error) {
    res.status(400).json({ message: error });
  }


});



module.exports = router;