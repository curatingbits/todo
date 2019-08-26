import React, {Component} from 'react'
import Auth from '../components/authComponent'
import { Container, Row, Col, Button, Card  } from 'reactstrap'
import Todo from '../components/todoComponent'
class Pages extends Component {

  constructor(){
    super();
    this.Auth = new Auth();

  }
  state = {
    projects: [],
  }
  componentDidMount() {
    this.Auth.projects(this.props.user.id)
    .then(data =>{


      this.setState({
        projects: data
      })
    })
    .catch(err =>{
      alert(err);
    })
  }

  render () {
    return (
      <div>

      <Container>
      <p>Logged in as </p>

      <Row>
      <Col lg={{size: 6, offset: 3}}>

      <h3>Current Projects <Button className="float-right primary">New Project</Button></h3>
      { this.state.projects.map((project,i) => (
        <Card key={i} className="mt-3 p-5">
        <h3>{project.name}</h3>
        <Todo item={{id: project.id}}/>
        </Card>

      ))}
      </Col>
      </Row>
      </Container>
      </div>
    )
  }

}

export default Pages;
