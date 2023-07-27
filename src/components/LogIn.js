import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import { firebase } from "../config.js";

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

const LogIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      if(email.value){
              firebase.auth().signInWithEmailAndPassword(email.value, password.value);
      }else {
        signInWithGoogle();
      }
    } catch (error) {
      alert(error);
    }
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Submit</button>
        <button type="submit"><i className="fab fa-google"></i>Sign in with google</button>
      </form>
    </>
  );
};

export default LogIn;
