import React from 'react';
import ReactDOM from 'react-dom'
import { Route,  BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './app'
import Login from './components/loginComponent'
import Signup from './components/signupComponent'



const routing =  (

  <Router>
    <div>
        <Route exact path="/" component={App} />
        <Route  exact path="/login" component={Login} />

        <Route  exact path="/signup" component={Signup} />
    </div>
  </Router>
)



ReactDOM.render(routing, document.getElementById('root'));
