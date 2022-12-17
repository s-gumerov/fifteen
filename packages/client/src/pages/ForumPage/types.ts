import { Dispatch, SetStateAction } from 'react'

export type ForumPageProps = {
  forumPage: number
  setForumPage: Dispatch<SetStateAction<number>>
}
