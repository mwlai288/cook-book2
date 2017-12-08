import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class NewStep extends Component {
  state = {
    steps: {
      name: "",
      instructions: "",
    },
    redirect: false
  }

  handleChange = e => {
    const attributeName = e.target.name;
    const attributeValue = e.target.value;
    const newState = { ...this.state };
    newState.steps[attributeName] = attributeValue;
    this.setState(newState);
  };

addNewStep = e => {
    e.preventDefault();
    axios.post(`/api/user/${this.props.match.params.userId}/meal/${this.props.match.params.mealId}/newstep`, this.state.steps).then(res => {
        this.setState({
            redirect: true
        });
    }).catch(err => console.log(err));
};

render() {
    if (this.state.redirect){
        return <Redirect to={`/user/${this.props.match.params.userId}/meal/${this.props.match.params.mealId}`} />
    } else {
        return (
            <div>
                <h1>Add A New Step</h1>               
                    <form onSubmit={this.addNewStep}>
                        <div>
                            <input name="name" type="text" placeholder="Name" onChange={this.handleChange} required/>
                        </div>
                        <div>       
                            <input name="instruction" type="text" placeholder="Instruction" onChange={this.handleChange} required/>
                        </div>
                        <br />
                            <input type='submit'/>
                    </form>
                    <br />
                    <Link to={`/user/${this.props.match.params.userId}/meal/${this.props.match.params.mealId}`} >
                    Go Back
                </Link>
               
            </div>
        );    
    }
}
}

export default NewStep;