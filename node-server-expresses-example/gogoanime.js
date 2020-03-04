const fetch = require('node-fetch');
const cheerio = require('cheerio');

const movieCache = {};
const searchCache = {};

async function getMovies(search) {

  

  
    const url = `https://gogoanime.video//search.html?keyword=${search}`;
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body)
    const titles = []
    //const promises = [];

    const sitename = $('meta[property="og:site_name"]').attr('content')

    $('ul.items').children().each((i, item) => {
        const $item = $(item)

        const href = []

        const hrefedit = $item.find('a').attr('href').replace("category","").replace("//","")
        const hrefs = `gogo-${hrefedit}`
        href.push(hrefs)
        //const link = `https://gogoanime.video/${href}`
        const image = $item.find('img').attr('src');
       // const date = $item.find('p.released').text().trim();
        const id = $item.find('p.name').text().trim().toLowerCase().replace(/ +/g, "");
        const name = $item.find('p.name').text().trim()
        
        //console.log(genretext)
        const site = {
            [sitename] : `https://gogoanime.video/category/${hrefedit}`
        }    


        const title = {
            name,
          
           // link,
            id,
            image,
            href,
            site
           // date

         
        };

       
            titles.push(title);
        
    });

    //searchCache[search] = titles;
    console.log(titles)
    return titles

}

async function getTags( href) {

    

   

 
    const url = `https://gogoanime.video/category/${href}`
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);
    const tags = []

   const image = $('div.anime_info_body_bg img').attr('src')
   const name = $('div.anime_info_body_bg h1').text().trim()
  

   
   const type = $('div.anime_info_body_bg :nth-child(4) > :nth-child(2)').text().trim()
   const desc = $('div.anime_info_body_bg :nth-child(5)').text().trim()

   const genres = []
   $('div.anime_info_body_bg :nth-child(6)').children().each((i, item) => {
    const $item = $(item)

    if ($item.attr('title')) {
        const genre = $item.attr('title')
        genres.push(genre)
    }
   })

   const date = $('div.anime_info_body_bg :nth-child(7)').text().trim()
   const status = $('div.anime_info_body_bg :nth-child(8)').text().trim()
   const others = $('div.anime_info_body_bg :nth-child(9)').text().trim()

   
   
   
   
   


   
  


        const tag = {
            href,
         image,
         name,
         type,
         desc,
         genres,
         status,
         others
        }
    tags.push(tag);


    movieCache[href] = tags;
    console.log(tags)
    return tags

}

module.exports = {
    getMovies,
    getTags
};
//getMovies('naruto')
//getTags('/category/naruto')
