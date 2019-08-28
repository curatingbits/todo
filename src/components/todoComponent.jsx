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

  completed(status, e) {
    console.log(status)
    console.log(e.target.checked)
    var checked = e.target.checked
    this.Auth.updateCompleted(e.target.checked, status.id)
    .then(res =>{
      this.setState(prevState=>({
        todos: prevState.todos.map(
          el => el.id=== status.id? { ...el, completed: checked }: el
        )
      }))
    })
  }

  deleteTodo(id){
    console.log(id)
    this.Auth.deleteTodo(id)
      .then(res =>{
        this.removeTodo(id)
      })
  }
      removeTodo(id) {
      var newItems = this.state.todos.filter((todo) => {
          return todo.id !== id;
      });

      this.setState({ todos: newItems });
    }


  renderTodos(){
    if (this.state.todos.length === 0) return <p className="mt-3 pl-4 lead"> You currently don't have any tasks for this project. </p>
    return this.state.todos.map((item,i) => (
        <ListGroupItem key={i}><input style={this.styles} type="checkbox" checked={item.completed} onChange={(e) => this.completed(item, e)} /> <span className="h5 ml-3"> {item.completed === true ? <span className="text-muted"style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{item.name}</span> : item.name} </span><a onClick={this.deleteTodo.bind(this, item.id)}  color="danger" size="sm" className="float-right text-muted">clear task</a></ListGroupItem>
      ))
  }



  render (){
    let classes = "text-";
    classes += (this.state.todos.completed === true) ? "primary" : "warning";

    return(
      <div>
      <Form className="" onSubmit={this.handleTodoSubmit}>
      <FormGroup>

      <InputGroup className="p-3" size="lg">
        <InputGroupAddon addonType="prepend"></InputGroupAddon>
      <Input type="name" name="name" id="name" placeholder="Task at hand?" onChange={this.handleChange}/>
      <Button color="warning" size="sm">Add Task</Button>
      </InputGroup>
      </FormGroup>
      </Form>
      <ListGroup>
          {this.renderTodos()}
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
