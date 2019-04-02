import React, { Component } from 'react';
import Login from "../src/screens/login.jsx";
import DashBoard from '../src/screens/dashboard.jsx';
import Register from '../src/screens/register.jsx';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ForgotPassword from '../src/screens/forgotPassword.jsx';
import resetpassword from '../src/screens/resetPassword.jsx';
class App extends Component {
  render() {
    return (
      <div>
      <Router>
      <div className="App">
      <Route path="/login" component={Login} />
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" component={DashBoard} />
      <Route path="/register" component={Register} />
      <Route path="/forgotPassword" component={ForgotPassword} />
      <Route path="/resetPassword" component={resetpassword} />
      
      

      </div>
    </Router>
    
    </div>
    
    );
  }
}

export default App;
