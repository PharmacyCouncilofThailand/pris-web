'use client'
import { useTranslations } from 'next-intl';
import React from 'react';
import Image from 'next/image';
import styles from './WelcomeSection.module.scss';

export default function WelcomeSection() {
    const t = useTranslations();

    const organizers = [
        {
            name: "Prof. Dr. Suwimol Sapcharoen",
            nameTh: "ศ.ดร.สุวิมล ทรัพย์เจริญ",
            titleKey: 'welcome.hostOrg',
            position: "President, Thai Clinical Pharmacy Association",
            positionTh: "นายกสมาคมเภสัชกรรมคลินิกไทย",
            image: "/assets/img/all-images/team/team-img1.jpg"
        },
        {
            name: "Prof. Dr. Kenji Yamamoto",
            nameTh: "ศ.ดร.เคนจิ ยามาโมโตะ",
            titleKey: 'welcome.accpPresident',
            position: "President, Asian Conference on Clinical Pharmacy",
            positionTh: "ประธานการประชุมเภสัชกรรมคลินิกแห่งเอเชีย",
            image: "/assets/img/all-images/team/team-img2.png"
        },
        {
            name: "Assoc. Prof. Dr. Nattiya Kapol",
            nameTh: "รศ.ดร.ณัฏฐิยา คาพล",
            titleKey: 'welcome.organizingChair',
            position: "Chair, Pris 2026 Organizing Committee",
            positionTh: "ประธานคณะกรรมการจัดงาน Pris 2026",
            image: "/assets/img/all-images/team/team-img3.jpg"
        },
        {
            name: "Committee Member 4",
            nameTh: "กรรมการท่านที่ 4",
            titleKey: 'welcome.committeeMember',
            position: "Organization TBA",
            positionTh: "องค์กร TBA",
            image: "/assets/img/all-images/team/team-img1.jpg" // Using img1 as placeholder
        }
    ];

    return (
        <div className={`welcome-section-area sp1 ${styles.section}`}>
            <div className="container">
                {/* Header */}
                <div className="text-center mb-5">
                    <h2 className={styles.title} data-aos="fade-up">{t('welcome.title')}</h2>
                </div>

                {/* Profile Cards */}
                <div className="row justify-content-center g-4">
                    {organizers.map((person, index) => (
                        <div key={index} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className={styles.card}>
                                {/* Photo & Badge */}
                                <div className={styles.imageContainer}>
                                    <div className={styles.imageWrapper}>
                                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                            <Image
                                                src={person.image}
                                                alt={person.name}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.roleBadge}>
                                        {t(person.titleKey)}
                                    </div>
                                </div>

                                {/* Name */}
                                <h4 className={styles.cardName}>{person.name}</h4>

                                {/* Position */}
                                <p className={styles.rolePosition}>{person.position}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
