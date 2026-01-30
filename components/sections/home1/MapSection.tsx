'use client'
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';
import styles from './MapSection.module.scss';

// Configuration for Floor Plans
const FLOOR_PLANS = {
    ballroom: {
        id: 'ballroom',
        label: 'World Ballroom',
        dateRange: 'July 9, 11',
        fullDate: 'July 9, 11, 2026',
        image: '/assets/img/Venue Floor Plan/Centara Grand _ Bangkok Convention Centre at CentralWorld - Floor Plan WorldBallroom.jpg',
    },
    convention: {
        id: 'convention',
        label: 'Convention Centre',
        dateRange: 'July 10',
        fullDate: 'July 10, 2026',
        image: '/assets/img/Venue Floor Plan/Centara Grand _ Bangkok Convention Centre at CentralWorld - Floor Plan Bangkok Convention Centre.jpg',
    }
} as const;

type TabType = keyof typeof FLOOR_PLANS;

export default function MapSection() {
    const t = useTranslations();
    const [activeTab, setActiveTab] = useState<TabType>('ballroom');
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const currentPlan = FLOOR_PLANS[activeTab];

    return (
        <>
            <div className={`map-section-area ${styles.section}`}>
                <div className="container">
                    {/* Header */}
                    <div className="row">
                        <div className="col-lg-8 m-auto">
                            <div className={`heading2 text-center ${styles.headingWrapper}`}>
                                <h5
                                    className={styles.subheading}
                                    data-aos="fade-up"
                                    data-aos-duration={800}
                                >
                                    {t('map.subtitle')}
                                </h5>
                                <div className="space16" />
                                <h2
                                    className={`text-anime-style-3 ${styles.title}`}
                                >
                                    {t('map.title')}
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="row align-items-stretch">
                        {/* LEFT: Interactive Floor Plan */}
                        <div className="col-lg-7 mb-4 mb-lg-0" data-aos="fade-right" data-aos-duration={800}>
                            <div className={styles.card}>

                                {/* Tabs Switcher */}
                                <div className={styles.tabsWrapper}>
                                    {Object.values(FLOOR_PLANS).map((plan) => (
                                        <button
                                            key={plan.id}
                                            onClick={() => setActiveTab(plan.id as TabType)}
                                            className={`${styles.tabButton} ${activeTab === plan.id ? styles.active : styles.inactive}`}
                                        >
                                            {plan.label} ({plan.dateRange})
                                        </button>
                                    ))}
                                </div>

                                {/* Floor Plan Display */}
                                <div
                                    className={styles.floorPlanContainer}
                                    onClick={() => setIsLightboxOpen(true)}
                                >
                                    <div className={styles.zoomIcon}>
                                        <i className="fa-solid fa-magnifying-glass-plus"></i>
                                    </div>
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <Image
                                            src={currentPlan.image}
                                            alt={`${currentPlan.label} Floor Plan`}
                                            fill
                                            style={{ objectFit: 'contain' }}
                                            sizes="(max-width: 992px) 100vw, 60vw"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Event Information */}
                        <div className="col-lg-5" data-aos="fade-left" data-aos-duration={800}>
                            <div className={`${styles.card} ${styles.infoCard}`}>

                                <InfoItem
                                    iconBg="linear-gradient(135deg, #EA4335 0%, #c82333 100%)"
                                    iconClass="fa-solid fa-location-dot"
                                    title={t('map.venueName')}
                                    description={t('map.venueAddress')}
                                />

                                <hr className={styles.divider} />

                                <InfoItem
                                    iconBg="linear-gradient(135deg, #3b5998 0%, #2d4373 100%)"
                                    iconClass="fa-regular fa-calendar"
                                    label={t('map.dateLabel')}
                                    value={currentPlan.fullDate}
                                />

                                <div className={styles.spacer}></div>

                                <InfoItem
                                    iconBg="linear-gradient(135deg, #28a745 0%, #1e7e34 100%)"
                                    iconClass="fa-regular fa-clock"
                                    label={t('map.timeLabel')}
                                    value="8:00 AM - 5:00 PM"
                                />

                                <div className={styles.spacer}></div>

                                <InfoItem
                                    iconBg="linear-gradient(135deg, #ffc107 0%, #e0a800 100%)"
                                    iconClass="fa-solid fa-stairs"
                                    label={t('map.floorLevelLabel')}
                                    value={t('map.floorLevel')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox / Modal */}
            {isLightboxOpen && (
                <div
                    onClick={() => setIsLightboxOpen(false)}
                    className={styles.lightbox}
                >
                    <button
                        className={styles.closeButton}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div style={{ position: 'relative', width: '90vw', height: '90vh' }}>
                        <Image
                            src={currentPlan.image}
                            alt="Full Screen Floor Plan"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

// Helper Component for Info Items
interface InfoItemProps {
    iconBg: string;
    iconClass: string;
    title?: string;
    label?: string;
    value?: string;
    description?: string;
}

function InfoItem({ iconBg, iconClass, title, label, value, description }: InfoItemProps) {
    return (
        <div>
            <div className={styles.infoItem}>
                <div className={styles.iconBox} style={{ background: iconBg }}>
                    <i className={iconClass} />
                </div>
                <div className={styles.infoContent}>
                    {title && <h4>{title}</h4>}
                    {label && <p className={styles.label}>{label}</p>}
                    {value && <p className={styles.value}>{value}</p>}
                </div>
            </div>
            {description && (
                <p className={styles.description}>
                    {description}
                </p>
            )}
        </div>
    );
}
