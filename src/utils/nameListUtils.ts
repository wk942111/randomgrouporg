export interface ValidationResult {
  isValid: boolean;
  cleanedNames: string[];
  duplicates: string[];
  empty: boolean;
  invalidLines: string[];
  tooLongLines: string[];
}

export interface ValidationOptions {
  allowDuplicates?: boolean;
  maxLength?: number;
  minLength?: number;
  allowNumbers?: boolean;
  allowSpecialChars?: boolean;
  maxLines?: number;
}

const DEFAULT_OPTIONS: ValidationOptions = {
  allowDuplicates: false,
  maxLength: 50,
  minLength: 1,
  allowNumbers: true,
  allowSpecialChars: false,
  maxLines: 1000
};

export const validateAndCleanNames = (
  input: string,
  options: ValidationOptions = {}
): ValidationResult => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  const result: ValidationResult = {
    isValid: false,
    cleanedNames: [],
    duplicates: [],
    empty: false,
    invalidLines: [],
    tooLongLines: []
  };

  // 检查空输入
  if (!input || !input.trim()) {
    result.empty = true;
    return result;
  }

  // 分割并清理名称
  const lines = input.split('\n');
  
  // 检查行数限制
  if (lines.length > opts.maxLines!) {
    result.invalidLines.push(`超出最大行数限制 (${opts.maxLines})`);
    return result;
  }

  const names = lines.map((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return '';

    // 检查长度限制
    if (trimmed.length > opts.maxLength!) {
      result.tooLongLines.push(`第 ${index + 1} 行超出长度限制: ${trimmed}`);
      return '';
    }

    if (trimmed.length < opts.minLength!) {
      result.invalidLines.push(`第 ${index + 1} 行长度不足: ${trimmed}`);
      return '';
    }

    // 构建验证正则表达式
    const allowedChars = [
      '\\p{L}', // Unicode 字母
      '\\s',    // 空白字符
      opts.allowNumbers ? '\\d' : '',
      opts.allowSpecialChars ? '[-_.,\'"]' : ''
    ].filter(Boolean).join('');

    const validationRegex = new RegExp(`^[${allowedChars}]+$`, 'u');

    if (!validationRegex.test(trimmed)) {
      result.invalidLines.push(`第 ${index + 1} 行包含无效字符: ${trimmed}`);
      return '';
    }

    return trimmed;
  }).filter(Boolean);

  if (names.length === 0) {
    result.empty = true;
    return result;
  }

  // 检查重复名称
  const nameCount = new Map<string, number>();
  names.forEach(name => {
    nameCount.set(name, (nameCount.get(name) || 0) + 1);
  });

  // 收集重复项
  nameCount.forEach((count, name) => {
    if (count > 1) {
      result.duplicates.push(`${name} (${count} 次)`);
    }
  });

  // 根据选项决定是否保留重复项
  result.cleanedNames = opts.allowDuplicates ? names : Array.from(new Set(names));

  // 验证结果
  result.isValid = !result.empty && 
    (opts.allowDuplicates || result.duplicates.length === 0) &&
    result.invalidLines.length === 0 &&
    result.tooLongLines.length === 0;

  return result;
};

export const formatValidationErrors = (
  result: ValidationResult,
  t: (key: string, params?: any) => string
): string => {
  const errors: string[] = [];

  if (result.empty) {
    errors.push(t('errors.emptyInput'));
  }

  if (result.duplicates.length > 0) {
    errors.push(t('errors.duplicateItems') + '\n' + result.duplicates.join('、'));
  }

  if (result.invalidLines.length > 0) {
    errors.push(t('errors.invalidInput') + '\n' + result.invalidLines.join('\n'));
  }

  if (result.tooLongLines.length > 0) {
    errors.push(t('errors.tooLong') + '\n' + result.tooLongLines.join('\n'));
  }

  return errors.join('\n\n');
}; 