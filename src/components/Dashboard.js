import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import { firebase } from "../config.js";
import TravelForm from "./TravelForm";
import '../styles/SignupPage.css';


const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }


  return (
    <div>
      <TravelForm></TravelForm>
    </div>
  );
};

export default Dashboard;
