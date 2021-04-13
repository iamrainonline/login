const router = require("express").Router();
const Customer = require("../models/customerModel");
const auth = require("../middleware/auth");
const User = require("../models/userModel");

router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;
    const newCustomer = new Customer({
      name,
    });
    const savedCustomer = await newCustomer.save();
    res.json(savedCustomer);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.get("/users", auth, async (req, res) => {
  try {
    const newUser = await User.find();
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.delete("/users/:id", async (req, res) => {
  const del = req.params.body;
  const delUser = await User.findOneAndDelete(del);
  console.log(del);
});

module.exports = router;
