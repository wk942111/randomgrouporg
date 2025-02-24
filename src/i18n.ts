import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales} from './i18n/locales';

export default getRequestConfig(async ({locale}) => {
  // 验证语言环境是否受支持
  if (!locales[locale as keyof typeof locales]) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: 'Asia/Shanghai'
  };
}); 