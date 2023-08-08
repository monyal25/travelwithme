import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    profileImage: "",
    name: "",
    mobileNumber: "",
    email: "",
    sex: "",
    address: "",
    alternatePhoneNumber: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    mobileNumber: "",
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Form is valid, you can implement logic to update the user's profile data here
      console.log("Profile data submitted:", formData);
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {
   const errors = {};
   if (!formData.name.trim()) {
     errors.name = "Name is required";
   }
   if (!formData.mobileNumber.trim()) {
     errors.mobileNumber = "Mobile number is required";
   } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
     errors.mobileNumber = "Invalid mobile number format";
   }
   if (!formData.email.trim()) {
     errors.email = "Email address is required";
   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
     errors.email = "Invalid email address";
   }
   return errors;
 };


  return (
    <MDBContainer className="py-5 w-50">
      <h2 className="mb-4">Profile Page</h2>
      <div className="d-flex justify-content-center mb-4">
        <img
          src={formData.profileImage || "default_profile_icon.png"}
          alt="Profile"
          className="rounded-circle"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <MDBRow>
            <MDBInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              errorMessage={formErrors.name}
                  wrapperClass="mb-2"
            />
            <MDBInput
              label="Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              errorMessage={formErrors.mobileNumber}
                wrapperClass="mb-2"
            />
            <MDBInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              errorMessage={formErrors.email}
                wrapperClass="mb-2"
            />

            <MDBRow md="8">
              <label className="mb-2">Sex</label>
              <div className="d-flex align-items-center mb-2">
                <input
                  type="radio"
                  id="femaleRadio"
                  name="sex"
                  value="female"
                  checked={formData.sex === "female"}
                  onChange={handleChange}
                />
                <label htmlFor="femaleRadio" className="ms-2">Female</label>
              </div>
              <div className="d-flex align-items-center mb-2">
                <input
                  type="radio"
                  id="maleRadio"
                  name="sex"
                  value="male"
                  checked={formData.sex === "male"}
                  onChange={handleChange}
                />
                <label htmlFor="maleRadio" className="ms-2">Male</label>
              </div>
              <div className="d-flex align-items-center mb-2">
                <input
                  type="radio"
                  id="otherRadio"
                  name="sex"
                  value="other"
                  checked={formData.sex === "other"}
                  onChange={handleChange}
                />
                <label htmlFor="otherRadio" className="ms-2">Other</label>
              </div>
            </MDBRow>
                        <MDBInput
                          label="Address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                            wrapperClass="mb-2"
                        />
                        <MDBInput
                          label="Alternate Phone Number"
                          name="alternatePhoneNumber"
                          value={formData.alternatePhoneNumber}
                          onChange={handleChange}
                            wrapperClass="mb-2"
                        />

        </MDBRow>
        <MDBBtn type="submit">Save Changes</MDBBtn>
      </form>
    </MDBContainer>
  );
};

export default ProfilePage;
