import React, {Component} from 'react';
import Navigation from './navigation'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Card  } from 'reactstrap'
import Auth from './components/authComponent';
import withAuth from './components/withAuth';



class App extends Component {

  constructor(){
      super();
      this.Auth = new Auth();
  }
  state = {
      todos: []
    }
    componentDidMount() {
      this.Auth.projects(this.props.user.id)
          .then(res =>{
            console.log(res)

          })
          .catch(err =>{
              alert(err);
          })

    }


  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
  }

  render() {
    return (

      <div>
        <Navigation/>
        <Container>
          <p>Logged in as {this.props.user.email}</p>
            <Row>
              <Col lg={{size: 6, offset: 3}}>
                <h3>Current Projects <Button className="float-right primary">New Project</Button></h3>
                <Card>
                  <h1>Inside Card</h1>
                </Card>
              </Col>
            </Row>
        </Container>
      </div>


    )
  }

}
export default withAuth(App);
 // export default App;
