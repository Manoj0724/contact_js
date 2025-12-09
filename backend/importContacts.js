const mongoose = require("mongoose");
const fs = require("fs");

const contacts = JSON.parse(fs.readFileSync("../contacts.json", "utf-8"));

mongoose.connect("mongodb://127.0.0.1:27017/contactsdb")
.then(() => {
  console.log("✅ MongoDB Connected");
  insertContacts();
})
.catch(err => console.log(err));

const contactSchema = new mongoose.Schema({
  title: String,
  firstName: String,
  lastName: String,
  mobile1: String,
  mobile2: String,
  address: {
    city: String,
    state: String,
    pincode: String
  }
});

const Contact = mongoose.model("Contact", contactSchema);

async function insertContacts() {
  try {
    await Contact.insertMany(contacts);
    console.log("✅ 112 Contacts Imported Successfully!");
    process.exit();
  } catch (err) {
    console.log("❌ Import Error:", err);
  }
}
