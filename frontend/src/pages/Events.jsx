import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/events")
      .then((response) => { setEvents(response.data.events); })
      .catch(() => { setError("Unable to load events"); })
      .finally(() => { setLoading(false); });
  }, []);
  if (loading) {
    return <h2 className="center">Loading events...</h2>;
  }
  if (error) {
    return <h2 className="center">{error}</h2>;
  }
  return (
    <div className="events-page">
      <h1>Upcoming Events</h1>

      <p>Total events: {events.length}</p>

      {events.length === 0 ? (
        <h2>No events available</h2>
      ) : (
        <div className="events-container">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;