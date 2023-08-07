"use client"

import Link from 'next/link';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '../Context/ImageContext';


const User = () => {
    const { username, setUsername, email, setEmail, picURL, setPicURL } = useGlobalContext();
    const router = useRouter()


    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, []);

    useEffect(() => {
        (async () => {
            const response = await fetch(
                'http://127.0.0.1:8000/api/users/user/',
                { credentials: 'include' }
            )
            const content = await response.json()
            if (response.status == 403) {
                router.push('/auth/login')
            } else {
                setUsername(content.username)
                setEmail(content.email)
                setPicURL(content.avatar_url)
            }
        })()
    })

    return (
        <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
            <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <Image className="img-fluid" src={picURL} alt="profile picture" width="84" height="84" />
            </a>
            <div className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
                <h6 className="dropdown-header d-flex align-items-center">
                    <img className="dropdown-user-img" src={picURL} alt="Profile image" />
                    <div className="dropdown-user-details">
                        <div className="dropdown-user-details-name"> {username} </div>
                        <div className="dropdown-user-details-email"> {email} </div>
                    </div>
                </h6>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" href="/profile">
                    <div className="dropdown-item-icon"><i data-feather="settings"></i></div>
                    Account
                </Link>
                <Link className="dropdown-item" href="/auth/logout">
                    <div className="dropdown-item-icon"><i data-feather="log-out"></i></div>
                    Logout
                </Link>
            </div>
        </li>
    )
}

export default User;