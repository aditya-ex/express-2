const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
module.exports = UserAddress = mongoose.model("UserAddress", userAddress);
