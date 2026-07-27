import React from 'react';
import { Page } from '../types';

interface PrivacyViewProps {
  onNavigate: (page: Page) => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Header Section */}
      <section className="text-center pt-4 max-w-3xl mx-auto space-y-4">
        <h1 className="font-headline text-3xl md:text-5xl font-bold text-trust-navy">Privacy Policy</h1>
        <p className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto">
          At Insurance Made Simple, transparency is our core principle. We believe you should always know how your data is handled.
        </p>
        <p className="font-label text-xs font-semibold text-outline">Last Updated: October 24, 2026</p>
      </section>

      {/* Policy Content Container */}
      <div className="glass-card rounded-3xl shadow-sm p-6 md:p-12 max-w-3xl mx-auto space-y-10 border border-outline-variant/30">
        {/* Section 1 */}
        <article className="space-y-3">
          <div className="flex items-center gap-3 text-primary">
            <span className="material-symbols-outlined text-2xl">waving_hand</span>
            <h2 className="font-headline text-xl md:text-2xl font-bold text-trust-navy">1. Introduction</h2>
          </div>
          <div className="font-body text-sm md:text-base text-on-surface-variant space-y-3 leading-relaxed">
            <p>Welcome to Insurance Made Simple. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices regarding your personal information, please contact us.</p>
            <p>When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.</p>
          </div>
        </article>

        {/* Section 2 */}
        <article className="space-y-3 pt-4 border-t border-outline-variant/20">
          <div className="flex items-center gap-3 text-primary">
            <span className="material-symbols-outlined text-2xl">database</span>
            <h2 className="font-headline text-xl md:text-2xl font-bold text-trust-navy">2. Information We Collect</h2>
          </div>
          <div className="font-body text-sm md:text-base text-on-surface-variant space-y-3 leading-relaxed">
            <p>We collect personal information that you voluntarily provide to us when you request an insurance quote, download educational kits, schedule consultations, or otherwise contact us.</p>
            <ul class="list-disc pl-6 space-y-2 text-on-surface">
              <li><strong>Personal Identifiers:</strong> Names, phone numbers, email addresses, state of residence.</li>
              <li><strong>Financial &amp; Underwriting Data:</strong> Age, estimated coverage requirements, and interest choices necessary for calculating quotes.</li>
              <li><strong>Automated Data:</strong> Technical logs, browser user-agent, and anonymized usage metrics.</li>
            </ul>
          </div>
        </article>

        {/* Section 3 */}
        <article className="space-y-3 pt-4 border-t border-outline-variant/20">
          <div className="flex items-center gap-3 text-primary">
            <span className="material-symbols-outlined text-2xl">monitoring</span>
            <h2 className="font-headline text-xl md:text-2xl font-bold text-trust-navy">3. How We Use Your Data</h2>
          </div>
          <div className="font-body text-sm md:text-base text-on-surface-variant space-y-3 leading-relaxed">
            <p>We process your personal information for legitimate business purposes including facilitating quote generation, providing advisory services, sending administrative confirmation notifications, and preventing fraudulent submissions.</p>
          </div>
        </article>

        {/* Section 4 */}
        <article className="space-y-3 pt-4 border-t border-outline-variant/20">
          <div className="flex items-center gap-3 text-primary">
            <span className="material-symbols-outlined text-2xl">shield_lock</span>
            <h2 className="font-headline text-xl md:text-2xl font-bold text-trust-navy">4. Data Security</h2>
          </div>
          <div className="font-body text-sm md:text-base text-on-surface-variant space-y-3 leading-relaxed">
            <p>We implement industry-standard technical and organizational security measures, including 256-bit SSL encryption for data in transit and restricted database access protocols.</p>
          </div>
        </article>
      </div>

      <div className="text-center">
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-2.5 bg-primary text-on-primary font-label font-semibold text-sm rounded-full shadow-sm hover:opacity-90"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};
