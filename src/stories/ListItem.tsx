import './ListItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ListItemProps {
  checkbox?: boolean;
  chevron?: boolean;
  icon?: boolean;
  active?: boolean;
  size?: 'default' | 'small';
  label: string;
  disabled?: boolean;
}

/** ListItem component for displaying list items */
export const ListItem = ({
  checkbox = false,
  chevron = false,
  icon = false,
  active = false,
  size = 'default',
  label,
  disabled = false,
}: ListItemProps) => {
  const classes = [
    'list-item',
    `list-item--${size}`,
    checkbox && 'list-item--checkbox',
    chevron && 'list-item--chevron',
    icon && 'list-item--icon',
    active && 'list-item--active',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ul>
      <li className={classes} aria-disabled={disabled}>
        {checkbox && <span className="checkbox"></span>}
        <a>
          {icon && <span className="list-item__icon"><FontAwesomeIcon icon="star" size="1x" /></span>}
          {label}
          {chevron && <span className='list-item__chevron'><FontAwesomeIcon icon="chevron-down" size="xs" /></span>}
        </a>
      </li>
    </ul>
  );
};