'use client'
import { useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import UserProfileDropdown from './header/UserProfileDropdown';
import Image from 'next/image';
import Button from '@/components/common/Button';
import styles from './MobileMenu.module.scss';

interface MobileMenuProps {
    isMobileMenu: boolean;
    handleMobileMenu: () => void;
}

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: MobileMenuProps) {
    const [isAccordion, setIsAccordion] = useState<number | null>(null)
    const t = useTranslations('common');
    const tContact = useTranslations('contact');
    const locale = useLocale();
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();

    // Function to get the path without locale prefix
    const getPathWithoutLocale = useCallback(() => {
        const segments = pathname.split('/');
        return '/' + segments.slice(2).join('/') || '/';
    }, [pathname]);

    const handleAccordion = useCallback((key: number) => {
        setIsAccordion(prevState => prevState === key ? null : key)
    }, []);

    return (
        <>
            <div id="mobile-sidebar-container" className={`mobile-sidebar mobile-sidebar1 ${isMobileMenu ? 'mobile-menu-active' : ''} ${styles.mobileSidebar}`}>
                <div className="logosicon-area">
                    <div className="logos">
                        <Image
                            src="/assets/img/logo/Pris2026-logo.png"
                            alt="Pris 2026"
                            width={120}
                            height={70}
                            className={styles.logoImage}
                        />
                    </div>
                    <div className="menu-close" onClick={handleMobileMenu}>
                        <i className="fa-solid fa-xmark" />
                    </div>
                </div>
                <div className={styles.mobileNav}>
                    <ul className={styles.navList}>
                        <li><Link href={`/${locale}`}>{t('home')}</Link></li>

                        <li className={isAccordion === 1 ? styles.open : ''}>
                            <div className={styles.menuHeader}>
                                <span className={styles.menuTitle} onClick={() => handleAccordion(1)}>{t('aboutPris')}</span>
                                <span
                                    className={`${styles.submenuButton} ${isAccordion === 1 ? styles.submenuOpened : ''}`}
                                    onClick={() => handleAccordion(1)}
                                >
                                    <em />
                                </span>
                            </div>
                            <ul className={`${styles.subMenu} ${isAccordion === 1 ? styles.openSub : ''}`}>
                                <li><Link href={`/${locale}/about`}>{t('aboutPris')}</Link></li>
                                <li><Link href={`/${locale}/welcome-messages`}>{t('welcomeMessages')}</Link></li>
                            </ul>
                        </li>

                        <li className={isAccordion === 2 ? styles.open : ''}>
                            <div className={styles.menuHeader}>
                                <span className={styles.menuTitle} onClick={() => handleAccordion(2)}>{t('program')}</span>
                                <span
                                    className={`${styles.submenuButton} ${isAccordion === 2 ? styles.submenuOpened : ''}`}
                                    onClick={() => handleAccordion(2)}
                                >
                                    <em />
                                </span>
                            </div>
                            <ul className={`${styles.subMenu} ${isAccordion === 2 ? styles.openSub : ''}`}>
                                <li><Link href={`/${locale}/program`}>{t('programOverview')}</Link></li>
                                <li><Link href={`/${locale}/program-plenary`}>{t('plenaryKeynotes')}</Link></li>
                                <li><Link href={`/${locale}/program-symposium`}>{t('symposia')}</Link></li>
                                <li><Link href={`/${locale}/program-oral-poster`}>{t('oralPoster')}</Link></li>
                                <li><Link href={`/${locale}/gala-dinner`}>{t('galaDinner')}</Link></li>
                                <li><Link href={`/${locale}/preconference-workshops`}>{t('workshops')}</Link></li>
                            </ul>
                        </li>

                        <li className={isAccordion === 3 ? styles.open : ''}>
                            <div className={styles.menuHeader}>
                                <span className={styles.menuTitle} onClick={() => handleAccordion(3)}>{t('callForAbstracts')}</span>
                                <span
                                    className={`${styles.submenuButton} ${isAccordion === 3 ? styles.submenuOpened : ''}`}
                                    onClick={() => handleAccordion(3)}
                                >
                                    <em />
                                </span>
                            </div>
                            <ul className={`${styles.subMenu} ${isAccordion === 3 ? styles.openSub : ''}`}>
                                <li><Link href={`/${locale}/abstract-submission-guideline`}>{t('abstractGuideline')}</Link></li>
                                <li><Link href={`/${locale}/call-for-abstracts`}>{t('callForAbstracts')}</Link></li>
                            </ul>
                        </li>

                        <li className={isAccordion === 4 ? styles.open : ''}>
                            <div className={styles.menuHeader}>
                                <span className={styles.menuTitle} onClick={() => handleAccordion(4)}>{t('registration')}</span>
                                <span
                                    className={`${styles.submenuButton} ${isAccordion === 4 ? styles.submenuOpened : ''}`}
                                    onClick={() => handleAccordion(4)}
                                >
                                    <em />
                                </span>
                            </div>
                            <ul className={`${styles.subMenu} ${isAccordion === 4 ? styles.openSub : ''}`}>
                                <li><Link href={`/${locale}/registration`}>{t('registrationInfo')}</Link></li>
                                <li><Link href={`/${locale}/registration-policies`}>{t('policies')}</Link></li>
                            </ul>
                        </li>

                        <li className={isAccordion === 5 ? styles.open : ''}>
                            <div className={styles.menuHeader}>
                                <span className={styles.menuTitle} onClick={() => handleAccordion(5)}>{t('travelAccommodation')}</span>
                                <span
                                    className={`${styles.submenuButton} ${isAccordion === 5 ? styles.submenuOpened : ''}`}
                                    onClick={() => handleAccordion(5)}
                                >
                                    <em />
                                </span>
                            </div>
                            <ul className={`${styles.subMenu} ${isAccordion === 5 ? styles.openSub : ''}`}>
                                <li><Link href={`/${locale}/accommodation`}>{t('hotelsRates')}</Link></li>
                                <li><Link href={`/${locale}/travel-visa`}>{t('travelVisa')}</Link></li>
                            </ul>
                        </li>

                        <li className={isAccordion === 6 ? styles.open : ''}>
                            <div className={styles.menuHeader}>
                                <span className={styles.menuTitle} onClick={() => handleAccordion(6)}>{t('sponsorship')}</span>
                                <span
                                    className={`${styles.submenuButton} ${isAccordion === 6 ? styles.submenuOpened : ''}`}
                                    onClick={() => handleAccordion(6)}
                                >
                                    <em />
                                </span>
                            </div>
                            <ul className={`${styles.subMenu} ${isAccordion === 6 ? styles.openSub : ''}`}>
                                <li><Link href={`/${locale}/sponsorship/confirmed-sponsors`}>{t('confirmedSponsors')}</Link></li>
                                <li><Link href={`/${locale}/sponsorship/sponsorship-prospectus`}>{t('sponsorshipProspectusMenu')}</Link></li>
                                <li><Link href={`/${locale}/sponsorship/exhibition-floor-plan`}>{t('exhibitionFloorPlan')}</Link></li>
                            </ul>
                        </li>

                        <li><Link href={`/${locale}/gallery`}>{t('gallery')}</Link></li>
                    </ul>

                    <div className="allmobilesection">
                        {isAuthenticated ? (
                            <div style={{ padding: '20px 0' }}>
                                <UserProfileDropdown />
                            </div>
                        ) : (
                            <div className={styles.authButtons}>
                                <Button
                                    as={Link}
                                    href={`/${locale}/login`}
                                    variant="outline"
                                >
                                    {t('login')}
                                </Button>
                                <Button
                                    as={Link}
                                    href={`/${locale}/signup`}
                                    variant="primary"
                                >
                                    {t('signUp')}
                                </Button>
                            </div>
                        )}
                        <div className="single-footer">
                            <h3>{tContact('contactInfo')}</h3>
                            <div className="footer1-contact-info">
                                <div className="contact-info-single">
                                    <div className="contact-info-icon">
                                        <span><i className="fa-solid fa-envelope" /></span>
                                    </div>
                                    <div className="contact-info-text">
                                        <Link href="mailto:Pris2026@gmail.com">Pris2026@gmail.com</Link>
                                    </div>
                                </div>
                                <div className="single-footer">
                                    <h3>{tContact('venue')}</h3>
                                    <div className="contact-info-single">
                                        <div className="contact-info-icon">
                                            <span><i className="fa-solid fa-location-dot" /></span>
                                        </div>
                                        <div className="contact-info-text">
                                            <Link href="/#">Centara Grand & Bangkok <br />
                                                Convention Centre, CentralWorld</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-footer">
                                    <h3>{t('followUs')}</h3>
                                    <div className={styles.socialLinks}>
                                        <div className={styles.socialItem}>
                                            <i className={`fa-brands fa-facebook ${styles.socialIconFb}`} />
                                            <Link href="https://www.facebook.com/Pris2026" target="_blank">
                                                Pris2026
                                            </Link>
                                        </div>
                                        <div className={styles.socialItem}>
                                            <i className={`fa-brands fa-instagram ${styles.socialIconIg}`} />
                                            <Link href="https://www.instagram.com/Pris2026" target="_blank">
                                                Pris2026
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
