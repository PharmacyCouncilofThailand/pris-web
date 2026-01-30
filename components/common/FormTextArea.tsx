'use client'
import React, { forwardRef } from 'react';
import styles from './FormTextArea.module.scss';

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(({
    label,
    error,
    className = '',
    ...props
}, ref) => {
    return (
        <div className={`${styles.inputGroup} ${className}`}>
            {label && <label className={styles.label} htmlFor={props.id}>{label}</label>}

            <textarea
                ref={ref}
                className={`${styles.textarea} ${error ? styles.hasError : ''}`}
                {...props}
            />

            {error && (
                <div className={styles.errorMessage}>
                    <i className="fa-solid fa-circle-exclamation" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
});

FormTextArea.displayName = 'FormTextArea';

export default FormTextArea;
