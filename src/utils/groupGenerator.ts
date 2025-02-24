export const generateGroups = (
  names: string[],
  value: number,
  method: 'size' | 'count'
): string[][] => {
  // 验证输入参数
  if (!Array.isArray(names) || names.length === 0) {
    return [];
  }

  if (typeof value !== 'number' || value <= 0) {
    return [];
  }

  // 过滤空字符串
  const validNames = names.filter(name => name.trim().length > 0);
  
  if (validNames.length === 0) {
    return [];
  }

  // Fisher-Yates 洗牌算法
  const shuffle = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 随机打乱名字列表
  const shuffledNames = shuffle(validNames);

  if (method === 'count') {
    // 按组数分组
    const baseSize = Math.floor(validNames.length / value);
    const remainder = validNames.length % value;

    return Array.from({ length: value }, (_, i) => {
      const start = i * baseSize + Math.min(i, remainder);
      const end = start + baseSize + (i < remainder ? 1 : 0);
      return shuffledNames.slice(start, end);
    });
  } else {
    // 按每组大小分组
    return Array.from(
      { length: Math.ceil(shuffledNames.length / value) },
      (_, i) => shuffledNames.slice(i * value, (i + 1) * value)
    ).filter(group => group.length > 0);
  }
};
