import React, { ChangeEvent, useEffect, useState } from 'react'
import { KeyboardEvent } from 'react'
import Avatar from '@mui/material/Avatar'
import styles from './styles.module.scss'
import { Comment } from './components/Comment/Comment'
import { useAppSelector } from '../../hooks/useAppDispatch'
import { getPartComments, getTopicId } from '../../utils'
import { TThread, TTopic } from '../../store/forum/types'
import {
  createComment,
  getThreadById,
  getTopicById,
  getTopicThreads,
} from '../../store/forum/forumSlice'
import { Pagination } from '@mui/material'
import moment from 'moment'

export const ForumSubPage = (): JSX.Element => {
  const { user } = useAppSelector(state => state.user)
  const [topic, setTopic] = useState<TTopic | null>(null)
  const [comments, setComments] = useState<TThread[]>([])
  const [renderComments, setRenderComments] = useState<TThread[]>([])
  const [page, setPage] = useState(1)
  const [rowsPerPage] = useState(3)

  useEffect(() => {
    getTopicThreads({ topic: getTopicId() }).then(res => {
      setComments(res)
    })
    getTopicById({ id: getTopicId() }).then(res => setTopic(res))
    const lastPage = Math.ceil(comments.length / rowsPerPage)
    setRenderComments(getPartComments(comments, lastPage))
  }, [comments.length])

  const commentsToRender = renderComments?.map((comment: TThread) => (
    <Comment key={comment.id} {...comment} />
  ))

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      const message = e.currentTarget.value
      if (message === '' || message.length > 250) return
      e.currentTarget.value = ''
      createComment({
        authorId: user!.id!,
        login: user!.login,
        avatarUrl: user!.avatar!,
        topicId: getTopicId(),
        text: message,
      })
        .then(res => {
          return getThreadById({ id: res.id, topicId: getTopicId() })
        })
        .then(res => {
          setComments(oldComments => [...oldComments, res])
        })
    }
  }

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage)
    setRenderComments(getPartComments(comments, newPage))
    console.log(renderComments)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.forumSubPage}>
        <h1 className={styles.forum__title}>
          Форум {'> '}
          <span className={styles.forumSubPage__title_underline}>
            {topic?.text}
          </span>
        </h1>

        <div className={styles.forumSubPage__topicDescription}></div>

        <div className={styles.info}>
          <Avatar
            alt={topic?.login}
            src={topic?.avatarUrl}
            variant="square"
            sx={{ width: 55, height: 55 }}
          />
          <div className={styles.info__owner}>
            <span className={styles.username}>Created by {topic?.login}</span>

            <span className={styles.date}>
              at {moment(topic?.createdAt).format('MMMM Do YYYY')}
            </span>
          </div>
        </div>

        <div className={styles.forumSubPage__line} />

        <div className={styles.comments}>
          <div className={styles.comments__header}>
            <span className={styles.msgCount}>
              {comments.length} КОММЕНТАРИЕВ
            </span>
          </div>
          {commentsToRender}
        </div>
        <div className={styles.forum__pagination}>
          <Pagination
            className={styles.MuiPagination__root}
            variant="outlined"
            shape="rounded"
            color="primary"
            count={
              comments ? Math.ceil(comments.length / rowsPerPage) : undefined
            }
            page={page}
            onChange={handleChangePage}
          />
        </div>
        <input
          type="text"
          id="forum_subPage_input"
          name="forum_subPage_input"
          className={styles.forumSubPage__inputMsg}
          placeholder="Введите комментарий"
          onKeyUp={onKeyUpHandler}
        />
      </div>
    </div>
  )
}
