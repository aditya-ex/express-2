const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose  = require("mongoose");
// const passport = require('passport');
const Access_Token = require("../models/access_token");
const UserAddress = require("../models/userAddress");

router.post("/login", async (req, res) => {
  try {
    const user = new Access_Token();
    user.user_id = req.body.user_id;
    let access_token = jwt.sign({ user_id: user._id }, "secret", {
      expiresIn: "1h",
    });
    user.access_token = access_token;
    user.save().then((doc) => res.status(201).send(doc));
    console.log(user);
  } catch (err) {
    console.log(err);
  }
});

const checkAccessToken = (req, res, next) => {
  const access_token = req.body.access_token || req.headers["access_token"];
  if (!access_token) {
    return res.status(403).send("a token is required");
  }
  return next();
};
router.post("/address", checkAccessToken, async (req, res) => {
  try {
    const { user_id, address, city, state, pin_code, phone_no } = req.body;
    const userWithAddress = await UserAddress.create({
      user_id,
      address,
      city,
      state,
      pin_code,
      phone_no,
    });
    res.status(201).json(userWithAddress);
    console.log(userWithAddress._id);
  } catch (err) {
    console.log(err);
  }
});
router.get("/get", checkAccessToken, async (req, res) => {
  try {
    const userList = await UserAddress.find({});
    res.status(201).json(userList);
  } catch (err) {
    console.log(err);
  }
});

const addressToDelete = (address_Id) => (req,res, next) =>{
  if(mongoose.Types.ObjectId.isValid(req.headers[address_Id]))
  return res.status(400).json({msg:"Invalid Id"});
  next();
}

router.delete("/address", checkAccessToken, addressToDelete("address_Id"),async (req, res) => {
  try {
    const address = await UserAddress.findById(
      req.headers["address_Id"]
    );
    if (!address) {
      res.status(404).json({ msg: "user_id not found" });
    }
    console.log(address);
    address.remove();
    res.json(address);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});
module.exports = router;
