"use client"

import styles from './Notifications.module.css';
import Link from 'next/link';
import { Bell, Activity } from 'react-feather';
import { useEffect } from 'react';

const Notifications = () => {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, []);
    
    return(
        <li className="nav-item dropdown no-caret d-none d-sm-block me-3 dropdown-notifications">
            <a className={`${styles.btn} btn btn-icon btn-transparent-dark dropdown-toggle`} id="navbarDropdownNotifications" aria-label="Navbar dropdown notifications" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <Bell/>
            </a>
            <div className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownNotifications">
                <h6 className="dropdown-header dropdown-notifications-header">
                    <Bell className="me-2" />
                    Notifications Center
                </h6>
                <Link className="dropdown-item dropdown-notifications-item" href="/user/notifications#notification.id">
                    <div className="dropdown-notifications-item-icon bg-primarry"><Activity/></div>
                    <div className="dropdown-notifications-item-content">
                        <div className="dropdown-notifications-item-content-details"> June 21, 2023 </div>
                        <div className="dropdown-notifications-item-content-text">
                            A new monthly report is ready. Click here to view!
                        </div>
                    </div>
                </Link>
                <Link className="dropdown-item dropdown-notifications-footer" href="/user/notifications">View All Notifications</Link>
            </div>
        </li>
        
    )
}
export default Notifications;