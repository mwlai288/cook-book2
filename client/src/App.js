import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path = '/' component={Home} />
          <Route exact path="/user/:userId/" component={Dashboard} />
        </div>  
      </Router>
    );
  }
}

export default App;
