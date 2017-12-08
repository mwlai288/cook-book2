const express = require('express');
const User = require('../models/user');
const router = express.Router();
const mongoose = require('mongoose');

//index route
router.get('/', (req, res) => {
    User.find().then((users) => {
        res.json(users);
    });
});

//show route 
router.get('/:userId', (req, res) => {
    User.findById(req.params.userId).then((user) => {
        res.json(user);
    }).catch(console.log)
})

//delete route
router.get('/:userId/delete', (req, res) => {
    const userIdToDelete = req.params.userId;
    User.findByIdAndRemove(userIdToDelete).then((user) => {
        console.log(`${user.userName} was deleted`);
    }).catch(err => console.log(err));
});

//create route  
router.post("/signUp", (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    const newUser = new User();
    newUser.userName = userName;
    newUser.password = password;
    
    newUser.save().then((user) => {
      res.json(user);
    }).catch(err => console.log(err));
  })

//edit route
router.put('/:userId', (req,res) => {
    User.findByIdAndUpdate(req.body._id, req.body).then((user)=>{ 
        res.send(200);  
    }).catch(err => console.log(err))
})

module.exports = router;