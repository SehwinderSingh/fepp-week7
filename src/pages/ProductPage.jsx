import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const deleteProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      navigate(-1);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch product");
        }

        setProduct(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <div className="product-details">
        <p role="alert">{error}</p>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details">
      <h1>{product.productName}</h1>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>
        <strong>Description:</strong> {product.description}
      </p>

      <p>
        <strong>Price:</strong> €{product.price}
      </p>

      <p>
        <strong>Inventory Count:</strong> {product.inventoryCount}
      </p>

      <h2>Supplier Information</h2>

      <p>
        <strong>Name:</strong> {product.supplier?.name}
      </p>

      <p>
        <strong>Email:</strong> {product.supplier?.contactEmail}
      </p>

      <p>
        <strong>Phone:</strong> {product.supplier?.contactPhone}
      </p>

      <p>
        <strong>Verified:</strong>{" "}
        {product.supplier?.isVerified ? "Yes" : "No"}
      </p>

      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={deleteProduct}>Delete Product</button>
    </div>
  );
};

export default ProductPage;
