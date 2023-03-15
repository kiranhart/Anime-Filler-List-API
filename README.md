<center>

![filler list logo](https://www.animefillerlist.com/sites/all/themes/afl/i/logo.png)
# Unofficial API

I was bored so I decided to make this, it's essentially just a scraper that can gather all anime listed on anime-filler-list as well as get individual show information. Feel free to open a pull request if you have something to improve. 

## **How To Install**
<br>

### Npm
`` npm install anime-filler-api ``

### Pnpm
`` pnpm add anime-filler-api ``

### yarn
`` yarn add anime-filler-api ``

<br>

## **Using the Filer API?**
DM on Discord or open a pull request and I'll include a link to your project Github/Website

<br>

## **How to Use**
Firstly you'd want to import whatever methods you want to use. All the available methods are listed below 

</center>


```typescript
- async getShowSlugs()
- async getShowsByGroup(group: string)
- async getShowsByName(name: string)

- async getShowData(slug: string)
- async getEpisodesFor(slug: string)
- async getEpisodesByType(slug: string, epType: EpisodeType)
- async getEpisode(slug: string, epNumber: number)
- async searchEpisodes(lug: string, keyword: string)
- async getFirstEpisode(slug: string)
- async getLastEpisode(slug: string)
```

```typescript
import { getShowSlugs, getEpisode, getShowData, ...etc } from 'anime-filler-list';

const lookupShow = async (slug: string) => {
    const anime = await getShowData(slug);
    // do something
}
```

<center>

## **Type Information**

</center>

```typescript

export const EPISODE_TYPE = {
    MANGA_CANNON: 'MANGA_CANNON',
    ANIME_CANNON: 'ANIME_CANNON',
    MIXED_CANNON_FILLER: 'MIXED_CANNON_FILLER',
    FILLER: "FILLER",
    UNKNOWN: "UNKNOWN"
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
    poster: string;
    episodes: Episode[];
}

export type EpisodeType = ObjectValues<typeof EPISODE_TYPE>

export type Episode = {
    number: number;
    title: string;
    type: EpisodeType;
    date: string;
}
```

#### Contact Me
- [Instagram](https://instagram.com/kiranhart)
- [Twitter](https://twitter.com/kiranshart)
- Discord: Kiran#0002
- Email: kiran.hart@live.com

