import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import { firebase } from "../config.js";
import TravelForm from "./TravelForm";


const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <h1>Hello, <span></span>{currentUser.displayName}</h1>
      <img src={currentUser.photoURL} alt="" />
      <TravelForm></TravelForm>
      <button onClick={() => firebase.auth().signOut()}>Sign out</button>
    </div>
  );
};

export default Dashboard;
