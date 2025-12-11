import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Button.css';

export interface SecondaryButtonProps {
  outline?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  leftIcon?: boolean;
  onClick?: () => void;
  disabled?: boolean; // Added disabled boolean
}

/** Secondary UI component for user interaction */
export const SecondaryButton = ({
  outline = false,
  size = 'medium',
  backgroundColor,
  leftIcon = false,
  label,
  disabled = false, // Default value for disabled
  ...props
}: SecondaryButtonProps) => {
  const border = outline ? 'outline' : '';
  return (
     <button
      type="button"
      className={['button button--secondary', `button--${size}`, border].join(' ')}
      style={{ backgroundColor }}
      disabled={disabled} // Applied disabled attribute
      {...props}
    >
      {leftIcon && (
        <span className="button__icon">
         <FontAwesomeIcon icon="star" size="1x"/>
        </span>
      )}
      {label}
    </button>
  );
};