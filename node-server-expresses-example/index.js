const express = require('express');
const cors = require('cors')
const crunchyScraper = require('./crunchyroll');
const gogoScraper = require('./gogoanime');
const animekaiScraper = require('./animekai');



const app = express();
app.use(cors())


app.get('/', (req, res) => {
  res.json({
      message: 'Scraping is fun'
  })
})



app.get('/search/:title', async (req, res) => {

    try { 
        let crunchMovies = await crunchyScraper.getMovies(req.params.title);
        let animekaiMovies = await animekaiScraper.getMovies(req.params.title);
        let gogoMovies = await gogoScraper.getMovies(req.params.title);
       

        
        //console.log(cars3)

        //let combinedResponse = { cars1, cars2 };
       let totalMovies = []
       let totMovies = totalMovies.concat(crunchMovies, animekaiMovies, gogoMovies)
        
         var output = totMovies.reduce(function(o, cur) {

            // Get the index of the key-value pair.
            var occurs = o.reduce(function(n, item, i) {
              return (item.id === cur.id) ? i : n;
            }, -1);
          
            // If the name is found,
            if (occurs >= 0) {
          
              // append the current value to its list of values.
       
              o[occurs].href = [...o[occurs].href, ...cur.href]
              o[occurs].image = o[occurs].image.concat(cur.image);
              o[occurs].site = Object.assign(o[occurs].site, cur.site)
          
              // Otherwise,
            } else {
          
              // add the current item to o (but make sure the value is an array).
              var obj = {
                name: cur.name,
                id: cur.id,
                href: [cur.href],
                image: [cur.image],
                site: cur.site
              };
              o = o.concat([obj]);
            }
          
            return o;
          }, []);  
      

        res.json(output);

    } catch (err) {
        res.json({ error: `Something bad happened: ${err.message}` });
    }
})

app.get('/movie/:href', (req, res) => {

  

  if (req.params.href.includes('gogo-')) {
  editlink = req.params.href.replace("gogo-", "")
    gogoScraper
    .getTags(editlink)
    .then(tag => {
        res.json(tag)

    })
  } else if (req.params.href.match(/[-][0-9]{2,6}/)) {
    animekaiScraper
    .getTags( req.params.href)
    .then(tag => {
        res.json(tag)
  })
} else {
  crunchyScraper
  .getTags( req.params.href)
  .then(tag => {
      res.json(tag)

})
}

  

  
   })

const port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
}) 