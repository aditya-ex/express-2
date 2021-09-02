const express = require("express");
const router = express.Router();
const md5 = require("md5");
const {Access_Token, UserAddress} = require('../models/users');
// const {UserAddress} = require('../models/');

router.post("/login", async (req, res) => {
    try {
      const user = new Access_Token();
      user.user_id = req.body.user_id;
      let access_token = md5(Date());
      user.access_token = access_token;
      let savedUser = await user.save();
      res.status(201).send(savedUser);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  });
  
  const checkAccessToken = (req, res, next) => {
    const access_token = req.headers.access_token;
    if (!access_token) {
      return res.status(403).send("a token is required");
    }
    return next();
  };

  router.post("/address", checkAccessToken, async (req, res) => {
    try {
      const newAddress = new UserAddress();
      newAddress.user_id = req.body.user_id;
      newAddress.address = req.body.address;
      newAddress.city = req.body.city;
      newAddress.state = req.body.state;
      newAddress.pin_code = req.body.pin_code;
      newAddress.phone_no = req.body.phone_no;
      let savedAddress = newAddress.save();
      res.status(201).send(savedAddress);
      console.log(newAddress);
    } catch (err) {
      console.log(err);
    }
  });
  router.get("/get/:id", checkAccessToken, async (req, res) => {
    try {
     let data = Access_Token.findOne({user_id: req.params.id}).populate("address");
    //  res.status(201).send(data);
    console.log(data);
    } catch (err) {
      console.log(err);
    }
  });

  module.exports = router;