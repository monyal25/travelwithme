import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import { firebase } from "../config.js";
import '../styles/SignupPage.css';
import image from '../imgs/travelImage.jpg'

const SignUp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
      setCurrentUser(true);
    } catch (error) {
      alert(error);
    }
  };
  if (currentUser) {
      return <Redirect to="/dashboard" />;
  }
/*  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </>
  );*/

  return (
    <div className="signup-container">
        <img
          src= {image}
          alt="Signup Image"
          className="signup-image"
        />
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
