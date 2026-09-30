import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Product Store</h1>
      </Link>

      <div className="links">
        {isAuthenticated ? (
          <>
            <Link to="/add-product">Add Product</Link>

            <span>{user?.email}</span>

            <button type="button" onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
