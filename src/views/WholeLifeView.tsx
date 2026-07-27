import React from 'react';
import { Page } from '../types';
import { GrowthShaderCanvas } from '../components/GrowthShaderCanvas';

interface WholeLifeViewProps {
  onNavigate: (page: Page) => void;
  onOpenQuote: () => void;
}

export const WholeLifeView: React.FC<WholeLifeViewProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section Banner */}
      <section className="bg-gradient-to-br from-[#002F56] via-[#003461] to-[#bb0027] text-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-white/20 text-center max-w-5xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-4 py-1.5 rounded-full text-xs font-label font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-base">all_inclusive</span>
          Permanent Protection &amp; Cash Accumulation
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-headline text-white tracking-tight leading-tight">
          Build Wealth While You Protect Your Legacy.
        </h1>
        <p className="text-base md:text-lg font-body text-slate-100 max-w-2xl mx-auto leading-relaxed">
          Discover the power of Whole Life insurance. It&apos;s more than just a death benefit; it&apos;s a foundational asset that grows over time with guaranteed returns.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-3">
          <button
            onClick={() => onNavigate('calculator')}
            className="bg-secondary text-white px-8 py-3.5 rounded-xl font-headline font-bold text-sm min-h-[48px] hover:bg-secondary-container transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            Calculate Coverage
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
          <button
            onClick={onOpenQuote}
            className="bg-white/10 text-white border border-white/30 px-8 py-3.5 rounded-xl font-headline font-bold text-sm min-h-[48px] hover:bg-white/20 transition-all cursor-pointer"
          >
            Get Instant Quote
          </button>
        </div>
      </section>

      {/* Interactive Growth Chart Section */}
      <section className="bg-white rounded-3xl p-6 md:p-10 border border-outline-variant shadow-md">
        <div className="max-w-container-max mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-trust-navy">
              The Trajectory of Cash Value
            </h2>
            <p className="font-body text-sm text-on-surface-variant max-w-xl mx-auto">
              Real-time WebGL visualization of cash accumulation and guaranteed growth compounding over policy years.
            </p>
          </div>

          <div className="relative w-full h-[450px] md:h-[500px] rounded-2xl overflow-hidden shadow-sm border border-outline-variant/50 bg-white">
            <GrowthShaderCanvas />

            {/* Overlay Milestones */}
            <div className="absolute bottom-4 left-6 text-primary font-label text-xs md:text-sm font-semibold bg-white/90 px-3.5 py-1.5 rounded-lg backdrop-blur-sm border border-outline-variant/30 shadow-sm">
              Policy Year 1
            </div>
            <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 text-primary font-label text-xs md:text-sm font-semibold bg-white/90 px-3.5 py-1.5 rounded-lg backdrop-blur-sm border border-outline-variant/30 shadow-sm">
              Year 20 (Compounding Node)
            </div>
            <div className="absolute top-6 right-6 text-primary font-label text-xs md:text-sm font-semibold bg-white/90 px-3.5 py-1.5 rounded-lg backdrop-blur-sm border border-outline-variant/30 shadow-sm">
              Retirement & Legacy
            </div>
          </div>
        </div>
      </section>

      {/* Mechanics of Accumulation */}
      <section className="max-w-container-max mx-auto space-y-8 w-full">
        <h2 className="text-2xl md:text-4xl font-headline font-bold text-trust-navy text-center">
          The Mechanics of Accumulation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="glass-card p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">trending_up</span>
            </div>
            <h3 className="text-xl font-headline font-bold text-primary">Guaranteed Growth</h3>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              A portion of your premium goes toward a cash value component that grows at a fixed, guaranteed rate, unaffected by market volatility.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="glass-card p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">add_circle</span>
            </div>
            <h3 className="text-xl font-headline font-bold text-primary">Dividends</h3>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Many participating policies are eligible to receive annual dividends, which can be used to purchase additional coverage, reduce premiums, or accelerate cash value growth.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="glass-card p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">account_balance</span>
            </div>
            <h3 className="text-xl font-headline font-bold text-primary">Tax Advantages</h3>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              The cash value accumulates on a tax-deferred basis, allowing your wealth to compound more efficiently over the life of the policy.
            </p>
          </div>
        </div>
      </section>

      {/* Long-Term Benefits */}
      <section className="bg-white rounded-3xl p-8 md:p-14 border border-outline-variant shadow-md">
        <div className="max-w-container-max mx-auto space-y-10">
          <h2 className="text-2xl md:text-4xl font-headline font-bold text-trust-navy text-center">
            Long-Term Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-trust-navy/10 text-trust-navy flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <h4 className="text-lg font-headline font-bold text-trust-navy mb-2">Lifelong Protection</h4>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Coverage that lasts your entire life, ensuring your beneficiaries are protected no matter when you pass away.
              </p>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-trust-navy/10 text-trust-navy flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">payments</span>
              </div>
              <h4 className="text-lg font-headline font-bold text-trust-navy mb-2">Loan Availability</h4>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Access your accumulated cash value via policy loans for emergencies, education, or business opportunities.
              </p>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-trust-navy/10 text-trust-navy flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">lock</span>
              </div>
              <h4 className="text-lg font-headline font-bold text-trust-navy mb-2">Fixed Premiums</h4>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Your premium amount is locked in for life, providing predictable costs that will never increase as you age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-on-primary rounded-3xl p-10 md:p-16 text-center shadow-lg space-y-6 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl md:text-4xl font-headline font-bold">
          See Your Personal Growth Trajectory
        </h2>
        <p className="text-base md:text-lg text-primary-fixed-dim max-w-2xl mx-auto font-body">
          Use our advanced calculators to visualize how a whole life policy could fit into your long-term financial strategy.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('calculator')}
            className="bg-secondary text-on-secondary px-8 py-3.5 rounded-full font-label text-base font-bold hover:bg-secondary-container transition-all hover:scale-105 shadow-md cursor-pointer"
          >
            Calculate Your Coverage
          </button>
          <button
            onClick={onOpenQuote}
            className="bg-white/10 text-white border border-white/30 px-8 py-3.5 rounded-full font-label text-base font-bold hover:bg-white/20 transition-all hover:scale-105 cursor-pointer"
          >
            Get a Quote Now
          </button>
        </div>
      </section>
    </div>
  );
};
