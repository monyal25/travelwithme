import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, useContext} from 'react';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { firebase } from "../config.js";
import "../styles/TravelForm.css";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./Auth";
import image from '../imgs/travelImage.jpg'


const TravelForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    flightNumber: '',
    dateOfTravel: '',
    timeOfTravel: '',
    destination: '',
  });

  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.firestore()
      .collection('travelData')
      .add(formData)
      .then(() => {
        console.log('User added!');
      });
  };

  const history = useHistory(); // Initialize useHistory
  const { currentUser } = useContext(AuthContext);

  const handleLogOut = async () => {
   try {
     await firebase.auth().signOut();
     history.push("/dashboard");
   } catch (error) {
     console.error("Logout error:", error.message);
   }
 };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="d-flex">
      <aside className={`sidebar p-3 ${!sidebarVisible ? 'collapsed' : ''}`}>
        <div className="d-flex align-items-center mb-4">
          <img
            src={image}
            alt="Profile"
            className="rounded-circle me-3"
            style={{ width: "50px", height: "50px" }}
          />
          <span className="text-dark fs-5"></span>
        </div>
        <ul className="sidebar-menu list-unstyled">
          <li><a href="#">Home</a></li>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Add Trip Details</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <MDBBtn className="mb-3 w-50" onClick={handleLogOut}>
          Logout
        </MDBBtn>
      </aside>

      <main className={`flex-grow-1 p-3 ${!sidebarVisible ? 'expanded' : ''}`}>

        {!sidebarVisible && (
          <button className="expand-btn" onClick={toggleSidebar}>
            <i className="fas fa-angle-right"></i>
          </button>
        )}

        {sidebarVisible && <div className="partition" />}

        <MDBContainer className="my-5 d-flex flex-column w-50">
          <MDBInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            wrapperClass="mb-4"
          />
          <MDBInput
            label="Flight Number"
            name="flightNumber"
            value={formData.flightNumber}
            onChange={handleChange}
            wrapperClass="mb-4"
          />
          <MDBInput
            label="Date of Travel"
            name="dateOfTravel"
            type="date"
            value={formData.dateOfTravel}
            onChange={handleChange}
            wrapperClass="mb-4"
          />
          <MDBInput
            label="Time of Travel"
            name="timeOfTravel"
            type="time"
            value={formData.timeOfTravel}
            onChange={handleChange}
            wrapperClass="mb-4"
          />
          <MDBInput
            label="Destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            wrapperClass="mb-4"
          />
          <MDBBtn className="mb-4 w-100" onClick={handleSubmit}>
            Submit
          </MDBBtn>
        </MDBContainer>
      </main>
    </div>
  );
};

export default TravelForm;
