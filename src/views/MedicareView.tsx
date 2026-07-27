import React from 'react';
import { Page } from '../types';

interface MedicareViewProps {
  onNavigate: (page: Page) => void;
  onOpenQuote: () => void;
}

export const MedicareView: React.FC<MedicareViewProps> = () => {
  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section Banner */}
      <section className="bg-gradient-to-br from-[#002F56] via-[#003461] to-[#bb0027] text-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-white/20 text-center max-w-5xl mx-auto space-y-4">
        <div className="inline-flex mx-auto items-center gap-2 bg-white/10 text-white border border-white/30 px-4 py-1.5 rounded-full text-xs font-label uppercase tracking-wider font-bold">
          <span className="material-symbols-outlined text-sm">verified_user</span>
          Medicare Professor Guidance
        </div>
        <h1 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          Navigate Medicare with Confidence.
        </h1>
        <p className="font-body text-base md:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed">
          Medicare doesn&apos;t have to be confusing. We break down Parts A, B, C, and D so you can make confident, informed decisions about your healthcare future.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-3">
          <a
            className="bg-secondary text-white px-8 py-3.5 rounded-xl font-headline font-bold text-sm min-h-[48px] hover:bg-secondary-container transition-all shadow-md flex items-center gap-2 cursor-pointer"
            href="https://www.medicare-professor.com/"
            target="_blank"
            rel="noreferrer"
          >
            Visit Medicare Professor
            <span className="material-symbols-outlined text-base">open_in_new</span>
          </a>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-12 bg-surface-container-low/50 rounded-3xl p-8 md:p-12 border border-outline-variant/30 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-headline text-2xl md:text-4xl font-bold text-trust-navy">Understanding the ABCs (and D) of Medicare</h2>
          <p className="font-body text-base text-on-surface-variant">We cut through the jargon. Here is a simple breakdown of what each part covers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Part A */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-headline text-xl font-bold">
              A
            </div>
            <h3 className="font-headline text-lg font-bold text-primary">Hospital Insurance</h3>
            <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Covers inpatient hospital stays, care in a skilled nursing facility, hospice care, and home health care.
            </p>
          </div>

          {/* Part B */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-headline text-xl font-bold">
              B
            </div>
            <h3 className="font-headline text-lg font-bold text-primary">Medical Insurance</h3>
            <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Covers doctor visits, outpatient medical care, medical supplies, and preventive services.
            </p>
          </div>

          {/* Part C */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-headline text-xl font-bold">
              C
            </div>
            <h3 className="font-headline text-lg font-bold text-primary">Medicare Advantage</h3>
            <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed">
              An &quot;all-in-one&quot; alternative to Original Medicare provided by approved private insurance companies.
            </p>
          </div>

          {/* Part D */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-headline text-xl font-bold">
              D
            </div>
            <h3 className="font-headline text-lg font-bold text-primary">Prescription Drugs</h3>
            <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Helps lower the out-of-pocket costs of prescription drugs and recommended vaccines.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-trust-navy text-on-primary rounded-3xl p-10 md:p-16 text-center space-y-6 shadow-xl max-w-4xl mx-auto w-full">
        <span className="material-symbols-outlined text-5xl text-primary-fixed-dim">school</span>
        <h2 className="font-headline text-2xl md:text-4xl font-bold">Ready to Master Your Medicare?</h2>
        <p className="font-body text-base md:text-lg text-primary-fixed-dim max-w-2xl mx-auto leading-relaxed">
          Dive deeper with specialized tools, comparison guides, and enrollment assistance at Medicare Professor.
        </p>
        <div className="flex justify-center pt-2">
          <a
            className="bg-secondary text-white px-10 py-4 rounded-full font-headline text-base font-bold hover:bg-secondary-container transition-all hover:scale-105 shadow-md flex items-center gap-2 cursor-pointer"
            href="https://www.medicare-professor.com/"
            target="_blank"
            rel="noreferrer"
          >
            Learn More
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
      </section>
    </div>
  );
};
