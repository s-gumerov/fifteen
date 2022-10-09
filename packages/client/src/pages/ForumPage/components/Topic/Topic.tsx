import styles from "./styles.module.scss";
import commentSvg from '../../../../assets/icons/comment.svg';
import { Link } from 'react-router-dom';
import { ROUTES } from "../../../../router/types";
import { ITopicProps } from "./types";

export const Topic = (
  {
    id,
    title,
    description,
    comments_count,
    date,
    owner,
    last_message
  }: ITopicProps
): JSX.Element => {

  return (
    <div className={styles.container} id={id}>

      <div className={styles.topic}>

        <Link to={`${ROUTES.FORUM}/:${id}`} className={styles.topic__title}>
          {title}
        </Link>

        <div className={styles.topic__description}>
          {description}
        </div>

        <div className={styles.info}>

          <span className={styles.info__commentsCount}>
            <img src={commentSvg} alt="commentsCount" />
            {comments_count}
          </span>

          <span className={styles.date}>
            {date}
          </span>
          <span className={styles.info__text}>
            от
          </span>
          <span className={styles.username}>
            {owner}
          </span>

        </div>

      </div>

      <div className={styles.topic__border} />

      <div className={styles.topic__lastMessage}>

        <span className={styles.username}>
          {last_message.author}
        </span>

        <span className={styles.date}>
          {last_message.date}
        </span>

      </div>

    </div>
  );
}
