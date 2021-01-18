const express = require("express");
app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(cookieParser());
app.use(express.json());

//connect to databas
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/loppis-db",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db");
  }
);

//Importing/assigning userRouter to access api endpoints
const userRouter = require("./routes/User");
app.use("/users", userRouter);

//set up static folder for rendering react app
app.use(express.static(path.join(__dirname, "frontend/build")));

//Handle any requests that doesn't target root url
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

const PORT = process.env.PORT || 5000;

//listening for request on specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
