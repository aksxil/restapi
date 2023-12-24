// Importing required modules
require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/products");
const ProductJson = require("./products.json");

// Defining the start function
const start = async () => {
  try {
    // Connecting to the MongoDB using the provided URL
    await connectDB(process.env.MONGODB_URL);
    await Product.deleteMany();

    // Creating products in the database using the data from the JSON file
    await Product.create(ProductJson);

    // Logging success message
    console.log("Success");
  } catch (error) {
    // Logging any errors that occur during the process
    console.error(error);
  } finally {
    // Closing the database connection (if needed)
    // Add this line if your connectDB function returns a connection object that needs to be closed.
    // await mongoose.connection.close();
  }
};

// Calling the start function to initiate the process
start();
