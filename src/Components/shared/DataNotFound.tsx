import React from 'react'
import styles from '@/styles/shared/DataNotFound.module.css'
type IDataNotFound = {
    text: string;
}
export default function DataNotFound({
    text
}: IDataNotFound) {
    return (
        <div className={styles.DataNotFoundContainer}>
            <h1 className={styles.DataNotFoundTitle}>
                {text}
            </h1>
        </div>
    )
}
