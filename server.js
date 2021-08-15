const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// getting driver connection object
const dbo = require("./db/conn");

//importing routes
const authRoutes = require('./routes/inventory');
const { db } = require('./models/User');

//routes middleware
app.use('/api', authRoutes);

app.listen(port, () => {
  // connecting to database when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});
