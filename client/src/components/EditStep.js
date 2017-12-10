import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class EditStep extends Component {
  state = {
    steps: {
      name: "",
      instructions: ""
    }
  }
  

handleChange = (e) => {
  const attributeName = e.target.name;
  const attributeValue = e.target.value;
  const updateSteps = {...this.state.steps};
  updateSteps[attributeName] = attributeValue;
  this.setState({step: updateSteps});
}

componentWillMount() {
    const userId = this.props.match.params.userId;
    const mealId = this.props.match.params.mealId;
    const stepId = this.props.match.params.stepId;
    axios.put(`/api/user/${userId}/meal/${mealId}/steps/${stepId}`).then(res => {
        this.setState({ redirect: true })
    })
  }

editStep = (e) => {
  e.preventDefault();
  axios.put(`/api/user/${this.props.match.params.userId}/meal/${this.props.match.params.mealId}/steps/${this.props.match.params.stepsId}`, this.state.steps)
  .then((res) => {
    console.log('Edit Worked!')  
    this.setState({
      redirect: true
     })
    }).catch(err => console.log(err))
  }

render() {
  if (this.state.redirect){
      return <Redirect to={`/user/${this.props.match.params.userId}`} />
  } else {
      return (
          <div>
              <div>
                  <form onSubmit={this.editStep} >
                  <div>       
                    <input name="name" type="text" placeholder="Edit Step Name" onChange={this.handleChange}/>
                  </div>    
                  <div>       
                    <input name="instructions" type="text" placeholder="Edit Instruction" onChange={this.handleChange}/>
                  </div>    
                          <input type='submit'/>
                  </form>
                  <Link to={`/user/${this.props.match.params.userId}`}>Go back</Link>
              </div>
          </div>
      );
  }
}
}


export default EditStep;