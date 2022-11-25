/**
 * Создать ответ комментарий
 */
export namespace createThreadAnswer {
  /** APIURL */
  export const route = '/create-thread-answer'

  /** Параметры api запроса */
  export interface Request {
    authorId: number
    threadId: number
    text: string
  }

  /** Параметры api ответа */
  export interface Response {
    authorId: number
  }
}

/**
 * Получить список ответов комментарий
 */
export namespace getAnswersByThread {
  /** APIURL */
  export const route = '/get-answers-by-thread'

  /** Параметры api запроса */
  export interface Request {
    thread: number //Комменатрий, к которому относятся ответы
    quantity: number //Количество ответов
    start: number //Номер первого ответа (отсортированы по created_at)
  }

  /** Параметры api ответа */
  export interface Response {
    threads: {
      authorId: number
      text: string
      createdAt: string
    }[]
  }
}

/**
 * Получить ответ на комментарий
 */
export namespace getThreadAnswer {
  /** APIURL */
  export const route = '/get-thread-answer'

  /** Параметры api запроса */
  export interface Request {
    id: number
    threadId: number
  }

  /** Параметры api ответа */
  export interface Response {
    authorId: number
    text: string
    createdAt: string
  }
}
