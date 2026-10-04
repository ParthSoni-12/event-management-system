import { Link } from "react-router-dom";
function EventCard({ event }) {
  return (
    <div className="event-card">
      <img src={event.image} alt={event.name} />
      <div className="event-content">
        <span className="category">
          {event.category}
        </span>
        <h2>{event.name}</h2>
        <p>📅 {event.date}</p>
        <p>📍 {event.location}</p>
        <Link to={`/events/${event._id}`}>
          <button>View Details</button>
        </Link>
      </div>
    </div>
  );
}
export default EventCard;