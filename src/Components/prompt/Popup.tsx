import React from 'react';
import styles from '@/styles/Popup.module.css'; // Import the CSS module

interface PopupProps {
  onClose: () => void;
  isOpen: boolean;
  text: string;
  title:string;
}

const Popup: React.FC<PopupProps> = ({ onClose, isOpen, text, title}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <span className={styles.closeIcon} onClick={onClose}>
          &times;
        </span>
        <h4>{title}</h4>
        <p className={styles.popupText}>{text}</p>
      </div>
    </div>
  );
};

export default Popup;
