const mongoose = require("mongoose");
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
  expiry: { type: Date, default: Date.now, expires: 3600 },
});
module.exports = Access_Token = mongoose.model("Access_Token", AccessSchema);
