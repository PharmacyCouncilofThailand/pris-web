import styles from './CommitteeSection.module.scss';
import { useTranslations } from 'next-intl';
import { committeeData } from '@/data/committeeData';

export default function CommitteeSection() {
    const t = useTranslations('about');
    const committees = committeeData;

    const getGradientClass = (index: number) => {
        if (index % 3 === 0) return styles.gradientBlue;
        if (index % 3 === 1) return styles.gradientGold;
        return styles.gradientTeal;
    };

    return (
        <div className={`${styles.section} sp2`}>
            <div className="container">
                {/* Header */}
                <div className="row">
                    <div className="col-12">
                        <div className={styles.titleWrapper}>
                            <h2 className={styles.mainTitle}>
                                COMMITTEE
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Committee Sections */}
                {committees.map((committee, index) => (
                    <div key={index} className={styles.committeeBlock}>
                        {/* Category Title */}
                        <h3 className={styles.categoryTitle}>
                            {committee.category}
                        </h3>

                        {/* Organizing Committee - 3 column layout */}
                        {committee.category === "ORGANIZING COMMITTEE" ? (
                            <table className={styles.organizingTable}>
                                <tbody>
                                    {committee.members.map((member, memberIndex) => (
                                        <tr key={memberIndex}>
                                            <td>{member.title || ''}</td>
                                            <td>{member.title ? ':' : ''}</td>
                                            <td>{member.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            /* Regular 2 column table for other committees */
                            <table className={styles.standardTable}>
                                <tbody>
                                    {committee.members.map((member, memberIndex) => (
                                        <tr key={memberIndex}>
                                            <td>{member.name}</td>
                                            <td>{member.affiliation}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {/* Decorative divider after Advisors and Steering Committee */}
                        {(committee.category === "ADVISORS" || committee.category === "STEERING COMMITTEE") && (
                            <div className={styles.decorativeRow}>
                                {[...Array(12)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`${styles.decorativeBox} ${getGradientClass(i)}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
