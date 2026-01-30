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
                <div className="mobile-nav mobile-nav1">
                    <ul className="mobile-nav-list nav-list1">
                        <li className="hash-has-sub"><Link href={`/${locale}`} className="hash-nav">{t('home')}</Link></li>
                        <li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 1 ? "submenu-opened" : ""}`} onClick={() => handleAccordion(1)}><em /></span>
                            <Link href={`/${locale}/about`} className="hash-nav">{t('aboutPris')}</Link>
                            <ul className={`sub-menu ${isAccordion == 1 ? "open-sub" : ""}`}>
                                <li className="hash-has-sub"><Link href={`/${locale}/about`} className="hash-nav">{t('aboutPris')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/welcome-messages`} className="hash-nav">{t('welcomeMessages')}</Link></li>
                            </ul>
                        </li>
                        <li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 2 ? "submenu-opened" : ""}`} onClick={() => handleAccordion(2)}><em /></span>
                            <Link href={`/${locale}/program`} className="hash-nav">{t('program')}</Link>
                            <ul className={`sub-menu ${isAccordion == 2 ? "open-sub" : ""}`}>
                                <li className="hash-has-sub"><Link href={`/${locale}/program`} className="hash-nav">{t('programOverview')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/program-plenary`} className="hash-nav">{t('plenaryKeynotes')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/program-symposium`} className="hash-nav">{t('symposia')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/program-oral-poster`} className="hash-nav">{t('oralPoster')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/gala-dinner`} className="hash-nav">{t('galaDinner')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/preconference-workshops`} className="hash-nav">{t('workshops')}</Link></li>
                            </ul>
                        </li>
                        <li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 3 ? "submenu-opened" : ""}`} onClick={() => handleAccordion(3)}><em /></span>
                            <Link href={`/${locale}/call-for-abstracts`} className="hash-nav">{t('callForAbstracts')}</Link>
                            <ul className={`sub-menu ${isAccordion == 3 ? "open-sub" : ""}`}>
                                <li className="hash-has-sub"><Link href={`/${locale}/abstract-submission-guideline`} className="hash-nav">{t('abstractGuideline')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/call-for-abstracts`} className="hash-nav">{t('callForAbstracts')}</Link></li>
                            </ul>
                        </li>
                        <li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 4 ? "submenu-opened" : ""}`} onClick={() => handleAccordion(4)}><em /></span>
                            <Link href={`/${locale}/registration`} className="hash-nav">{t('registration')}</Link>
                            <ul className={`sub-menu ${isAccordion == 4 ? "open-sub" : ""}`}>
                                <li className="hash-has-sub"><Link href={`/${locale}/registration`} className="hash-nav">{t('registrationInfo')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/registration-policies`} className="hash-nav">{t('policies')}</Link></li>
                            </ul>
                        </li>
                        <li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 5 ? "submenu-opened" : ""}`} onClick={() => handleAccordion(5)}><em /></span>
                            <Link href={`/${locale}/accommodation`} className="hash-nav">{t('travelAccommodation')}</Link>
                            <ul className={`sub-menu ${isAccordion == 5 ? "open-sub" : ""}`}>
                                <li className="hash-has-sub"><Link href={`/${locale}/accommodation`} className="hash-nav">{t('hotelsRates')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/travel-visa`} className="hash-nav">{t('travelVisa')}</Link></li>
                            </ul>
                        </li>
                        <li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 6 ? "submenu-opened" : ""}`} onClick={() => handleAccordion(6)}><em /></span>
                            <Link href={`/${locale}/sponsorship`} className="hash-nav">{t('sponsorship')}</Link>
                            <ul className={`sub-menu ${isAccordion == 6 ? "open-sub" : ""}`}>
                                <li className="hash-has-sub"><Link href={`/${locale}/sponsorship/confirmed-sponsors`} className="hash-nav">{t('confirmedSponsors')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/sponsorship/sponsorship-prospectus`} className="hash-nav">{t('sponsorshipProspectusMenu')}</Link></li>
                                <li className="hash-has-sub"><Link href={`/${locale}/sponsorship/exhibition-floor-plan`} className="hash-nav">{t('exhibitionFloorPlan')}</Link></li>
                            </ul>
                        </li>
                        <li className="hash-has-sub"><Link href={`/${locale}/gallery`} className="hash-nav">{t('gallery')}</Link></li>

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
