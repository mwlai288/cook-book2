const mongoose = require('mongoose');

const stepSchema = mongoose.Schema({
    name: String,
    instruction: String
})

const mealSchema = mongoose.Schema({
    name: String,
    ingredients: String,
    category: String,
    image: String,
    likes: Number,
    steps: [stepSchema]
});

const userSchema = mongoose.Schema({
  userName: String,
  password: String,
  meals: [mealSchema]
})

stepSchema.pre('save', (next) => {
    now = new Date();
    this.updatedAt = now;
    if(!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

mealSchema.pre('save', (next) => {
    now = new Date();
    this.updatedAt = now;
    if(!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

userSchema.pre('save', (next) => {
    now = new Date();
    this.updatedAt = now;
    if(!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

const Step = mongoose.model('Step', stepSchema);
const Meal = mongoose.model('Meal', mealSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    Step, Meal, User
}