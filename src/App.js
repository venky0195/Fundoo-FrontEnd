import React, { Component } from "react";
import Login from "../src/screens/login.jsx";
import DashBoard from "../src/screens/dashboard.jsx";
import Reminder from "../src/components/reminder.jsx";
import Register from "../src/screens/register.jsx";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ForgotPassword from "../src/screens/forgotPassword.jsx";
import resetpassword from "../src/screens/resetPassword.jsx";

/*This will rename our component to Component so that we can use it to render because React 
requires components to be capitalized otherwise it will treat it as a normal HTML element.*/
export const PrivateRoute = ({ component: Component, ...rest }) => (
  /**
   * We need to use a render prop here because now that we have matched a route we need to do some logic
   * to determine whether or not we should render the component that was passed in or redirect the user to
   * another location.
   */
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        //If user isn't logged in then we can redirect to a login page.
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Route path="/login" component={Login} />
            <Route path="/" exact component={Login} />
            <PrivateRoute path="/dashboard" component={DashBoard} />
            <Route path="/reminders" component={Reminder} />
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
