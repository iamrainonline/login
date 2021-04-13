const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});

// connect databse ->
mongoose.connect(
  process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.log(err);
    console.log("connected to mongo-db");
  }
);

// set up routs

app.use("/auth", require("./routers/userRouter"));

app.use("/customer", require("./routers/customerRouter"));
