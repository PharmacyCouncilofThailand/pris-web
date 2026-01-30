'use client'
import React from 'react';
import styles from './SectionHeading.module.scss';
import { useTranslations } from 'next-intl';

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right';
    variant?: 'dark' | 'light'; // dark text (default) or light text (for dark backgrounds)
    className?: string;
}

export default function SectionHeading({
    title,
    subtitle,
    align = 'center',
    variant = 'dark',
    className = ''
}: SectionHeadingProps) {
    // If title/subtitle looks like a translation key (no spaces, maybe dots), we could try to translate it.
    // However, to keep it simple and explicit, we expect the caller to pass the translated string.

    return (
        <div className={`
            ${styles.wrapper} 
            ${align === 'left' ? styles.alignLeft : ''} 
            ${align === 'right' ? styles.alignRight : ''}
            ${className}
        `}>
            {subtitle && (
                <span className={`${styles.subtitle} ${variant === 'light' ? styles.light : ''}`}>
                    {subtitle}
                </span>
            )}
            <h2 className={`${styles.title} ${variant === 'light' ? styles.light : ''}`}>
                {title}
            </h2>
        </div>
    );
}
