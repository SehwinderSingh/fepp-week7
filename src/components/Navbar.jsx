import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Product Store</h1>
      </Link>
      <div className="links">
        <Link to="/add-product">Add Product</Link>
      </div>
    </nav>
  );
};

export default Navbar;