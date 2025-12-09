const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  title: String,
  firstName: { type: String, required: true },
  lastName: String,
  mobile1: { type: String, required: true },
  mobile2: String,
  address: {
    city: String,
    state: String,
    pincode: String
  }
});

module.exports = mongoose.model("Contact", contactSchema);
