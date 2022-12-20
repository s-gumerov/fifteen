import React from 'react'
import styles from './styles.module.scss'
import Avatar from '@mui/material/Avatar'
import { TThread } from '../../../../store/forum/types'
import moment from 'moment'

export const Comment = ({
  id,
  login,
  avatarUrl,
  text,
  createdAt,
}: TThread): JSX.Element => {
  return (
    <>
      <div className={styles.comment__line} />

      <div className={styles.comment} id={id.toString()}>
        <Avatar
          alt={login}
          src={avatarUrl}
          variant="square"
          sx={{ width: 75, height: 75 }}
        />
        <div className={styles.box}>
          <div className={styles.box__title}>
            <span className={styles.username}>{login}</span>

            <span className={styles.date}>
              {moment(createdAt).format('MMMM Do YYYY')}
            </span>
          </div>
          <div className={styles.box__message}>{text}</div>
        </div>
      </div>
    </>
  )
}
