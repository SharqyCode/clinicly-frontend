// src/DebugSystem.jsx
import { useEffect } from "react";
import { useAuth } from "./Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function DebugSystem() {
  const { user, login, logout } = useAuth();

  // React Query Test
  const { data: queryData, isLoading } = useQuery({
    queryKey: ["debug-query"],
    queryFn: () =>
      new Promise((resolve) => {
        setTimeout(() => resolve("✅ React Query Working"), 500);
      }),
  });

  // Show user in console
  useEffect(() => {
    console.log("DEBUG USER:", user);
  }, [user]);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        lineHeight: "1.8",
        border: "2px dashed #007bff",
        marginBottom: "20px",
      }}
    >
      <h2>🧪 Debug System</h2>

      {/* Auth Test */}
      <section>
        <h3>Auth Context</h3>
        <p>Current User: {user ? JSON.stringify(user) : "No user logged in"}</p>
        <button
          onClick={() => login({ name: "Debug User", id: 1 })}
          style={{ marginRight: "10px" }}
        >
          Test Login
        </button>
        <button onClick={logout}>Test Logout</button>
      </section>

      <hr />

      {/* React Query Test */}
      <section>
        <h3>React Query</h3>
        <p>{isLoading ? "Loading..." : queryData}</p>
      </section>

      <hr />

      {/* Routing Test */}
      <section>
        <h3>Routing</h3>
        <p>لو الروابط دي شغالة يبقى الـ Router شغال:</p>
        <Link to="/auth/login">Go to Login</Link> <br />
        <Link to="/auth/signup">Go to Register</Link> <br />
        <Link to="/">Go to Home</Link>
      </section>
    </div>
  );
}
