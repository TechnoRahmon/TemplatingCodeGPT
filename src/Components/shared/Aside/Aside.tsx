import React from 'react'
import styles from '@/styles/Aside.module.css'
import AsideNavigation from './AsideNavigation';

export function Aside() {
    return (
        <div className={styles.container}>
            <AsideNavigation />
        </div>
    )
}