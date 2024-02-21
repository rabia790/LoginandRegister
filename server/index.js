const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require('./models/Employee');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(3002, () => {
      console.log("Server is running on port 3002");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.post('/register', async (req, res) => {
  try {
    const newEmployee = await EmployeeModel.create(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(5002).json({ error: "Failed to register employee" });
  }
});
