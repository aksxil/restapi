const Product = require("../models/products");

const getAllProducts = async (req, res, next) => {
  const { company, name, featured } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }
  if (featured) {
    queryObject.featured = featured;
  }
  if (name) {
    queryObject.name = {
      $regex: name,
      $options: "i",
    };
  }

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Set a default limit

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const myData = await Product.find(queryObject)
      .skip(startIndex)
      .limit(limit)
      .exec();

    const totalDocuments = await Product.countDocuments(queryObject);

    const pagination = {
      totalPages: Math.ceil(totalDocuments / limit),
      currentPage: page,
      pageSize: limit,
    };

    res.status(200).json({ myData, pagination });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProductsTesting = async (req, res, next) => {
  const { sort } = req.query;
  let sortOption = {};

  if (sort) {
    if (sort === "asc") {
      sortOption = { name: 1 };
    } else if (sort === "desc") {
      sortOption = { name: -1 };
    }
  }

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const myData = await Product.find(req.query)
      .sort(sortOption)
      .skip(startIndex)
      .limit(limit)
      .exec();

    const totalDocuments = await Product.countDocuments(req.query);

    const pagination = {
      totalPages: Math.ceil(totalDocuments / limit),
      currentPage: page,
      pageSize: limit,
    };

    res.status(200).json({ myData, pagination });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllProducts, getAllProductsTesting };
