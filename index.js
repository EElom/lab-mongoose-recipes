const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  // Iteration 2

  Recipe
  // we are passing an object (newRecipe) to the .create() method and
  // under the hood, this method will insert this object as a new document in the database in the "recipes" collection
    .create(newRecipe)
    .then(result => console.log(`recipe added: ${result.title}`))
    .catch(err => console.log(err));

// Iteration 3

Recipe
  // here we are passing an array of objects to the ".insertMany()" method that literally does what it says:
  // inserts multiple objects into the database as documents of the "recipes" collection
  .insertMany(data)
  .then(result => {
    result.forEach(item => {
      console.log(`recipe for ${item.title} inserted successfully`);
    });
  })
  .catch(err => console.log(err));

  // Iteration 4

Recipe
// under the hood, ".updateOne()" basically works as ".findOneAndUpdate()" method:
// finds a certain document in the database based on some criteria (in this case based on the "title"),
// and sets some of the properties to the new values and saves it in the database
  .updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(() => console.log(`The recipe is updated`))
  .catch(err => console.log(err));

// Iteration 5

Recipe
  // under the hood, it works as ".findOneAndDelete" method - find doc based on some criteria (in this case title but could be any other property)
  // and removes it from the DB permanently
    .deleteOne({ title: 'Carrot Cake' })
    .then(() => console.log(`The recipe is deleted`))
    .catch(err => console.log(err));


// Iteration 6

mongoose.connection
  // alternative way to using ".close()" method is using ".disconnect()". The best practice is to use ".close()" but you will see sometimes the alternative way as well
  .close()
  .then(() => console.log(`connection closed`))
  .catch(err =>
    console.log(
      `an error while closing database connection has occurred: ${err}`
    )
  );

