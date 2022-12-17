import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Pagination } from '@mui/material'
import styles from './styles.module.scss'
import { Topic } from './components/Topic/Topic'
import { AddTopicForm } from './components/AddTopicForm/AddTopicForm'
import { useAppSelector } from '../../hooks/useAppDispatch'

import { getTopics } from '../../store/forum/forumSlice'

import { ForumPageProps } from './types'

export const ForumPage = ({
  forumPage,
  setForumPage,
}: ForumPageProps): JSX.Element => {
  const { forum } = useAppSelector(state => state.forum)
  const [showAddTopicForm, setShowAddTopicForm] = useState(false)
  const [topicLength, setTopicLength] = useState(1)
  const [rowsPerPage] = useState(3)

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setForumPage(newPage)
  }

  useEffect(() => {
    getTopics().then(res => setTopicLength(res.length))
  }, [forum])

  const topics = forum?.map(forum => <Topic key={forum.id} {...forum} />)
  const closeForm = () => {
    setShowAddTopicForm(false)
    setForumPage(1)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.forum}>
        <h1 className={styles.forum__title}>Форум</h1>
        <Button
          variant="outlined"
          size="large"
          sx={{ mt: 4, mb: 2, width: '290px', color: '#ffffff' }}
          onClick={() => setShowAddTopicForm(true)}>
          СОЗДАТЬ ТЕМУ
        </Button>

        <div className={styles.forum__content}>
          <div className={styles.forum__topics}>
            <div className={styles.forum__header}>
              <span className={`${styles.forum__text} ${styles.topicText}`}>
                Тема
              </span>

              <span className={`${styles.forum__text} ${styles.lastMsgText}`}>
                Последнее сообщение
              </span>
            </div>
            <div className={styles.forum__content}>{topics}</div>
          </div>
        </div>
        <div className={styles.forum__pagination}>
          <Pagination
            className={styles.MuiPagination__root}
            variant="outlined"
            shape="rounded"
            color="primary"
            count={forum ? Math.ceil(topicLength / rowsPerPage) : undefined}
            page={forumPage}
            onChange={handleChangePage}
          />
        </div>
      </div>
      {showAddTopicForm && (
        <AddTopicForm
          closeForm={closeForm}
          setTopicLength={setTopicLength}
          setForumPage={setForumPage}
        />
      )}
    </div>
  )
}
