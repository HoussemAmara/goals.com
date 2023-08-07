import styles from './Card.module.css';
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'react-feather';
import { Code, Info, Edit } from 'react-feather';

const CollapsableCard = ({
    icon,
    title,
    children
}: {
    icon?: string,
    title?: string,
    children: React.ReactNode,
}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleCollapse = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`card card-collapsable ${styles.card} mt-1`}>
            <div
                className={`card-header ${styles.header}`}
                onClick={toggleCollapse}
            >
                <span className={`d-flex align-items-end justify-content-between ${styles.headerContent}`}>
                    <div>
                        {icon === "code" ? (<Code />) : icon === "info" ? (<Info />) : icon === "edit" ? (<Edit />) : null}
                        {" " + title}
                    </div>
                    <span className={`${styles.chevronContainer}`}>
                        {isExpanded ? (
                            <ChevronDown className={styles.chevronIcon} />
                        ) : (
                            <ChevronRight className={styles.chevronIcon} />
                        )}
                    </span>
                </span>
            </div>
            <div className={`collapse ${isExpanded ? 'show' : ''}`} id="collapseCardExample ">
                <div className={`${styles.body} ${styles.scrollable}`} style={{ maxHeight: '39vh', overflowY: 'auto' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CollapsableCard;
