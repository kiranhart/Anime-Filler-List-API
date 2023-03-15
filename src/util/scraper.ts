import * as cheerio from 'cheerio'
import axios from 'axios';
import { z } from 'zod'
import { GENERATE_SHOW_URL, SHOWS_URL } from '../urls';

export const EPISODE_TYPE = {
    MANGA_CANNON: 'MANGA_CANNON',
    ANIME_CANNON: 'ANIME_CANNON',
    MIXED_CANNON_FILLER: 'MIXED_CANNON_FILLER',
    FILLER: "FILLER"
}

type ObjectValues<T> = T[keyof T];

export type AnimePageLink = { 
    name: string;
    slug: string;
    group: string;
}

export type Anime = {
    name: string;
    description: string;
    poster?: string;
    episodes?: Episode[];
}

export type EpisodeType = ObjectValues<typeof EPISODE_TYPE>

export type Episode = {
    number: number;
    title: string;
    type: EpisodeType;
    date: string;
}

const determineEpisodeType = (rawEpType: string): EpisodeType => {
    if (rawEpType === 'Filler') {
        return EPISODE_TYPE.FILLER;
    }

    if (rawEpType === 'Manga Canon') {
        return EPISODE_TYPE.MANGA_CANNON;
    }

    if (rawEpType === 'Anime Canon') {
        return EPISODE_TYPE.ANIME_CANNON;
    }

    if (rawEpType === 'Mixed Canon/Filler') {
        return EPISODE_TYPE.MIXED_CANNON_FILLER;
    }
}

export const getAllShowSlugs = async (): Promise<AnimePageLink[]> => {
    const {data} = await axios(SHOWS_URL);
    const $ = cheerio.load(data);

    const results: AnimePageLink[] = [];
    const showListContainer = $('#ShowList > .Group');

    showListContainer.map((i, e) => {
        const group = $(e).find('h2').text();
        // loop each group (ie. a, b, c, etc)
        $(e).find('li').map((i, e) => {
            const showInfo: AnimePageLink = {
                name: $(e).find('a').text(),
                slug: $(e).find('a').attr('href').replace('/shows/', ''),
                group
            }

            results.push(showInfo);
        })
    });
    return results;
}

export const getShowInfo = async (slug: string): Promise<Anime> => {
    const { data } = await axios(GENERATE_SHOW_URL(slug));
    const $ = cheerio.load(data);

    const name: string = $('div.Details.clearfix > div.Right > h1').text().replace('Filler List', '').trim(0);
    const description: string = $('div.Details.clearfix > div.Right > div.Description > div > div > div > p').text();
    const poster: string = $('div.Details.clearfix > div.Left > div.field.field-name-field-image.field-type-image.field-label-hidden > div > div > img').attr('src');

    const episodes: Episode[] = [];
    const episodeTable = $('div.CopyProtected > table > tbody > tr');

    episodeTable.map((i, e) => {
        const episode:Episode = {
            number: Number($(e).find('td.Number').text()),
            title: $(e).find('td.Title > a').text(),
            date: $(e).find('td.Date').text(),
            type: determineEpisodeType($(e).find('td.Type > span').text())
        }

        episodes.push(episode);
    });

    
    const animeInfo: Anime = {
        name,
        description,
        poster,
        episodes
    }

    return animeInfo;
}