import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
        <Text>Browse through and find a Recipe</Text>
        {this.state.user.map((user, i) => (
          <UserName key={i}>
            <LinkStyle to={`/user/${user._id}`}>
              {user.userName}
            </LinkStyle>
        </UserName>
        ))}
      </div>
    )
  }
}

export default HomePage;

const LinkStyle = styled(Link)`
  color: palevioletred;
  font-weight: bold;
  &:visited: green;
`

const Text = styled.h3`
  text-align: center;
  color: red;
  font-weight: bold;
`

const UserName = styled.div`
  text-align: center;
  textDecoration: 'none';
`