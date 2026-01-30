'use client';

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import styles from './VenueLocationMaps.module.scss'

export default function VenueLocationMaps() {
    const t = useTranslations('travelVisa')
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const maps = [
        {
            id: 'train',
            title: '5-10 Minutes walk from Train Stations',
            titleTh: 'เดินจากสถานีรถไฟฟ้า 5-10 นาที',
            image: '/assets/img/venue-map-train.jpg',
            description: 'Walking distance from Siam Interchange Station and Chid Lom Station',
            descriptionTh: 'ระยะเดินจากสถานีสยาม และสถานีชิดลม'
        },
        {
            id: 'location',
            title: 'Located upside of CentralWorld Shopping Centre',
            titleTh: 'ตั้งอยู่ด้านบนของศูนย์การค้าเซ็นทรัลเวิลด์',
            image: '/assets/img/venue-map-location.jpg',
            description: 'Venue location within CentralWorld complex',
            descriptionTh: 'ตำแหน่งสถานที่จัดงานภายในศูนย์การค้าเซ็นทรัลเวิลด์'
        }
    ]

    return (
        <>
            <div className={`venue-maps-section sp1 ${styles.section}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 m-auto">
                            <div className="heading2 text-center space-margin60">
                                <h5 data-aos="fade-up" data-aos-duration={800}>
                                    <i className={`fa-solid fa-map-location-dot ${styles.headingIcon}`} />
                                    Venue Location
                                </h5>
                                <div className="space16" />
                                <h2 className="text-anime-style-3">How to Get to the Venue</h2>
                                <div className="space16" />
                                <p data-aos="fade-up" data-aos-duration={1000}>
                                    Centara Grand & Bangkok Convention Centre is conveniently located at CentralWorld,
                                    easily accessible by public transportation
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={`row ${styles.rowGap}`}>
                        {maps.map((map, index) => (
                            <div
                                key={map.id}
                                className="col-lg-6"
                                data-aos="fade-up"
                                data-aos-duration={800}
                                data-aos-delay={index * 100}
                            >
                                <div
                                    className={styles.mapCard}
                                    onClick={() => setSelectedImage(map.image)}
                                >
                                    <div className={styles.mapImageWrapper}>
                                        <Image
                                            src={map.image}
                                            alt={map.title}
                                            width={600}
                                            height={400}
                                            className={styles.mapImage}
                                        />
                                        <div className={styles.mapOverlay}>
                                            <i className="fa-solid fa-magnifying-glass-plus" />
                                            <span>Click to enlarge</span>
                                        </div>
                                    </div>
                                    <div className={styles.mapContent}>
                                        <h4>{map.title}</h4>
                                        <p className={styles.thaiTitle}>{map.titleTh}</p>
                                        <p className={styles.description}>{map.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className={styles.lightboxOverlay}
                    onClick={() => setSelectedImage(null)}
                >
                    <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                        <button
                            className={styles.lightboxClose}
                            onClick={() => setSelectedImage(null)}
                            aria-label="Close"
                        >
                            <i className="fa-solid fa-xmark" />
                        </button>
                        <Image
                            src={selectedImage}
                            alt="Venue Map"
                            width={1200}
                            height={800}
                            className={styles.lightboxImage}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
