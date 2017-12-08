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
        <Link to='/signup'><h1>Sign Up</h1></Link>
        <h3>Browse through and find a Recipe</h3>
        {this.state.user.map((user, i) => (
          <div key={i}>
            <Link to={`/user/${user._id}`}>
              {user.userName}
            </Link>
        </div>
        ))}
      </div>
    )
  }
}

export default HomePage;