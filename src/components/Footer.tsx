import React from 'react';
import { Page } from '../types';
import logoImg from '../assets/images/regenerated_image_1784836028536.png';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1a2332] text-white w-full py-16 px-4 md:px-10 border-t border-surface-variant/10 mt-auto relative z-10">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-4 cursor-pointer group"
        >
          <div className="w-[200px] h-[100px] flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
            <img
              alt="Insurance Made Simple Tree Logo"
              style={{ width: '200px', height: '100px' }}
              className="w-[200px] h-[100px] object-contain"
              src={logoImg}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-xl md:text-2xl font-bold text-white leading-tight">
              Insurance Made Simple
            </span>
            <span className="font-label text-xs text-white/70 tracking-wider uppercase font-semibold">
              Life • Retirement • Medicare
            </span>
          </div>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm md:text-base font-body">
          <button
            onClick={() => onNavigate('privacy')}
            className="text-white/80 hover:text-white hover:underline transition-all cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onNavigate('terms')}
            className="text-white/80 hover:text-white hover:underline transition-all cursor-pointer"
          >
            Terms of Service
          </button>
          <button
            onClick={() => onNavigate('faq')}
            className="text-white/80 hover:text-white hover:underline transition-all cursor-pointer"
          >
            FAQ
          </button>
          <button
            onClick={() => onNavigate('resources')}
            className="text-white/80 hover:text-white hover:underline transition-all cursor-pointer"
          >
            Resources
          </button>
          <button
            onClick={() => onNavigate('consultation')}
            className="text-white/80 hover:text-white hover:underline transition-all cursor-pointer"
          >
            Contact Support
          </button>
        </nav>

        {/* Copyright */}
        <div className="font-body text-sm text-white/60 text-center md:text-right">
          © {new Date().getFullYear()} Insurance Made Simple. Clear. Transparent. Secure.
        </div>
      </div>
    </footer>
  );
};
