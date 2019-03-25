import React, { Component } from 'react';
import Login from "/home/admin1/Fundoo/client/src/screens/login.jsx";
import DashBoard from '/home/admin1/Fundoo/client/src/screens/dashboard.jsx';
import Register from '/home/admin1/Fundoo/client/src/screens/register.jsx';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ForgotPassword from '/home/admin1/Fundoo/client/src/screens/forgotPassword.jsx';
import resetpassword from '/home/admin1/Fundoo/client/src/screens/resetPassword.jsx';
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
