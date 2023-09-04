import { faHome, faBars, faChevronLeft, faAdd } from '@fortawesome/free-solid-svg-icons';
import NavItem from './NavItem';
import styles from '@/styles/AsideNavigation.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITemplateItem, emptyTempaltItem } from '@/store/localStorageStore';

export default function AsideNavigation() {
  const [minimized, setMinimized] = useState(false);
  const navItems = [
    { label: 'Chat', icon: faHome, link: '/' }
  ];
  const [templateList, setTemaplteList] = useState<Array<ITemplateItem>>([emptyTempaltItem]);

  const handleMinimize = () => {
    setMinimized(!minimized);
  };
  const handleClick = () => {

  }
  return (
    <nav className={`${styles.container} ${minimized ? styles.minimized : ''}`}>
      <button className={styles.minimizeButton} onClick={handleMinimize}>
        <span>
          {minimized ? (
            <FontAwesomeIcon icon={faBars} />
          ) : (
            <FontAwesomeIcon icon={faChevronLeft} />
          )}
        </span>
      </button>
      <ul className={styles.list}>
        {navItems.map((item) => (
          <NavItem styles={styles} key={item.label} label={minimized ? "" : item.label} icon={item.icon} link={item.link} />
        ))}
      </ul>

      <hr />

      {/* begin:: template list items */}
      <button className={styles.addTemplateButton} onClick={handleMinimize}>
        <span>
          <FontAwesomeIcon icon={faAdd} />
        </span>
      </button>
      {/*end :: template list items */}
      <div className={styles.templateListSection}>
        <ul className={styles.list}>
          {templateList.map((item) => (
            <div className={minimized ? styles.minimizedItem : ''}>
              <NavItem styles={styles} key={item.id} label={minimized ? item.title[0] : item.title} tooltip={item.title} link={`/`} />
            </div>
          ))}
        </ul>
      </div>
    </nav>
  );
}
