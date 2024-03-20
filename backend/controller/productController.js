import asyncHandler from "express-async-handler";
import Product from "../model/productModel.js";

//Create a product
const createProduct = asyncHandler(async (req, res) => {
  const create = await Product.create(req.body);
  res.status(201).json({
    status: "successfull created",
    products: create,
  });
});

//fetch all product:

//use api for pagination: http://localhost:2000/productsDetails?pageNumber=2
//use api for get all products: http://localhost:2000/productsDetails/
const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page_number = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page_number - 1));

  res.json({
    result: products.length,
    products,
    page_number,
    number_of_pages: Math.ceil(count / pageSize),
  });
});

//Fetch single product
const getProductById = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const product = await Product.findById(id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//delete product:
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//Get top rated products
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  getTopProducts,
};
