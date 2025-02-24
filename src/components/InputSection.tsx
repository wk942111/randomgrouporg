'use client';

import { useState } from 'react';
import { Alert } from './shared/Alert';
import { validateAndCleanNames, formatValidationErrors } from '@/utils/nameListUtils';
import { useTranslations } from 'next-intl';

interface InputSectionProps {
  onNamesSubmit: (names: string[]) => void;
}

export const InputSection = ({ onNamesSubmit }: InputSectionProps) => {
  const t = useTranslations('groupGenerator');
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 计算有效行数（非空行）
  const getValidLinesCount = (text: string): number => {
    return text.split('\n').filter(line => line.trim().length > 0).length;
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Submitting text:', inputText);
    
    const validationResult = validateAndCleanNames(inputText, {
      allowDuplicates: true
    });
    console.log('Validation result:', validationResult);
    
    if (!validationResult.isValid) {
      setError(formatValidationErrors(validationResult, t));
      return;
    }

    onNamesSubmit(validationResult.cleanedNames);
    setError(null);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 严格验证文件类型
    if (!file.name.toLowerCase().endsWith('.txt')) {
      setError(t('errors.invalidFileType'));
      event.target.value = ''; // 清空文件输入以允许重新选择
      return;
    }

    try {
      const text = await file.text();
      console.log('File content loaded');
      setInputText(text);
      setError(null);
      event.target.value = ''; // 清空文件输入以允许重复上传
    } catch (err) {
      console.error('File upload error:', err);
      setError(t('errors.fileRead'));
      event.target.value = ''; // 清空文件输入
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    setInputText('');
    setError(null);
  };

  return (
    <div className="card p-6 space-y-6">
      <div className="relative">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t('input.placeholder')}
          className="input-field min-h-[180px] font-mono text-sm resize-y bg-neutral-50 focus:bg-white transition-colors"
          aria-label={t('input.placeholder')}
        />
        <div className="absolute bottom-3 right-3 text-sm text-neutral-500 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
          {t('input.lineCount', { count: getValidLinesCount(inputText) })}
        </div>
      </div>

      {error && (
        <Alert
          message={error}
          type="error"
          onClose={() => setError(null)}
          autoHideDuration={5000}
        />
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary flex-1 sm:flex-none min-w-[120px] group"
        >
          <svg 
            className="w-5 h-5 mr-2 transition-transform group-hover:scale-110 group-hover:rotate-12" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 10V3L4 14h7v7l9-11h-7z" 
            />
          </svg>
          {t('input.generateButton')}
        </button>

        <label className="btn btn-secondary cursor-pointer flex-1 sm:flex-none min-w-[120px] group">
          <svg 
            className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
            />
          </svg>
          {t('input.uploadButton')}
          <input
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        <button
          type="button"
          onClick={handleClear}
          className="btn btn-secondary flex-1 sm:flex-none min-w-[120px] group hover:text-red-600 hover:border-red-200"
        >
          <svg 
            className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
            />
          </svg>
          {t('input.clearButton')}
        </button>
      </div>
    </div>
  );
}; 