import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
//import './App.css';

//Paginas
import login from "./pages/login";
import home from "./pages/home";
import signup from "./pages/signup";
import { AuthProvider } from './Auth.js';
import PrivateRoute from "./PrivateRoute";

class App extends Component {

  render() {
    return (
      <AuthProvider>
      <div className="App">
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={home}/>
            <Route exact path="/signup" component={signup}/>
            <Route exact path="/login" component={login}/>
          </Switch>
        </Router>
      </div>
      </AuthProvider>
    );
  }
}

export default App;