import styles from './Topnav.module.css';
import { Menu } from 'react-feather';

import Brand from '@/app/components/Brand';
import User from '@/app/components/User';
import Notifications from '@/app/components/Notifications';

const Topnav = ({ 
  sidenav
}: {
  sidenav?: boolean,
}) => {
  return (
    <nav className="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white" id="sidenavAccordion" aria-label="topnav">
        <button className={`${styles.btn} btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0`} id="sidebarToggle" aria-label="sidebar toggle menu">
            {sidenav && <Menu/>}
        </button>
        <Brand/>
        <ul className="navbar-nav align-items-center ms-auto">
            <Notifications/>
            <User/>
        </ul>
    </nav>
  );
};

export default Topnav;