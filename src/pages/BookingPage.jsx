import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookingPage.css";
import destinations from "../data/destinations.json";
import AOS from 'aos';
import 'aos/dist/aos.css';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const destinationFromQuery = queryParams.get("destination") || "";

  const matchedDestination = destinations.find(
    (d) => d.name.toLowerCase() === destinationFromQuery.toLowerCase()
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    destination: destinationFromQuery,
    date: "",
    people: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!matchedDestination) {
      navigate("/");
    }
  }, [matchedDestination, navigate]);


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBooking = (e) => {
    e.preventDefault();

    const peopleCount = Number(formData.people);
    const rawPrice = matchedDestination?.price || "₹0";
    const numericPrice = parseInt(rawPrice.replace(/[₹,]/g, ""), 10);
    const totalAmount = numericPrice * peopleCount;

    const bookingData = {
      name: formData.name,
      email: formData.email,
      destination: matchedDestination.name,
      date: formData.date,
      people: peopleCount,
      price: rawPrice, // For display
      totalPrice: `${totalAmount.toLocaleString()}`, // Keep formatting
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    navigate("/payment", { state: { destination: matchedDestination } });
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="booking-page" data-aos="fade-in">
      <div className="booking-form-container">
        <h1>Book Your Trip</h1>
        <form className="booking-form" onSubmit={handleBooking}>
          <div className="form-row">
            <label>
              Full Name
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Destination
              <input
                type="text"
                name="destination"
                value={formData.destination}
                readOnly
              />
            </label>
            <label>
              People
              <input
                type="number"
                name="people"
                required
                min="1"
                value={formData.people}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Travel Date
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
              />
            </label>
            <label>
              Price
              <input type="text" readOnly value={`${matchedDestination?.price}`} />
            </label>
          </div>
          <button type="submit">Proceed to Payment</button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
