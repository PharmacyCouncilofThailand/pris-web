import styles from './VisaInfo.module.scss'
import { useTranslations } from 'next-intl'

export default function VisaInfo() {
    const t = useTranslations('travelVisa')

    return (
        <div className={`service2-section-area sp1 ${styles.section}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        <div className={`heading2 ${styles.heading}`}>
                            <h2 data-aos="fade-up" data-aos-duration={800}>{t('passportVisaTitle')}</h2>
                        </div>
                        <div data-aos="fade-up" data-aos-duration={1000}>
                            <div className={`pricing-boxarea ${styles.cardGreen}`}>
                                <h5 className={styles.cardTitle}>
                                    <i className={`fa-solid fa-passport ${styles.icon} ${styles.iconGreen}`} />
                                    {t('visaExemptionTitle')}
                                </h5>
                                <p className={styles.description}>
                                    {t('visaExemptionDesc')}
                                </p>
                            </div>

                            <div className={`pricing-boxarea ${styles.cardBlue}`}>
                                <h5 className={styles.cardTitle}>
                                    <i className={`fa-solid fa-id-card ${styles.icon} ${styles.iconBlue}`} />
                                    {t('visaOnArrivalTitle')}
                                </h5>
                                <p className={styles.description}>
                                    {t('visaOnArrivalDesc')}
                                </p>
                                <p className={styles.linkWrapper}>
                                    <a href="https://www.mfa.go.th" target="_blank" rel="noopener noreferrer" className={styles.link}>www.mfa.go.th</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
