export type ITopicProps = {
  id: string
  title: string
  description: string
  comments_count: number
  date: string
  owner: string
  last_message: {
    login: string
    date: string
  }
}
