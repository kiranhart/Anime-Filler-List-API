import { Anime, AnimePageLink, Episode, EpisodeType, getAllShowSlugs, getShowInfo } from "./util/scraper";
import { z } from 'zod'

export const getShowSlugs = (): Promise<AnimePageLink[]> => {
    return getAllShowSlugs();
}

export const getShowsByGroup = async (group: string): Promise<AnimePageLink[]>  => {
    const shows = await getAllShowSlugs();
    return shows.filter(show => show.group.toLowerCase() === group);
}

export const getShowsByName = async (name: string): Promise<AnimePageLink[]>  => {
    const shows = await getAllShowSlugs();
    return shows.filter(show => show.name.toLowerCase().includes(name.toLowerCase()));
}

// ================== actual anime info stuff ==================

export const getShowData = async(slug: string): Promise<Anime> => {
    return getShowInfo(slug);
}

export const getEpisodesFor = async (slug: string): Promise<Episode[]> => {
    const info = await getShowData(slug);
    return info.episodes;
}

export const getEpisodesByType = async(slug: string, epType: EpisodeType): Promise<Episode[]> => {
    const { episodes } = await getShowData(slug);
    return episodes?.filter(episode => episode.type === epType);
}

export const getEpisode = async(slug: string, epNumber: number): Promise<Episode> => {
    const { episodes } = await getShowData(slug);

    if (epNumber < 0 && episodes?.length >= 1) {
        return episodes[0];
    }

    if (epNumber > episodes?.length) {
        return episodes[episodes?.length - 1];
    }

    return episodes?.filter(episode => episode.number === epNumber);
}

export const searchEpisodes = async(slug: string, keyword: string): Promise<Episode> => {
    const { episodes } = await getShowData(slug);
    return episodes?.filter(episode => episode.title.toLowerCase().includes(keyword.toLowerCase()));
}

export const getFirstEpisode = async(slug: string): Promise<Episode> => {
    const { episodes } = await getShowData(slug);
    return episodes[0];
}

export const getLastEpisode = async(slug: string): Promise<Episode> => {
    const { episodes } = await getShowData(slug);
    return episodes[episodes?.length - 1];
}