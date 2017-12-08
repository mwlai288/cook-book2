import React, { Component } from 'react';
import axios from 'axios';
// import styled from 'styled-components';
import { Redirect } from 'react-router-dom';


class MealList extends Component {
  state = {
    user: [],
    likes: "",
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
            userId: id
        })
    })
}
    // _deleteUser = () => {
    //     axios.get(`/api/user/${this.state.user._id}/delete`).then((res) => {
    //         console.log(`User was deleted`);
    //     })
    //     this.setState({redirect: true})
    // }

    render() {
        if(this.state.redirect){
            return <Redirect to={'/'}/>;
        } else {
        return (
            <div>
            Hello from MealList
            {this.state.meals.map((meal, i) => (
          <div key={i}>
            {meal.name}
            {meal.likes}
            
        </div>
        ))}
            </div>
        );}
    }
}

export default MealList;