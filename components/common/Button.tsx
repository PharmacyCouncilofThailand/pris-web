'use client';

import React from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from '@/types'; // Ensure this matches your types location

interface ExtendedButtonProps extends ButtonProps {
  className?: string;
  as?: any; // To support usage as Link
  href?: string; // For Link
  target?: string; // For Link
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled,
  loading,
  fullWidth,
  icon,
  style,
  className = '',
  as,
  ...props
}: ExtendedButtonProps) {
  const Component = as || 'button';

  // Combine classes
  const combinedClassName = [
    styles.btn,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component
      type={!as ? type : undefined} // Only pass 'type' if it's a button
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
      {...props}
    >
      {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />}
      {icon && <i className={`${icon} me-2`} style={{ marginRight: '6px' }} />}
      {children}
    </Component>
  );
}
