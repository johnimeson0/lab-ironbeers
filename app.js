const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { getEnabledCategories } = require('trace_events');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + '/views/partials')

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => res.render('beers', { beersFromApi }))
  .catch(error => console.log(error));

  //res.render('beers', { beersFromApi });
});
//   punkAPI.getRandom()
//   .then(responseFromAPI => res.render('randomBeers', {responseFromAPI}))
//   .catch(error => console.log(error));
app.get('/random-beer', async (req, res) => {

  try {
    let randomBeer = await punkAPI.getRandom()
    let oneBeer = randomBeer[0]
    
    console.log(oneBeer)
    res.render('randomBeers', oneBeer)
  } catch (error) {
    
  }
 });

app.listen(3000, () => console.log('🏃‍ on port 3000'));
