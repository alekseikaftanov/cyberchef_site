import React, { useState, useRef, useEffect } from 'react';
import styles from './RequestPopup.module.css';
import { validateFile, formatFileSize } from '@/utils/fileValidation';
import { PhoneInput } from '@/components/atoms/PhoneInput';


interface RequestPopupProps {
  open: boolean;
  onClose: () => void;
}



const validateEmail = (email: string) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

export const RequestPopup: React.FC<RequestPopupProps> = ({ open, onClose }) => {
  const [fio, setFio] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneValid, setPhoneValid] = useState(false);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>('');
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<{ fio?: string; company?: string; email?: string; phone?: string; description?: string; agree?: string }>({});
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Block page scroll when popup is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!fio.trim()) newErrors.fio = 'Введите ФИО';
    if (!company.trim()) newErrors.company = 'Введите название компании';
    if (!validateEmail(email)) newErrors.email = 'Некорректный email';
    if (!phoneValid) newErrors.phone = 'Введите корректный телефон';
    if (!description.trim()) newErrors.description = 'Опишите задачу';
    if (!agree) newErrors.agree = 'Необходимо согласие';
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      try {
        // Создаем FormData для отправки файла
        const formData = new FormData();
        formData.append('fio', fio);
        formData.append('company', company);
        formData.append('email', email);
        
        // Получаем полный номер телефона с маской
        const fullPhone = phone.length === 10 ? `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)} ${phone.slice(6, 8)} ${phone.slice(8, 10)}` : phone;
        formData.append('phone', fullPhone);
        
        formData.append('description', description);
        if (file) {
          formData.append('file', file);
        }

        // Отправляем данные на API
        const response = await fetch('/api/submit-request', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            onClose();
            setFio(''); setCompany(''); setEmail(''); setPhone(''); setDescription(''); setFile(null); setAgree(false);
            setFileError('');
            setPhoneValid(false);
          }, 1500);
        } else {
          console.error('Ошибка отправки заявки:', result.error);
          // Можно добавить обработку ошибки для пользователя
        }
      } catch (error) {
        console.error('Ошибка при отправке заявки:', error);
        // Можно добавить обработку ошибки для пользователя
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validation = validateFile(file);
      
      if (validation.isValid) {
        setFile(file);
        setFileError('');
      } else {
        setFile(null);
        setFileError(validation.error || 'Ошибка валидации файла');
        // Очищаем input
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    setFileError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.popup}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">
          <span className={styles.closeIcon}>&times;</span>
        </button>
        <div className={styles.headerBlock}>
          <div className={styles.headerRow}>
            <span className={styles.title}>Оставить заявку</span>
            <div className={styles.headerIcon}></div>
          </div>
          <div className={styles.subtitle}>Просто заполните форму, и мы обсудим ваш проект в ближайшее время</div>
        </div>
        {success ? (
          <div className={styles.successMsg}>Спасибо! Ваша заявка отправлена.</div>
        ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.inputWrap}>
              <input
                type="text"
                placeholder="ФИО"
                value={fio}
                onChange={e => setFio(e.target.value)}
                className={styles.input}
                style={errors.fio ? { borderColor: '#f00' } : {}}
              />
              {errors.fio && <div className={styles.error}>{errors.fio}</div>}
            </div>
            <div className={styles.inputWrap}>
              <input
                type="text"
                placeholder="Название компании"
                value={company}
                onChange={e => setCompany(e.target.value)}
                className={styles.input}
                style={errors.company ? { borderColor: '#f00' } : {}}
              />
              {errors.company && <div className={styles.error}>{errors.company}</div>}
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
              placeholder="Описание задачи"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className={styles.textarea}
              style={errors.description ? { borderColor: '#f00' } : {}}
              rows={4}
            />
            {errors.description && <div className={styles.error}>{errors.description}</div>}
          </div>
          <div className={styles.fileRow}>
            <label className={styles.fileLabel}>
              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <span className={styles.fileBtn}>Приложить файл</span>
              <span className={styles.fileIcon}></span>
            </label>
            {file && (
              <div className={styles.fileInfo}>
                <span>{file.name} ({formatFileSize(file.size)})</span>
                <button type="button" className={styles.fileRemove} onClick={handleFileRemove}>&times;</button>
              </div>
            )}
          </div>
          {fileError && <div className={styles.error}>{fileError}</div>}
          <div className={styles.agreeRow}>
            <div className={styles.checkboxWrap}>
              <input
                type="checkbox"
                checked={agree}
                onChange={e => setAgree(e.target.checked)}
                id="privacy-agree"
                className={styles.checkbox}
              />
            </div>
            <label htmlFor="privacy-agree" className={styles.agreeText}>
              Я даю согласие на обработку{' '}
              <a href="/personal-data?from=form" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                персональных данных
              </a>
              {' '}и соглашаюсь с{' '}
              <a href="/privacy-policy?from=form" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                политикой конфиденциальности
              </a>
            </label>
          </div>
          {errors.agree && <div className={styles.error}>{errors.agree}</div>}
          <div className={styles.submitRow}>
            <button type="submit" className={styles.submitBtn} disabled={!agree}>Оставить заявку <span className={styles.arrow}>&rarr;</span></button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}; 