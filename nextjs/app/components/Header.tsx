"use client"
import styles from './Header.module.css';
import Link from 'next/link';
import { User, Users, Layout } from 'react-feather';
import { useGlobalContext } from '../Context/ImageContext';

const Header = () => {
    const { pageNameForHeader, pageSectionNameForHeader, iconForHeader, pageURLForHeader } = useGlobalContext();
    const icon = User;
    return (
        <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
            <div className="container-xl px-4">
                <div className="page-header-content pt-4">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-auto mt-4">
                            <h1 className="page-header-title">
                                <div className="page-header-icon">
                                    {iconForHeader === "user" ? (<User />) : iconForHeader === "users" ? (<Users />) : (<Layout />)}
                                </div>
                                {pageSectionNameForHeader}
                            </h1>
                            <div className="page-header-subtitle">{pageNameForHeader} page</div>
                        </div>
                    </div>
                    <nav className="mt-4 rounded" aria-label="breadcrumb">
                        <ol className="breadcrumb px-3 py-2 rounded mb-0">
                            <li className="breadcrumb-item">
                                <Link href="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">{pageURLForHeader}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;