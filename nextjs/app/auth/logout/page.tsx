'use client'
import Link from 'next/link';
import styles from '../../page.module.css'
import { useEffect } from 'react'

export default function Page() {
  
  useEffect(
    () => {
      (async () => {
        const response = await fetch(
          'http://127.0.0.1:8000/api/users/logout/',{
            method: 'POST',
            credentials: 'include',
        })
        const content = await response.json()
        console.log(content)
      }
      )()
    }
  )

  return (
    <main className={styles.main}>
      <h1>Logout page</h1>
      <Link href="/auth/login">Log back in</Link>
    </main>
  )
}
