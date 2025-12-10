import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './button.css';

export interface ButtonProps {
  primary?: boolean;
  outline?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  leftIcon?: boolean;
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  outline = false,
  size = 'medium',
  backgroundColor,
  leftIcon = false,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'button--primary' : 'button--secondary';
  const border = outline ? 'outline' : '';
  return (
     <button
      type="button"
      className={['button', `button--${size}`, mode, border].join(' ')}
      style={{ backgroundColor }}
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
