import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import { firebase} from "../config.js";
import '../styles/SignupPage.css';


const TravelForm = () => {

  const handleSubmit = (e) => {
    const travelButton = document.getElementById("travelButton")
    const travelForm = document.getElementById("travelForm")


    travelButton.addEventListener("click", () => {
      travelForm.classList.add("showForm");
    })

    const myForm = document.getElementById("myForm")
    myForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = new FormData(myForm)
      const data = {}
      formData.forEach((value, key) => {
        data[key] = value
      })


    firebase.firestore().setDoc(firebase.firestore().doc(firebase.firestore().db, "data", "one"), data);


    myForm.reset()
      travelForm.classList.remove("showForm");

  });
}


return(
  <div>
    <button id="travelButton">Travel</button>
    <div id="travelForm">
      <form id="myForm">
        <input type="text" name="name" placeholder="Name" required/>
          <input type="text" name="destination" placeholder="Destination" required/>
            <button type="submit">Submit</button>
      </form>
    </div>
  </div>
  );
}

export default TravelForm;
