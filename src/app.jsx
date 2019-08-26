import React, {Component} from 'react';
import Navigation from './navigation'
import AuthService from './components/authComponent';
import withAuth from './components/withAuth';
const Auth = new AuthService();



class App extends Component {

  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
  }

  render() {
    return (

      <div>
        <Navigation/>

        <h1>Welcome</h1>
      </div>


    )
  }

}
export default withAuth(App);
 // export default App;
