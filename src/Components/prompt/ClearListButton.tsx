import React from 'react'
import styles from './../../styles/PromptInput.module.css';
type ClearListButtonpRops ={
    onSubmit:()=>void;
    label:string;
}
export default function ClearListButton({
    onSubmit,
    label
}:ClearListButtonpRops) {
  return (
    <button className={styles.clearButton} onClick={onSubmit}>{label}</button>
  )
}
