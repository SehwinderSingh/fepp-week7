import { useEffect, useState } from "react";
import ProductListings from "../components/ProductListings";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch Products");
        }

        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>

      {error ? (
        <p role="alert">{error}</p>
      ) : (
        <ProductListings products={products} />
      )}
    </div>
  );
};

export default Home;
