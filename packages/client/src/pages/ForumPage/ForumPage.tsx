import { useState } from 'react';
import { Button } from '@mui/material';
import styles from "./styles.module.scss";
import { Topic } from './components/Topic/Topic';
import { AddTopicForm } from './components/AddTopicForm/AddTopicForm';

export const ForumPage = (): JSX.Element => {
  const [showAddTopicForm, setShowAddTopicForm] = useState(false);

  const testData =
    [
      {
        id: '1',
        title: 'Заметки и правила стримерам',
        description: 'Правила стримеру: 1. Ответственность за контент несет стример. Аккуратно выбирайто то что стриммите 2. Рекомендуется проводить стрими на игровую тематику, в случае большой доли Аккуратно выбирайто то что стриммите 2. Рекомендуется проводить стрими на игровую тематику, в случае большой доли',
        comments_count: 1520,
        date: '01 января 2022 в 10:10',
        owner: 'Super_man',
        last_message:
        {
          author: 'Spider_man',
          date: '01 октября 2022 в 14:35',
        },
      },
      {
        id: '2',
        title: 'Заметки и правила стримерам',
        description: 'Правила стримеру: 1. Ответственность за контент несет стример. Аккуратно выбирайто то что стриммите 2. Рекомендуется проводить стрими на игровую тематику, в случае большой доли',
        comments_count: 1520,
        date: '01 января 2022 в 10:10',
        owner: 'Super_man',
        last_message:
        {
          author: 'Spider_man',
          date: '01 октября 2022 в 14:35',
        },
      },
      {
        id: '3',
        title: 'Заметки и правила стримерам',
        description: 'Правила стримеру: 1. Ответственность за контент несет стример. Аккуратно выбирайто то что стриммите 2. Рекомендуется проводить стрими на игровую тематику, в случае большой доли',
        comments_count: 1520,
        date: '01 января 2022 в 10:10',
        owner: 'Super_man',
        last_message:
        {
          author: 'Spider_man',
          date: '01 октября 2022 в 14:35',
        },
      }
    ];

  const topics = testData.map(topic => <Topic key={topic.id} {...topic} />)

  const closeForm = () => setShowAddTopicForm(false);



  return (
    <div className={styles.wrapper}>
      <div className={styles.forum}>
        <h1 className={styles.forum__title}>Форум</h1>
        <Button
          variant="outlined"
          size="large"
          sx={{ mt: 4, mb: 2, width: '290px', color: '#ffffff' }}
          onClick={() => setShowAddTopicForm(true)}
        >
          СОЗДАТЬ ТЕМУ
        </Button>

        <div className={styles.forum__form}>
          <div className={styles.form__topics}>

            <div className={styles.topics__header}>

              <span className={`${styles.header__text} ${styles.topicText}`}>
                Тема
              </span>

              <span className={`${styles.header__text} ${styles.lastMsgText}`}>
                Последнее сообщение
              </span>

            </div>

            <div className={styles.topics__content}>
              {topics}
            </div>

          </div>
        </div>
      </div>
      {showAddTopicForm && <AddTopicForm closeForm={closeForm} />}
    </div>
  );
}
