import React from 'react';
import styles from './styles.module.scss';

export const NotFoundPage = (): JSX.Element => (
  <div className={styles.notFoundPage}>
    <h1 className={styles.notFoundPage__title}>404</h1>
    <span className={styles.notFoundPage__message}>НЕ ТУДА ПОПАЛИ</span>
  </div>
);
