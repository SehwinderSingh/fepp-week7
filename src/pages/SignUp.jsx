import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [accountType, setAccountType] = useState("Active");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          phoneNumber,
          gender,
          date_of_birth,
          accountType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup">
      <h1>Sign up</h1>

      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="signupEmail">Email</label>
          <input
            id="signupEmail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="signupPassword">Password</label>
          <input
            id="signupPassword"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="gender">Gender</label>
          <input
            id="gender"
            type="text"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="dateOfBirth">Date of birth</label>
          <input
            id="dateOfBirth"
            type="date"
            value={date_of_birth}
            onChange={(event) => setDateOfBirth(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="accountType">Account type</label>
          <input
            id="accountType"
            type="text"
            value={accountType}
            onChange={(event) => setAccountType(event.target.value)}
            required
          />
        </div>

        <button type="submit">Sign up</button>

        {error && <p role="alert">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
