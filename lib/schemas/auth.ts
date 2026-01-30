import { z } from 'zod';

export const createLoginSchema = (t: any) => z.object({
    email: z.string().email({ message: t('validation.emailInvalid') }),
    password: z.string().min(1, { message: t('validation.passwordRequired') }),
    rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;

export const createSignupSchema = (t: any) => z.object({
    firstName: z.string().min(1, { message: t('validation.firstNameRequired') }),
    lastName: z.string().min(1, { message: t('validation.lastNameRequired') }),
    email: z.string().email({ message: t('validation.emailInvalid') }),
    password: z.string().min(8, { message: t('validation.passwordMin') }),
    confirmPassword: z.string().min(1, { message: t('validation.confirmPasswordRequired') }),
    organization: z.string().optional(),
    phone: z.string().optional(),
    idCard: z.string().optional(),
    pharmacyLicenseId: z.string().optional(),
    passportId: z.string().optional(),
    country: z.string().optional(),
    agreeTerms: z.boolean().refine((val) => val === true, { message: t('validation.agreeTermsRequired') }),
}).refine((data) => data.password === data.confirmPassword, {
    message: t('validation.passwordsNoMatch'),
    path: ["confirmPassword"],
});

export type SignupFormData = z.infer<ReturnType<typeof createSignupSchema>>;
