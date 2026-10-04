import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/login", form);
            if (!response.data.success) {
                setMessage(response.data.message);
                return;
            }
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("userEmail", form.email);
            if (response.data.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/events");
            }
        } catch (error) {
            setMessage(error.response?.data?.detail || "Login failed");
        }
    }
    return (
        <div className="auth-page">
            <div className="auth-box">
                <h1>Login</h1>
                {message && (
                    <p className="message">
                        {message}
                    </p>
                )}
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Enter email" value={form.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Enter password" value={form.password} onChange={handleChange} required />
                    <button type="submit">
                        Login
                    </button>
                </form>
                <p>
                    Don't have an account?{" "}
                    <Link to="/create-account">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default Login;