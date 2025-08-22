"use client";

import React, { useState, useRef, useEffect } from 'react';
import { formatPhoneWithMask } from '@/utils/phoneMask';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidationChange?: (isValid: boolean) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  disabled?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  onValidationChange,
  placeholder = "Телефон",
  className = "",
  error = false,
  disabled = false
}) => {
  const [displayValue, setDisplayValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const result = formatPhoneWithMask(value);
    setDisplayValue(result.displayValue);
    
    if (onValidationChange) {
      onValidationChange(result.isComplete);
    }
  }, [value, onValidationChange]);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Убираем все нецифровые символы
    const digits = inputValue.replace(/\D/g, '');
    
    // Ограничиваем до 10 цифр (без 7 в начале)
    if (digits.length <= 10) {
      onChange(digits);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && value.length > 0) {
      onChange(value.slice(0, -1));
      e.preventDefault();
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Скрытый input для ввода */}
      <input
        ref={inputRef}
        type="tel"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="absolute inset-0 w-full h-full opacity-0 cursor-text z-10"
        disabled={disabled}
        maxLength={10}
      />
      
      {/* Визуальное отображение */}
      <div
        ref={displayRef}
        onClick={handleFocus}
        className={`
          w-full h-12 bg-[#F5F7FA] border-2 rounded-[10px] 
          font-medium text-[#5C5C5C] tracking-[-0.04em] outline-none
          cursor-text transition-all duration-200 flex items-center justify-start
          px-4 py-3 box-border
          ${error ? 'border-red-500' : 'border-transparent'}
          ${isFocused ? 'border-[#A5F04B] bg-[#f8fff0]' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {/* Если нет введенных цифр, показываем только плейсхолдер */}
        {value.length === 0 && !isFocused ? (
          <span className="text-[#5C5C5C] opacity-50 font-medium">
            {placeholder}
          </span>
        ) : (
          /* Иначе показываем маску телефона */
          <span className="text-[#5C5C5C]">
            {displayValue}
          </span>
        )}
      </div>
    </div>
  );
};
