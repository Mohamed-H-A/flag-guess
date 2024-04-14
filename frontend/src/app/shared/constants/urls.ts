const BASE_URL = 'http://localhost:5000'

export const COUNTRIES_URL = BASE_URL + '/api/countries'
export const COUNTRIES_BY_SEARCH = COUNTRIES_URL + '/search/'
export const COUNTRIES_BY_ID = COUNTRIES_URL + '/'
export const COUNTRY_RANDOM = COUNTRIES_URL + '/random'

const USERS_URL = BASE_URL + '/api/users'
export const USER_LOGIN_URL = USERS_URL + '/login'
export const USER_REGISTER_URL = USERS_URL + '/register'

export const SCOREBOARD_URL = BASE_URL + '/api/scoreboard'
export const SCOREBOARD_NEWSCORE_URL = SCOREBOARD_URL + '/newscore'
