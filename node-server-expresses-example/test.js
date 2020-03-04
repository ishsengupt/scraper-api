const express = require('express');
const cors = require('cors')
const animekaiScraper = require('./animekai');

hrefs = "naruto-20/"

hrefsquad = []
animekaiScraper.getMovies('naruto').then(function(v) {
    let hrefcopy = [];
    var arrayLength = v.length;
    for (var i = 0; i < arrayLength; i++) {
        for (var j = 0; j < v[i].href.length ; j++) {
                //console.log(v[i].href[j])
                if (v[i].href[j].trim() === hrefs.trim()) {
                    console.log(v[i].href)
                    hrefsquad = v[i].href
                    console.log(hrefsquad)
                    return hrefsquad;
                    
                    
                    
                }
      
    }
}
    })

