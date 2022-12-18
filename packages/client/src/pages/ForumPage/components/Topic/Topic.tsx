import React from 'react'
import styles from './styles.module.scss'
import commentSvg from '../../../../assets/icons/comment.svg'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { ROUTES } from '../../../../router/types'
import { TTopic } from '../../../../store/forum/types'

export const Topic = ({
  id,
  login,
  text,
  createdAt,
  comments,
}: TTopic): JSX.Element => {
  return (
    <div className={styles.container} id={id.toString()}>
      <div className={styles.topic}>
        <Link to={`${ROUTES.FORUM}/${id}`} className={styles.topic__title}>
          {text}
        </Link>

        <div className={styles.topic__description}>
          {comments?.length ? comments[0].text : 'Здесь будет первое сообщение'}
        </div>

        <div className={styles.info}>
          <span className={styles.info__commentsCount}>
            <img src={commentSvg} alt="commentsCount" />
            {comments?.length || 0}
          </span>

          <span className={styles.date}>
            {moment(createdAt).format('MMMM Do YYYY')}
          </span>
          <span className={styles.info__text}>от</span>
          <span className={styles.username}>{login}</span>
        </div>
      </div>

      <div className={styles.topic__border} />

      <div className={styles.topic__lastMessage}>
        <span className={styles.username}>
          {comments?.length ? comments[comments.length - 1].login : ''}
        </span>

        <span className={styles.date}>
          {comments?.length
            ? moment(comments[comments.length - 1].createdAt).format(
                'MMMM Do YY'
              )
            : ''}
        </span>
      </div>
    </div>
  )
}
