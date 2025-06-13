import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import destinationsData from "../data/destinations.json";
import AOS from "aos";
import "aos/dist/aos.css";
import "./SearchResult.css";

const SearchResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  const [matched, setMatched] = useState(null);
  const [others, setOthers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const matchedDestination = destinationsData.find(
      (dest) => dest.name.toLowerCase() === query.toLowerCase()
    );
    setMatched(matchedDestination || null);

    const otherDestinations = destinationsData.filter(
      (dest) => dest.name.toLowerCase() !== query.toLowerCase()
    );
    setOthers(otherDestinations);

    setVisibleCount(6);

    // Preload matched image
    if (matchedDestination?.image) {
      const img = new Image();
      img.src = matchedDestination.image;
    }

    setTimeout(() => {
      AOS.refreshHard();
    }, 100);
  }, [query]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="search-results">
      <h1>Search Results for "{query}"</h1>

      {matched ? (
        <div className="matched-destination" key={matched.name + query} data-aos="fade-in">
          <h2>{matched.name}</h2>
          <img
            src={matched.image}
            alt={matched.name}
            width="100%"
            height="300"
            style={{ objectFit: "cover", borderRadius: "8px", backgroundColor: "#eee" }}
          />
          <p>{matched.description}</p>

          <div className="destination-info">
            <p><strong>Price:</strong> {matched.price}</p>
            <p><strong>Rating:</strong> ⭐ {matched.rating} / 5</p>
            <p><strong>Reviews:</strong> {matched.reviewCount} reviews</p>
          </div>

          <h3>Review</h3>
          <blockquote>
            {matched.review} <i><strong>— {matched.reviewer}</strong></i>
          </blockquote>

          <Link to={`/booking?destination=${encodeURIComponent(matched.name)}`} className="book-now-button">
            Book Now
          </Link>
        </div>
      ) : (
        <p>No exact match found. Here are some popular destinations:</p>
      )}

      <div className="you-may-also-like">
        <h2 style={{ textAlign: "center", fontSize: "30px" }}>You may also like</h2>
        <div className="travel-cards">
          {others.slice(0, visibleCount).map((dest) => (
            <div
              key={`${dest.name}-${query}`}
              className="other-card"
              data-aos="fade-up"
            >
              <img
                src={dest.image}
                alt={dest.name}
                width="100%"
                height="220"
                style={{ objectFit: "cover", borderRadius: "6px", backgroundColor: "#f2f2f2" }}
              />
              <h3>{dest.name}</h3>
              <p style={{ paddingBottom: "15px" }}>{dest.tagline}</p>
              <Link to={`/search?query=${encodeURIComponent(dest.name)}`}>
                View Details
              </Link>
            </div>
          ))}
        </div>

        {visibleCount < others.length && (
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button className="load-more-btn" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
