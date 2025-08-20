import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./style/LoginForm.css";
function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post(`${baseUrl}/auth/login`, {
      username,
      password,
    });
    localStorage.setItem("token", res.data.token);
    onLogin(res.data.token);
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 id="login-header">Login</h2>
        <div className="login-inputs">
          <input
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="login-btns">
          <button type="submit">Login</button>
          <button type="submit" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
