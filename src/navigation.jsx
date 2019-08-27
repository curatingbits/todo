import React, {Component} from "react";
import { withRouter} from 'react-router';



import Auth from './components/authComponent'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem} from 'reactstrap';


export class Navigation extends Component {
    constructor(props) {
      super(props);
      this.Auth = new Auth();
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    handleLogout(){
        this.Auth.logout()
         this.props.history.push('/login');
      }


    render() {
      return (
        <div>
          <Navbar color="warning" light expand="md">
            <NavbarBrand href="/">Tasks</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>

                  <NavLink onClick={this.handleLogout.bind(this)}>Logout</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }

  export default withRouter(Navigation)
