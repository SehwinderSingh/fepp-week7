const ProductListing = ({ product }) => {
  return (
    <div className="product-listing">
      <h2>{product.productName}</h2>
      <p>Category: {product.category}</p>
      <p>Price: {product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductListing;
