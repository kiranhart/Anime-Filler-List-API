export const BASE_URL: string = 'https://www.animefillerlist.com';

export const SHOWS_URL: string = `${BASE_URL}/shows`

export const GENERATE_SHOW_URL = (slug: string) : string => `${SHOWS_URL}/${slug}`