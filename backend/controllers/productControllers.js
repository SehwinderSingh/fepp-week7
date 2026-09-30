const Product = require("../models/productModel");

// GET /api/products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Get product error:", error);
    res.status(404).json({ error: "Product not found" });
  }
};

// POST /api/products
const createProduct = async (req, res) => {
  try {
    const {
      productName,
      title,
      category,
      description,
      price,
      inventoryCount,
      stockQuantity,
      supplier,
    } = req.body;

    const product = await Product.create({
      title: title || productName,
      category,
      description,
      price,
      stockQuantity: stockQuantity ?? inventoryCount,
      supplier,
      user_id: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(400).json({ error: error.message });
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const {
      productName,
      title,
      category,
      description,
      price,
      inventoryCount,
      stockQuantity,
      supplier,
    } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title: title || productName,
        category,
        description,
        price,
        stockQuantity: stockQuantity ?? inventoryCount,
        supplier,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(400).json({ error: error.message });
  }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
