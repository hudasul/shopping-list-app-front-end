import AllLists from "./components/AllLists";
import ListForm from "./components/ListForm";
import ListDetails from "./components/ListDetails";
import ItemForm from "./components/ItemForm";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignupForm";
import LogoutButton from "./components/LogoutButton";
import ProtectedRoute from "./components/ProtectedRoute";

import {jwtDecode} from 'jwt-decode'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  function handleLogin(newToken) {
    setToken(newToken);
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  // This is how to decode the token and gget the
  // information that you added to the payload in your login
  // route in the backend
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
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
                  <AllLists />
                </ProtectedRoute>
              }
            />
            <Route path="/new-list" element={<ListForm />} />
            <Route path="/edit-list/:listId" element={<ListForm />} />
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
