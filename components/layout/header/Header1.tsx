'use client'
import { useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link'
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
// Custom type-safe components
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import Button from '@/components/common/Button';
import { useAuth } from '@/context/AuthContext';
import UserProfileDropdown from './UserProfileDropdown';
import { US, TH } from 'country-flag-icons/react/3x2';
import styles from './Header1.module.scss';

interface HeaderProps {
    scroll: boolean;
    isMobileMenu: boolean;
    handleMobileMenu: () => void;
    isSearch: boolean;
    handleSearch: () => void;
    headerBgWhite?: boolean;
}

export default function Header1({ scroll, isMobileMenu, handleMobileMenu, isSearch, handleSearch, headerBgWhite }: HeaderProps) {
    const t = useTranslations('common');
    const locale = useLocale();
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const handleLanguageChange = useCallback((checked: boolean) => {
        const segments = pathname.split('/');
        const pathWithoutLocale = '/' + segments.slice(2).join('/') || '/';
        const nextLocale = checked ? 'en' : 'th';
        router.push(`/${nextLocale}${pathWithoutLocale}`);
    }, [pathname, router]);

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Function to check if link is active
    const isActive = useCallback((path: string) => {
        if (path === `/${locale}` || path === `/${locale}/`) {
            return pathname === `/${locale}` || pathname === `/${locale}/`;
        }
        return pathname.startsWith(path);
    }, [locale, pathname]);

    // Toggle dropdown function
    const toggleDropdown = useCallback((menuName: string, e: React.MouseEvent) => {
        e.preventDefault();
        setOpenDropdown(prev => prev === menuName ? null : menuName);
    }, []);

    // Check if current page should always show colored logo
    const segments = pathname.split('/');
    const pathWithoutLocale = '/' + segments.slice(2).join('/') || '/';
    const shouldShowColoredLogo = pathWithoutLocale === '/my-tickets' || pathWithoutLocale === '/abstract-status';




    return (
        <>

            <header>
                <div className={`header-area homepage1 header header-sticky d-none d-xxl-block ${scroll ? 'sticky' : ''} ${headerBgWhite ? styles.headerSticky : ''}`} id="header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="header-elements">
                                    <div className="site-logo">
                                        <Link href={`/${locale}`}>
                                            <Image
                                                src="/assets/img/logo/Pris2026-logo.png"
                                                alt="Pris 2026"
                                                width={120}
                                                height={150}
                                                priority
                                                className={`${styles.logoImage} ${(scroll || shouldShowColoredLogo) ? styles.scrolled : ''}`}
                                            />
                                        </Link>
                                    </div>

                                    <div className="main-menu">
                                        <ul>
                                            <li><Link href={`/${locale}`} className={`${styles.menuLink} ${isActive(`/${locale}`) ? styles.active : ''}`}>{t('home')}</Link></li>
                                            <li className={openDropdown === 'about' ? 'dropdown-open' : ''}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => toggleDropdown('about', e)}
                                                    className={`${styles.menuLink} ${isActive(`/${locale}/about`) || isActive(`/${locale}/welcome-messages`) || openDropdown === 'about' ? styles.active : ''}`}
                                                >
                                                    {t('about')} <i className={`fa-solid ${openDropdown === 'about' ? 'fa-angle-up' : 'fa-angle-down'}`} />
                                                </a>
                                                <ul className={`${styles.dropdownPadding} ${openDropdown === 'about' ? styles.open : ''}`}>
                                                    <li><Link href={`/${locale}/about`}>{t('aboutPris')}</Link></li>
                                                    <li><Link href={`/${locale}/welcome-messages`}>{t('welcomeMessages')}</Link></li>
                                                </ul>
                                            </li>
                                            <li className={openDropdown === 'program' ? 'dropdown-open' : ''}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => toggleDropdown('program', e)}
                                                    className={`${styles.menuLink} ${isActive(`/${locale}/program`) || isActive(`/${locale}/gala-dinner`) || isActive(`/${locale}/preconference-workshops`) || openDropdown === 'program' ? styles.active : ''}`}
                                                >
                                                    {t('program')} <i className={`fa-solid ${openDropdown === 'program' ? 'fa-angle-up' : 'fa-angle-down'}`} />
                                                </a>
                                                <ul className={`${styles.dropdownPadding} ${openDropdown === 'program' ? styles.open : ''}`}>
                                                    <li><Link href={`/${locale}/program`}>{t('programOverview')}</Link></li>
                                                    <li><Link href={`/${locale}/program-plenary`}>{t('plenaryKeynotes')}</Link></li>
                                                    <li><Link href={`/${locale}/program-symposium`}>{t('symposia')}</Link></li>
                                                    <li><Link href={`/${locale}/program-oral-poster`}>{t('oralPoster')}</Link></li>
                                                    <li><Link href={`/${locale}/gala-dinner`}>{t('galaDinner')}</Link></li>
                                                    <li><Link href={`/${locale}/preconference-workshops`}>{t('workshops')}</Link></li>
                                                </ul>
                                            </li>
                                            <li className={openDropdown === 'abstracts' ? 'dropdown-open' : ''}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => toggleDropdown('abstracts', e)}
                                                    className={`${styles.menuLink} ${isActive(`/${locale}/call-for-abstracts`) || isActive(`/${locale}/abstract-submission-guideline`) || openDropdown === 'abstracts' ? styles.active : ''}`}
                                                >
                                                    {t('callForAbstracts')} <i className={`fa-solid ${openDropdown === 'abstracts' ? 'fa-angle-up' : 'fa-angle-down'}`} />
                                                </a>
                                                <ul className={`${styles.dropdownPadding} ${openDropdown === 'abstracts' ? styles.open : ''}`}>
                                                    <li><Link href={`/${locale}/abstract-submission-guideline`}>{t('abstractGuideline')}</Link></li>
                                                    <li><Link href={`/${locale}/call-for-abstracts`}>{t('callForAbstracts')}</Link></li>
                                                </ul>
                                            </li>
                                            <li className={openDropdown === 'registration' ? 'dropdown-open' : ''}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => toggleDropdown('registration', e)}
                                                    className={`${styles.menuLink} ${isActive(`/${locale}/registration`) || openDropdown === 'registration' ? styles.active : ''}`}
                                                >
                                                    {t('registration')} <i className={`fa-solid ${openDropdown === 'registration' ? 'fa-angle-up' : 'fa-angle-down'}`} />
                                                </a>
                                                <ul className={`${styles.dropdownPadding} ${openDropdown === 'registration' ? styles.open : ''}`}>
                                                    <li><Link href={`/${locale}/registration`}>{t('registrationInfo')}</Link></li>
                                                    <li><Link href={`/${locale}/registration-policies`}>{t('policies')}</Link></li>
                                                </ul>
                                            </li>
                                            <li className={openDropdown === 'travel' ? 'dropdown-open' : ''}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => toggleDropdown('travel', e)}
                                                    className={`${styles.menuLink} ${isActive(`/${locale}/accommodation`) || isActive(`/${locale}/travel-visa`) || openDropdown === 'travel' ? styles.active : ''}`}
                                                >
                                                    {t('travelAccommodation')} <i className={`fa-solid ${openDropdown === 'travel' ? 'fa-angle-up' : 'fa-angle-down'}`} />
                                                </a>
                                                <ul className={`${styles.dropdownPadding} ${openDropdown === 'travel' ? styles.open : ''}`}>
                                                    <li><Link href={`/${locale}/accommodation`}>{t('hotelsRates')}</Link></li>
                                                    <li><Link href={`/${locale}/travel-visa`}>{t('travelVisa')}</Link></li>
                                                </ul>
                                            </li>
                                            <li className={openDropdown === 'sponsorship' ? 'dropdown-open' : ''}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => toggleDropdown('sponsorship', e)}
                                                    className={`${styles.menuLink} ${isActive(`/${locale}/sponsorship`) || openDropdown === 'sponsorship' ? styles.active : ''}`}
                                                >
                                                    {t('sponsorship')} <i className={`fa-solid ${openDropdown === 'sponsorship' ? 'fa-angle-up' : 'fa-angle-down'}`} />
                                                </a>
                                                <ul className={`${styles.dropdownPadding} ${openDropdown === 'sponsorship' ? styles.open : ''}`}>
                                                    <li><Link href={`/${locale}/sponsorship/confirmed-sponsors`}>{t('confirmedSponsors')}</Link></li>
                                                    <li><Link href={`/${locale}/sponsorship/sponsorship-prospectus`}>{t('sponsorshipProspectusMenu')}</Link></li>
                                                    <li><Link href={`/${locale}/sponsorship/exhibition-floor-plan`}>{t('exhibitionFloorPlan')}</Link></li>
                                                </ul>
                                            </li>
                                            <li className={openDropdown === 'more' ? 'dropdown-open' : ''}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => toggleDropdown('more', e)}
                                                    className={`${styles.menuLink} ${isActive(`/${locale}/gallery`) || isActive(`/${locale}/contact`) || openDropdown === 'more' ? styles.active : ''}`}
                                                >
                                                    {t('more')} <i className={`fa-solid ${openDropdown === 'more' ? 'fa-angle-up' : 'fa-angle-down'}`} />
                                                </a>
                                                <ul className={`${styles.dropdownPadding} ${openDropdown === 'more' ? styles.open : ''}`}>
                                                    <li><Link href={`/${locale}/gallery`}>{t('gallery')}</Link></li>
                                                    <li><Link href={`/${locale}/contact`}>{t('contact')}</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="btn-area" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginRight: '0' }}>
                                        {/* Language Switcher */}
                                        {/* Language Switcher */}
                                        {/* Language Switcher - Temporarily hidden per user request */}
                                        {/* <div className="d-none d-xxl-flex" style={{ alignItems: 'center' }}>
                                            <div style={{
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '24px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                background: '#fff',
                                                padding: '2px'
                                            }}>
                                                <LanguageSwitcher
                                                    onChange={handleLanguageChange}
                                                    checked={locale === 'en'}
                                                    offColor="#ffffff"
                                                    onColor="#ffffff"
                                                    offHandleColor="#FFBA00"
                                                    onHandleColor="#FFBA00"
                                                    handleDiameter={34}
                                                    checkedHandleIcon={
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                height: "100%",
                                                                fontSize: 14,
                                                                color: "#333",
                                                                fontWeight: "800",
                                                            }}
                                                        >
                                                            EN
                                                        </div>
                                                    }
                                                    uncheckedHandleIcon={
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                height: "100%",
                                                                fontSize: 14,
                                                                color: "#333",
                                                                fontWeight: "800",
                                                            }}
                                                        >
                                                            TH
                                                        </div>
                                                    }
                                                    uncheckedIcon={
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "flex-end",
                                                                alignItems: "center",
                                                                height: "100%",
                                                                paddingRight: 8
                                                            }}
                                                        >
                                                            <TH style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} title="Thai" />
                                                        </div>
                                                    }
                                                    checkedIcon={
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "flex-start",
                                                                alignItems: "center",
                                                                height: "100%",
                                                                paddingLeft: 8
                                                            }}
                                                        >
                                                            <US style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} title="English" />
                                                        </div>
                                                    }
                                                    boxShadow="none"
                                                    activeBoxShadow="none"
                                                    height={40}
                                                    width={96}
                                                    className="react-switch"
                                                    id="language-switch"
                                                />
                                            </div>
                                        </div> */}

                                        {isAuthenticated ? (
                                            <UserProfileDropdown />
                                        ) : (
                                            <>
                                                <Button
                                                    as={Link}
                                                    href={`/${locale}/login`}
                                                    variant="outline"
                                                    icon="fa-solid fa-right-to-bracket"
                                                >
                                                    {t('login')}
                                                </Button>
                                                <Button
                                                    as={Link}
                                                    href={`/${locale}/signup`}
                                                    variant="primary"
                                                    icon="fa-solid fa-user-plus"
                                                >
                                                    {t('signUp')}
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Header - Outside of header tag for proper fixed positioning */}
            <div className={`mobile-header mobile-header1 d-block d-xxl-none ${styles.mobileHeaderSticky}`}>
                <div className="container-fluid">
                    <div className="col-12">
                        <div className="mobile-header-elements">
                            <div className="mobile-logo">
                                <Link href={`/${locale}`}>
                                    <Image
                                        src="/assets/img/logo/Pris2026-logo.png"
                                        alt="Pris 2026"
                                        className={styles.mobileLogo}
                                        width={120}
                                        height={150}
                                    />
                                </Link>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div className={`mobile-nav-icon dots-menu ${styles.hamburgerIcon}`} onClick={handleMobileMenu}>
                                    <i className="fa-solid fa-bars" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
