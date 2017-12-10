import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
// import styled from 'styled-components';

class Meal extends Component {
  state={
    redirect: false,
    user: "",
    meal: [],
    likes: 0,
    steps: [],
    ingredients: "",
    image: "",
    userId: ""
  }

  componentWillMount(){
    const userId = this.props.match.params.userId;
    const mealId = this.props.match.params.mealId;
    axios.get(`/api/user/${userId}/meal/${mealId}`).then((res) => {
        this.setState({
            userId,
            meal: res.data,
            steps: res.data.steps,
            ingredients: res.data.ingredients
        })
    })
}

deleteRecipe = () => {
  const userId = this.props.match.params.userId;
  const mealId = this.props.match.params.mealId;
  const stepId = this.props.match.params.stepId;
  axios.delete(`/api/user/${userId}/meal/${mealId}/steps/${stepId}`).then(res => {
      this.setState({ redirect: true })
  })
}

// editStep = (e) => {
//   const userId = this.props.match.params.userId;
//   const mealId = this.props.match.params.mealId;
//   const stepId = this.props.match.params.stepId;
//   e.preventDefault();
//   axios.put(`/api/user/${this.props.match.params.userId}/meal/${this.props.match.params.mealId}/steps/${this.props.match.params.stepsId}`, this.state.steps)
//   .then((res) => {
//     console.log('Edit Worked!')  
//     this.setState({
//       redirect: true
//      })
//     }).catch(err => console.log(err))
//   }


  render() {
    if (this.state.redirect){
      return <Redirect to={`/user/${this.state.userId}`} />
  } else {
      return (
          <div>
            <h1><b>{this.state.meal.name}</b></h1>
            <br />
              <img src={this.state.meal.image} alt=""/>
            <br />
            <br />
            <div>
              <div>
                Ingredients:{this.state.ingredients}
              </div>
              <div>
                  {this.state.steps.map((step, i) => {
                    return(
                      <div key={i}>
                        <br/>
                        {step.name}: {step.instruction}
                        <button onClick={this.deleteRecipe}>x</button>
                {/* <Link to={`/user/${this.state.userId}/meal/${this.state.meal._id}/steps/${this.state.steps._id}/editstep`}>
                  <button>Edit</button>
                </Link> */}
                      </div>)
                    })}
                </div>
                <Link to={`/user/${this.state.userId}/meal/${this.state.meal._id}/newstep`}>
                  <button>Add Step</button>
                </Link>
                <Link to={`/user/${this.state.userId}`}>
                  <button>Back</button>
                </Link>
                
            </div>
            <br />
        </div>
    );
  }
 }
}
export default Meal;

