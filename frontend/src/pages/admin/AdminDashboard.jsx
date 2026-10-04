import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {

    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {

        axios
            .get(
                "http://localhost:8000/api/admin/events",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then((response) => {

                setEvents(response.data.events);

            })
            .catch((error) => {

                console.error("Load events error:", error);

                alert(
                    error.response?.data?.detail ||
                    "Unable to load events"
                );

            })
            .finally(() => {

                setLoading(false);

            });

    }, [token]);


    async function deleteEvent(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8000/api/admin/events/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setEvents(
                events.filter(
                    (event) => event._id !== id
                )
            );

            alert("Event deleted successfully!");

        } catch (error) {

            alert(
                error.response?.data?.detail ||
                "Unable to delete event"
            );

        }
    }


    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userEmail");

        navigate("/login");

    }


    if (loading) {

        return (
            <h2 className="center">
                Loading...
            </h2>
        );

    }


    return (

        <div className="admin-dashboard">

            <div className="admin-header">

                <div>

                    <h1>
                        Admin Dashboard
                    </h1>

                    <p>
                        Admin: {localStorage.getItem("userEmail")}
                    </p>

                </div>

                <div>

                    <button
                        onClick={() =>
                            navigate("/admin/add-event")
                        }
                    >
                        + Add Event
                    </button>

                    <button
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>


            <h2>
                Total Events: {events.length}
            </h2>


            <div className="admin-table-container">

                <table>

                    <thead>

                        <tr>

                            <th>
                                Image
                            </th>

                            <th>
                                Name
                            </th>

                            <th>
                                Category
                            </th>

                            <th>
                                Date
                            </th>

                            <th>
                                Location
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {events.map((event) => (

                            <tr key={event._id}>

                                <td>

                                    <img
                                        src={event.image}
                                        alt={event.name}
                                        className="admin-event-image"
                                    />

                                </td>

                                <td>
                                    {event.name}
                                </td>

                                <td>
                                    {event.category}
                                </td>

                                <td>
                                    {event.date}
                                </td>

                                <td>
                                    {event.location}
                                </td>

                                <td>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/admin/edit-event/${event._id}`
                                            )
                                        }
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteEvent(event._id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default AdminDashboard;