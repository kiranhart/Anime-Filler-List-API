const axios = require('axios');
const cheerio = require('cheerio');
const { BASE_SCRAPE_LINK } = require('../data/constants');

const fetchShowList = async() => {
    const {data} = await axios(`${BASE_SCRAPE_LINK}/shows`);
    const $ = cheerio.load(data);

    const results = [];

    const showListDiv = $('#ShowList > .Group');
    showListDiv.map((i, e) => {
        const group = $(e).find('h2').text();
        $(e).find('li').map((i, e) => {
            results.push({
                name: $(e).find('a').text(),
                slug: $(e).find('a').attr('href').replace('/shows/', ''),
                group
            });
        });
    });

    return results;
};

module.exports = fetchShowList;