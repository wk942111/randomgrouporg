import { MetadataRoute } from 'next';
import { locales } from '@/i18n/locales';

// 定义所有路由
const routes = ['', '/about', '/legal', '/legal/terms', '/legal/privacy'];

// 定义更新频率类型
type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

// 定义路由配置
const routeConfigs: Record<string, { priority: number; changeFrequency: ChangeFrequency }> = {
  '': { priority: 1.0, changeFrequency: 'daily' },
  '/about': { priority: 0.8, changeFrequency: 'monthly' },
  '/legal': { priority: 0.7, changeFrequency: 'monthly' },
  '/legal/terms': { priority: 0.6, changeFrequency: 'monthly' },
  '/legal/privacy': { priority: 0.6, changeFrequency: 'monthly' },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://randomgroup.org';

  return routes.flatMap(route => {
    const { priority, changeFrequency } = routeConfigs[route];
    
    return Object.keys(locales).map(locale => ({
      url: locale === 'en'
        ? `${baseUrl}${route}`
        : `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency,
      priority: locale === 'en' ? priority : priority - 0.1, // 非英文版本优先级略低
    }));
  });
} 