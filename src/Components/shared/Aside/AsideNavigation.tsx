import { faHome, faList, faCog, faDiagramNext, faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import NavItem from './NavItem';
import styles from '@/styles/AsideNavigation.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AsideNavigation() {
  const [minimized, setMinimized] = useState(false);
  const navItems = [
    { label: 'Chat', icon: faHome, link: '/' },
    { label: 'Prompt', icon: faList, link: '/prompt' }
  ];
  const handleMinimize = () => {
    setMinimized(!minimized);
  };
  return (
      <nav className={`${styles.container} ${minimized ? styles.minimized : ''}`}>
        <button className={styles.minimizeButton} onClick={handleMinimize}>
          <span>
            {minimized ? (
              <FontAwesomeIcon icon={faBars}/>
            ) : (
              <FontAwesomeIcon icon={faChevronLeft} />
            )}
          </span>
        </button>
        <ul className={styles.list}>
          {navItems.map((item) => (
            <NavItem styles={styles} key={item.label} label={minimized?"":item.label} icon={item.icon} link={item.link} />
          ))}
        </ul>
      </nav>
  );
}
