import React from "react";
import styles from './../../styles/PromptInput.module.css';

interface Props { 
    onChange:(value:string)=>void;
    value:string;
    onSubmit:()=>void;
    className?:string;
    customButton?:React.ReactNode;
}

export const PromptInput: React.FC<Props> = ({
onChange,value,onSubmit,className,customButton
}) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className={styles.inputWrapper}>
            <textarea className={`${styles.textarea} ${styles[className??""]}`} value={value} onChange={handleInputChange} />
            <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={onSubmit}>Submit</button>
                {customButton??""}
            </div>
        </div>
    );
};