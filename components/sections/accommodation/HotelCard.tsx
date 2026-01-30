import { memo } from 'react'
import styles from './HotelCard.module.scss'

interface HotelProps {
    name: string;
    distance: string;
    features: string[];
    image?: string;
}

function HotelCard({ hotel }: { hotel: HotelProps }) {
    return (
        <div className={`row ${styles.row}`} data-aos="fade-up" data-aos-duration={800}>
            <div className="col-12">
                <div className={`pricing-boxarea ${styles.card}`}>
                    <div className={`row align-items-center ${styles.innerRow}`}>
                        <div className="col-md-3">
                            <div className={styles.imageContainer}>
                                {hotel.image ? (
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        className={styles.image}
                                    />
                                ) : (
                                    <i className={`fa-solid fa-hotel ${styles.placeholderIcon}`} />
                                )}
                            </div>
                        </div>
                        <div className={`col-md-6 ${styles.content}`}>
                            <h4>{hotel.name}</h4>
                            <p className={styles.location}>
                                <i className="fa-solid fa-location-dot" />
                                {hotel.distance} from venue
                            </p>
                            <div className={styles.features}>
                                {hotel.features.map((feature, fi) => (
                                    <span key={fi} className={styles.badge}>
                                        <i className="fa-solid fa-check" />
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Memoize component to prevent unnecessary re-renders
export default memo(HotelCard)
