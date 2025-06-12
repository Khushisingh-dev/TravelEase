import React from "react";
import "./Connect.css"
import '@fortawesome/fontawesome-free/css/all.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


const Connect = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div className="connect-page" data-aos="fade-in">
            <h2>Connect with Me</h2>
            <p>Feel free to reach out through the links below:</p>

            <div className="links">
                <a href="https://www.linkedin.com/in/khushisingh50" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-linkedin"></i> LinkedIn
                </a>

                <a href="mailto:ksingh237890@gmail.com">
                    <i class="fa-solid fa-envelope"></i> Email
                </a>

            </div>
        </div>
    );
};

export default Connect;
