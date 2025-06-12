import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Confirmation.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Confirmation = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const invoiceRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookingData"));
    if (data) {
      data.bookingId = "BK" + Math.floor(Math.random() * 1000000);
      data.paymentId = "PM" + Math.floor(Math.random() * 1000000);
      setBookingDetails(data);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleDownload = () => {
    const input = invoiceRef.current;
    if (!input) return;

    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    });
  };

  if (!bookingDetails) return <p>Loading booking details...</p>;

  return (
    <section className="confirmation-section" data-aos="fade-in">
      <div className="confirmation-container">
        <h2>Booking Confirmed!</h2>
        <p>Thank you, {bookingDetails.name}. Your trip has been successfully booked.</p>

        <div className="invoice-box" ref={invoiceRef}>
          <h2 style={{ color: "#3f51b5", marginBottom: "10px" }}>TravelEase</h2>
          <h3>Invoice</h3>
          <p><strong>Booking ID:</strong> {bookingDetails.bookingId}</p>
          <p><strong>Payment ID:</strong> {bookingDetails.paymentId}</p>
          <p><strong>Name:</strong> {bookingDetails.name}</p>
          <p><strong>Email:</strong> {bookingDetails.email}</p>
          <p><strong>Destination:</strong> {bookingDetails.destination}</p>
          <p><strong>Travel Date:</strong> {bookingDetails.date}</p>
          <p><strong>People:</strong> {bookingDetails.people}</p>
          <p><strong>Price:</strong> ₹{Number(bookingDetails?.price.replace(/[₹,]/g, "")).toLocaleString()}</p>
          <p><strong>Total Price:</strong> ₹{Number(bookingDetails?.totalPrice.replace(/[₹,]/g, "")).toLocaleString()}</p>

        </div>

        <div className="button-group">
          <button className="download-button" onClick={handleDownload}>
            Download Invoice
          </button>
          <button className="download-button" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>

      </div>
    </section>
  );
};

export default Confirmation;
