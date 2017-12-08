import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class Meal extends Component {
  state={
    redirect: false,
    user: "",
    meal: [],
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
                      </div>)
                    })}
                </div>
                <Link to={`/user/${this.state.userId}/meal/${this.state.meal._id}/newstep`}>
                  <button>Add Step</button>
                    </Link>
            </div>
            <br />
        </div>
    );
  }
  }
  }

export default Meal;