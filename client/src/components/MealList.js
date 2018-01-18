import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
// import Overdrive from 'react-overdrive';


class MealList extends Component {
  state = {
    user: [],
    userId: "",
    redirect: false,
    meals: []
}
    
componentWillMount() {
   const id = this.props.match.params.userId;
   axios.get(`/api/user/${id}`).then((res) => {
   this.setState({
      user: res.data,
      meals: res.data.meals,
      userId: id,
      likes: res.data.likes
     })
  })    
}

deleteMeal = () => {
  const userId = this.props.match.params.userId;
  const mealId = this.props.match.params.mealId;
  axios.delete(`/api/user/${userId}/meal/${mealId}`).then(res => {
    this.setState({ redirect: true })
  })
}

    render() {
        if(this.state.redirect){
            return <Redirect to={'/'}/>;
        } else {
        return (
            <Grid>
                <NewMeal>
                    <Link to={`/user/${this.state.user._id}/newmeal`}> New Meal</Link>
                </NewMeal>
                 {this.state.meals.map((meals, i) => (
                    <div key={i}>
                    <MealName>{meals.name}</MealName>
                    <Link to={`/user/${this.state.user._id}/meal/${meals._id}`}> 
                        <FoodImage src={meals.image} alt=''/> 
                    </Link> 
                    
                <button onClick={this.deleteMeal}>DELETE</button>
                </div>
                    ))}
            </Grid>
            );
        }
    }
}

export default MealList;

const FoodImage = styled.img`
    width: 300px;
    height: 300px;
`

const MealName = styled.div`
    /* padding: 1rem; */
`
const NewMeal = styled.div`
    /* text-align: center; */
`

const Grid = styled.div`
    /* display: grid;
    grid-template-columns: 10px 100px 100px 100px;
    grid-column-gap: 10px;
    grid-row-gap: 10px; */
    /* border: dashed red 2px;  */
`

const FoodGrid = styled.div`
    /* border: dashed red 2px; */
`