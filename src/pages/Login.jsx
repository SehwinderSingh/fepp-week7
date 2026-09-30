import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("user", JSON.stringify(data));
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <h1>Log in</h1>

      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="loginEmail">Email</label>
          <input
            id="loginEmail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="loginPassword">Password</label>
          <input
            id="loginPassword"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit">Log in</button>

        {error && <p role="alert">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
