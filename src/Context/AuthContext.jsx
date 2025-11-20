import { createContext, useContext, useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../Features/Auth/api/auth";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const login = (data, signup = false) => {
    setUser(data.user);
    localStorage.setItem("accessToken", data.accessToken);

    showSnackbar(!signup ? "Welcome Back!" : "Welcome Aboard!", "success");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/auth/login");
    showSnackbar("Farewell!", "info");
  };

  // Load current user on refresh
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      let decoded = null;
      try {
        decoded = jwtDecode(token);
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("accessToken"); // FIXED
        setLoading(false);
        return;
      }

      try {
        const res = await getUserById(decoded.id);

        // API likely returns { user: {...} }
        const fetchedUser = res.user || res;

        setUser(fetchedUser);
      } catch (err) {
        console.error("Failed to load user:", err);
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, showSnackbar, loading }}
    >
      {children}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
