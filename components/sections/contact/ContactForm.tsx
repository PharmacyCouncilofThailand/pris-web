'use client'
import { useTranslations } from 'next-intl';
import FormInput from '@/components/common/FormInput';
import FormTextArea from '@/components/common/FormTextArea';
import Button from '@/components/common/Button';

export default function ContactForm() {
    const t = useTranslations('contact');
    const tCommon = useTranslations('common');

    return (
        <div className="contact4-boxarea">
            <h3 className="text-anime-style-3">{t('getInTouch')}</h3>
            <div className="space8" />
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <FormInput
                        placeholder={t('name')}
                        type="text"
                    />
                </div>
                <div className="col-lg-6 col-md-6">
                    <FormInput
                        placeholder={tCommon('phone')}
                        type="tel"
                        onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')
                        }}
                    />
                </div>
                <div className="col-lg-12 col-md-6">
                    <FormInput
                        placeholder={t('emailAddress')}
                        type="email"
                    />
                </div>
                <div className="col-lg-12 col-md-6">
                    <FormInput
                        placeholder={t('subject')}
                        type="text"
                    />
                </div>
                <div className="col-lg-12">
                    <FormTextArea
                        placeholder={t('message')}
                        rows={4}
                    />
                </div>
                <div className="col-lg-12">
                    <div className="space24" />
                    <div className="input-area text-end">
                        <Button type="submit" variant="primary">{t('send')}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
