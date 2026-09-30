import { useNavigate } from "react-router-dom";
import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";

const Login = ({ setIsAuthenticated }) => {
  const email = useField("email");
  const password = useField("password");

  const { login, error } = useLogin("/api/users/login");

  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();

    const data = await login({
      email: email.value,
      password: password.value,
    });

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      setIsAuthenticated(true);
      navigate("/");
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
            {...email}
            required
          />
        </div>

        <div>
          <label htmlFor="loginPassword">Password</label>
          <input
            id="loginPassword"
            {...password}
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