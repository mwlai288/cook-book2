const express = require('express');
const User = require('../models/user');
const Step = require('../models/step');
const router = express.Router({
    mergeParams: true
});
const mongoose = require('mongoose');

//show route
router.get('/steps/:stepId', (req, res) => {
    User.findById(req.params.userId).then((user) => {
        const foundMeal = user.meals.find((meal) => {
            return meal.id === req.params.mealId
        })
        const foundStep = foundMeal.steps.find((step) => {
            return step.id === req.params.stepId
        })
        res.json(foundStep);
    })
})

//create route
router.post('/newstep', (req, res) => {
    const name = req.body.name;
    const instruction = req.body.instruction;
    
    const newstep = new Step();
    newstep.name = req.body.name;
    newstep.instruction = req.body.instruction;

    User.findById(req.params.userId).then((user) => {
        const foundMeal = user.meals.find((meal) => {
            return meal.id === req.params.mealId
        })

        foundMeal.steps.push(newstep);
        user.save();
        res.send(200);
    }).catch(err => console.log(err))
})

//delete route
router.delete('/steps/:stepId', (req, res) => {
    User.findById(req.params.userId).then( user => {
        const foundMeal = user.meals.find((meal) => {
            return meal.id === req.params.mealId
        })
        const Index = foundMeal.steps.findIndex((step) => {
            return step.id === req.params.stepId
        })   
        foundMeal.steps.splice(Index, 1);
        user.save()
        res.send(200);
    }).catch(err => console.log(err))
})

module.exports = router;