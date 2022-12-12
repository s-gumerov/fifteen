import React from 'react'
import { MouseEvent, FormEvent } from 'react'
import styles from './styles.module.scss'
import { Button } from '@mui/material'
import { TextFieldMultiline } from '../../../../components/ui/TextFieldMultiline'
import { AddTopicFormProps } from './types'
import {useAppSelector} from '../../../../hooks/useAppDispatch';

export const AddTopicForm = ({ closeForm }: AddTopicFormProps): JSX.Element => {
  const {theme} = useAppSelector(state => state.theme)
  const themeColor = theme === 'darkTheme' ? '#4044ed' : '#ED40DC'
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const { topic_name, topic_description } = e.target as HTMLFormElement
    const data = {
      topic_name: topic_name.value,
      topic_description: topic_description.value,
    }
    console.log(data)
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
          sx={{ mt: 5, mb: 2, width: '80%', borderColor: themeColor, color:themeColor}}>
          Сохранить
        </Button>
      </form>
    </div>
  )
}
