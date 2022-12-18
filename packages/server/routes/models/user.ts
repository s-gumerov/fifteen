/**
 * Занести пользователя в БД
 */
export namespace setNewUser {
  /** APIURL */
  export const route = '/set-new-user'

  /** Параметры api запроса */
  export interface Request {
    id: number
    login: string
    avatarUrl: string
  }

  /** Параметры api ответа */
  export interface Response {
    userId: number
  }
}

/**
 * Получить пользователя по id
 */
export namespace getUser {
  /** APIURL */
  export const route = '/get-user'

  /** Параметры api запроса */
  export interface Request {
    id: number
  }

  /** Параметры api ответа */
  export interface Response {
    login: string
    avatarUrl: string
  }
}
