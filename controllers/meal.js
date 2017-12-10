const express = require('express');
const User = require('../models/user');
const Meal = require('../models/meal')
const router = express.Router({
    mergeParams: true
});
const mongoose = require('mongoose');


//show route
router.get('/meal/:mealId', (req, res) => {
    User.findById(req.params.userId).then((user) => {
        const foundMeal = user.meals.find((meal) => {
            return meal.id === req.params.mealId
        })
        res.json(foundMeal);
    }).catch(err => console.log(err));
})

//create route
router.post('/newmeal', (req, res) => {
    const newmeal = new Meal();
    newmeal.name = req.body.name;
    newmeal.image = req.body.image;
    newmeal.ingredients = req.body.ingredients;

    
    User.findById(req.params.userId).then((user) => {
        user.meals.push(newmeal);
        user.save();
    })

    newmeal.save().then((meal) => {
      res.json(meal);
    }).catch(err => console.log(err));
  })

//delete route
router.delete(`/meal/:mealId`, (req, res) => {
    User.findById(req.params.userId).then( user => {
        const Index = user.meals.findIndex((meal) => {
            return meal.id === req.params.mealId
    })
    user.meals.splice(Index, 1);
    user.save()
    res.send(200);
}).catch(err => console.log(err))
})



module.exports = router;