import { faHome, faBars, faChevronLeft, faAdd, faGear } from '@fortawesome/free-solid-svg-icons';
import NavItem from './NavItem';
import styles from '@/styles/AsideNavigation.module.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITemplateItem, Store, _getEmptyTempaltItem } from '@/store/localStorageStore';

export default function AsideNavigation() {
  const [minimized, setMinimized] = useState(false);
  const navItems = [
    { label: 'Chat', icon: faHome, link: '/' },
    { label: 'Config', icon: faGear, link: '/config' }
  ];
  const [templateList, setTemplateList] = useState<Array<ITemplateItem>>([]);

  const handleMinimize = () => {
    setMinimized(!minimized);
  };
  const handleClick = () => {
    setTemplateList(state => [_getEmptyTempaltItem(), ...state]);
  }

  useEffect(() => {
    const newStore = new Store();
    // get template list
    const templateList = newStore?.getPromptTemplateList();
    // set the template list
    setTemplateList(templateList.length? templateList : [_getEmptyTempaltItem()]);
  }, [])

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
      <button className={styles.addTemplateButton} onClick={handleClick}>
        <span>
          <FontAwesomeIcon icon={faAdd} />
        </span>
      </button>
      {/*end :: template list items */}
      <div className={styles.templateListSection}>
        <ul className={styles.list}>
          {templateList.map((item) => (
            <div className={minimized ? styles.minimizedItem : ''}>
              <NavItem styles={styles} key={item.id} label={minimized ? item.title[0] : item.title} tooltip={item.title} link={`/template/${item.id}`} />
            </div>
          ))}
        </ul>
      </div>
    </nav>
  );
}
