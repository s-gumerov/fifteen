import React from 'react';
import styles from './styles.module.scss';
import { TErrorFallbackProps } from './types';

export const ErrorFallback = ({ error, resetErrorBoundary }: TErrorFallbackProps): JSX.Element => {
  return (
    <div role='alert' className={styles.errorFallback}>
      <div className={styles.box}>
        <p className={styles.box__title}>Произошла ошибка:</p>
        <span className={styles.box__message}>{error.message}</span>
        <button
          className={styles.box__resetBtn}
          onClick={resetErrorBoundary}
        >
          Вернуться и попробовать еще раз
        </button>
      </div>
    </div>
  );
};
