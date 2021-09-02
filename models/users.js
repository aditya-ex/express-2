const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccessSchema = new Schema({
    user_id: {
      type: String,
      required: true
    },
    access_token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date, 
      expires: '1h',
      default: Date.now
    } 
  });

  const userAddress = new Schema({
    user_id :{
      type: String,
      required: true
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
    }
  });

  const Access_Token = mongoose.model("Access_Token", AccessSchema);
  const UserAddress = mongoose.model("UserAddress", userAddress);
  module.exports = {Access_Token, UserAddress};