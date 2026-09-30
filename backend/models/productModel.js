const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
    },
    supplier: {
      name: {
        type: String,
        required: true,
      },
      contactEmail: {
        type: String,
        required: true,
      },
      contactPhone: {
        type: String,
        required: true,
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    ret.productName = ret.title;
    ret.inventoryCount = ret.stockQuantity;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Product", productSchema);
