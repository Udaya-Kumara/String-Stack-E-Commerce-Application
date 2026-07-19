import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosConfig";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setLoading(true);
    try {
      await api.post("/register", formData);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setServerError(err.response.data.message);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Create an Account</h2>

        {serverError && <p style={styles.serverError}>{serverError}</p>}

        <div style={styles.field}>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p style={styles.error}>{errors.fullName}</p>}
        </div>

        <div style={styles.field}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}
        </div>

        <div style={styles.field}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={styles.error}>{errors.password}</p>}
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
  },
  form: {
    background: "#fff",
    padding: "35px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    width: "340px",
  },
  field: {
    marginBottom: "18px",
    display: "flex",
    flexDirection: "column",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#2575fc",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
  error: {
    color: "#e53935",
    fontSize: "12px",
    margin: "4px 0 0",
  },
  serverError: {
    color: "#e53935",
    background: "#fdecea",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

export default Register;