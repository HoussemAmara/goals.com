import styles from './Brand.module.css';
import Link from 'next/link';
import Image from 'next/image'

const Brand = () => {
    return(
        <Link className={`${styles.brand} pe-3 ps-4 ps-lg-2`} href="/">
            CallCenterERP <Image src="/logo.png" alt="Callcenter ERP Icon" height="128" width="128"/>
        </Link>
    )
}

export default Brand;