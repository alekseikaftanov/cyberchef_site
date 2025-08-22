"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './RequestPopup.module.css';
import { useResumePopup } from '@/contexts/ResumePopupContext';
import { validateFile, formatFileSize } from '@/utils/fileValidation';
import { PhoneInput } from '@/components/atoms/PhoneInput';

const validateEmail = (email: string) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

const POSITIONS = [
  { value: 'development', label: 'Разработка' },
  { value: 'analytics', label: 'Аналитика' },
  { value: 'management', label: 'Менеджмент' },
  { value: 'other', label: 'Иное' }
];

export const ResumePopup: React.FC = () => {
  const { isResumePopupOpen, closeResumePopup } = useResumePopup();
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneValid, setPhoneValid] = useState(false);
  const [comment, setComment] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>('');
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; position?: string; email?: string; phone?: string; comment?: string; resumeFile?: string; agree?: string }>({});
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Block page scroll when popup is open
  useEffect(() => {
    if (isResumePopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isResumePopupOpen]);

  if (!isResumePopupOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Введите имя';
    if (!position.trim()) newErrors.position = 'Выберите желаемую позицию';
    if (!validateEmail(email)) newErrors.email = 'Некорректный email';
    if (!phoneValid) newErrors.phone = 'Введите корректный телефон';
    if (!comment.trim()) newErrors.comment = 'Добавьте комментарий';
    if (!resumeFile) newErrors.resumeFile = 'Приложите резюме';
    if (!agree) newErrors.agree = 'Необходимо согласие';
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      try {
        // Создаем FormData для отправки файла
        const formData = new FormData();
        formData.append('name', name);
        formData.append('position', position);
        formData.append('email', email);
        
        // Получаем полный номер телефона с маской
        const fullPhone = phone.length === 10 ? `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)} ${phone.slice(6, 8)} ${phone.slice(8, 10)}` : phone;
        formData.append('phone', fullPhone);
        
        formData.append('comment', comment);
        if (resumeFile) {
          formData.append('resumeFile', resumeFile);
        }

        // Отправляем данные на API
        const response = await fetch('/api/submit-resume', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            closeResumePopup();
            setName(''); setPosition(''); setEmail(''); setPhone(''); setComment(''); setResumeFile(null); setAgree(false);
            setFileError('');
            setPhoneValid(false);
          }, 1500);
        } else {
          console.error('Ошибка отправки резюме:', result.error);
          // Можно добавить обработку ошибки для пользователя
        }
      } catch (error) {
        console.error('Ошибка при отправке резюме:', error);
        // Можно добавить обработку ошибки для пользователя
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validation = validateFile(file);
      
      if (validation.isValid) {
        setResumeFile(file);
        setFileError('');
      } else {
        setResumeFile(null);
        setFileError(validation.error || 'Ошибка валидации файла');
        // Очищаем input
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    }
  };

  const handleFileRemove = () => {
    setResumeFile(null);
    setFileError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeResumePopup();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.popup}>
        <button className={styles.closeBtn} onClick={closeResumePopup} aria-label="Закрыть">
          <span className={styles.closeIcon}>&times;</span>
        </button>
        <div className={styles.headerBlock}>
          <div className={styles.headerRow}>
            <span className={styles.title}>Отправить резюме</span>
            <div className={styles.headerIcon}></div>
          </div>
          <div className={styles.subtitle}>Заполните форму и приложите резюме. Мы свяжемся с вами в ближайшее время</div>
        </div>
        {success ? (
          <div className={styles.successMsg}>Спасибо! Ваше резюме отправлено.</div>
        ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.inputWrap}>
              <input
                type="text"
                placeholder="Имя"
                value={name}
                onChange={e => setName(e.target.value)}
                className={styles.input}
                style={errors.name ? { borderColor: '#f00' } : {}}
              />
              {errors.name && <div className={styles.error}>{errors.name}</div>}
            </div>
            <div className={styles.inputWrap}>
              <select
                value={position}
                onChange={e => setPosition(e.target.value)}
                className={styles.input}
                style={errors.position ? { borderColor: '#f00' } : {}}
              >
                <option value="">Выберите позицию</option>
                {POSITIONS.map(pos => (
                  <option key={pos.value} value={pos.value}>
                    {pos.label}
                  </option>
                ))}
              </select>
              {errors.position && <div className={styles.error}>{errors.position}</div>}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.inputWrap}>
              <PhoneInput
                value={phone}
                onChange={setPhone}
                onValidationChange={setPhoneValid}
                placeholder="Телефон"
                error={!!errors.phone}
              />
              {errors.phone && <div className={styles.error}>{errors.phone}</div>}
            </div>
            <div className={styles.inputWrap}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={styles.input}
                style={errors.email ? { borderColor: '#f00' } : {}}
              />
              {errors.email && <div className={styles.error}>{errors.email}</div>}
            </div>
          </div>
          <div className={styles.textareaWrap}>
            <textarea
              placeholder="Дополнительный комментарий"
              value={comment}
              onChange={e => setComment(e.target.value)}
              className={styles.textarea}
              style={errors.comment ? { borderColor: '#f00' } : {}}
              rows={4}
            />
            {errors.comment && <div className={styles.error}>{errors.comment}</div>}
          </div>
          <div className={styles.fileRow}>
            <label className={styles.fileLabel}>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <span className={styles.fileBtn}>Приложить резюме</span>
              <span className={styles.fileIcon}></span>
            </label>
            {resumeFile && (
              <div className={styles.fileInfo}>
                <span>{resumeFile.name} ({formatFileSize(resumeFile.size)})</span>
                <button type="button" className={styles.fileRemove} onClick={handleFileRemove}>&times;</button>
              </div>
            )}
            {fileError && <div className={styles.error}>{fileError}</div>}
          </div>
          {errors.resumeFile && <div className={styles.error}>{errors.resumeFile}</div>}
          <div className={styles.agreeRow}>
            <div className={styles.checkboxWrap}>
              <input
                type="checkbox"
                checked={agree}
                onChange={e => setAgree(e.target.checked)}
                id="resume-privacy-agree"
                className={styles.checkbox}
              />
            </div>
            <label htmlFor="resume-privacy-agree" className={styles.agreeText}>
              Я даю согласие на обработку{' '}
              <a href="/personal-data" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                персональных данных
              </a>
              {' '}и соглашаюсь с{' '}
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                политикой конфиденциальности
              </a>
            </label>
          </div>
          {errors.agree && <div className={styles.error}>{errors.agree}</div>}
          <div className={styles.submitRow}>
            <button type="submit" className={styles.submitBtn} disabled={!agree}>Отправить резюме <span className={styles.arrow}>&rarr;</span></button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};
