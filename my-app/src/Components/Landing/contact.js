import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_kp3hx6q", "template_jmxoe6u", form.current, "GJPy5m7gYDitRBKwk")
      .then((result) => {
          console.log(result.text);
          alert("Message Sent");
      }, (error) => {
          console.log(error.text);
          alert("Error");
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};
export default Contact;