import React from 'react';
import './textfield.css';

export interface TextFieldProps {
  /**
   * The type of input field
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  /**
   * The size of the text field
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Label text for the field
   */
  label?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Current value of the input
   */
  value?: string;
  /**
   * Default value for uncontrolled component
   */
  defaultValue?: string;
  /**
   * Whether the field is disabled
   */
  disabled?: boolean;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Whether the field has an error
   */
  error?: boolean;
  /**
   * Error message to display
   */
  errorMessage?: string;
  /**
   * Helper text to display below the field
   */
  helperText?: string;
  /**
   * Whether to show a left icon
   */
  leftIcon?: boolean;
  /**
   * Custom icon element for left icon
   */
  leftIconElement?: React.ReactNode;
  /**
   * Whether to show a right icon
   */
  rightIcon?: boolean;
  /**
   * Custom icon element for right icon
   */
  rightIconElement?: React.ReactNode;
  /**
   * Name attribute for the input
   */
  name?: string;
  /**
   * ID attribute for the input
   */
  id?: string;
  /**
   * Autocomplete attribute
   */
  autoComplete?: string;
  /**
   * Maximum length of input
   */
  maxLength?: number;
  /**
   * Minimum length of input
   */
  minLength?: number;
  /**
   * Pattern for validation
   */
  pattern?: string;
  /**
   * Whether the field should autofocus
   */
  autoFocus?: boolean;
  /**
   * Whether the field is read-only
   */
  readOnly?: boolean;
  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Key down handler
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * TextField component for user input
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      type = 'text',
      size = 'medium',
      label,
      placeholder,
      value,
      defaultValue,
      disabled = false,
      required = false,
      error = false,
      errorMessage,
      helperText,
      leftIcon = false,
      leftIconElement,
      rightIcon = false,
      rightIconElement,
      name,
      id,
      autoComplete,
      maxLength,
      minLength,
      pattern,
      autoFocus = false,
      readOnly = false,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      className = '',
    },
    ref
  ) => {
    const inputId = id || `textfield-${name || Math.random().toString(36).substr(2, 9)}`;
    
    const inputClasses = [
      'textfield',
      `textfield--${size}`,
      error && 'textfield--error',
      disabled && 'textfield--disabled',
      (leftIcon || leftIconElement) && 'textfield--with-left-icon',
      (rightIcon || rightIconElement) && 'textfield--with-right-icon',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const renderInput = () => (
      <input
        ref={ref}
        id={inputId}
        type={type}
        name={name}
        className={inputClasses}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        autoFocus={autoFocus}
        readOnly={readOnly}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        aria-invalid={error}
        aria-describedby={
          error && errorMessage
            ? `${inputId}-error`
            : helperText
            ? `${inputId}-helper`
            : undefined
        }
      />
    );

    const renderInputWithIcons = () => {
      if (!leftIcon && !rightIcon && !leftIconElement && !rightIconElement) {
        return renderInput();
      }

      return (
        <div className="textfield__input-wrapper">
          {(leftIcon || leftIconElement) && (
            <span className="textfield__icon textfield__icon--left">
              {leftIconElement || '🔍'}
            </span>
          )}
          {renderInput()}
          {(rightIcon || rightIconElement) && (
            <span className="textfield__icon textfield__icon--right">
              {rightIconElement || '✓'}
            </span>
          )}
        </div>
      );
    };

    if (!label && !errorMessage && !helperText) {
      return renderInputWithIcons();
    }

    return (
      <div className="textfield__wrapper">
        {label && (
          <label htmlFor={inputId} className="textfield__label">
            {label}
            {required && <span className="textfield__required"> *</span>}
          </label>
        )}
        {renderInputWithIcons()}
        {error && errorMessage && (
          <span id={`${inputId}-error`} className="textfield__error-message" role="alert">
            {errorMessage}
          </span>
        )}
        {!error && helperText && (
          <span id={`${inputId}-helper`} className="textfield__helper-text">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';