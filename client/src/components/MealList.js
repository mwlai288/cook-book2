import React, { Component } from 'react';
import axios from 'axios';
// import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';


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
            {this.state.meals.map((meals, i) => (
            <div key={i}>
                {meals.name}
                <br/>
                <Link to={`/user/${this.state.user._id}/meal/${meals._id}`}> 
                <img src={meals.image} alt=''/> 
                </Link>           
            </div>
                ))}
        <Link to={`/user/${this.state.user._id}/newmeal`}> New Meal</Link>
            </div>
        );}
    }
}

export default MealList;