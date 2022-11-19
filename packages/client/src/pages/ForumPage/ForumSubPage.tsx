import { KeyboardEvent } from 'react'
import Avatar from '@mui/material/Avatar'
import styles from './styles.module.scss'
import { Comment } from './components/Comment/Comment'

export const ForumSubPage = (): JSX.Element => {
  const topicInfo = {
    id: '1',
    topic_name: 'Заметки стримерам',
    description:
      'Правила стримеру: 1. Ответственность за контент несет стример. Аккуратно выбирайто то что стриммите 2. Рекомендуется проводить стрими на игровую тематику, в случае большой доли Аккуратно выбирайто то что стриммите 2. Рекомендуется проводить стрими на игровую тематику, в случае большой доли',
    info: {
      avatar:
        'https://static.1tv.ru/uploads/photo/image/2/huge/4062_huge_876c41f50e.jpg',
      owner: 'Super_man',
      date: '01 января 2022 в 10:10',
      comments_count: 1520,
    },
  }

  const topicComments = [
    {
      id: '1',
      username: 'Super_man',
      avatar: 'https://s1.1zoom.ru/big3/888/Eyes_Owls_Bubo_502568.jpg',
      date: '01 января 2022 в 10:10',
      message:
        'Авата́р, авата́ра (просторечн. авата́рка, а́ва, ава́, от англ. avatar), а также юзерпик (англ. userpic, сокр. от англ. users picture — «картинка пользователя»)— графическое представление пользователя, его альтер-эго, игрового интернет-персонажа. Аватар может быть',
    },
    {
      id: '2',
      username: 'Super_man',
      avatar: 'https://s1.1zoom.ru/big3/888/Eyes_Owls_Bubo_502568.jpg',
      date: '01 января 2022 в 10:10',
      message:
        'Авата́р, авата́ра (просторечн. авата́рка, а́ва, ава́, от англ. avatar), а также юзерпик (англ. userpic, сокр. от англ. users picture — «картинка пользователя»)— графическое представление пользователя, его альтер-эго, игрового интернет-персонажа. Аватар может быть',
    },
    {
      id: '3',
      username: 'Super_man',
      avatar: 'https://s1.1zoom.ru/big3/888/Eyes_Owls_Bubo_502568.jpg',
      date: '01 января 2022 в 10:10',
      message:
        'Авата́р, авата́ра (просторечн. авата́рка, а́ва, ава́, от англ. avatar), а также юзерпик (англ. userpic, сокр. от англ. users picture — «картинка пользователя»)— графическое представление пользователя, его альтер-эго, игрового интернет-персонажа. Аватар может быть',
    },
  ]

  const comments = topicComments.map(comment => (
    <Comment key={comment.id} {...comment} />
  ))

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      const message = e.currentTarget.value
      e.currentTarget.value = ''
      console.log(message)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.forumSubPage}>
        <h1 className={styles.forum__title}>
          Форум {'> '}
          <span className={styles.forumSubPage__title_underline}>
            {topicInfo.topic_name}
          </span>
        </h1>

        <div className={styles.forumSubPage__topicDescription}>
          {topicInfo.description}
        </div>

        <div className={styles.info}>
          <Avatar
            alt={topicInfo.info.owner}
            src={topicInfo.info.avatar}
            variant="square"
            sx={{ width: 55, height: 55 }}
          />
          <div className={styles.info__owner}>
            <span className={styles.username}>{topicInfo.info.owner}</span>

            <span className={styles.date}>{topicInfo.info.date}</span>
          </div>
        </div>

        <div className={styles.forumSubPage__line} />

        <div className={styles.comments}>
          <div className={styles.comments__header}>
            <span className={styles.msgCount}>
              {topicInfo.info.comments_count} КОММЕНТАРИЕВ
            </span>
          </div>

          {comments}
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
