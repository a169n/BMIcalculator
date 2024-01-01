// Modules import
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Path setting to .env file
const dotenv = require("dotenv");
dotenv.config();

// Middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));


// DB Connection
const { connectDB } = require("./config/db");
const BMI = require("./models/bmiSchema");
connectDB();

// Routes
app.use("/", require("./routes/filesRoutes"));
app.use("/", require("./routes/userRoutes"));


const port = process.env.PORT;

// Start server
app.listen(port, () =>
  console.log(`The server is up and running on http://localhost:${port}/`)
);


