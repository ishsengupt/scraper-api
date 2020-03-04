const fetch = require('node-fetch');
const cheerio = require('cheerio');

const movieCache = {};
const searchCache = {};

async function getMovies(index) {
  
    const url = `https://www.primewire.li/?page=${index}&s=the+bridge`;
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body)
    const titles = []
    //const promises = [];

    $('div.index_container div.index_item.index_item_ie').each((i, item) => {
        const $item = $(item)

        const href = $item.find('a').attr('href');
        const link = `https://www.primewire.li${href}`
        const image = $item.find('img').attr('src');
        const image_link = `https://www.primewire.li${image}`
        const titletext = $item.find('a').attr('title');
        const regex = /(?<=\/)[0-9]*(?=\-)/g
        const id = $item.find('a').attr('href').match(regex)
        

        const genretext = $item.find('div.item_categories a').text().match(/[A-Z][a-z]+/g);
        //console.log(genretext)
            


        const title = {
            id,
            link,
            image_link,
            titletext,
            genretext,
            href,

         
        };

       
            titles.push(title);
        
    });


    console.log(titles)
    return titles

}

async function getTags(href) {

 
    const url = `https://www.primewire.li${href}`
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);
    const tags = []

   const desc = $('meta[property="og:description"]').attr("content")
   const title = $('title').text().trim()
   const keyword = $('meta[name="keywords"]').attr("content")
   const image = $('meta[itemprop="image"]').attr("content")
   const imagelink = `https://www.primewire.li${image}`
   const site =  $('meta[property="og:site_name"]').attr("content")
   const type =  $('meta[property="og:type"]').attr("content")
   const rating = $('div.movie_info tr td strong span' ).text()

   
   const date = $('div.movie_info tbody > :nth-child(3) > :nth-child(2)').text().trim()
   const runtime = $('div.movie_info tbody > :nth-child(4) > :nth-child(2)').text().trim()
   const genres = $('div.movie_info tbody > :nth-child(5) > :nth-child(2)').text().replace(/^\s+|\s+$/gm,'').split("\n")
   const name = $('div.movie_info tbody > :nth-child(6) > :nth-child(2)').text().trim()
   const country = $('div.movie_info tbody > :nth-child(7) > :nth-child(2)').text().trim()
   const companies = $('div.movie_info tbody > :nth-child(8) > :nth-child(2)').text().trim()


   
  


        const tag = {
         desc,
         rating,
         title,
         imagelink,
         keyword,
         type,
         site,
         companies,
         country,
         name,
         genres,
         runtime,
         date,
         


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

//getTags('/tv/1329958-watch-fairy-gone')
