import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inventoryCount, setInventoryCount] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setProductName(data.productName);
        setCategory(data.category);
        setDescription(data.description);
        setPrice(data.price);
        setInventoryCount(data.inventoryCount);
        setSupplierName(data.supplier.name);
        setContactEmail(data.supplier.contactEmail);
        setContactPhone(data.supplier.contactPhone);
        setIsVerified(data.supplier.isVerified);
      } catch (error) {
        setError(error.message);
      }finally{
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const updateProduct = async (updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") || "{}").token}`,
        },
        body: JSON.stringify(updatedProduct),
      });
      if (!res.ok) {
        throw new Error("Failed to update product");
      }
      return true;
    } catch (error) {
      console.error("Error updating product:", error);
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const updatedProduct = {
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

   const success = await updateProduct(updatedProduct);
    if (success) {
      navigate(`/products/${id}`, { replace: true });
    } 
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className ="error">{error}</p>;

  return (
    <div className="create">
      <h2>Edit Product</h2>
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

        <button>Update Product</button>
      </form>
    </div>
  );
};

export default EditProductPage; 
  