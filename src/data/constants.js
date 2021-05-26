const PROJECT_NAME = 'Anime Filler List API';
const PROEJCT_VERSION = '1.0.0';
const PROJECT_AUTHOR = 'Kiran Hart';
const API_VERSION = 1;

const BASE_SCRAPE_LINK = 'https://www.animefillerlist.com';
const BASE_SHOW_LINK = 'https://www.animefillerlist.com/shows/';

const EP_TYPE_DICT = {
    'canon': 'Manga Canon',
    'filler': 'Filler',
    'mixed': 'Mixed Canon/Filler'
};

module.exports = {
    PROJECT_NAME,
    PROEJCT_VERSION,
    PROJECT_AUTHOR,
    API_VERSION,

    BASE_SCRAPE_LINK,
    BASE_SHOW_LINK,

    EP_TYPE_DICT
};