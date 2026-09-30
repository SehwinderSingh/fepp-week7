import { useNavigate } from "react-router-dom";
import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";

const Signup = ({ setIsAuthenticated }) => {
  const name = useField("text");
  const email = useField("email");
  const password = useField("password");
  const phone_number = useField("tel");
  const gender = useField("text");
  const date_of_birth = useField("date");
  const membership_status = useField("text");

  const { signup, error } = useSignup("/api/users/signup");

  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();

    const data = await signup({
      name: name.value,
      email: email.value,
      password: password.value,
      phone_number: phone_number.value,
      gender: gender.value,
      date_of_birth: date_of_birth.value,
      membership_status: membership_status.value || "Active",
    });

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="signup">
      <h1>Sign up</h1>

      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="fullName">Full name</label>
          <input id="fullName" {...name} required />
        </div>

        <div>
          <label htmlFor="signupEmail">Email</label>
          <input id="signupEmail" {...email} required />
        </div>

        <div>
          <label htmlFor="signupPassword">Password</label>
          <input id="signupPassword" {...password} required />
        </div>

        <div>
          <label htmlFor="phoneNumber">Phone number</label>
          <input id="phoneNumber" {...phone_number} required />
        </div>

        <div>
          <label htmlFor="gender">Gender</label>
          <input id="gender" {...gender} required />
        </div>

        <div>
          <label htmlFor="dateOfBirth">Date of birth</label>
          <input id="dateOfBirth" {...date_of_birth} required />
        </div>

        <div>
          <label htmlFor="membershipStatus">Account type</label>
          <input id="membershipStatus" {...membership_status} required />
        </div>

        <button type="submit">Sign up</button>

        {error && <p role="alert">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;