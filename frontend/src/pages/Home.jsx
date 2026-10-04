import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Discover Amazing Events</h1>
        <p>
          Find workshops, technology events,
          meetups and much more.
        </p>
        <Link to="/events">
          <button>Explore Events</button>
        </Link>
      </section>
      <section className="categories">
        <h2>Popular Categories</h2>
        <div className="category-container">
          <div>Technology</div>
          <div>Business</div>
          <div>AI/ML</div>
          <div>Workshop</div>
        </div>
      </section>
    </div>
  );
}
export default Home;