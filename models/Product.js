import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    subcategory: {
      type: String,
      default: "",
    },
    brand: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    isBestseller: {
      type: Boolean,
      default: false,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
