import { formatPhoneWithMask } from '../phoneMask';

describe('phoneMask', () => {
  describe('formatPhoneWithMask', () => {
    it('возвращает маску для пустого ввода', () => {
      const result = formatPhoneWithMask('');
      expect(result.displayValue).toBe('+7 (___) ___ __ __');
      expect(result.isComplete).toBe(false);
    });

    it('форматирует неполный номер телефона (3 цифры)', () => {
      const result = formatPhoneWithMask('123');
      expect(result.displayValue).toBe('+7 (123) ___ __ __');
      expect(result.isComplete).toBe(false);
    });

    it('форматирует полный номер телефона', () => {
      const result = formatPhoneWithMask('1234567890');
      expect(result.displayValue).toBe('+7 (123) 456 78 90');
      expect(result.isComplete).toBe(true);
    });

    it('форматирует номер с 1 цифрой', () => {
      const result = formatPhoneWithMask('1');
      expect(result.displayValue).toBe('+7 (1__) ___ __ __');
      expect(result.isComplete).toBe(false);
    });

    it('форматирует номер с 6 цифрами', () => {
      const result = formatPhoneWithMask('123456');
      expect(result.displayValue).toBe('+7 (123) 456 __ __');
      expect(result.isComplete).toBe(false);
    });

    it('форматирует номер с 8 цифрами', () => {
      const result = formatPhoneWithMask('12345678');
      expect(result.displayValue).toBe('+7 (123) 456 78 __');
      expect(result.isComplete).toBe(false);
    });

    it('форматирует номер с 10 цифрами', () => {
      const result = formatPhoneWithMask('1234567890');
      expect(result.displayValue).toBe('+7 (123) 456 78 90');
      expect(result.isComplete).toBe(true);
    });

    it('обрабатывает ввод больше 10 цифр', () => {
      const result = formatPhoneWithMask('12345678901');
      expect(result.displayValue).toBe('+7 (123) 456 78 90');
      expect(result.isComplete).toBe(true);
    });

    it('работает с нулевыми значениями', () => {
      const result = formatPhoneWithMask('0000000000');
      expect(result.displayValue).toBe('+7 (000) 000 00 00');
      expect(result.isComplete).toBe(true);
    });

    it('работает с максимальными значениями', () => {
      const result = formatPhoneWithMask('9999999999');
      expect(result.displayValue).toBe('+7 (999) 999 99 99');
      expect(result.isComplete).toBe(true);
    });

    it('обрабатывает номер начинающийся с 8', () => {
      const result = formatPhoneWithMask('81234567890');
      expect(result.displayValue).toBe('+7 (123) 456 78 90');
      expect(result.isComplete).toBe(true);
    });

    it('возвращает правильное rawValue', () => {
      const result = formatPhoneWithMask('1234567890');
      expect(result.rawValue).toBe('71234567890');
    });

    it('добавляет 7 если номер не начинается с неё', () => {
      const result = formatPhoneWithMask('1234567890');
      expect(result.rawValue).toBe('71234567890');
    });
  });
});
