const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Access_Token = require("../../models/access_token");
const UserAddress = require("../../models/userAddress");

router.post("/login", async (req, res) => {
  try {
    const user = new Access_Token();
    user.user_id = req.body.user_id;
    let access_token = jwt.sign({ user_id: user._id }, "some_secret_key", {
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
//   app.delete("/user/address", checkAccessToken,async(req, res)=>{

//   })
module.exports = router;
