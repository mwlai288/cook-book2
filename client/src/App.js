import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Home from './components/Home';
import MealList from './components/MealList';
import Meal from './components/Meal';
import SignUp from './components/SignUp';
import NewMeal from './components/NewMeal';
import NewStep from './components/NewStep';
import EditStep from './components/EditStep';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav>
            <NavLink to='/signup'>Sign Up</NavLink>
            <NavLink to="/">Home</NavLink>
          </Nav>
            <Route exact path = '/' component={Home} />
            <Route exact path="/user/:userId/" component={MealList} />
            <Route exact path="/user/:userId/meal/:mealId" component={Meal} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/user/:userId/newMeal" component={NewMeal} />
            <Route exact path="/user/:userId/meal/:mealId/newstep" component={NewStep} />
            <Route exact path="/user/:userId/meal/:mealId/steps/:stepId/editstep" component={EditStep} />
        </div>  
      </Router>
    );
  }
}

export default App;

const Nav = styled.div`
  background-color: gray;
  height: 30px;
  padding: 20px;
  text-align: center;
  text-color: white;
  display: flex;
  justify-content: space-around;
`

const NavLink = styled(Link)`
  color: black;
  font-weight: bold;
`
