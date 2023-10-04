const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./config/dbConnection");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
