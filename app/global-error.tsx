'use client';
import styles from '@/styles/Error.module.scss';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className={styles.container}>
          <div className={styles.icon}>⚠️</div>
          <h2 className={styles.title}>Something went wrong!</h2>
          <p className={styles.description}>
            A critical error occurred. Please try refreshing the page.
          </p>
          <button className={styles.button} onClick={() => reset()}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}