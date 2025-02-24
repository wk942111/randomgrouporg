'use client';

import { useState } from 'react';
import { InputSection } from '../InputSection';
import { generateGroups } from '@/utils/groupGenerator';
import { Alert } from '../shared/Alert';
import { useTranslations } from 'next-intl';

export const GroupGenerator = () => {
  const t = useTranslations('groupGenerator');
  const [groupType, setGroupType] = useState<'byCount' | 'bySize'>('byCount');
  const [groupCount, setGroupCount] = useState(2);
  const [groupSize, setGroupSize] = useState(2);
  const [result, setResult] = useState<string[][]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = (names: string[]) => {
    setError(null);
    setResult([]);

    // 检查输入是否为空
    if (names.length === 0) {
      setError(t('errors.emptyInput'));
      return;
    }

    // 过滤空字符串
    const validNames = names.filter(name => name.trim().length > 0);
    if (validNames.length === 0) {
      setError(t('errors.emptyInput'));
      return;
    }

    // 检查分组参数是否合理
    if (groupType === 'byCount') {
      if (groupCount <= 0) {
        setError(t('errors.invalidInput'));
        return;
      }
      if (groupCount >= validNames.length) {
        setError(t('errors.tooManyGroups'));
        return;
      }
    } else {
      if (groupSize <= 0) {
        setError(t('errors.invalidInput'));
        return;
      }
      if (groupSize >= validNames.length) {
        setError(t('errors.groupSizeTooLarge'));
        return;
      }
    }

    // 生成分组
    const groups = generateGroups(
      validNames,
      groupType === 'byCount' ? groupCount : groupSize,
      groupType === 'byCount' ? 'count' : 'size'
    );

    if (groups.length === 0) {
      setError(t('errors.invalidInput'));
      return;
    }

    setResult(groups);
  };

  const handleExport = (format: 'csv' | 'txt') => {
    if (result.length === 0) return;

    let content = '';
    if (format === 'csv') {
      const maxSize = Math.max(...result.map((group) => group.length));
      content = Array.from({ length: maxSize })
        .map((_, i) => result.map((group) => group[i] || '').join(','))
        .join('\n');
    } else {
      content = result
        .map((group, i) => `${t('results.group', { number: i + 1 })} (${t('results.members', { count: group.length })}):\n${group.join('\n')}`)
        .join('\n\n');
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `random_groups.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card p-6 bg-white shadow-sm">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 左侧: 输入区域 */}
        <div className="lg:w-2/5 space-y-6">
          <InputSection onNamesSubmit={handleGenerate} />
          
          {/* 错误提示 */}
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError(null)}
            />
          )}
          
          {/* 分组设置 */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                {t('settings.method.label')}
              </label>
              <div className="flex gap-4">
                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="radio"
                    className="sr-only peer"
                    name="groupType"
                    checked={groupType === 'byCount'}
                    onChange={() => setGroupType('byCount')}
                  />
                  <div className="w-4 h-4 border rounded-full border-neutral-300 peer-checked:border-primary-500 peer-checked:border-2 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary-500 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="ml-2 text-sm text-neutral-700 peer-checked:text-primary-600">{t('settings.method.byCount')}</span>
                </label>
                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="radio"
                    className="sr-only peer"
                    name="groupType"
                    checked={groupType === 'bySize'}
                    onChange={() => setGroupType('bySize')}
                  />
                  <div className="w-4 h-4 border rounded-full border-neutral-300 peer-checked:border-primary-500 peer-checked:border-2 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary-500 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="ml-2 text-sm text-neutral-700 peer-checked:text-primary-600">{t('settings.method.bySize')}</span>
                </label>
              </div>
            </div>

            {groupType === 'byCount' ? (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  {t('settings.groupCount.label')}
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setGroupCount(Math.max(2, groupCount - 1))}
                    className="p-2 rounded hover:bg-neutral-100"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    min="2"
                    value={groupCount}
                    onChange={(e) => setGroupCount(Math.max(2, parseInt(e.target.value) || 2))}
                    className="w-20 text-center rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                  <button
                    onClick={() => setGroupCount(groupCount + 1)}
                    className="p-2 rounded hover:bg-neutral-100"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-neutral-500">{t('settings.groupCount.description')}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  {t('settings.groupSize.label')}
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setGroupSize(Math.max(2, groupSize - 1))}
                    className="p-2 rounded hover:bg-neutral-100"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    min="2"
                    value={groupSize}
                    onChange={(e) => setGroupSize(Math.max(2, parseInt(e.target.value) || 2))}
                    className="w-20 text-center rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                  <button
                    onClick={() => setGroupSize(groupSize + 1)}
                    className="p-2 rounded hover:bg-neutral-100"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-neutral-500">{t('settings.groupSize.description')}</p>
              </div>
            )}
          </div>
        </div>

        {/* 右侧: 结果区域 */}
        <div className="lg:w-3/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-neutral-900">{t('results.title')}</h3>
            {result.length > 0 && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleExport('txt')}
                  className="btn btn-secondary text-sm py-2"
                >
                  {t('results.exportTxt')}
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="btn btn-secondary text-sm py-2"
                >
                  {t('results.exportCsv')}
                </button>
              </div>
            )}
          </div>

          <div className="min-h-[300px] bg-neutral-50 rounded-lg p-4">
            {result.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {result.map((group, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-medium text-neutral-900 mb-2">
                      {t('results.group', { number: index + 1 })}
                      <span className="text-sm text-neutral-500 ml-2">
                        ({t('results.members', { count: group.length })})
                      </span>
                    </h4>
                    <ul className="space-y-1">
                      {group.map((name, nameIndex) => (
                        <li
                          key={nameIndex}
                          className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-neutral-400">
                {t('results.empty')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};