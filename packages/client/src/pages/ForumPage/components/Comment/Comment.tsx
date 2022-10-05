import styles from "./styles.module.scss";
import Avatar from '@mui/material/Avatar';
import { CommentProps } from './types';

export const Comment = ({ id, username, avatar, date, message }: CommentProps): JSX.Element => {
    return (
        <>
            <div className={styles.comment__line} />

            <div className={styles.comment} id={id}>
                <Avatar
                    alt={username}
                    src={avatar}
                    variant="square"
                    sx={{ width: 75, height: 75 }}
                />
                <div className={styles.comment__box}>
                    <div className={styles.box__title}>
                        <span className={styles.username}>
                            {username}
                        </span>

                        <span className={styles.date}>
                            {date}
                        </span>
                    </div>
                    <div className={styles.box__message}>
                        {message}
                    </div>
                </div>
            </div >
        </>

    );
}
