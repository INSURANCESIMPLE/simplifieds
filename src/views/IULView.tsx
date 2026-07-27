import React from 'react';
import { Page } from '../types';

interface IULViewProps {
  onNavigate: (page: Page) => void;
  onOpenQuote: () => void;
}

export const IULView: React.FC<IULViewProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section Banner */}
      <section className="bg-gradient-to-br from-[#002F56] via-[#003461] to-[#bb0027] text-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-white/20 text-center max-w-5xl mx-auto space-y-4">
        <div className="inline-flex mx-auto items-center gap-2 bg-white/10 text-white border border-white/30 px-4 py-1.5 rounded-full text-xs font-label uppercase tracking-wider font-bold">
          <span className="material-symbols-outlined text-sm">trending_up</span>
          Indexed Universal Life (IUL) Strategy
        </div>
        <h1 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          Wealth Protection &amp; Lifetime Growth.
        </h1>
        <p className="font-body text-base md:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed">
          Secure your family&apos;s future while building a powerful tax-advantaged supplemental retirement asset. Participate in market upside with a strict 0% downside floor guarantee.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-3">
          <button
            onClick={() => onNavigate('calculator')}
            className="bg-secondary text-white px-8 py-3.5 rounded-xl font-headline font-bold text-sm min-h-[48px] hover:bg-secondary-container transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            Calculate IUL Growth
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
          <button
            onClick={onOpenQuote}
            className="bg-white/10 text-white border border-white/30 px-8 py-3.5 rounded-xl font-headline font-bold text-sm min-h-[48px] hover:bg-white/20 transition-all cursor-pointer"
          >
            Get Custom Quote
          </button>
        </div>
      </section>

      {/* The Power of IUL */}
      <section className="bg-white rounded-3xl p-8 md:p-12 border border-outline-variant shadow-md space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-headline font-bold text-2xl md:text-4xl text-trust-navy">The Power of IUL</h2>
          <p className="font-body text-base md:text-lg text-on-surface-variant">
            Experience the ideal balance of growth potential and absolute security through Market-Linked Growth with a 0% floor guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/60 hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                <span className="material-symbols-outlined text-3xl">security</span>
              </div>
              <h3 className="font-headline font-bold text-xl text-trust-navy">Zero Downside Risk</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Your cash value is protected by a strict 0% floor. When market indices drop, your account balance remains safe and never loses principal value due to market downturns.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/60 hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                <span className="material-symbols-outlined text-3xl">monitoring</span>
              </div>
              <h3 className="font-headline font-bold text-xl text-trust-navy">Market-Linked Growth</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Interest is credited based on the performance of recognized market indices (like the S&amp;P 500), allowing you to capture significant market growth.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/60 hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                <span className="material-symbols-outlined text-3xl">savings</span>
              </div>
              <h3 className="font-headline font-bold text-xl text-trust-navy">Compound Interest</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Because you never have to spend years recovering from negative returns, your accumulated cash value enjoys uninterrupted compound interest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Unmatched Flexibility */}
      <section className="bg-surface-container-low/60 rounded-3xl p-8 md:p-14 border border-outline-variant/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-container-max mx-auto">
          <div className="relative rounded-2xl overflow-hidden aspect-square max-h-[500px] shadow-lg border border-outline-variant/30">
            <img
              className="w-full h-full object-cover"
              alt="Confident couple reviewing IUL financial growth plan"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFawh3CT3JMM9wSvrcxtCd2fB2wJYv3P_z6BLYcpxsifED-Ytyt3ASrGm9Dh6h_hz5A1GJqsw0xzxriW4TG-D250GFNB5yzUN0y0f2mTTMpSVlEb5S8LOi6uw4pVEBhOatcDK11ugxTgCHeqLvlhG_x46TQ8SLzPRq8HDRFFVQ2OC1lqg4s8RelnGXA3EDbyEn0aDfYj_9bWQwO4DVpqjw-5aVOgiOwe9dosaghDc-Qlsq_k6D5786QnYFYkGpg_VF4FY9tKsb8Q"
            />
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="font-headline font-bold text-2xl md:text-4xl text-trust-navy">
                Unmatched Flexibility &amp; Protection
              </h2>
              <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
                IUL is not just a death benefit; it&apos;s a dynamic, multi-purpose financial vehicle designed to adapt as your goals evolve over time.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex-shrink-0 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-lg">account_balance</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-lg text-on-surface">Tax-Advantaged Access</h4>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    Access accumulated cash value through policy loans tax-free to supplement retirement, fund college tuition, or seize investment opportunities.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex-shrink-0 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-lg">home</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-lg text-on-surface">Permanent Protection</h4>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    Provide a income-tax-free death benefit to your beneficiaries, ensuring their housing, lifestyle, and educational future remain safe.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex-shrink-0 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-lg">tune</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-lg text-on-surface">Flexible Premiums</h4>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    Adjust your premium contribution levels and death benefit amounts within policy guidelines to match life changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-on-primary rounded-3xl p-10 md:p-14 text-center space-y-6 shadow-xl max-w-4xl mx-auto w-full">
        <h2 className="font-headline font-bold text-2xl md:text-4xl">Ready to Secure Your Future?</h2>
        <p className="font-body text-base md:text-lg text-primary-fixed-dim max-w-2xl mx-auto">
          Take the first step towards a comprehensive, tax-advantaged retirement strategy with Indexed Universal Life.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('consultation')}
            className="bg-success-green hover:opacity-90 text-white font-label font-bold py-3.5 px-8 rounded-full transition-all shadow-md cursor-pointer"
          >
            Schedule IUL Consultation
          </button>
          <button
            onClick={onOpenQuote}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-label font-bold py-3.5 px-8 rounded-full transition-all cursor-pointer"
          >
            Request Instant Quote
          </button>
        </div>
      </section>
    </div>
  );
};
