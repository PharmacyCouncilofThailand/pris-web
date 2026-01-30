'use client';

import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './MemoriesSection.module.scss';

// ============================================================================
// Configuration
// ============================================================================

interface MemoryItem {
    img: string;
    year: string;
}

const MEMORIES_DATA: MemoryItem[] = [
    { img: 'memory1', year: '2025' },
    { img: 'memory2', year: '2025' },
    { img: 'memory4', year: '2025' },
    { img: 'memory5', year: '2025' },
    { img: 'memory6', year: '2025' },
    { img: 'memory7', year: '2025' },
];

const IMAGE_BASE_PATH = '/assets/img/all-images/memory';

// ============================================================================
// Component
// ============================================================================

export default function MemoriesSection() {
    const t = useTranslations();

    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    const openLightbox = useCallback((img: string) => {
        setLightboxImage(img);
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxImage(null);
    }, []);

    const getImagePath = (img: string) => `${IMAGE_BASE_PATH}/${img}.jpg`;

    return (
        <section className={`memories-section sp1 ${styles.section}`}>
            <div className="container">
                {/* Header */}
                <div className="row">
                    <div className="col-lg-6 m-auto">
                        <div className={`memories-header heading2 ${styles.header}`}>
                            <h5 data-aos="fade-up" data-aos-duration={800}>
                                {t('memories.title')}
                            </h5>
                            <h2 className="text-anime-style-3">
                                {t('memories.subtitle')}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className={styles.grid}>
                    {MEMORIES_DATA.map((memory, index) => (
                        <div
                            key={memory.img}
                            className={styles.card}
                            data-aos="fade-up"
                            data-aos-duration={800}
                            data-aos-delay={index * 80}
                            onClick={() => openLightbox(memory.img)}
                        >
                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                <Image
                                    src={getImagePath(memory.img)}
                                    alt={`Memory ${memory.year}`}
                                    className={styles.image}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className={styles.overlay}>
                                <i className="fa-solid fa-magnifying-glass-plus" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightboxImage && (
                <div className={styles.lightbox} onClick={closeLightbox}>
                    <button
                        className={styles.lightboxClose}
                        aria-label="Close lightbox"
                    >
                        <i className="fa-solid fa-xmark" />
                    </button>
                    <div style={{ position: 'relative', width: '90vw', height: '90vh' }} onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={getImagePath(lightboxImage)}
                            alt="Full size memory"
                            className={styles.lightboxImage}
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
