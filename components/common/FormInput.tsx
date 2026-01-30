'use client'
import React, { useState, forwardRef } from 'react';
import styles from './FormInput.module.scss';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
  isPassword?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  label,
  error,
  icon,
  isPassword = false,
  className = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : props.type || 'text';

  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {label && <label className={styles.label} htmlFor={props.id}>{label}</label>}

      <div className={styles.inputWrapper}>
        {icon && <i className={`${icon} ${styles.icon}`} />}

        <input
          ref={ref}
          className={`${styles.input} ${error ? styles.hasError : ''} ${icon ? styles.hasIcon : ''}`}
          {...props}
          type={inputType}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
          </button>
        )}
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <i className="fa-solid fa-circle-exclamation" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
