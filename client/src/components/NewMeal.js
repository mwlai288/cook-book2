import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class NewMeal extends Component {
  state = {
    meals: {
      name: "",
      image: "",
      ingredients: "",
      category: ""
    },
    redirect: false
  }

  handleChange = e => {
    const attributeName = e.target.name;
    const attributeValue = e.target.value;
    const newState= { ...this.state };
    newState.meals[attributeName] = attributeValue;
    this.setState(newState);
  };

  addNewMeal = e => {
    e.preventDefault();
    axios.post(`/api/user/${this.props.match.params.userId}/newmeal`, this.state.meals).then(res => {
        this.setState({
            redirect: true
        });
    }).catch(err => console.log(err));
};

  render() {
    if (this.state.redirect){
      return <Redirect to={`/user/${this.props.match.params.userId}`} />
  } else {
    return (
      <div>
      <h1> Enter a new Recipe </h1>                                      
          <form onSubmit={this.addNewMeal}>
              <div>
                  <input name="name" type="text" placeholder="Name" onChange={this.handleChange} required/>
              </div>
              <div>
                  <input name="image" type="text"  placeholder="Image URL" onChange={this.handleChange} required/>
              </div>
              <div>       
                  <input name="ingredients" type="text" placeholder="List of Ingredients" onChange={this.handleChange} required/>
              </div>             
              <div>       
                  <input name="category" type="text" placeholder="Category (Optional)" onChange={this.handleChange}/>
              </div>             
              <br />
                  <input type='submit'/>
          </form>
          <br />
          <Link to={`/user/${this.props.match.params.userId}`}>Go back</Link>
  </div>
      );    
    }
  }
}

export default NewMeal;