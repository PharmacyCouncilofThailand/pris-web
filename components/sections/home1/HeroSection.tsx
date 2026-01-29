'use client'
import { useTranslations } from 'next-intl';
import Countdown from '@/components/elements/Countdown'
import Link from 'next/link'
import styles from './HeroSection.module.scss'

export default function HeroSection() {
    const t = useTranslations();

    return (
        <>
            <div className={styles.section}>
                <div className={styles.bg}>
                    <img src="/assets/img/BG%204500x2281.webp" className={styles.headerBg} alt="" />
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className={styles.header}>

                                <div className={styles.logoArea} data-aos="fade-up" data-aos-duration={900}>
                                    <img src="/assets/img/logo/Pris2026-logo.png" alt="ACCP 2026 Logo" />
                                </div>

                                <div className={styles.btnArea} data-aos="fade-up" data-aos-duration={1000}>
                                    <Link href="/registration" className={styles.orangeBtn}>{t('common.registerNow')}</Link>
                                    <Link href="/call-for-abstracts" className={styles.orangeBtn}>{t('common.submitAbstract')}</Link>
                                </div>

                                <div className={styles.countdownArea} data-aos="fade-up" data-aos-duration={1100}>
                                    <Countdown />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
