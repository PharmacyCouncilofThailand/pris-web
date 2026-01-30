import { welcomeMessages } from "@/data/welcomeData"
import Image from 'next/image';
import styles from './WelcomeMessageList.module.scss';

export default function WelcomeMessageList() {
    return (
        <div className={`service1-section-area sp1 ${styles.section}`}>
            <div className="container">
                {welcomeMessages.map((person, index) => (
                    <div key={person.id} className={`row align-items-center ${styles.card}`}>
                        {/* Alternate layout */}
                        {index % 2 === 0 ? (
                            <>
                                {/* Image on left */}
                                <div className={`col-lg-4 text-center ${styles.imageWrapper}`}>
                                    <div className={styles.imageCircle}>
                                        <div className={styles.imageBorder}>
                                            <Image
                                                src={person.image}
                                                alt={person.name}
                                                className={styles.profileImage}
                                                fill
                                            />
                                        </div>
                                        <div className={styles.roleBadge}>
                                            {person.role}
                                        </div>
                                    </div>
                                    <div className="space20" />
                                    <h4 className={styles.name}>{person.name}</h4>
                                    <p className={styles.title}>{person.title}</p>
                                </div>
                                {/* Message on right */}
                                <div className="col-lg-8">
                                    <div className={styles.messageContent}>
                                        <i className={`fa-solid fa-quote-left ${styles.quoteIconLeft}`} />
                                        {person.message.split('\n\n').map((paragraph, pIndex) => (
                                            <p key={pIndex} className={styles.paragraph}>
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Message on left */}
                                <div className="col-lg-8 order-lg-1 order-2">
                                    <div className={styles.messageContentRight}>
                                        <i className={`fa-solid fa-quote-left ${styles.quoteIconRight}`} />
                                        {person.message.split('\n\n').map((paragraph, pIndex) => (
                                            <p key={pIndex} className={styles.paragraph}>
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                {/* Image on right */}
                                <div className={`col-lg-4 text-center order-lg-2 order-1 ${styles.imageWrapper}`}>
                                    <div className={styles.imageCircle}>
                                        <div className={styles.imageBorder}>
                                            <Image
                                                src={person.image}
                                                alt={person.name}
                                                className={styles.profileImage}
                                                fill
                                            />
                                        </div>
                                        <div className={styles.roleBadge}>
                                            {person.role}
                                        </div>
                                    </div>
                                    <div className="space20" />
                                    <h4 className={styles.name}>{person.name}</h4>
                                    <p className={styles.title}>{person.title}</p>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
