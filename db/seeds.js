require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

var Step = require('../models/step');
var Meal = require('../models/meal');
var User = require('../models/user');

mongoose.Promise = global.Promise

Step.remove({}, (err) => console.log(err));
Meal.remove({}, (err) => console.log(err));
User.remove({}, (err) => console.log(err));

const gordstep1 = new Step({
  name: 'Step 1',
  instruction: "Preheat the oven to 200°C/390°F"
})
const gordstep2 = new Step({
  name: 'Step 2',
  instruction: "Heat a large ovenproof frying pan until hot and add a glug of oil. Grind a generous amount of salt and pepper onto a board and roll the fillet in the seasoning. Fry over a high heat for 1–2 minutes on each side until gently coloured all over, including the ends. Add the garlic and thyme sprigs, heat for a minute, then sit the beef on top of them. Add a couple of knobs of butter, spooning it over the steak to baste."
})
const gordstep3 = new Step({
  name: 'Step 3',
  instruction: "Place the beef in the preheated oven and roast for 15–17 minutes until rare or medium rare. It should feel springy when pressed. Remove from the oven, cover loosely with foil and leave to rest for 15 minutes, basting now and again with the juices from the pan."
})
const gordstep4 = new Step({
  name: 'Step 4',
  instruction: "Meanwhile, make the relish. Heat the olive oil in a large frying pan, add the onion and chillies and fry over a medium heat for about 5 minutes until softened. Stir in the tomatoes, then season and cook for 6–8 minutes until the tomatoes are beginning to collapse. Add the vinegar and stew down over a medium heat for about 6 minutes until reduced to a rough relish consistency. Remove from the heat, stir in the basil and season well. Tip into a serving bowl and set aside."
})
const gordstep5 = new Step({
  name: 'Step 5',
  instruction: "Combine the ingredients for the mustard mayonnaise. Season, then spoon into a serving bowl and set aside. "
})
const gordstep6 = new Step({
  name: 'Step 6',
  instruction: "To make the toast, heat a griddle pan until smoking hot. Drizzle the sliced ciabatta with the olive oil, season and then griddle for 1–2 minutes until golden on both sides. Repeat until all the bread is toasted and then place on a serving platter."
})
const gordstep7 = new Step({
  name: 'Step 7',
  instruction: "To serve, thickly slice the rested fillet of beef, place on a platter and put on the table with the toast, mayonnaise, relish and lettuce leaves to be assembled by your guests."
})

const steakSandwich = new Meal({
  name: 'Steak Sandwhich',
  ingredients: "olive oil, 700g fillet of beef, 1 whole garlic, 3-4 thyme sprigs, butter, salt and pepper, 1 baby gem lettuce, half a red onion (finely chopped), 2 red chillies chopped and deseeded, 250g cherry tomatoes, 1-2 tsp sherry vinegar, basil, 3tbsp mayo, 3tbsp mustard, 12 slices of ciabatta",
  category: "Sandwhiches",
  image: "https://cdn.lifestyle.com.au/cache/400x200/Recipes/Thumbnails/GordonsSTEAKSANDWICHES.jpg",
  likes: 143,
  steps: [gordstep1,gordstep2,gordstep3,gordstep4,gordstep5,gordstep6,gordstep7]
})

const gordon = new User({
  userName: 'gordon_ram',
  password: 'delicious',
  meals: [steakSandwich]
})

const twistedstep1 = new Step({
  name:"Step 1",
  instruction: "Heat oil in a large heavy-bottomed saucepan over medium-high heat. Add chicken and cook until just golden brown.  Add sausage, peppers, garlic and Cajun seasoning; stir to coat.  Cook for about 3 minutes."
})
const twistedstep2 = new Step({
  name:"Step 2",
  instruction: "Add chicken broth, cream and dried pasta.  Stir to combine.  Bring to a simmer."
})
const twistedstep3 = new Step({
  name:"Step 3",
  instruction: "Reduce heat to low and let cook covered for 10-15 minutes, or until pasta is tender."
})
const twistedstep4 = new Step({
  name:"Step 4",
  instruction: "Remove pot from heat and stir in parmesan cheese and parsley."
})

const cajunChickenPasta = new Meal ({
name: "Cajun Chicken Pasta",
ingredients: "3tbsp olive oil, 2 chicken breast diced, 14oz smoke sausage, minced garlic, 3.5 cups chicken broth, 2 cups heavy cream, 450g penne pasta, 2tbsp cajun seasoning, 1 cup shredded parmesan cheese, 1/4 cup chopped parsley",
category: "Pasta",
image: "https://cdn.instructables.com/FX9/LCD1/IZT6SO7D/FX9LCD1IZT6SO7D.MEDIUM.jpg",
likes: 87,
steps: [twistedstep1,twistedstep2,twistedstep3,twistedstep4]
})

const twisted = new User({
  userName:"twisted_food",
  password: "twist1",
  meals:[cajunChickenPasta]
})

gordon.save((err) => {
  if (err) console.log(err);
  console.log('Beautifully saved');
  
})

twisted.save((err) => {
  if (err) console.log(err);
  console.log('Twisted saved');
  mongoose.connection.close();
})

