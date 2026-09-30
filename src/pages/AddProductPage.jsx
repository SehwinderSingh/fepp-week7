import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inventoryCount, setInventoryCount] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();

  const addProduct = async (newProduct) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") || "{}").token}`,
        },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) {
        throw new Error("Failed to add product");
      }
      return true;
    } catch (error) {
      console.error("Error adding product:", error);
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const newProduct = {
      productName,
      category,
      description,
      price: Number(price),
      inventoryCount: Number(inventoryCount),
      supplier: {
        name: supplierName,
        contactEmail,
        contactPhone,
        isVerified,
      },
    };

    const success = await addProduct(newProduct);
    if (success) {
      console.log("Product Added Successfully");
      navigate("/");
    } else {
      console.error("Failed to add the product");
    }
  };

  return (
    <div className="create">
      <h2>Add a New Product</h2>
      <form onSubmit={submitForm}>
        <label>Product Name:</label>
        <input
          type="text"
          required
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label>Category:</label>
        <input
          type="text"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Inventory Count:</label>
        <input
          type="number"
          required
          value={inventoryCount}
          onChange={(e) => setInventoryCount(e.target.value)}
        />

        <label>Supplier Name:</label>
        <input
          type="text"
          required
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />

        <label>Supplier Email:</label>
        <input
          type="email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />

        <label>Supplier Phone:</label>
        <input
          type="tel"
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />

        <label>Supplier Verified:</label>
        <select
          value={isVerified}
          onChange={(e) => setIsVerified(e.target.value === "true")}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>

        <button>Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;