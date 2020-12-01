const express = require("express");
app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

//connect to databas
mongoose.connect(
  "mongodb://localhost:27017/loppis-db",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db");
  }
);

//Importing/assigning userRouter to access api endpoints
const userRouter = require("./routes/User");
app.use("/users", userRouter);

const PORT = 5000;

//listening for request on specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
