import { describe, expect, it } from 'vitest';
import { getFirstEpisode, getEpisode, getEpisodesByType } from './filler-api';
import { EPISODE_TYPE } from './util/scraper';


describe('one-piece-ep-1-title', () => {
    it('Should return I\'m Luffy! The Man Who\'s Gonna Be King of the Pirates!', async () => {
        const episode = await getFirstEpisode('one-piece');
        expect(episode.title).toBe('I\'m Luffy! The Man Who\'s Gonna Be King of the Pirates!')
    })
})

describe('made-in-abyss episode 9', () => {
    it('Should get the correct episode title', async () => {
        const episode = await getEpisode('made-abyss', 9);
        expect(episode.title).toBe('The Great Fault')
    })
})

describe('made-in-abyss manga cannon', () => {
    it('Should get the correct manga cannon count', async () => {
        const episodes = await getEpisodesByType('made-abyss', EPISODE_TYPE.MANGA_CANNON);
        expect(episodes.length).toBe(11)
    })
})