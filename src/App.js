import React, { Component } from 'react';
import Login from "/home/admin1/Fundoo/client/src/screens/login.jsx";
import DashBoard from '/home/admin1/Fundoo/client/src/screens/dashboard.jsx';
import Register from '/home/admin1/Fundoo/client/src/screens/register.jsx';
import { BrowserRouter as Router, Route } from "react-router-dom";

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
      </div>
    </Router>
    
    </div>
    
    );
  }
}

export default App;
