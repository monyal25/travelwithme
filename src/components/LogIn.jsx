import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, useContext, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { firebase } from "../config.js";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import ReCAPTCHA from "react-google-recaptcha";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [justifyActive, setJustifyActive] = useState('tab1');
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
const [rememberMe, setRememberMe] = useState(false);
const [storedEmail, setStoredEmail] = useState('');
const [resetEmail, setResetEmail] = useState("");
const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);



  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const [signupData, setSignupData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  const handleSignIn = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password);
      setCurrentUser(true);
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', loginData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        try {
          await firebase.auth().sendPasswordResetEmail(loginData.email);
          setResetPasswordSuccess(true);
        } catch (resetError) {
          console.error('Password reset error:', resetError.message);
          alert('Failed to send password reset email.');
        }
      } else {
        console.error('Login error:', error.message);
        alert('Login failed. Please check your email and password.');
      }
    }
  };



  const handleSignUp = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(signupData.email, signupData.password);
          setCurrentUser(true);
      console.log('Signed up successfully!');
      alert('Signed up successfully! Please Login');
    } catch (error) {
      console.error('Signup error:', error.message);
      alert('Signup failed. Please try again.');
    }
  };

  const handleResetPassword = async () => {
  try {
    await firebase.auth().sendPasswordResetEmail(resetEmail);
    setResetPasswordSuccess(true);
    setResetEmail(""); // Clear the reset email field
  } catch (resetError) {
    console.error('Password reset error:', resetError.message);
    alert('Failed to send password reset email.');
  }
};



  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setStoredEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);



  // currentUser  = useContext(AuthContext);

  if (currentUser) {
   return <Redirect to="/dashboard" />;
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabs pills justify className="mb-3 d-flex flex-row justify-content-between">
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === 'tab1'}>
        <MDBInput
          wrapperClass='mb-4'
          label='Email address'
          id='form1'
          type='email'
          name='email'
          value={loginData.email || storedEmail}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        />
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' name='password' onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />

          <div className="d-flex justify-content-between mx-4 mb-4">
          <MDBCheckbox
              name='flexCheck'
              id='flexCheckDefault'
              label='Remember me'
              checked={rememberMe}
              onChange={(e) => {
                setRememberMe(e.target.checked);
                if (!e.target.checked) {
                  setStoredEmail('');
                }
              }}
              />
              <a href="#!" onClick={() => handleJustifyClick('resetPassword')}>
    Forgot password?
  </a>
          </div>

          <div className="mb-3">
      <ReCAPTCHA
        sitekey="6Lf9PoonAAAAAIerhoTSgoPkp7FC4XonH8DQkjn0"
        onChange={handleRecaptchaChange}
      />
    </div>
    {resetPasswordSuccess && (
      <p className="text-success">Password reset email sent. Check your inbox.</p>
    )}
    <MDBBtn className="mb-4 w-100" onClick={handleSignIn}>Login in</MDBBtn>
          <p className="text-center" onClick={() => handleJustifyClick('tab2')}>Not a member? <a href="#!">Register</a></p>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>
          <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text' onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} />
          <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' onChange={(e) => setSignupData({ ...signupData, username: e.target.value })} />
          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' onChange={(e) => setSignupData({ ...signupData, agreeToTerms: e.target.checked })} />
          </div>

          <MDBBtn className="mb-4 w-100" onClick={handleSignUp} disabled={!signupData.agreeToTerms}>
            Sign up
          </MDBBtn>
        </MDBTabsPane>
        <MDBTabsPane show={justifyActive === 'resetPassword'}>
      <MDBInput
        wrapperClass='mb-4'
        label='Email address'
        id='form3'
        type='email'
        name='resetEmail'
        value={resetEmail}
        onChange={(e) => setResetEmail(e.target.value)}
      />
      <MDBBtn className="mb-4 w-100" onClick={handleResetPassword}>Reset Password</MDBBtn>
      <p className="text-center" onClick={() => handleJustifyClick('tab1')}>Back to Login</p>
    </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>

  );
}

export default App;
