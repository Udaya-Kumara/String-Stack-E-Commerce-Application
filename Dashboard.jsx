import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome, {user?.fullName} 🎉</h1>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;