import React from 'react';
import './TextArea.css';

export interface TextAreaProps {
  /**
   * Label text for the textarea
   */
  label?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Whether the textarea is disabled
   */
  disabled?: boolean;
  /**
   * Whether the textarea has an error
   */
  error?: boolean;
  /**
   * Error message to display
   */
  errorMessage?: string;
  /**
   * Helper text to display below the textarea
   */
  helperText?: string;
  /**
   * Size of the textarea
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

/** Primary UI component for user input */
export const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder,
  disabled = false,
  error = false,
  errorMessage,
  helperText,
  size = 'medium',
  onChange,
}) => {
  const textareaId = `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const mode = error ? 'textarea--error' : '';

  return (
    <div className="textarea__wrapper">
      {label && (
        <label htmlFor={textareaId} className="textarea__label">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={['textarea', `textarea--${size}`, mode].join(' ')}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        aria-invalid={error}
        aria-describedby={
          error && errorMessage
            ? `${textareaId}-error`
            : helperText
            ? `${textareaId}-helper`
            : undefined
        }
      />
      {error && errorMessage && (
        <span id={`${textareaId}-error`} className="textarea__error-message" role="alert">
          {errorMessage}
        </span>
      )}
      {!error && helperText && (
        <span id={`${textareaId}-helper`} className="textarea__helper-text">
          {helperText}
        </span>
      )}
    </div>
  );
};

TextArea.displayName = 'TextArea';