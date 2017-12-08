import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  state = {
    user: []
  }

  componentWillMount(){
    this.getAllUsers();
  }

  getAllUsers = () => {
    axios.get('/api/user').then(res => {
      this.setState({user: res.data})
    })
  }
  
  render () {
    return (
      <div>
        <h1>Log-In</h1>
        <h3>Please Select an Existing User</h3>
        {this.state.user.map((user, i) => (
          <div key={i}>
            <Link to={`/user/${user._id}`} className='userName'>
              {user.userName}
            </Link>
        </div>
        ))}
      </div>
    )
  }
}

export default HomePage;