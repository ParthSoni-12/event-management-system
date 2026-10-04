import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function Register() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [message, setMessage] = useState("");
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !form.name ||
      !form.email ||
      !form.phone
    ) {
      setMessage("Please fill all fields");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/api/register",
        {
          event_id: id,
          name: form.name,
          email: form.email,
          phone: form.phone
        }
      );
      setMessage(response.data.message);
      setForm({
        name: "",
        email: "",
        phone: ""
      });
    } catch (error) {
      setMessage("Registration failed");
    }
  }
  return (
    <div className="register">
      <h1>Event Registration</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter your name" value={form.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Enter phone number" value={form.phone} onChange={handleChange} />
        <button type="submit">
          Register
        </button>
      </form>
      {message && (
        <p className="message">
          {message}
        </p>
      )}
    </div>
  );
}
export default Register;