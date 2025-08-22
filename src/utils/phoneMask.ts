export interface PhoneMaskResult {
  displayValue: string;
  rawValue: string;
  isComplete: boolean;
}

export const PHONE_MASK = '+7 (___) ___ __ __';

export const formatPhoneWithMask = (value: string): PhoneMaskResult => {
  // Убираем все нецифровые символы
  const digits = value.replace(/\D/g, '');
  
  // Если первая цифра 8, заменяем на 7
  let normalizedDigits = digits;
  if (normalizedDigits.startsWith('8')) {
    normalizedDigits = '7' + normalizedDigits.slice(1);
  }
  
  // Если нет 7 в начале, добавляем
  if (!normalizedDigits.startsWith('7')) {
    normalizedDigits = '7' + normalizedDigits;
  }
  
  // Ограничиваем до 10 цифр (без 7 в начале)
  const phoneDigits = normalizedDigits.slice(1, 11);
  
  // Формируем отображаемое значение
  let displayValue = '+7 (';
  
  // Добавляем введенные цифры
  if (phoneDigits.length > 0) {
    displayValue += phoneDigits.slice(0, 3);
  }
  
  // Добавляем подчеркивания для оставшихся цифр в первой группе
  const firstGroupRemaining = 3 - Math.min(phoneDigits.length, 3);
  if (firstGroupRemaining > 0) {
    displayValue += '_'.repeat(firstGroupRemaining);
  }
  
  displayValue += ') ';
  
  // Вторая группа (456)
  if (phoneDigits.length > 3) {
    displayValue += phoneDigits.slice(3, 6);
  }
  
  // Добавляем подчеркивания для оставшихся цифр во второй группе
  const secondGroupRemaining = 3 - Math.min(phoneDigits.length - 3, 3);
  if (secondGroupRemaining > 0 && phoneDigits.length > 3) {
    displayValue += '_'.repeat(secondGroupRemaining);
  } else if (phoneDigits.length <= 3) {
    displayValue += '___';
  }
  
  displayValue += ' ';
  
  // Третья группа (78)
  if (phoneDigits.length > 6) {
    displayValue += phoneDigits.slice(6, 8);
  }
  
  // Добавляем подчеркивания для оставшихся цифр в третьей группе
  const thirdGroupRemaining = 2 - Math.min(phoneDigits.length - 6, 2);
  if (thirdGroupRemaining > 0 && phoneDigits.length > 6) {
    displayValue += '_'.repeat(thirdGroupRemaining);
  } else if (phoneDigits.length <= 6) {
    displayValue += '__';
  }
  
  displayValue += ' ';
  
  // Четвертая группа (90)
  if (phoneDigits.length > 8) {
    displayValue += phoneDigits.slice(8, 10);
  }
  
  // Добавляем подчеркивания для оставшихся цифр в четвертой группе
  const fourthGroupRemaining = 2 - Math.min(phoneDigits.length - 8, 2);
  if (fourthGroupRemaining > 0 && phoneDigits.length > 8) {
    displayValue += '_'.repeat(fourthGroupRemaining);
  } else if (phoneDigits.length <= 8) {
    displayValue += '__';
  }
  
  return {
    displayValue,
    rawValue: normalizedDigits,
    isComplete: phoneDigits.length === 10
  };
};

export const validatePhone = (value: string): boolean => {
  const digits = value.replace(/\D/g, '');
  if (digits.startsWith('8')) {
    return digits.length === 11;
  }
  return digits.length === 11 && digits.startsWith('7');
};
