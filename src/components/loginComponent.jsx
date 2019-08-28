import React, {Component} from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Card  } from 'reactstrap'
import Auth from '../components/authComponent'

class Login extends Component {

  constructor(){
      super();
      this.handleChange = this.handleChange.bind(this);

      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.Auth = new Auth("http://localhost:3003");
  }


  handleFormSubmit(e){
         e.preventDefault();

         this.Auth.login(this.state.email, this.state.password)
             .then(res =>{
               console.log(this.props)
                this.props.history.push('/');
             })
             .catch(err =>{
                 alert(err);
             })
           }
  render(){
    return(
      <div>
        <Container className="mt-5">
          <Row>
            <Col lg={{size: 6, offset: 3}}>
              <Card className="p-5">
              <h3 className="">Sign In </h3>

              <Form className="mt-4" onSubmit={this.handleFormSubmit}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" name="email" id="email" placeholder="Email" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input type="password" name="password" id="Password" placeholder="Password" onChange={this.handleChange}/>
                </FormGroup>
                <Button outline color="warning" block>Submit</Button>
              </Form>
              <p className="lead mt-4">Don't have an account? <a href="/signup" className="text-warning">Signup.</a></p>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }


handleChange(e){


    this.setState(
        {
            [e.target.name]: e.target.value
        }
    )
  }
}


export default Login;
