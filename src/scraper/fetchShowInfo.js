const axios = require('axios');
const cheerio = require('cheerio');
const { BASE_SHOW_LINK } = require('../data/constants');

const fetchShowInfo = async (showSlug) => {
    const {data} = await axios(`${BASE_SHOW_LINK}${showSlug}`);
    const $ = cheerio.load(data);

    const poster = $('div.Details.clearfix > div.Left > div.field.field-name-field-image.field-type-image.field-label-hidden > div > div > img').attr('src');
    const name = $('div.Details.clearfix > div.Right > h1').text().replace('Filler List', '').trim(0);
    const description = $('div.Details.clearfix > div.Right > div.Description > div > div > div > p').text();
    const fillerInfo = $('div.Details.clearfix > div.Right > div.Description > p').text();
    const lastUpdated = $('div.Details.clearfix > div.Right > div.Date').text().replace('Updated on', '').trim();

    const episodeData = [];
    
    const episodeTable = $('div.CopyProtected > table > tbody > tr');
    episodeTable.map((i, e) => {
        episodeData.push({
            episode: Number($(e).find('td.Number').text()),
            title: $(e).find('td.Title > a').text(),
            type: $(e).find('td.Type > span').text(),
            aired: $(e).find('td.Date').text()
        });
    });

    const fillerEpisodes = episodeData.filter((e) => e.type === 'Filler').map((e) => e.episode);
    const cannonEpisodes = episodeData.filter((e) => e.type === 'Manga Canon').map((e) => e.episode);
    const mixedEpisodes = episodeData.filter((e) => e.type === 'Mixed Canon/Filler').map((e) => e.episode);

    return {
        name,
        description,
        poster,
        fillerInfo,
        lastUpdated,        
        episodes: episodeData,
        cannonEpisodes,
        fillerEpisodes,
        mixedEpisodes
    };
};

module.exports = fetchShowInfo;