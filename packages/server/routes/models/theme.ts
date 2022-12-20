export enum ENDPOINT {
  CREATE_THEME = '/user/create-theme',
  GET_THEME = '/user/get-theme',
  CHANGE_THEME = '/user/change-theme',
}

export type TTheme = 'darkTheme' | 'pinkTheme'

export type TThemeState = {
  theme: TTheme
  error: string | null
  status: 'INIT' | 'FETCHING' | 'FETCH_FULFILLED' | 'FETCH_FAILED' | null
}

/**
 * Получить пользовательскую тему
 */
export namespace getUserTheme {
  /** APIURL */
  export const route = ENDPOINT.GET_THEME

  /** Параметры api запроса */
  export interface Request {
    id: number
  }

  /** Параметры api ответа */
  export interface Response {
    id: number
    theme_name: TTheme
  }
}

/**
 * Изменить пользовательскую тему
 */

export namespace changeUserTheme {
  export const route = ENDPOINT.CHANGE_THEME

  /** Параметры api запроса */
  export interface Request {
    id: number
    theme_name: TTheme
  }

  /** Параметры api ответа */
  export interface Response {
    id: number
    theme_name: TTheme
  }
}
