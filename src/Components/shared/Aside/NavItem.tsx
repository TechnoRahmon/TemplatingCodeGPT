import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';

type NavItemProps = {
  label: string;
  icon: IconDefinition;
  link: string;
  styles:any;
};

export default function NavItem({ label, icon, link,styles }: NavItemProps) {
  return (
    <li className={styles.item}>
      <Link href={link} className={styles.link}>
        <FontAwesomeIcon icon={icon} className={styles.icon} />
        {label?<span>{label}</span>:""}
      </Link>
    </li>
  );
}
