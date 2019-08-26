import React, {Component} from 'react'
import Auth from '../components/authComponent'
import { Container, Row, Col, Button, Card  } from 'reactstrap'
class projectShow extends Component {

  constructor(){
    super();
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

  render (){
    return(
      <div>
      <ul>
      { this.state.todos.map((item,i) => (
      <li key={i}>{item.name}</li>
        ))}
      </ul>
      </div>

    )
  }
}

export default projectShow;
