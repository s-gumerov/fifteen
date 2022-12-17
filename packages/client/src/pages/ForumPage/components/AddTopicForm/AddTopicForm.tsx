import React from 'react'
import { MouseEvent, FormEvent } from 'react'
import styles from './styles.module.scss'
import { Button } from '@mui/material'
import { TextFieldMultiline } from '../../../../components/ui/TextFieldMultiline'
import { AddTopicFormProps } from './types'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/useAppDispatch'
import {
  createComment,
  createTopic,
  getTopics,
  getTopicsWithThreads,
} from '../../../../store/forum/forumSlice'
import { topicQuantityToPage } from '../../const'
import { getStartIndex } from '../../../../utils'

export const AddTopicForm = ({
  closeForm,
  setTopicLength,
  setForumPage,
}: AddTopicFormProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.user)
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const { topic_name, topic_description } = e.target as HTMLFormElement
    if (topic_name.value === '' || topic_description.value === '') return
    const data = {
      topic_name: topic_name.value,
      topic_description: topic_description.value,
    }
    createTopic({
      authorId: user!.id!,
      login: user!.login,
      avatarUrl: user!.avatar!,
      text: data.topic_name,
    })
      .then(res => {
        createComment({
          authorId: user!.id!,
          login: user!.login,
          avatarUrl: user!.avatar!,
          topicId: res.id,
          text: data.topic_description,
        })
        getTopics().then(res => {
          setTopicLength(res.length)
        })
      })
      .then(() => {
        const firstPage = 1
        dispatch(
          getTopicsWithThreads({
            quantity: topicQuantityToPage * firstPage,
            start: getStartIndex(firstPage),
          })
        )
        setForumPage(firstPage)
      })
    closeForm()
  }

  return (
    <div
      className={styles.wrapper}
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          /* закрываем модальное окно если клик не по форме */
          closeForm()
        }
      }}>
      <form className={styles.form} onSubmit={submitHandler}>
        <h3 className={styles.form__title}>СОЗДАТЬ ТЕМУ</h3>
        <div className={styles.form__line} />

        <TextFieldMultiline
          label="Название топика"
          rows={1}
          id="topic_name"
          name="topic_name"
        />
        <TextFieldMultiline
          label="Описание"
          rows={10}
          id="topic_description"
          name="topic_description"
        />

        <Button
          type="submit"
          variant="outlined"
          size="large"
          sx={{ mt: 5, mb: 2, width: '80%' }}>
          Сохранить
        </Button>
      </form>
    </div>
  )
}
