'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from '@/styles/Error.module.scss';

export default function NotFound() {
    let t;
    try {
        t = useTranslations('common');
    } catch (e) {
        t = (key: string) => key === 'returnHome' ? 'Return to Home' : 'Page Not Found';
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Image
                    src="/assets/img/logo/accp_logo_main.png"
                    alt="Pris 2026"
                    width={200}
                    height={100}
                    priority
                />
            </div>

            <h1 className={`${styles.title} ${styles.huge}`}>
                404
            </h1>

            <h2 className={styles.title}>
                {t('pageNotFound') || 'Page Not Found'}
            </h2>

            <p className={styles.description}>
                {t('pageNotFoundDesc') || 'Sorry, the page you are looking for does not exist or has been moved.'}
            </p>

            <Link href="/" className={styles.button}>
                {t('returnHome')}
            </Link>
        </div>
    );
}
