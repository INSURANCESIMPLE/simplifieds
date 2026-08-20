import React, { useState } from 'react';
import { Page } from '../types';
import logoImg from '../assets/images/regenerated_image_1784836028536.png';

const SCHEDULE_APPOINTMENT_URL = 'https://scheduler.zoom.us/Insurance-Made-Simple';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: Page; isExternal?: boolean; href?: string }[] = [
    { label: 'Term Vs Whole', page: 'term' },
    { label: 'Whole Life', page: 'whole-life' },
    { label: 'IUL', page: 'iul' },
    { label: 'Annuities', page: 'annuities' },
    { label: 'Calculator', page: 'calculator' },
    { label: 'Medicare Professor', page: 'medicare' },
    { label: 'Resources', page: 'resources' },
    { label: 'FAQ', page: 'faq' },
    // Schedule tab opens the static schedule.html page (external), but still maps to the consultation page for active-state
    { label: 'Schedule', page: 'consultation', isExternal: true, href: '/schedule.html' },
  ];

  const handleItemClick = (item: (typeof navItems)[0]) => {
    onNavigate(item.page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-surface-container-lowest/95 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm fixed top-0 w-full z-50 left-0 right-0">
      <div className="flex justify-between items-center min-h-[96px] py-2 px-3 sm:px-6 xl:px-8 max-w-container-max mx-auto w-full">
        {/* Brand Logo & Title */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group hover:-translate-y-0.5 transition-transform flex-shrink-0 mr-2 xl:mr-4"
        >
          <div className="w-[200px] h-[100px] flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
            <img
              alt="Insurance Made Simple Logo"
              style={{ width: '200px', height: '100px' }}
              className="w-[200px] h-[100px] object-contain"
              src={logoImg}
            />
          </div>
          <span className="text-lg md:text-xl xl:text-[22px] font-headline font-bold text-primary whitespace-nowrap">
            Insurance Made Simple
          </span>
        </div>

        {/* Desktop Links - Evenly Spaced Across Header */}
        <div className="hidden lg:flex items-center justify-evenly flex-1 mx-2 xl:mx-4 max-w-4xl">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            const baseClass = `font-label text-xs xl:text-sm transition-all px-2 xl:px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
              isActive
                ? 'text-secondary font-bold border-b-2 border-secondary pb-1'
                : 'text-on-surface-variant hover:text-primary hover:bg-primary/5'
            }`;

            if (item.isExternal && item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={baseClass}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <button
                key={item.label}
                onClick={() => handleItemClick(item)}
                className={baseClass}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {currentPage === 'medicare' ? (
            <a
              href="https://www.medicare-professor.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary text-white font-label text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl hover:bg-secondary-container hover:-translate-y-0.5 active:scale-95 transition-transform flex items-center gap-2"
            >
              Learn More
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          ) : (
            <a
              href={SCHEDULE_APPOINTMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Schedule an appointment on Zoom"
              className="bg-primary text-white font-label text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl hover:bg-primary-container hover:-translate-y-0.5 active:scale-95 transition-transform"
            >
              Schedule Appointment
            </a>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-on-surface-variant p-2 rounded-lg hover:bg-surface-container cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest/95 backdrop-blur-xl border-b border-outline-variant/30 px-6 py-4 flex flex-col gap-2 shadow-lg animate-in slide-in-from-top duration-300">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            const btnClass = `text-left font-label text-base py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${
              isActive
                ? 'bg-primary/10 text-primary font-bold'
                : 'text-on-surface-variant hover:bg-surface-container-low'
            }`;

            if (item.isExternal && item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={btnClass}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <button
                key={item.label}
                onClick={() => handleItemClick(item)}
                className={btnClass}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-outline-variant/20 mt-1 flex flex-col gap-2">
            {currentPage === 'medicare' ? (
              <a
                href="https://www.medicare-professor.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-secondary text-white font-label text-base font-semibold py-3 rounded-xl text-center shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                Learn More
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            ) : (
              <a
                href={SCHEDULE_APPOINTMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Schedule an appointment on Zoom"
                className="w-full bg-secondary text-white font-label text-base font-semibold py-3 rounded-xl text-center shadow-sm cursor-pointer flex items-center justify-center"
              >
                Schedule Appointment
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
