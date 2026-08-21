import React, { useState } from 'react';
import { Page } from '../types';

interface AnnuitiesViewProps {
  onNavigate: (page: Page) => void;
  onOpenQuote: () => void;
}

export const AnnuitiesView: React.FC<AnnuitiesViewProps> = ({ onNavigate, onOpenQuote }) => {
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open('https://scheduler.zoom.us/Insurance-Made-Simple', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section Banner */}
      <section className="bg-gradient-to-br from-[#002F56] via-[#003461] to-[#bb0027] text-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-white/20 text-center max-w-5xl mx-auto space-y-4">
        <div className="inline-flex mx-auto items-center gap-2 bg-white/10 text-white border border-white/30 px-4 py-1.5 rounded-full text-xs font-label uppercase tracking-wider font-bold">
          <span className="material-symbols-outlined text-sm">payments</span>
          Guaranteed Lifetime Income
        </div>
        <h1 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          Secure Your Future with Guaranteed Income Streams.
        </h1>
        <p className="font-body text-base md:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed">
          Transform your retirement savings into a reliable, lifelong income stream. Enjoy peace of mind knowing your retirement is protected, no matter how the market performs.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-3">
          <button
            onClick={() => onNavigate('calculator')}
            className="bg-secondary text-white px-8 py-3.5 rounded-xl font-headline font-bold text-sm min-h-[48px] hover:bg-secondary-container transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            Calculate Retirement Income
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
          <button
            onClick={onOpenQuote}
            className="bg-white/10 text-white border border-white/30 px-8 py-3.5 rounded-xl font-headline font-bold text-sm min-h-[48px] hover:bg-white/20 transition-all cursor-pointer"
          >
            Get Instant Annuity Quote
          </button>
        </div>
      </section>

      {/* Annuity Types Section (Bento Grid) */}
      <section className="space-y-8">
        <div className="text-center md:text-left max-w-3xl space-y-3">
          <h2 className="font-headline text-2xl md:text-4xl font-bold text-trust-navy">Choose the Right Path for Your Retirement</h2>
          <p className="font-body text-base md:text-lg text-on-surface-variant">We offer comprehensive annuity solutions tailored to your timeline and risk tolerance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FIA Card */}
          <div className="bg-surface-container-lowest/80 backdrop-blur-md rounded-2xl border border-outline-variant/30 shadow-sm p-8 flex flex-col justify-between hover:shadow-md transition-all group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">trending_up</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-on-surface mb-3">Fixed Index Annuities (FIA)</h3>
              <p className="font-body text-sm md:text-base text-on-surface-variant mb-6 leading-relaxed">
                Participate in index growth potential without risking your initial principal. FIAs offer an optimal combination of growth and protection.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-on-surface text-sm font-semibold font-label">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  <span>100% Principal Guarantee Protection</span>
                </li>
                <li className="flex items-center gap-3 text-on-surface text-sm font-semibold font-label">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  <span>Tax-Deferred Capital Growth</span>
                </li>
                <li className="flex items-center gap-3 text-on-surface text-sm font-semibold font-label">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  <span>Market Index Upside Potential</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('calculator')}
              className="w-full h-12 flex items-center justify-center border-2 border-primary text-primary rounded-full font-label font-semibold hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
            >
              Estimate FIA Growth
            </button>
          </div>

          {/* SPIA Card */}
          <div className="bg-surface-container-lowest/80 backdrop-blur-md rounded-2xl border border-outline-variant/30 shadow-sm p-8 flex flex-col justify-between hover:shadow-md transition-all group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">payments</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-on-surface mb-3">Single Premium Immediate Annuities (SPIA)</h3>
              <p className="font-body text-sm md:text-base text-on-surface-variant mb-6 leading-relaxed">
                Convert a lump sum into a guaranteed monthly paycheck starting right away, providing instant income security for life.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-on-surface text-sm font-semibold font-label">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  <span>Immediate Monthly Cash Flow</span>
                </li>
                <li className="flex items-center gap-3 text-on-surface text-sm font-semibold font-label">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  <span>Guaranteed Lifetime Income</span>
                </li>
                <li className="flex items-center gap-3 text-on-surface text-sm font-semibold font-label">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  <span>Customizable Joint Payout Options</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('consultation')}
              className="w-full h-12 flex items-center justify-center border-2 border-primary text-primary rounded-full font-label font-semibold hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
            >
              Discuss SPIA Payouts
            </button>
          </div>
        </div>
      </section>

      {/* Retirement Benefits Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-low/50 backdrop-blur-md rounded-2xl p-8 border border-outline-variant/20 flex flex-col items-center text-center shadow-sm space-y-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">shield_lock</span>
            </div>
            <h4 className="font-headline text-xl font-bold text-trust-navy">Guaranteed Income</h4>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              Create a predictable, stable paycheck for life that you cannot outlive, regardless of stock market fluctuations.
            </p>
          </div>

          <div className="bg-surface-container-low/50 backdrop-blur-md rounded-2xl p-8 border border-outline-variant/20 flex flex-col items-center text-center shadow-sm space-y-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">account_balance</span>
            </div>
            <h4 className="font-headline text-xl font-bold text-trust-navy">Tax-Advantaged Growth</h4>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              Your capital grows tax-deferred, allowing your interest to compound faster without yearly tax drag.
            </p>
          </div>

          <div className="bg-surface-container-low/50 backdrop-blur-md rounded-2xl p-8 border border-outline-variant/20 flex flex-col items-center text-center shadow-sm space-y-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">family_restroom</span>
            </div>
            <h4 className="font-headline text-xl font-bold text-trust-navy">Legacy Protection</h4>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              Ensure remaining contract values pass directly to designated beneficiaries without probate delay.
            </p>
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section className="bg-gradient-to-br from-primary-container/20 via-surface-container-lowest/80 to-tertiary-container/20 rounded-3xl p-8 md:p-12 border border-outline-variant/30 backdrop-blur-xl shadow-md relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="font-headline text-2xl md:text-4xl font-bold text-trust-navy">Ready to Secure Your Retirement?</h2>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              Schedule a complimentary consultation with one of our retirement income specialists to discover how an annuity can fortify your financial independence.
            </p>

            {consultSubmitted ? (
              <div className="bg-white/90 p-6 rounded-2xl text-center space-y-3 shadow-sm border border-outline-variant/30">
                <span className="material-symbols-outlined text-success-green text-4xl">check_circle</span>
                <h4 className="font-headline font-bold text-lg text-trust-navy">Consultation Request Received</h4>
                <p className="font-body text-sm text-on-surface-variant">
                  We will contact you shortly at <strong>{form.email}</strong> to finalize your meeting time.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface border border-outline-variant/50 focus:ring-2 focus:ring-primary focus:outline-none font-body shadow-sm"
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface border border-outline-variant/50 focus:ring-2 focus:ring-primary focus:outline-none font-body shadow-sm"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface border border-outline-variant/50 focus:ring-2 focus:ring-primary focus:outline-none font-body shadow-sm"
                />
                <button
                  type="submit"
                  className="w-full flex cursor-pointer items-center justify-center rounded-full h-12 px-8 bg-primary text-on-primary font-label font-semibold shadow-md hover:bg-primary-container transition-colors mt-2"
                >
                  Request Specialist Consultation
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-surface-container-lowest shadow-xl relative">
              <img
                alt="Jason York Advisor"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL4dtBpUogUxSLwHe1GWyda-zpiDFV-En6lc-kX8_xU0sHMPNW9LbhDi2fkI05QwUnetq0MIxEaOND2-ZWERFPtMv7Z4LldoWr2lmyPZchLexvCqQ8h2wqWtQGzcmmcp8JzComdce27vYN8rVTAsOkNXQQfXkAPJO67AbYy0yLE8WOrei0uLR05nMDF-MzYPiV3GCHSbZ2uMusk_ROekzXNfEvkhzFrdj4xHkb4i6FiKW3QHVZSSbtACtXqA_AiGxj85hVMf_BuA"
              />
            </div>
            <h3 className="font-headline text-2xl font-bold text-trust-navy">Jason York</h3>
            <p className="font-label text-sm text-primary font-semibold">Senior Retirement Specialist</p>
            <p className="font-body text-sm italic text-on-surface-variant max-w-sm">
              &quot;I help families build resilient income strategies that stand the test of market volatility and time.&quot;
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
