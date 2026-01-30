'use client'
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link'
import Image from 'next/image';
import styles from './Footer1.module.scss';


export default function Footer1() {
	const t = useTranslations();
	const locale = useLocale();


	return (
		<>
			{/* Countdown Banner */}


			{/* Main Footer */}
			<div className={`footer1-sertion-area ${styles.section}`}>
				<div className="container">
					<div className="row">
						{/* Logo & Description */}
						<div className="col-lg-3 col-md-6">
							<div className="footer-logo-area">
								<Image
									src="/assets/img/logo/footer-logo-2026.png"
									alt="Pris 2026"
									width={120}
									height={60}
									className={styles.logoImage}
								/>
								<div className={styles.spacer30} />
								<p>{t('footer.description')}</p>
								<div className="space24" />

							</div>
						</div>

						{/* Quick Links */}
						<div className="col-lg-2 col-md-6">
							<div className="link-content">
								<h3>{t('common.quickLinks')}</h3>
								<ul>
									<li><Link href={`/${locale}`}>{t('common.home')}</Link></li>
									<li><Link href={`/${locale}/about`}>{t('common.aboutPris')}</Link></li>
									<li><Link href={`/${locale}/program`}>{t('common.program')}</Link></li>
									<li><Link href={`/${locale}/call-for-abstracts`}>{t('common.callForAbstracts')}</Link></li>
									<li><Link href={`/${locale}/registration`}>{t('common.registration')}</Link></li>
								</ul>
							</div>
						</div>

						{/* Contact Info */}
						<div className="col-lg-3 col-md-6">
							<div className="link-content2">
								<h3>{t('common.contactUs')}</h3>
								<ul className={styles.contactList}>
									<li>
										<Link href="mailto:Pris2026@gmail.com" className={styles.contactLink}>
											<i className={`fa-solid fa-envelope ${styles.iconEnvelope}`} />
											Pris2026@gmail.com
										</Link>
									</li>
									<li>
										<Link href="https://www.facebook.com/profile.php?id=61584025641109" target="_blank" className={styles.contactLink}>
											<i className={`fa-brands fa-facebook-f ${styles.iconFacebook}`} />
											Pris2026
										</Link>
									</li>
									<li>
										<Link href="https://instagram.com/Pris2026" target="_blank" className={styles.contactLink}>
											<i className={`fa-brands fa-instagram ${styles.iconInstagram}`} />
											Pris2026
										</Link>
									</li>
								</ul>
							</div>
						</div>

						{/* Event Gallery */}
						<div className="col-lg-4 col-md-6">
							<div className="footer-social-box">
								<h3>{t('common.gallery')}</h3>
								<div className="space12" />
								<div className="row">
									{/* Top row - Memory images */}
									<div className="col-lg-4 col-md-4 col-4">
										<div className="img1">
											<Image
												src="/assets/img/all-images/memory/memory1.jpg"
												alt="Memory 1"
												width={100}
												height={80}
												className={styles.galleryImage}
											/>
											<div className="icons">
												<Link href={`/${locale}/gallery`}><i className="fa-solid fa-arrow-right" /></Link>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-md-4 col-4">
										<div className="img1">
											<Image
												src="/assets/img/all-images/memory/memory3.jpg"
												alt="Memory 3"
												width={100}
												height={80}
												className={styles.galleryImage}
											/>
											<div className="icons">
												<Link href={`/${locale}/gallery`}><i className="fa-solid fa-arrow-right" /></Link>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-md-4 col-4">
										<div className="img1">
											<Image
												src="/assets/img/all-images/memory/memory4.jpg"
												alt="Memory 4"
												width={100}
												height={80}
												className={styles.galleryImage}
											/>
											<div className="icons">
												<Link href={`/${locale}/gallery`}><i className="fa-solid fa-arrow-right" /></Link>
											</div>
										</div>
									</div>
									{/* Bottom row - Bangkok images */}
									<div className="col-lg-4 col-md-4 col-4">
										<div className="img1">
											<Image
												src="/assets/img/all-images/bangkok/img1.jpg"
												alt="Bangkok 1"
												width={100}
												height={80}
												className={styles.galleryImage}
											/>
											<div className="icons">
												<Link href={`/${locale}/gallery`}><i className="fa-solid fa-arrow-right" /></Link>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-md-4 col-4">
										<div className="img1">
											<Image
												src="/assets/img/all-images/bangkok/img3.jpg"
												alt="Bangkok 3"
												width={100}
												height={80}
												className={styles.galleryImage}
											/>
											<div className="icons">
												<Link href={`/${locale}/gallery`}><i className="fa-solid fa-arrow-right" /></Link>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-md-4 col-4">
										<div className="img1">
											<Image
												src="/assets/img/all-images/bangkok/img9.jpg"
												alt="Bangkok 9"
												width={100}
												height={80}
												className={styles.galleryImage}
											/>
											<div className="icons">
												<Link href={`/${locale}/gallery`}><i className="fa-solid fa-arrow-right" /></Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="space60" />

					{/* Copyright */}
					<div className="row">
						<div className="col-lg-12">
							<div className="copyright">
								<p>© {t('common.copyright')} {new Date().getFullYear()} - Pharmacy Council of Thailand</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
