import React, { useState, useEffect } from 'react';
import './SignUp.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    setStatus('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'This field is required';
    if (!formData.email.trim()) newErrors.email = 'This field is required';
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password.trim()) newErrors.password = 'This field is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('');
      return;
    }

    setStatus('Sign up successful! Welcome aboard.');
    setFormData({ name: '', email: '', password: '' });
    setErrors({});
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="signup-section" data-aos="fade-in">
      <img src="signup.svg" alt="signup" />
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>
        <p className="signup-intro">Create your account to get started.</p>
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              aria-describedby="nameError"
            />
            {errors.name && <p className="error-msg" id="nameError">{errors.name}</p>}
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              aria-describedby="emailError"
            />
            {errors.email && <p className="error-msg" id="emailError">{errors.email}</p>}
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              aria-describedby="passwordError"
            />
            {errors.password && <p className="error-msg" id="passwordError">{errors.password}</p>}
          </label>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>

          {status && <p className="status-msg">{status}</p>}
        </form>

        <p className="switch-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>

      </div>
    </section>
  );
};

export default SignUp;
