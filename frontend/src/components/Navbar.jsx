import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1><b>EventHub</b></h1>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>

        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/create-account">Create Account</Link>
          </>
        )}

        {token && role === "user" && (
          <button onClick={logout}>Logout</button>
        )}

        {token && role === "admin" && (
          <>
            <Link to="/admin/dashboard">Admin Panel</Link>
            <button onClick={logout}> Logout </button>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;