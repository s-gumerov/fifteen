import { Dispatch, SetStateAction } from 'react'

export type AddTopicFormProps = {
  closeForm: () => void
  setTopicLength: Dispatch<SetStateAction<number>>
  setForumPage: Dispatch<SetStateAction<number>>
}
