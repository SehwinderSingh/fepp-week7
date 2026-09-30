import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h2>404 – Page Not Found</h2>
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default NotFoundPage;