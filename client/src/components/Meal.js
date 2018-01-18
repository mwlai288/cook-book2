import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
// import Overdrive from 'react-overdrive';

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

  render() {
    if (this.state.redirect){
      return <Redirect to={`/user/${this.state.userId}`} />
  } else {
      return (
          <div>
            <Container>
            <TitleName>{this.state.meal.name}</TitleName>

            <Image src={this.state.meal.image} alt="" align="middle"/>
            </Container>
            <IngrediDiv>
              Ingredients: {this.state.ingredients}
            </IngrediDiv>
           <div>
              <StepsContainer>
                  {this.state.steps.map((step, i) => {
                    return(
                      <div key={i}>
                        <br/>
                        {step.name}: {step.instruction}
                        <button onClick={this.deleteRecipe}>x</button>
                {/* <Link to={`/user/${this.state.userId}/meal/${this.state.meal._id}/steps/${this.state.steps.Id}/editstep`}>
                  <button>Edit</button>
                </Link> */}
                      </div>)
                    })}
                </StepsContainer>
                <ButtonStyle>
                <Link to={`/user/${this.state.userId}/meal/${this.state.meal._id}/newstep`}>
                  <button>Add Step</button>
                </Link>
                <Link to={`/user/${this.state.userId}`}>
                  <button>Back</button>
                </Link>
                </ButtonStyle>
            </div>
            <br />
        </div>
    );
  }
 }
}
export default Meal;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  padding: 1rem;
`
const Image = styled.img`
  width: 300px;
  height: 300px;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  box-shadow: 30px black;
`

const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid orange 2px;
`

const TitleName = styled.h1`
  font-family: 'Lobster', cursive;
  color: red;
`
const IngrediDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
`