import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function CreateAccount() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/signup", form);
            setMessage(response.data.message);
            if (response.data.success) {
                setForm({
                    name: "",
                    email: "",
                    password: ""
                });
                setTimeout(() => { navigate("/login"); }, 1000);
            }
        } catch (error) {
            setMessage(error.response?.data?.detail || "Account creation failed");
        }
    }
    return (
        <div className="auth-page">
            <div className="auth-box">
                <h1>Create Account</h1>
                {message && (
                    <p className="message">
                        {message}
                    </p>
                )}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Enter your name" value={form.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Create password" value={form.password} onChange={handleChange} required />
                    <button type="submit">
                        Create Account
                    </button>
                </form>
                <p>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default CreateAccount;