var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/util/scraper.ts
import * as cheerio from "cheerio";
import axios from "axios";

// src/urls.ts
var BASE_URL = "https://www.animefillerlist.com";
var SHOWS_URL = `${BASE_URL}/shows`;
var GENERATE_SHOW_URL = (slug) => `${SHOWS_URL}/${slug}`;

// src/util/scraper.ts
var EPISODE_TYPE = {
  MANGA_CANNON: "MANGA_CANNON",
  ANIME_CANNON: "ANIME_CANNON",
  MIXED_CANNON_FILLER: "MIXED_CANNON_FILLER",
  FILLER: "FILLER"
};
var determineEpisodeType = (rawEpType) => {
  if (rawEpType === "Filler") {
    return EPISODE_TYPE.FILLER;
  }
  if (rawEpType === "Manga Canon") {
    return EPISODE_TYPE.MANGA_CANNON;
  }
  if (rawEpType === "Anime Canon") {
    return EPISODE_TYPE.ANIME_CANNON;
  }
  if (rawEpType === "Mixed Canon/Filler") {
    return EPISODE_TYPE.MIXED_CANNON_FILLER;
  }
};
var getShowInfo = (slug) => __async(void 0, null, function* () {
  const { data } = yield axios(GENERATE_SHOW_URL(slug));
  const $ = cheerio.load(data);
  const name = $("div.Details.clearfix > div.Right > h1").text().replace("Filler List", "").trim(0);
  const description = $("div.Details.clearfix > div.Right > div.Description > div > div > div > p").text();
  const poster = $("div.Details.clearfix > div.Left > div.field.field-name-field-image.field-type-image.field-label-hidden > div > div > img").attr("src");
  const episodes = [];
  const episodeTable = $("div.CopyProtected > table > tbody > tr");
  episodeTable.map((i, e) => {
    const episode = {
      number: Number($(e).find("td.Number").text()),
      title: $(e).find("td.Title > a").text(),
      date: $(e).find("td.Date").text(),
      type: determineEpisodeType($(e).find("td.Type > span").text())
    };
    episodes.push(episode);
  });
  const animeInfo = {
    name,
    description,
    poster,
    episodes
  };
  return animeInfo;
});

// src/filler-api.ts
var getShowData = (slug) => __async(void 0, null, function* () {
  return getShowInfo(slug);
});
var getFirstEpisode = (slug) => __async(void 0, null, function* () {
  const { episodes } = yield getShowData(slug);
  return episodes[0];
});
var getLastEpisode = (slug) => __async(void 0, null, function* () {
  const { episodes } = yield getShowData(slug);
  return episodes[(episodes == null ? void 0 : episodes.length) - 1];
});

// src/index.ts
var hello = () => __async(void 0, null, function* () {
  const firstEp = yield getFirstEpisode("one-piece");
  const lastEp = yield getLastEpisode("one-piece");
  console.log(firstEp, lastEp);
});
hello();
export {
  hello
};
