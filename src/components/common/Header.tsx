'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('common');

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors"
          >
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xl font-bold hidden sm:inline">Random Group</span>
          </Link>

          <div className="flex items-center space-x-8">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {t('nav.home')}
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {t('nav.about')}
              </Link>
              <Link
                href="/legal"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {t('nav.legal')}
              </Link>
              <Link
                href="/legal/terms"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {t('nav.terms')}
              </Link>
              <Link
                href="/legal/privacy"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {t('nav.privacy')}
              </Link>
            </nav>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <nav className="flex flex-col space-y-4 py-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-primary transition-colors px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-primary transition-colors px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>
              <Link
                href="/legal"
                className="text-gray-600 hover:text-primary transition-colors px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.legal')}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}; 