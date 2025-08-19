import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import "./style/SignupForm.css";
function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/signup", {
        username,
        password,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <body>
      <div className="signup-container">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div className="Signup-inputs">
            <input
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <br />
            <br />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <br />
          <br />

          <div className="signup-btns">
            <button type="submit">Sign Up</button>
            <br />
            <br />
            <button type="submit" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </form>
      </div>
    </body>
  );
}
export default SignUp;
