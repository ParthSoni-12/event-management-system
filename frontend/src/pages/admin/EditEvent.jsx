import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditEvent() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        category: "",
        date: "",
        location: "",
        description: "",
        image_url: ""
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/events/${id}`)
            .then((response) => {
                const event = response.data.event;
                setForm({
                    name: event.name,
                    category: event.category,
                    date: event.date,
                    location: event.location,
                    description: event.description,
                    image_url: event.image
                });
            })
            .catch((error) => { alert(error.response?.data?.detail || "Unable to load event"); });

    }, [id]);


    function handleChange(e) {

        setForm({ ...form, [e.target.name]: e.target.value });

    }


    async function handleSubmit(e) {

        e.preventDefault();

        const token = localStorage.getItem("token");
        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("category", form.category);
        formData.append("date", form.date);
        formData.append("location", form.location);
        formData.append("description", form.description);
        formData.append("image_url", form.image_url);

        try {

            const response = await axios.put(`http://localhost:8000/api/admin/events/${id}`, formData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                });

            alert(response.data.message);
            navigate("/admin/dashboard");

        } catch (error) {
            alert(error.response?.data?.detail || "Unable to update event");
        }
    }

    return (
        <div className="admin-form-page">
            <h1>Update Event</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Event Name" value={form.name} onChange={handleChange} required />
                <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
                <input type="date" name="date" value={form.date} onChange={handleChange} required />
                <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
                <input type="url" name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} required />
                <button type="submit">
                    Update Event
                </button>
                <button type="button" onClick={() => navigate("/admin/dashboard")}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default EditEvent;