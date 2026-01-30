import styles from './ProgramSchedule.module.scss';
import { useTranslations } from 'next-intl';
import { programDays } from '@/data/programData';

interface Event {
    time: string;
    titleKey: string;
    type: string;
    icon: string;
}

interface GroupedEvent {
    time: string;
    events: Event[];
}

export default function ProgramSchedule() {
    const t = useTranslations('program');

    const getEventColor = (type: string) => {
        switch (type) {
            case 'plenary': return '#8B5CF6';
            case 'symposia': return '#3B82F6';
            case 'oral': return '#10B981';
            case 'poster': return '#F59E0B';
            case 'ceremony': return '#EC4899';
            case 'social': return '#EF4444';
            case 'workshop': return '#10B981';
            case 'registration': return '#6366F1';
            case 'break': return '#9CA3AF';
            default: return '#9CA3AF';
        }
    }

    const handleDownload = () => {
        const pdfUrl = '/assets/documents/program_agenda.pdf';
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'Pris2026_Program_Agenda.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Group events by time
    const groupEventsByTime = (events: Event[]): GroupedEvent[] => {
        const grouped: { [key: string]: Event[] } = {};
        events.forEach(event => {
            if (!grouped[event.time]) {
                grouped[event.time] = [];
            }
            grouped[event.time].push(event);
        });
        return Object.entries(grouped).map(([time, events]) => ({ time, events }));
    };

    return (
        <div className={`service1-section-area sp1 ${styles.section}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 m-auto">
                        <div className={`heading2 text-center space-margin60 ${styles.heading}`}>
                            <h5 data-aos="fade-up" data-aos-duration={800}>{t('scientificProgram')}</h5>
                            <div className="space16" />
                            <h2 className="text-anime-style-3">{t('programAtAGlance')}</h2>
                            <div className="space16" />
                            <p data-aos="fade-up" data-aos-duration={1000}>{t('programDesc')}</p>
                        </div>
                    </div>
                </div>

                {/* e-Program Buttons */}
                <div className="row" data-aos="fade-up" data-aos-duration={800}>
                    <div className="col-12">
                        <div className={styles.eprogramButtons}>
                            <a href="/e-program" className={styles.btnPrimary}>
                                <i className="fa-solid fa-book-open" />
                                <span>e-Program</span>
                            </a>
                            <a href="/assets/documents/e-program.pdf" download className={styles.btnDownload}>
                                <i className="fa-solid fa-download" />
                                <span className={styles.downloadLabel}>Download e-Program</span>
                            </a>
                        </div>
                    </div>
                </div>

                {programDays.map((day, dayIndex) => {
                    const groupedEvents = groupEventsByTime(day.events);
                    return (
                        <div key={dayIndex} className="row" data-aos="fade-up" data-aos-duration={800} data-aos-delay={dayIndex * 100}>
                            <div className="col-12">
                                <div className={styles.scheduleBox}>
                                    <div className={styles.scheduleHeader}>
                                        <div className={styles.dateBadge}>
                                            <span className={styles.dayLabel}>{t(day.dayKey)}</span>
                                            <span className={styles.dateLabel}>{day.date}</span>
                                        </div>
                                        <button
                                            className={styles.downloadBtn}
                                            onClick={handleDownload}
                                            aria-label="Download Agenda"
                                        >
                                            <i className="fa-solid fa-download" />
                                            <span className={styles.downloadText}>Download Agenda</span>
                                        </button>
                                    </div>
                                    <div className={styles.scheduleContent}>
                                        {groupedEvents.map((group, groupIndex) => {
                                            const isParallel = group.events.length > 1;
                                            const firstEventColor = getEventColor(group.events[0].type);

                                            return (
                                                <div
                                                    key={groupIndex}
                                                    className={`${styles.scheduleRow} ${groupIndex % 2 === 0 ? styles.scheduleRowEven : styles.scheduleRowOdd}`}
                                                >
                                                    {/* Time Column */}
                                                    <div className={styles.timeCol} style={{ borderLeftColor: firstEventColor }}>
                                                        <i className={`fa-solid ${group.events[0].icon}`} style={{ color: firstEventColor }} />
                                                        <span>{group.time}</span>
                                                    </div>

                                                    {/* Events Column(s) */}
                                                    <div className={`${styles.eventsContainer} ${isParallel ? styles.multiColumn : ''}`}>
                                                        {group.events.map((event, eventIndex) => {
                                                            const eventColor = getEventColor(event.type);
                                                            return (
                                                                <div key={eventIndex} className={styles.eventItem} style={{
                                                                    borderLeft: isParallel ? `3px solid ${eventColor}` : 'none'
                                                                }}>
                                                                    <span className={styles.eventTitle}>{t(event.titleKey)}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
