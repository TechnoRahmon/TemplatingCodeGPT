import styles from '@/styles/Layout.module.css'
import React, { Dispatch, SetStateAction } from 'react'
import { Aside } from './Aside/Aside';
import { ITemplateItem } from '@/store/localStorageStore';

type ILayout = {
    children: React.ReactNode;
    templateList: Array<ITemplateItem>
    setTemplateList: Dispatch<SetStateAction<ITemplateItem[]>>
}

export type INavItem = {
    id:number;
    name:string;
}
export function Layout({ children, templateList, setTemplateList }: ILayout) {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Aside templateList={templateList} setTemplateList={setTemplateList}/>
            </div>
            <div className={styles.content}>
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child as React.ReactElement, { });
                })}
            </div>
        </div>
    )
}