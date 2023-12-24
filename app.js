const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./db/connect")
require("dotenv").config();

const products_routes = require("./routes/product")

app.get("/", (req, res, next) => {
  res.send("YES I AM CONNECTED❤️");
});

//middlewares
app.use("/api/products",products_routes)

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`${PORT} YES I AM CONNECTED❤️`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
