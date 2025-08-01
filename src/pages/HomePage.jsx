import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage = () => {
    const [subscribed, setSubscribed] = useState(false);
    const [email, setEmail] = useState("");
    const [query, setQuery] = useState('');
    const [isHeroLoaded, setIsHeroLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const img = new Image();
        img.src = "/landscape1.jpg";
        img.onload = () => setIsHeroLoaded(true);
    }, []);

    useEffect(() => {
        if (subscribed) {
            const timer = setTimeout(() => {
                setSubscribed(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [subscribed]);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    if (!isHeroLoaded) {
        return (
            <div className="page-loader">
                <div className="loading-text">Loading...</div>
            </div>
        );
    }

    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero loaded">
                <h1 data-aos="fade-up">Find Your Next Adventure</h1>
                <p data-aos="fade-up">Explore and Book amazing travel destinations.</p>
                <div className="search-bar">
                    <select
                        name="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        required
                    >
                        <option value="" disabled>Where to?</option>
                        <option value="New York">New York</option>
                        <option value="Bali">Bali</option>
                        <option value="India">India</option>
                        <option value="America">America</option>
                        <option value="Korea">Korea</option>
                        <option value="China">China</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Bangkok">Bangkok</option>
                        <option value="Manali">Manali</option>
                        <option value="Istanbul">Istanbul</option>
                        <option value="Japan">Japan</option>
                        <option value="Paris">Paris</option>
                        <option value="Dubai">Dubai</option>
                        <option value="Tokyo">Tokyo</option>
                        <option value="London">London</option>
                        <option value="Sydney">Sydney</option>
                        <option value="Rome">Rome</option>
                        <option value="Barcelona">Barcelona</option>
                        <option value="Cape Town">Cape Town</option>
                        <option value="Singapore">Singapore</option>
                    </select>
                    <button onClick={() => {
                        if (query.trim()) {
                            navigate(`/search?query=${encodeURIComponent(query)}`);
                        }
                    }}>Search</button>
                </div>
            </section>

            {/* Popular Destinations */}
            <section className="popular-destinations" data-aos="fade-up">
                <h2>Popular Destinations</h2>
                <p>Explore destinations around the world and create unforgettable memories on your next journey.</p>
                <div className="destination-cards">
                    <div className="card">
                        <img src="/paris.jpg" alt="Paris" />
                        <h3>Paris</h3>
                        <p>The romantic capital of the world.</p>
                        <Link to="/booking?destination=paris">Book Now</Link>
                    </div>
                    <div className="card">
                        <img src="/dubai.jpg" alt="Dubai" />
                        <h3>Dubai</h3>
                        <p>Luxury, skyscrapers, and adventures.</p>
                        <Link to="/booking?destination=dubai">Book Now</Link>
                    </div>
                    <div className="card">
                        <img src="/tokyo.jpg" alt="Tokyo" />
                        <h3>Tokyo</h3>
                        <p>Where tradition meets future.</p>
                        <Link to="/booking?destination=tokyo">Book Now</Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="why-us" data-aos="fade-up">
                <h2>Why Choose Us?</h2>
                <ul>
                    <li>Best Price Guarantee</li>
                    <li>24/7 Customer Support</li>
                    <li>Trusted by 100K+ Travelers</li>
                </ul>
            </section>

            {/* Testimonials */}
            <section className="testimonials" data-aos="fade-up">
                <h2>What Our Travelers Say</h2>
                <div className="testimonial-container">
                    <div className="testimonial-card">
                        <p>"Super easy to book and very reliable."</p>
                        <strong>– Riya, Delhi</strong>
                    </div>
                    <div className="testimonial-card">
                        <p>"Loved the interface and quick support!"</p>
                        <strong>– Aman, Mumbai</strong>
                    </div>
                    <div className="testimonial-card">
                        <p>"The best travel experience I’ve had online!"</p>
                        <strong>– Neha, Bengaluru</strong>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="newsletter" data-aos="fade-up">
                <h2>Subscribe to Our Newsletter</h2>
                <p>Get travel deals and updates directly to your inbox.</p>
                {subscribed ? (
                    <p className="thank-you" style={{ fontSize: "1.2rem", color: "blue" }}>
                        <strong>Thank you for subscribing!</strong>
                    </p>
                ) : (
                    <form
                        className="newsletter-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setSubscribed(true);
                            setEmail("");
                        }}
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit">Subscribe</button>
                    </form>
                )}
            </section>
        </div>
    );
};

export default HomePage;
