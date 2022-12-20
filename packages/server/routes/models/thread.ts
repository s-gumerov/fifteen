/**
 * Создать комментарий в теме
 */
export namespace createThread {
  /** APIURL */
  export const route = '/create-thread'

  /** Параметры api запроса */
  export interface Request {
    authorId: number
    login: string
    avatarUrl: string
    topicId: number
    text: string
  }

  /** Параметры api ответа */
  export interface Response {
    id: number
  }
}

/**
 * Получить список комментариев в теме
 */
export namespace getThreadsByTopic {
  /** APIURL */
  export const route = '/get-thread-by-topic'

  /** Параметры api запроса */
  export interface Request {
    topic: number //Тема для которой нужны комментарии
    quantity: number //Количество комментариев
    start: number //Номер первого комментария (отсортированы по created_at)
  }

  /** Параметры api ответа */
  export interface Response {
    threads: {
      authorId: number
      login: string
      avatarUrl: string
      text: string
      createdAt: string
    }[]
  }
}

/**
 * Получить комментарий
 */
export namespace getThread {
  /** APIURL */
  export const route = '/get-thread'

  /** Параметры api запроса */
  export interface Request {
    id: number
    topicId: number
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
