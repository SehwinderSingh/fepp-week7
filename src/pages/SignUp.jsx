import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [membership_status, setMembershipStatus] = useState("Active");
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
          name,
          email,
          password,
          phone_number,
          gender,
          date_of_birth,
          membership_status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      localStorage.setItem("user", JSON.stringify(data));
      setIsAuthenticated(true);
      setIsAuthenticated(true);
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
            value={name}
            onChange={(event) => setName(event.target.value)}
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
            value={phone_number}
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
          <label htmlFor="membershipStatus">Account type</label>
          <input
            id="membershipStatus"
            type="text"
            value={membership_status}
            onChange={(event) => setMembershipStatus(event.target.value)}
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
