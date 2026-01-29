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
                                    <img src="/assets/img/Pris20226%20logo.png" alt="ACCP 2026 Logo" />
                                </div>

                                <div className={styles.btnArea} data-aos="fade-up" data-aos-duration={1000}>
                                    <Link href="/registration" className={styles.orangeBtn}>{t('common.registerNow')}</Link>
                                    <Link href="/call-for-abstracts" className={styles.orangeBtn}>{t('common.submitAbstract')}</Link>
                                </div>

                                <div className={styles.countdownArea} data-aos="fade-up" data-aos-duration={1100}>
                                    <Countdown />
                                </div>


                <div className="container">
                    <div className="row">
                        <div className="col-xxl-6">
                            <div className="hero1-header heading1">
                                <h5 data-aos="fade-left" data-aos-duration={800}>
                                    {t('hero.subtitle')}
                                </h5>
                                <div className="space16" />
                                <h1 className="text-anime-style-3" style={{ marginBottom: '0' }}>
                                    Pris <span className="gold-text">2026</span>
                                </h1>
                                <h2 style={heroStyles.subtitle}>
                                    {t('hero.location')}
                                </h2>
                                <p data-aos="fade-left" data-aos-duration={900} style={heroStyles.description}>
                                    {t('hero.theme')}
                                </p>
                                <div className="space32" />
                                <div className="btn-area1" data-aos="fade-left" data-aos-duration={1100}>
                                    <Link href="/registration" className="vl-btn1">{t('common.registerNow')}</Link>
                                    <Link href="/call-for-abstracts" className="vl-btn2">{t('common.submitAbstract')}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
