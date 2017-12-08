import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import MealList from './components/MealList';
import Meal from './components/Meal';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path = '/' component={Home} />
          <Route exact path="/user/:userId/" component={MealList} />
          <Route exact path="/user/:userId/meal/:mealId" component={Meal} />
        </div>  
      </Router>
    );
  }
}

export default App;
