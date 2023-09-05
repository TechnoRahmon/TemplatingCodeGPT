import React, { Dispatch, SetStateAction } from 'react'
import styles from '@/styles/Aside.module.css'
import AsideNavigation from './AsideNavigation';
import { ITemplateItem } from '@/store/localStorageStore';

export function Aside({
templateList,
setTemplateList
}:{
    templateList: Array<ITemplateItem>,
    setTemplateList: Dispatch<SetStateAction<ITemplateItem[]>>
}) {
    return (
        <div className={styles.container}>
            <AsideNavigation templateList={templateList} setTemplateList={setTemplateList}/>
        </div>
    )
}