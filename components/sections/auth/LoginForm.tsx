import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { logger } from '@/utils/logger';
import FormInput from '@/components/common/FormInput';
import Button from '@/components/common/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createLoginSchema, LoginFormData } from '@/lib/schemas/auth';

export default function LoginForm() {
    const t = useTranslations('login');
    const tCommon = useTranslations('common');
    const locale = useLocale();
    const router = useRouter();
    const { login } = useAuth();
    const [showPendingModal, setShowPendingModal] = useState(false);
    const [globalError, setGlobalError] = useState('');

    const loginSchema = useMemo(() => createLoginSchema(tCommon), [tCommon]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        }
    });

    const onSubmit = async (data: LoginFormData) => {
        setGlobalError('');

        try {
            // Real API Call
            const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            });

            const responseData = await response.json();

            if (!response.ok) {
                // Handle specific errors
                if (response.status === 401) {
                    setGlobalError(t('invalidCredentials'));
                } else if (response.status === 403) {
                    if (responseData.error === 'ACCOUNT_PENDING') {
                        setShowPendingModal(true);
                    } else if (responseData.error === 'ACCOUNT_REJECTED') {
                        setGlobalError(t('accountRejected'));
                    } else {
                        setGlobalError(t('accountSuspended'));
                    }
                } else {
                    setGlobalError(responseData.error || t('loginFailed'));
                }
                return;
            }

            // Login Success - pass token to login (stored based on rememberMe)
            login({
                firstName: responseData.user.firstName,
                lastName: responseData.user.lastName,
                email: responseData.user.email,
                country: responseData.user.country,
                isThai: responseData.user.isThai,
                delegateType: responseData.user.delegateType,
                idCard: responseData.user.idCard
            }, responseData.token);

            // Handle Remember Me - use localStorage for persistent, sessionStorage for temporary
            if (!data.rememberMe) {
                // Move token to sessionStorage instead of localStorage (will be cleared on browser close)
                const token = localStorage.getItem('accp_token');
                const user = localStorage.getItem('accp_user');
                if (token && user) {
                    sessionStorage.setItem('accp_token', token);
                    sessionStorage.setItem('accp_user', user);
                    localStorage.removeItem('accp_token');
                    localStorage.removeItem('accp_user');
                }
            }

            // Redirect
            router.push(`/${locale}`);
        } catch (err) {
            logger.error('Login error', err, { component: 'LoginForm' });
            setGlobalError(t('loginFailedTryAgain'));
        }
    };

    // Helper for explicit errors type which might not be in the types yet for older versions
    const isLoading = isSubmitting;

    return (
        <>
            {/* Pending Approval Modal */}
            {showPendingModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: '16px',
                        padding: '40px',
                        width: '100%',
                        maxWidth: '400px',
                        textAlign: 'center',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
                    }}>
                        <div style={{ marginBottom: '24px' }}>
                            <img src="/assets/img/logo/accp_logo_main.png" alt="Pris 2026"
                                style={{ height: '80px', width: 'auto', margin: '0 auto' }} />
                        </div>
                        <div style={{ fontSize: '48px', marginBottom: '24px' }}>⏳</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px' }}>
                            {t('accountUnderReview')}
                        </h3>
                        <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px', lineHeight: '1.6' }}>
                            {t('accountUnderReviewDesc')}
                        </p>
                        <button
                            onClick={() => setShowPendingModal(false)}
                            style={{
                                display: 'inline-block',
                                padding: '12px 24px',
                                background: '#1a237e',
                                color: '#fff',
                                borderRadius: '8px',
                                border: 'none',
                                fontWeight: '600',
                                fontSize: '15px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                width: '100%'
                            }}
                        >
                            {tCommon('ok')}
                        </button>
                    </div>
                </div>
            )}
            <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '40px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                maxWidth: '420px',
                margin: '0 auto'
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <Link href={`/${locale}`}>
                        <img src="/assets/img/logo/accp_logo_main.png" alt="Pris 2026"
                            style={{ height: '80px', width: 'auto' }} />
                    </Link>
                </div>

                {/* Title */}
                <h2 style={{
                    fontSize: '24px', fontWeight: '600', color: '#1a1a1a',
                    textAlign: 'center', marginBottom: '8px'
                }}>
                    {locale === 'th' ? 'เข้าสู่ระบบ' : 'Sign In'}
                </h2>
                <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '32px' }}>
                    {locale === 'th' ? 'กรอกอีเมลและรหัสผ่านเพื่อเข้าสู่ระบบ' : 'Enter your email and password to sign in'}
                </p>

                {/* Global Error Message */}
                {globalError && (
                    <div style={{
                        padding: '12px 16px',
                        background: '#ffebee',
                        border: '1px solid #ef5350',
                        borderRadius: '8px',
                        color: '#c62828',
                        fontSize: '14px',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        {globalError}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                        id="email"
                        label={`${t('email')} *`}
                        type="email"
                        placeholder="email@example.com"
                        icon="fa-regular fa-envelope"
                        error={errors.email?.message}
                        {...register('email')}
                    />

                    <FormInput
                        id="password"
                        label={`${t('password')} *`}
                        isPassword
                        placeholder="••••••••"
                        icon="fa-solid fa-lock"
                        style={{ marginBottom: '10px' }}
                        error={errors.password?.message}
                        {...register('password')}
                    />

                    {/* Remember Me & Forgot Password */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#666' }}>
                            <input
                                type="checkbox"
                                style={{ width: '16px', height: '16px', accentColor: '#1a237e' }}
                                {...register('rememberMe')}
                            />
                            {t('rememberMe')}
                        </label>
                        <Link href={`/${locale}/forgot-password`} style={{ fontSize: '14px', color: '#1a237e', textDecoration: 'none', fontWeight: '500' }}>
                            {t('forgotPassword')}
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isLoading}
                        fullWidth
                        variant="primary"
                        loading={isLoading}
                    >
                        {isLoading
                            ? t('signingIn')
                            : t('signIn')
                        }
                    </Button>
                </form>

                {/* Sign Up Link */}
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                        {t('noAccount')}{' '}
                        <Link href={`/${locale}/signup`} style={{ color: '#1a237e', fontWeight: '600', textDecoration: 'none' }}>
                            {t('signUp')}
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
