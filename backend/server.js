const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Contact = require("./Contact");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/contacts_db")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

/* ✅ GET all contacts */
app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* ✅ POST new contact */
app.post("/api/contacts", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/* ✅ PUT (EDIT) contact */
app.put("/api/contacts/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ success: false });
    }

    res.json({ success: true, contact: updatedContact });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/* ✅ DELETE contact */
app.delete("/api/contacts/:id", async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});

