import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';

type NavItemProps = {
  label: string;
  tooltip?:string;
  link: string;
  styles:any;
  icon?: IconDefinition;
};

export default function NavItem({ label, icon, link, styles, tooltip }: NavItemProps) {
  return (
    <li className={styles.item} data-content={tooltip??""}>
      <Link href={link} className={styles.link}>
        {icon ? <FontAwesomeIcon icon={icon} className={styles.icon} />:""}
        {label?<span>{label}</span>:""}
      </Link>
    </li>
  );
}
