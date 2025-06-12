import React, { useEffect } from 'react';
import './About.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';


const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="about-section" data-aos="fade-in">
      <img src="about.svg" alt="about" />
      <div className="about-card">
        <h1 className="about-title">About Us</h1>
        <p className="about-text">
          <strong style={{ color: "#077bff" }}>TravelEase</strong> is more than just a travel booking site — it's your personal journey partner.
          Our mission is to make travel easy, affordable, and inspiring for everyone.
        </p>
        <p className="about-text">
          We provide a seamless booking experience with transparent pricing, real-time availability, and dedicated support.
          Whether you're planning a quick escape or a grand adventure, TravelEase is here to simplify the process.
        </p>
        <p className="about-text">
          Our core values? Trust, technology, and traveler happiness. Join thousands who rely on us to explore the world with ease.
        </p>
        <Link to="/search" className="about-link">Discover your next destination →</Link>
      </div>
    </section>
  );
};

export default About;
