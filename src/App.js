import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./components/Auth";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
