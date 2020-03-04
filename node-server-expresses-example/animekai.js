const fetch = require('node-fetch');
const cheerio = require('cheerio');

const movieCache = {};
const searchCache = {};

async function getMovies(search) {


  
    const url = `https://animekaizoku.com//?s=${search}`;
    
    const response = await fetch(url);
    const body = await response.text();
    //console.log(body)
    const $ = cheerio.load(body)
    const titles = []
    //const promises = [];
    const sitename = $('meta[property="og:site_name"]').attr('content')

    $('ul#posts-container.posts-items').children().each((i, item) => {
        const $item = $(item)
        const test = $item.attr('class')
        const name = $item.find('a').attr('aria-label')

        const href = []
        const hrefs = $item.find('a').attr('href').replace('https://animekaizoku.com/','')
        href.push(hrefs)
        //const desc = $item.find('p.post-excerpt').text().trim()
        //const rating = $item.find('div.digital-rating > div').attr('data-score')
        const image = $item.find('img').attr('src')
        const id = $item.find('a').attr('aria-label').trim().toLowerCase().replace(/ +/g, "");

        const site = {
            [sitename] : `https://animekaizoku.com/${href}`
        }


        const title = {
            
            //test,
            name,
            id,
           // desc,
            //rating,
            image,
            href,
            site

            

    }
        
       titles.push(title)
       //console.log(titles.length)
       
})

//console.log(titles)
return titles

         
    };

       
    
        
    




async function getTags(href) {


    const url = `https://animekaizoku.com/${href}`
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);
    const tags = []
    
   const rating = $('div.review-final-score h3').text().trim()
   const desc = $('div.review-short-summary p').text().trim()
   const name = $('meta[property="og:title"]').attr('content')
   const image = $('meta[property="og:image"]').attr('content')
  
const articles = $($('div.main-content header.entry-header-outer')).html()
console.log(articles)
 const rawJSON = $($('script[type="application/ld+json"]')).html();
 
 //console.log(rawJSON)
 //const data = JSON.parse(rawJSON);
 //const keys = Object.keys(data)[1]
 //console.log(data[keys][2].isPartOf)





   
 
   //for each ??  $('div.movie_info tbody > :nth-child(3) > :nth-child(2)').text().trim()
    
    /* 
   const ratings = []
   $('div.review-item').each((i, item) => {

    const $item = $(item)

    const rating = $item.find('span h5').text().trim();
    ratings.push(rating)
   }) */
   
  


        const tag = {
         desc,
         rating,
         href,
         //ratings,
         name,
         image,
         //site,


       
         


        }
        
    tags.push(tag);
    //console.log(tags)


    //movieCache[href] = tags;

    return tags

}

module.exports = {
    getMovies,
    getTags
};
//getMovies('naruto')
getTags('https://animekaizoku.com/boruto-naruto-next-generations-34566/')
