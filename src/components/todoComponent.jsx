import React, {Component} from 'react'
import Auth from '../components/authComponent'
import {  ListGroup, ListGroupItem, Input, InputGroup, InputGroupAddon, Button, Form, FormGroup  } from 'reactstrap'
class projectShow extends Component {

  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
    this.Auth = new Auth();
  }
  state = {
    todos: [],
  }
  componentDidMount() {
    this.Auth.todos(this.props.item.id)
    .then(data =>{
      this.setState({
        todos: data
      })
    })
    .catch(err =>{
      alert(err);
    })
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleTodoSubmit(e){
    e.preventDefault();
    e.target.reset();
    this.Auth.newTodo(this.state.name, this.props.item.id)
    .then(res =>{
      console.log(res)
      this.setState(prevState=>({
        todos: [...prevState.todos, res]
      }))

    })

    .catch(err =>{
      alert(err);
    })
  }

  render (){
    return(
      <div>
      <Form className="" onSubmit={this.handleTodoSubmit}>
      <FormGroup>
      <InputGroup className="p-0" size="lg">
        <InputGroupAddon addonType="prepend"></InputGroupAddon>
      <Input type="name" name="name" id="name" placeholder="What is your task?" onChange={this.handleChange}/>
      <Button color="warning" size="sm">Add Task</Button>
      </InputGroup>
      </FormGroup>
      </Form>
      <ListGroup>
      {this.state.todos.map((item,i) => (
          <ListGroupItem key={i}>{item.name}</ListGroupItem>
        ))}
        </ListGroup>
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



export default projectShow;
