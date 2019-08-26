import React, {Component} from 'react';
import Navigation from './navigation'
// import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Card  } from 'reactstrap'
import Auth from './components/authComponent';
import withAuth from './components/withAuth';
import Projects from './components/projectsComponent'



class App extends Component {



  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
  }

  render() {
    return (

      <div>
        <Navigation />
        <Projects user={{ id: this.props.user }}/>
      </div>


    )
  }

}
export default withAuth(App);
 // export default App;
