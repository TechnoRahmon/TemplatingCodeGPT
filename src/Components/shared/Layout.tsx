import styles from '@/styles/Layout.module.css'
import React from 'react'
import { Aside } from './Aside/Aside';

type ILayout = {
    children: React.ReactNode;
}

export type INavItem = {
    id:number;
    name:string;
}
export function Layout({ children }: ILayout) {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Aside />
            </div>
            <div className={styles.content}>
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child as React.ReactElement, { });
                })}
            </div>
        </div>
    )
}