import AllLists from "./components/AllLists";
import ListForm from "./components/ListForm";
import ListDetails from "./components/ListDetails";
import ItemForm from "./components/ItemForm";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignupForm";
import LogoutButton from "./components/LogoutButton";
import ProtectedRoute from "./components/ProtectedRoute";

import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(token ? jwtDecode(token) : null);

  function handleLogin(newToken) {
    const decoded = jwtDecode(newToken);
    setToken(newToken);
    setUser(decoded);
    localStorage.setItem("token", newToken);
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <>
      <Router>
        <div>
          {token ? <LogoutButton onLogout={handleLogout} /> : null}
          <Routes>
            <Route
              path="/login"
              element={<LoginForm onLogin={handleLogin} />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AllLists token={token} user={user} />
                </ProtectedRoute>
              }
            />

            <Route path="/new-list" element={<ListForm token={token} />} />
            <Route
              path="/edit-list/:listId"
              element={<ListForm token={token} />}
            />
            <Route path="/list/:listId" element={<ListDetails />} />
            <Route path="/list/:listId/new-item" element={<ItemForm />} />
            <Route
              path="/list/:listId/edit-item/:itemId"
              element={<ItemForm />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
