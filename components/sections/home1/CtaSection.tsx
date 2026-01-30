'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './CtaSection.module.scss';

export default function CtaSection() {
    const t = useTranslations();

    return (
        <div className={`cta1-section-area ${styles.section}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        <div className={`cta1-main-boxarea ${styles.boxArea}`}>
                            {/* Title and Description */}
                            <h2 className={styles.title}>
                                {t('cta.readyToJoin')}
                            </h2>
                            <p className={styles.description}>
                                {t('cta.registerDescription')}
                            </p>

                            {/* Buttons */}
                            <div className={styles.buttonWrapper}>
                                <Link href="/registration" className={styles.primaryBtn}>
                                    {t('common.registerNow').toUpperCase()}
                                </Link>
                                <Link href="/call-for-abstracts" className={styles.secondaryBtn}>
                                    {t('common.submitAbstract').toUpperCase()}
                                </Link>
                            </div>

                            {/* Event Info */}
                            <div className={styles.infoWrapper}>
                                <div className={styles.infoItem}>
                                    <i className="fa-regular fa-calendar" />
                                    <span>{t('cta.eventDate')}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <i className="fa-solid fa-location-dot" />
                                    <span>{t('cta.eventVenue')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
