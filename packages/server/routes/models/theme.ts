/**
 * Получить тему
 */
export namespace getTheme {
  /** APIURL */
  export const route = '/get-theme'

  /** Параметры api запроса */
  export interface Request {
    themeName: string
  }

  /** Параметры api ответа */
  export interface Response {
    mainColor: string
    secondColor: string
  }
}
