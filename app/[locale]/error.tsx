'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import styles from '@/styles/Error.module.scss';
import Button from '@/components/common/Button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const t = useTranslations('common');

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className={styles.container}>
            <div className={styles.icon}>⚠️</div>
            <h2 className={styles.title}>
                {t('somethingWentWrong') || 'Something went wrong!'}
            </h2>
            <p className={styles.description}>
                {t('errorDescription') || 'We apologize for the inconvenience. An unexpected error has occurred.'}
            </p>
            <Button
                onClick={reset}
                variant="primary"
            >
                {t('tryAgain') || 'Try again'}
            </Button>
        </div>
    );
}
