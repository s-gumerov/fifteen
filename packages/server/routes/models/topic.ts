/**
 * Создать тему на форуме
 */
export namespace createTopic {
  /** APIURL */
  export const route = '/create-topic'

  /** Параметры api запроса */
  export interface Request {
    authorId: number
    login: string
    avatarUrl: string
    text: string
  }

  /** Параметры api ответа */
  export interface Response {
    id: number
  }
}

/**
 * Получить список тем
 */
export namespace getTopics {
  /** APIURL */
  export const route = '/get-topics'

  /** Параметры api запроса */
  export interface Request {
    quantity: number //Количество топиков
    start: number //Номер первого топика (отсортированы по created_at)
  }

  /** Параметры api ответа */
  export interface Response {
    topics: {
      authorId: number
      login: string
      avatarUrl: string
      text: string
      createdAt: string
    }[]
  }
}

/**
 * Получить тему
 */
export namespace getTopic {
  /** APIURL */
  export const route = '/get-topic'

  /** Параметры api запроса */
  export interface Request {
    id: number
  }

  /** Параметры api ответа */
  export interface Response {
    authorId: number
    login: string
    avatarUrl: string
    text: string
    createdAt: string
  }
}
