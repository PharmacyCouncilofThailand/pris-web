'use client'
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { Hourglass } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import '@/styles/signup-form.css';
import dynamic from 'next/dynamic';
import { logger } from '@/utils/logger';
import 'react-country-state-city/dist/react-country-state-city.css';
import 'react-international-phone/style.css';
import FormInput from '@/components/common/FormInput';
import Button from '@/components/common/Button';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSignupSchema, SignupFormData } from '@/lib/schemas/auth';

// Dynamic Imports for heavy components
const CountrySelect = dynamic(() => import('react-country-state-city').then((mod) => mod.CountrySelect), {
    ssr: false,
    loading: () => <div className="h-10 w-full animate-pulse bg-gray-100 rounded-lg"></div>
});

const PhoneInput = dynamic(() => import('react-international-phone').then((mod) => mod.PhoneInput), {
    ssr: false,
    loading: () => <div className="h-10 w-full animate-pulse bg-gray-100 rounded-lg"></div>
});

type TabType = 'thaiStudent' | 'internationalStudent' | 'thaiProfessional' | 'internationalProfessional';

export default function SignupForm() {
    const t = useTranslations('signup');
    const tCommon = useTranslations('common');
    const tLogin = useTranslations('login');
    const locale = useLocale();
    const router = useRouter();
    const { login } = useAuth();

    const [activeTab, setActiveTab] = useState<TabType>('thaiStudent');
    const [studentDocument, setStudentDocument] = useState<File | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [step, setStep] = useState(1);

    const signupSchema = useMemo(() => createSignupSchema(tCommon), [tCommon]);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        setValue,
        watch,
        trigger
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            organization: '',
            phone: '',
            idCard: '',
            pharmacyLicenseId: '',
            passportId: '',
            country: '',
            agreeTerms: false
        }
    });

    // Handle file selection (store in state only, no upload yet)
    const handleFileSelect = (file: File) => {
        // Validate file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            toast.error(t('errors.fileType'));
            return;
        }
        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            toast.error(t('errors.fileSize'));
            return;
        }
        setStudentDocument(file);
    };

    const onSubmit = async (data: SignupFormData) => {
        try {
            // Additional Validations that are tricky in Zod/Schema alone without splitting schemas
            if (activeTab === 'thaiStudent' || activeTab === 'thaiProfessional') {
                if (!data.idCard) {
                    toast.error(t('errors.idCardRequired'));
                    return;
                }
            } else {
                if (!data.country) {
                    toast.error(t('errors.countryRequired'));
                    return;
                }
                if (!data.passportId) {
                    toast.error(t('errors.passportRequired'));
                    return;
                }
            }

            if (data.phone && !isValidPhoneNumber(data.phone)) {
                toast.error(t('errors.phoneInvalid'));
                return;
            }

            // Validate student document for students
            const isStudent = activeTab === 'thaiStudent' || activeTab === 'internationalStudent';
            if (isStudent && !studentDocument) {
                toast.error(t('errors.studentDocRequired'));
                return;
            }

            // API Call with FormData (file will be uploaded by backend)
            const formDataToSend = new FormData();
            formDataToSend.append('firstName', data.firstName);
            formDataToSend.append('lastName', data.lastName);
            formDataToSend.append('email', data.email);
            formDataToSend.append('password', data.password);
            formDataToSend.append('accountType', activeTab);
            if (data.phone) formDataToSend.append('phone', data.phone);
            if (data.organization) formDataToSend.append('organization', data.organization);

            if (activeTab === 'thaiStudent' || activeTab === 'thaiProfessional') {
                if (data.idCard) formDataToSend.append('idCard', data.idCard);
                if (data.pharmacyLicenseId) formDataToSend.append('pharmacyLicenseId', data.pharmacyLicenseId);
            }
            if (activeTab === 'internationalStudent' || activeTab === 'internationalProfessional') {
                if (data.passportId) formDataToSend.append('passportId', data.passportId);
                if (data.country) formDataToSend.append('country', data.country);
            }
            if (studentDocument) {
                formDataToSend.append('verificationDoc', studentDocument);
            }

            // Call Registration API
            const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                body: formDataToSend,
                credentials: 'include',
            });

            const responseData = await response.json();

            if (!response.ok) {
                toast.error(responseData.error || t('errors.registrationFailed'));
                return;
            }

            // Success handling (reuse isStudent from above)
            if (isStudent) {
                // Show pending modal
                setIsPending(true);
            } else {
                // Auto login for professionals
                login({
                    firstName: responseData.user.firstName,
                    lastName: responseData.user.lastName,
                    email: responseData.user.email,
                    // Map local state to AuthContext type
                    delegateType: activeTab === 'thaiProfessional' ? 'thai_pharmacist' : 'international_pharmacist',
                    isThai: activeTab === 'thaiProfessional',
                    country: data.country || 'Thailand',
                    idCard: data.idCard || '',
                });
                await new Promise(resolve => setTimeout(resolve, 100));
                router.push(`/${locale}`);
            }
        } catch (error) {
            logger.error('Signup error', error, { component: 'SignupForm' });
            toast.error(t('errors.generic'));
        }
    };

    const tabs: { id: TabType }[] = [
        { id: 'thaiStudent' },
        { id: 'internationalStudent' },
        { id: 'thaiProfessional' },
        { id: 'internationalProfessional' }
    ];

    const inputStyle = {
        width: '100%',
        padding: '12px 14px',
        fontSize: '15px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        outline: 'none'
    };

    // Helper for explicit errors type
    const isLoading = isSubmitting;

    // Helper to get tab info
    const getTabLabel = (id: TabType) => {
        const key = id.replace('thai', 'thai_').replace('international', 'international_'); // Mapping if needed or just use simple keys
        // Actually, let's just use the direct keys based on id if they align, or map them manually.
        // en.json has keys: member (Student), thaiPharmacist, internationalPharmacist.
        // But id is 'thaiStudent'.
        // Let's rely on specific keys I'll add or mapping.
        // Actually, I can use the existing `member` key for student but distinction between thai/intl student is valid.
        // Let's just use specific hardcoded keys in en.json logic or mapped.
        // Better:
        switch (id) {
            case 'thaiStudent': return t('types.thaiStudent');
            case 'internationalStudent': return t('types.internationalStudent');
            case 'thaiProfessional': return tCommon('userTypes.thaiPharmacist');
            case 'internationalProfessional': return tCommon('userTypes.internationalPharmacist');
        }
    };

    const getTabDesc = (id: TabType) => {
        switch (id) {
            case 'thaiStudent': return t('types.thaiStudentDesc');
            case 'internationalStudent': return t('types.internationalStudentDesc');
            case 'thaiProfessional': return t('types.thaiProfessionalDesc');
            case 'internationalProfessional': return t('types.internationalProfessionalDesc');
        }
    };

    return (
        <>
            <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '40px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                maxWidth: '480px',
                margin: '0 auto',
                position: 'relative'
            }}>
                {/* Loading Overlay */}
                {isLoading && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(255,255,255,0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2000,
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                        <Hourglass
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="hourglass-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            colors={['#1a237e', '#72a1ed']}
                        />
                        <div style={{ color: '#1a237e', fontSize: '18px', fontWeight: '600' }}>
                            {t('processing')}
                        </div>
                    </div>
                )}

                {/* Modal Overlay */}
                {isPending && (
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
                                {t('accountCreated')}
                            </h3>
                            <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px', lineHeight: '1.6' }}>
                                {t('pendingApproval')}
                            </p>
                            <button
                                onClick={() => router.push(`/${locale}/login`)}
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

                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <Link href={`/${locale}`}>
                        <img src="/assets/img/logo/accp_logo_main.png" alt="Pris 2026"
                            style={{ height: '80px', width: 'auto' }} />
                    </Link>
                </div>

                {/* Title */}
                <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#1a1a1a', textAlign: 'center', marginBottom: '8px' }}>
                    {step === 1
                        ? t('selectAccountType')
                        : t('pageTitle')
                    }
                </h2>
                <p style={{ textAlign: 'center', color: '#666', fontSize: '15px', marginBottom: '32px' }}>
                    {step === 1
                        ? t('selectAccountTypeDesc')
                        : t('pageSubtitle')
                    }
                </p>

                {/* Step 1: Account Type Selection */}
                {step === 1 && (
                    <div className="step-content">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '24px' }}>
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    className="account-type-card"
                                    onClick={() => { setActiveTab(tab.id); setStep(2); }}
                                    style={{
                                        padding: '20px',
                                        border: '2px solid #eef0f2',
                                        borderRadius: '12px',
                                        background: '#fff',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        textAlign: 'left',
                                        width: '100%'
                                    }}
                                >
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        background: tab.id.includes('Student') ? '#e8eaf6' : '#e0f2f1',
                                        color: tab.id.includes('Student') ? '#1a237e' : '#00695c',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '24px',
                                        flexShrink: 0
                                    }}>
                                        {tab.id.includes('Student') ? '🎓' : '⚕️'}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '4px' }}>
                                            {getTabLabel(tab.id)}
                                        </div>
                                        <div style={{ fontSize: '13px', color: '#666' }}>
                                            {getTabDesc(tab.id)}
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: 'auto', color: '#ccc' }}>
                                        →
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Login Link for Step 1 */}
                        <div style={{ textAlign: 'center', marginTop: '24px', borderTop: '1px solid #f0f0f0', paddingTop: '24px' }}>
                            <p style={{ fontSize: '14px', color: '#666' }}>
                                {t('haveAccount')}{' '}
                                <Link href={`/${locale}/login`} style={{ color: '#1a237e', fontWeight: '600', textDecoration: 'none' }}>
                                    {t('signIn')}
                                </Link>
                            </p>
                        </div>
                    </div>
                )}

                {/* Step 2: Form */}
                {step === 2 && (
                    <form onSubmit={handleSubmit(onSubmit)} className="step-content">
                        {/* Selected Type Indicator / Back Button */}
                        <div style={{
                            marginBottom: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: '#f8f9fa',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '1px solid #eef0f2'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    fontSize: '20px',
                                    color: activeTab.includes('Student') ? '#1a237e' : '#00695c'
                                }}>
                                    {activeTab.includes('Student') ? '🎓' : '⚕️'}
                                </div>
                                <div>
                                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#888', fontWeight: '600', letterSpacing: '0.5px' }}>
                                        {t('accountType')}
                                    </div>
                                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>
                                        {getTabLabel(activeTab)}
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                style={{
                                    padding: '6px 12px',
                                    fontSize: '13px',
                                    color: '#1a237e',
                                    fontWeight: '600',
                                    background: 'transparent',
                                    border: '1px solid rgba(26, 35, 126, 0.2)',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {tCommon('change')}
                            </button>
                        </div>
                        {/* Name Fields */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                            <div>
                                <FormInput
                                    label={`${t('firstName')} *`}
                                    type="text"
                                    placeholder={t('firstName')}
                                    error={errors.firstName?.message}
                                    {...register('firstName')}
                                />
                            </div>
                            <div>
                                <FormInput
                                    label={`${t('lastName')} *`}
                                    type="text"
                                    placeholder={t('lastName')}
                                    error={errors.lastName?.message}
                                    {...register('lastName')}
                                />
                            </div>
                        </div>

                        {/* Thai Student/Professional: ID Card */}
                        {(activeTab === 'thaiStudent' || activeTab === 'thaiProfessional') && (
                            <div style={{ marginBottom: '16px' }}>
                                <FormInput
                                    label={`${t('idCard')} *`}
                                    placeholder={t('idCardPlaceholder')}
                                    maxLength={13}
                                    error={errors.idCard?.message}
                                    {...register('idCard')}
                                    onChange={(e) => {
                                        // Allow only numbers and limit to 13
                                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 13);
                                        register('idCard').onChange(e);
                                    }}
                                />
                                <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                                    {t('idCardHint')}
                                </p>
                            </div>
                        )}

                        {/* Thai Professional: Pharmacy License ID (Optional) */}
                        {activeTab === 'thaiProfessional' && (
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                    {t('pharmacyLicense')}
                                </label>
                                <input type="text"
                                    placeholder={t('pharmacyLicensePlaceholder')}
                                    style={inputStyle}
                                    {...register('pharmacyLicenseId')}
                                />
                            </div>
                        )}

                        {/* International: Passport ID + Country */}
                        {(activeTab === 'internationalStudent' || activeTab === 'internationalProfessional') && (
                            <>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                        {t('passportId')} <span style={{ color: '#e53935' }}>*</span>
                                    </label>
                                    <input type="text"
                                        placeholder={t('passportIdPlaceholder')}
                                        maxLength={9}
                                        style={{ ...inputStyle, ...(errors.passportId ? { borderColor: 'red' } : {}) }}
                                        {...register('passportId')}
                                    />
                                    {errors.passportId && <span style={{ color: 'red', fontSize: '12px' }}>{errors.passportId.message}</span>}
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                        {t('country')} <span style={{ color: '#e53935' }}>*</span>
                                    </label>
                                    <Controller
                                        control={control}
                                        name="country"
                                        render={({ field }) => (
                                            <CountrySelect
                                                onChange={(e: any) => field.onChange(e?.name || '')}
                                                placeHolder={t('countryPlaceholder')}
                                            />
                                        )}
                                    />
                                    {errors.country && <span style={{ color: 'red', fontSize: '12px' }}>{errors.country.message}</span>}
                                </div>
                            </>
                        )}

                        {/* Email */}
                        <FormInput
                            label={`${t('email')} *`}
                            type="email"
                            placeholder="email@example.com"
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        {/* Organization */}
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                {t('organization')}
                            </label>
                            <input type="text"
                                placeholder={t('organization')} style={inputStyle}
                                {...register('organization')}
                            />
                        </div>

                        {/* Phone Number */}
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                {t('phoneNumber')}
                            </label>
                            <div style={{
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                padding: '12px 14px',
                                background: '#fff'
                            }}>
                                <Controller
                                    control={control}
                                    name="phone"
                                    render={({ field }) => (
                                        <PhoneInput
                                            defaultCountry="th"
                                            value={field.value}
                                            onChange={(phone: string) => field.onChange(phone)}
                                            inputStyle={{
                                                width: '100%',
                                                border: 'none',
                                                outline: 'none',
                                                fontSize: '15px',
                                                background: 'transparent'
                                            }}
                                            countrySelectorStyleProps={{
                                                buttonStyle: {
                                                    border: 'none',
                                                    background: 'transparent'
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        {/* Password Fields */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                            <div>
                                <FormInput
                                    label={`${t('password')} *`}
                                    isPassword
                                    placeholder="••••••••"
                                    error={errors.password?.message}
                                    {...register('password')}
                                />
                            </div>
                            <div>
                                <FormInput
                                    label={`${t('confirmPassword')} *`}
                                    isPassword
                                    placeholder="••••••••"
                                    error={errors.confirmPassword?.message}
                                    {...register('confirmPassword')}
                                />
                            </div>
                        </div>

                        {/* Student Document Upload */}
                        {(activeTab === 'thaiStudent' || activeTab === 'internationalStudent') && (
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                    {t('studentDoc')} <span style={{ color: '#e53935' }}>*</span>
                                </label>
                                <input
                                    id="student-doc-input"
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleFileSelect(file);
                                        e.target.value = '';
                                    }}
                                    style={{ display: 'none' }}
                                />
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('student-doc-input')?.click()}
                                        disabled={!!studentDocument}
                                        style={{
                                            flex: 1,
                                            padding: '12px 14px',
                                            fontSize: '15px',
                                            border: studentDocument ? '2px solid #4caf50' : '2px solid #1a237e',
                                            borderRadius: '8px',
                                            background: studentDocument ? '#e8f5e9' : '#f5f5ff',
                                            color: studentDocument ? '#2e7d32' : '#1a237e',
                                            cursor: studentDocument ? 'default' : 'pointer',
                                            fontWeight: '500',
                                            transition: 'all 0.2s ease',
                                            opacity: studentDocument ? 0.9 : 1
                                        }}
                                    >
                                        {studentDocument
                                            ? '📄 ' + studentDocument.name
                                            : t('chooseFile')
                                        }
                                    </button>
                                    {studentDocument && (
                                        <button
                                            type="button"
                                            onClick={() => setStudentDocument(null)}
                                            style={{
                                                padding: '12px 16px',
                                                fontSize: '15px',
                                                border: '2px solid #e53935',
                                                borderRadius: '8px',
                                                background: '#ffebee',
                                                color: '#c62828',
                                                cursor: 'pointer',
                                                fontWeight: '500',
                                                transition: 'all 0.2s ease'
                                            }}
                                            title={t('removeFile')}
                                        >
                                            🗑️
                                        </button>
                                    )}
                                </div>
                                <p style={{ fontSize: '12px', color: studentDocument ? '#4caf50' : '#888', marginTop: '4px' }}>
                                    {studentDocument
                                        ? t('fileSelected')
                                        : t('studentDocHint')
                                    }
                                </p>
                            </div>
                        )}

                        {/* Terms */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                                <input type="checkbox"
                                    style={{ width: '18px', height: '18px', marginTop: '2px' }}
                                    {...register('agreeTerms')}
                                />
                                <span style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>
                                    {t('agreeTerms')} <Link href="/terms" style={{ color: '#1a237e' }}>{t('terms')}</Link> {t('and')} <Link href="/privacy" style={{ color: '#1a237e' }}>{t('privacy')}</Link>
                                </span>
                            </label>
                            {errors.agreeTerms && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.agreeTerms.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            fullWidth
                            variant="primary"
                            loading={isLoading}
                        >
                            {isLoading ? t('creating') : t('createAccount')}
                        </Button>
                        {/* Login Link for Step 2 */}
                        <div style={{ textAlign: 'center', marginTop: '24px' }}>
                            <p style={{ fontSize: '14px', color: '#666' }}>
                                {t('haveAccount')}{' '}
                                <Link href={`/${locale}/login`} style={{ color: '#1a237e', fontWeight: '600', textDecoration: 'none' }}>
                                    {t('signIn')}
                                </Link>
                            </p>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}
