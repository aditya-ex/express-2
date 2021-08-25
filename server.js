const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
// const md5 = require("md5");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db =
  "mongodb+srv://aditya:adi@123@cluster0.izpgp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.use(express.json());

const Schema = mongoose.Schema;
const AccessSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
  // expiry: {type: Date, default: Date.now, expires: 3600}
});
const Access_Token = mongoose.model("Access_Token", AccessSchema);

const userAddress = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  address: [{ type: String, required: true }],
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pin_code: {
    type: String,
    required: true,
  },
  phone_no: {
    type: String,
    required: true,
  },
});
const UserAddress = mongoose.model("UserAddress", userAddress);

app.post("/login", async (req, res) => {
  try {
    const user = new Access_Token();
    user.user_id = req.body.user_id;
    let access_token = jwt.sign({ user_id: user._id }, "some_secret_key", {
      expiresIn: "1h",
    });
    // let access_token = md5(Date());
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
app.post("/user/address", checkAccessToken, async (req, res) => {
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
app.get("/user/get", checkAccessToken, async (req, res) => {
  try {
    const userList = await UserAddress.find({});
    res.status(201).json(userList);
  } catch (err) {
    console.log(err);
  }
});
app.delete("/user/address", checkAccessToken,async(req, res)=>{
  
})
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
// branch third
