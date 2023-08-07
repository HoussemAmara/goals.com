import { User } from 'react-feather';
import styles from './Card.module.css';

const Card = ({
  title,
  children,
  footer,
  icon,
}: {
  title?: any,
  children: React.ReactNode,
  footer?: React.ReactNode,
  icon?: string,
}) => {
  return (
    <div className={`${styles.card} shadow-lg border-0 rounded-lg mt-5`}>
      {title &&
        <div className={`${styles.header} justify-content-center`}>

          <h3 className="fw-light my-4">{icon === "user" ? (<User />) : null}{title}</h3>
        </div>
      }
      <div className={styles.body}>
        {children}
      </div>
      {footer &&
        <div className={`${styles.footer} text-center`}>
          <div className="small">
            {footer}
          </div>
        </div>
      }
    </div>
  );
};

export default Card;