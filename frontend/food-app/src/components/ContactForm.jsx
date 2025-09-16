import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

export default function ContactForm({ setOpen }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs.send(
      'service_amaanh',     
      'template_rlz63yb',     
      templateParams,
      'Kustmyg_Zd3RPfL4P'       
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      toast.success('Message sent successfully!');
      setIsLoading(false);
      setOpen(false); 
    })
    .catch((err) => {
      console.error('FAILED...', err);
      toast.error('Failed to send message. Please try again.');
      setIsLoading(false);
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2 className="auth-title">Contact Us</h2>
        <p className="auth-subtitle">Have a question or feedback? Let us know!</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input type="text" name="name" id="name" className="form-input" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Your Email</label>
          <input type="email" name="email" id="email" className="form-input" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea name="message" id="message" rows="4" className="form-textarea" onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="auth-button" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}