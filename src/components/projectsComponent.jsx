import React, {Component} from 'react'
import Auth from '../components/authComponent'
import { withRouter } from 'react-router'
import { Container, Row, Col, Button, Card, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import Todo from '../components/todoComponent'
class Pages extends Component {

constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.editFormSubmit = this.editFormSubmit.bind(this);
    this.deleteProject = this.deleteProject.bind(this)
    this.Auth = new Auth();
    this.state = {
      projects: [],
      modal: false,
      edit: false,
      collapse: false,
      updateForm: true,
      projectID: '',
      shown: true,
      project:[],
      name: null,
      description: null,
      id: null,
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {

    this.setState(prevState => ({
      modal: !prevState.modal,
      edit: false,
    }));
    this.setState({name: null, description: null, id: null})
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

  deleteProject(id){
    console.log(id)
    this.Auth.deleteProject(id)
      .then(res =>{
        this.removeProject(id)
      })
  }
      removeProject(id) {
      var newItems = this.state.projects.filter((project) => {
          return project.id !== id;
      });

      this.setState({ projects: newItems });
    }


  handleFormSubmit(e){
    e.preventDefault();
    this.Auth.newProject(this.state.name, this.state.description, this.props.user.id)
    .then(res =>{
      console.log(res)
      this.setState(prevState=>({
        projects: [...prevState.projects, res]
      }))
      this.toggle()
    })

    .catch(err =>{
      alert(err);
    })
  }

editFormSubmit(e){
  e.preventDefault();
  this.Auth.editProject(this.state.name, this.state.description, this.state.id)
  .then(res =>{
    console.log(res)
    this.componentDidMount()
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  })
  .catch(err =>{
    alert(err);
  })
}


edit(item){

  this.setState({name:item.name, id: item.id, description: item.description})

  this.setState(prevState => ({
    edit: true,
    modal: !prevState.modal,
  }));




}




  render() {
      console.log(this.state.edit)
    return (
      <div>
      <Container>
      <Row>
      <Col lg={{size: 6, offset: 3}}>


      <h3 className="mt-2">Current Projects <Button className="float-right primary" onClick={this.toggle}>New Project</Button></h3>
        { this.state.projects.map((project,i) => (
        <Card key={i} className="mt-3">
        <CardHeader><h4>{project.name} <Button onClick={this.deleteProject.bind(this, project.id)}  color="danger" size="sm" className="float-right">Delete</Button><Button onClick={(e) => this.edit(project)}  color="warning" size="sm" className="float-right">Edit</Button></h4></CardHeader>
        <Todo item={{id: project.id}} />
        </Card>
      ))}
      </Col>
      </Row>
      </Container>

      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
      <ModalHeader toggle={this.toggle}>New Project</ModalHeader>
      <ModalBody>

      <Form className="mt-4" onSubmit={ this.state.edit === false ? this.handleFormSubmit : this.editFormSubmit}>
      <FormGroup>
      <Label for="projectName">Project Name</Label>
      <Input type="field" name="name"  id="name" placeholder="Work, Personal, Groceries..." onChange={this.handleChange} value={this.state.name === null ? '' : this.state.name}/>
      </FormGroup>
      <FormGroup>
      <Label for="projectDescription">Description</Label>
      <Input type="textarea" name="description" id="description" placeholder="Notes about the project..." onChange={this.handleChange} value={this.state.description === null ? '' : this.state.description}/>
      </FormGroup>

      <Button color="primary" >Create Project</Button>
      <Button color="secondary ml-1" onClick={this.toggle}>Cancel</Button>
      </Form>
      </ModalBody>
      <ModalFooter>

      </ModalFooter>

      </Modal>
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


export default withRouter(Pages);
