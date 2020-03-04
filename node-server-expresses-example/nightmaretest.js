const express = require('express');
const cors = require('cors')


const Nightmare = require('nightmare');
const vo = require('vo');
const checks = require('./checks');

vo(run('monster'))(function(err, result){
if(err) throw err;
});

function* run(searchTerm){
const nightmare = Nightmare({
show: true,

});

var hidenExists = true;

yield nightmare
    .goto(`https://www.crunchyroll.com/search?from=search&q=${searchTerm}`)
    .wait('body')

hidenExists = yield nightmare.visible('div#main_results_paginator > a[title="Next"]');
count = 1;
while(hidenExists && count < 3){
    yield nightmare.click('div#main_results_paginator > a[title="Next"]');
    yield nightmare.wait(200);
    checks.getMovies(searchTerm).then(movies => {
        res.json(movies)
        console.log(movies)
    })
    count = count + 1
    hidenExists = yield nightmare.visible('div#main_results_paginator > a[title="Next"]');
}

console.log('finish');
}



module.exports = {
    run
};

//run('naruto')