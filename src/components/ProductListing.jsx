import { Link } from "react-router-dom";

const ProductListing = ({ product }) => {
  return (
    <div className="product-listing">
      <h2>
        <Link to={`/products/${product._id}`}>
          {product.productName}
        </Link>
      </h2>

      <p>Category: {product.category}</p>
      <p>Price: {product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductListing;
