const fetch = require('node-fetch');
const cheerio = require('cheerio');

const movieCache = {};
const searchCache = {};

async function getMovies(search) {

    const url = `https://www.crunchyroll.com/search?from=&q=${search}`;
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body)
    const titles = []
    //const promises = [];

    const sitename = $('meta[property="og:site_name"]').attr('content')

    $('li a.clearfix').each((i, item) => {
        const $item = $(item)



        const href = $item.attr('href').replace("/","")


        

       const image = $item.find('td span.mug img').attr('src');

       const type = $item.find('span.type').text().trim();

        const id = $item.find('span.name').clone().children().remove().end().text().trim().toLowerCase().replace(/ +/g, "");

        const name = $item.find('span.name').clone().children().remove().end().text().trim();

        //const desc = $item.find('span.desc').text().trim();

        platform = []
        platform.push('CrunchyRoll')

        const site = {
            [sitename] : `https://www.crunchyroll.com/${href}`
        }

        const title = {
            name,
            //desc,
            id,
            image,
            href,
            //platform,
            site
            //type,
            //logolink
        };

        if(type == '(Series)' && !href.includes("library/")) {
            titles.push(title);
        };
    });


    //console.log(titles)
    return titles

}



async function getTags(href) {

    




    const url = `https://www.crunchyroll.com/${href}`
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);

    const promises = [];

    const desc = $('meta[name="description"]').attr('content');
    
    const rating = $('span#showview_about_rate_widget').attr('content')
    
    const image = $('img.xsmall-margin-bottom').attr('src')

    const name  = $('div#showview-content-header span').text()
 

    
    
    
 /*    const genres = []
    $('li.large-margin-bottom a').each((i, item) => {
        const $item = $(item)
        if($item.attr('href').includes("/videos/") || $item.attr('href').includes("/showtag"))  {

        const hrefs = $item.attr('href')

        const pick = $item.text()
        genre = {
            pick,
            hrefs
            }
    
        genres.push(genre)
        }
    }) */

    const tags = {
      //  id,
      name,
 
        href,
        desc,
        rating : `${rating}/5`,
       // genres,
        image

    }


    //console.log(tags)
    return tags

}

module.exports = {
    getMovies,
    getTags
};

//getAux('naruto')

//getMovies('naruto')