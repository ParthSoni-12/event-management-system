import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/events/${id}`)
      .then((response) => { setEvent(response.data.event) })
      .finally(() => { setLoading(false) });
  }, [id]);
  if (loading) {
    return <h2 className="center">Loading...</h2>;
  }
  if (!event) {
    return <h2 className="center">Event not found</h2>;
  }
  return (
    <div className="details">
      <img src={event.image} alt={event.name} />
      <div>
        <span>{event.category}</span>
        <h1>{event.name}</h1>
        <p>📅 {event.date}</p>
        <p>📍 {event.location}</p>
        <p>{event.description}</p>
        <Link to={`/register/${event._id}`}>
          <button>
            Register / Book Event
          </button>
        </Link>
      </div>
    </div>
  );
}

export default EventDetails;