import React from 'react';
import { Page } from '../types';

interface HomeViewProps {
  onNavigate: (page: Page) => void;
  onOpenQuote: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Hero Section Banner */}
      <section className="mb-6">
        <div className="bg-gradient-to-br from-[#002F56] via-[#003461] to-[#bb0027] text-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-white/20 overflow-hidden flex flex-col md:flex-row relative min-h-[460px]">
          <div className="flex-1 flex flex-col justify-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-4 py-1.5 rounded-full text-xs font-label uppercase tracking-wider font-bold w-max">
              <span className="material-symbols-outlined text-sm">shield</span>
              Insurance Made Simple
            </div>
            <h1 className="font-headline text-3xl md:text-5xl font-black leading-tight text-white tracking-tight">
              Secure Your Family&apos;s Future with Absolute Confidence
            </h1>
            <p className="font-body text-base md:text-lg text-slate-100 leading-relaxed max-w-xl">
              Explore custom life insurance and guaranteed retirement plans tailored for your unique goals. Enjoy long-term peace of mind with our transparent, forward-thinking solutions.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('calculator')}
                className="flex cursor-pointer items-center justify-center rounded-xl min-h-[48px] px-8 bg-secondary text-white font-headline font-bold text-sm shadow-md hover:bg-secondary-container transition-all hover:scale-[1.02] gap-2"
              >
                <span>Calculate Your Needs</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
              <button
                onClick={onOpenQuote}
                className="flex cursor-pointer items-center justify-center rounded-xl min-h-[48px] px-8 bg-white/10 text-white border border-white/30 font-headline font-bold text-sm hover:bg-white/20 transition-all hover:scale-[1.02]"
              >
                <span>Get Instant Quote</span>
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-[280px] md:min-h-full relative mt-6 md:mt-0 md:ml-6">
            <div
              className="absolute inset-0 bg-cover bg-center rounded-2xl border-2 border-white/20 shadow-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCAQg1KpCfPAYkXPcyCVUMV9X_lDIJ39J1XSG8PH1RekRWiq09uYrpRcf4RsWaDjxuavfsMSrzHmhuOoYRr470rTRuQcF12qJzetDgf_MY7rs7DIr4khGTETptaTB0ju9btr0YtpWELbfeNyRzZjCnCm13Ya6ZKqDijsUJdIHYHmhz3OCUvOVnYViOF8h_y-PDp4Z2pCi5_7864fTx2GxFx2pYnuw1qL5EFaLZIJ0HnfOp8eB5aXD8A_uGrZo_iWVZJyDnILBTt-Q")',
              }}
            />
          </div>
        </div>
      </section>

      {/* Coverage Options Grid */}
      <section className="py-6 flex flex-col gap-8">
        <div className="flex flex-col gap-3 text-center md:text-left max-w-3xl">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-trust-navy">
            Comprehensive Coverage Options
          </h2>
          <p className="font-body text-base md:text-lg text-on-surface-variant">
            Find the right plan to protect what matters most with our flexible and transparent financial instruments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - IUL */}
          <div
            onClick={() => onNavigate('iul')}
            className="bg-surface-container-lowest/80 backdrop-blur-md rounded-2xl border border-outline-variant/30 shadow-sm p-6 flex flex-col justify-between hover:shadow-md hover:bg-surface-container-lowest hover:border-primary/30 transition-all cursor-pointer group"
          >
            <div>
              <div
                className="w-full aspect-video rounded-xl bg-cover bg-center overflow-hidden mb-5 relative"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCJLhM73U4b0GIPW98hF3REcbRknkr-3NIKFTcAXpRcZSDbNxl9aVVoB6iB46PvWW40lB5aCkmktBE69lrmUx812qCelfhqGtm5tyN2MY3azWjXsKrnQX63tZiTMbkDU5_rW5TYihvguXA0S14kCs7RZAiEfp5PG5nBHi193wPHBy3owIzBu_3xSI8o5dhl5sVeaBd9sq9Sks1b2Rd9MbDc9TgIPEp8S27Gp-kqmD6fzK-29ZUqMfP6rLX4AF4QecQL0Gg1aKzooQ")',
                }}
              >
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors"></div>
              </div>
              <h3 className="font-headline text-xl font-bold text-trust-navy mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
                Indexed Universal Life (IUL)
                <span className="material-symbols-outlined text-primary text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Flexible premiums and cash value growth potential aligned with market indices for long-term wealth building with zero downside risk.
              </p>
            </div>
            <div className="pt-4 text-xs font-label font-semibold text-primary">Explore IUL Strategies →</div>
          </div>

          {/* Card 2 - Term */}
          <div
            onClick={() => onNavigate('term')}
            className="bg-surface-container-lowest/80 backdrop-blur-md rounded-2xl border border-outline-variant/30 shadow-sm p-6 flex flex-col justify-between hover:shadow-md hover:bg-surface-container-lowest transition-all cursor-pointer group"
          >
            <div>
              <div
                className="w-full aspect-video rounded-xl bg-cover bg-center overflow-hidden mb-5 relative"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCZJYvIad_RYxxf0D3_DO5sBsSapiCu43j6Ms_cdz5RgnK2OgzHXLIzn3-jRScota8de-zS_r3pAkRij_ZwgavagHEG7xpSByULehJSZbtp4V8X06Gc9EFKop3xMBpD4yfrC1SMlHnwo58jcoBTIUh1yfKnFAsclxFW6SPaRmGYaViC_SExoWemGANhH22R8QeYZOcujjPNfYn-mdHhPBm-cHyIMgwnv8q3xAjEtsipwKD-jdjlNUcgloNwW3guuRoEcCbe7ryIQw")',
                }}
              >
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors"></div>
              </div>
              <h3 className="font-headline text-xl font-bold text-trust-navy mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
                Term Life Insurance
                <span className="material-symbols-outlined text-primary text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Affordable, straightforward coverage designed to protect your family during high-obligation years like mortgages and child raising.
              </p>
            </div>
            <div className="pt-4 text-xs font-label font-semibold text-primary">Compare Term Plans →</div>
          </div>

          {/* Card 3 - Annuities */}
          <div
            onClick={() => onNavigate('annuities')}
            className="bg-surface-container-lowest/80 backdrop-blur-md rounded-2xl border border-outline-variant/30 shadow-sm p-6 flex flex-col justify-between hover:shadow-md hover:bg-surface-container-lowest transition-all cursor-pointer group"
          >
            <div>
              <div
                className="w-full aspect-video rounded-xl bg-cover bg-center overflow-hidden mb-5 relative"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBHJ8duP1yE-4RrPueHTpb-f_T8CafVS09JmCfOLOF0CAmoX4tAKuAKhLetAcdEX5fUcKG4LGvMVAgzVBIz1C8S-keT9GfUB9DmtsbHmiiA4WeDT34hy8MFA7Gb54ggPh4zmSzELhqyf0mNKFMxUiiH9R92GgGrTzKXRxBe1ZUbd4OjPG-xslVt2YoApSXllE7fJa8obixlMWQDObDPXSZ0U98mAfvNWEEHOC2Bt9ArQqXSNYlHbMG6IA3N2XMkFoYFgBkmzbxrJA")',
                }}
              >
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors"></div>
              </div>
              <h3 className="font-headline text-xl font-bold text-trust-navy mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
                Retirement & Annuities
                <span className="material-symbols-outlined text-primary text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Secure your post-career life with guaranteed lifetime income streams that guard against market drops and inflation.
              </p>
            </div>
            <div className="pt-4 text-xs font-label font-semibold text-primary">Discover Annuities →</div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
        <div className="bg-surface-container-lowest/70 backdrop-blur-md rounded-2xl p-6 border border-outline-variant/30 flex flex-col gap-1 items-center text-center shadow-sm">
          <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Families Protected</p>
          <p className="font-headline text-3xl font-bold text-primary">10,000+</p>
        </div>
        <div className="bg-surface-container-lowest/70 backdrop-blur-md rounded-2xl p-6 border border-outline-variant/30 flex flex-col gap-1 items-center text-center shadow-sm">
          <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Claims Paid</p>
          <p className="font-headline text-3xl font-bold text-tertiary">$50M+</p>
        </div>
        <div className="bg-surface-container-lowest/70 backdrop-blur-md rounded-2xl p-6 border border-outline-variant/30 flex flex-col gap-1 items-center text-center shadow-sm">
          <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Years of Trust</p>
          <p className="font-headline text-3xl font-bold text-secondary">25+</p>
        </div>
        <div className="bg-surface-container-lowest/70 backdrop-blur-md rounded-2xl p-6 border border-outline-variant/30 flex flex-col gap-1 items-center text-center shadow-sm">
          <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Client Rating</p>
          <p className="font-headline text-3xl font-bold text-primary">4.9 / 5</p>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-6">
        <div className="bg-gradient-to-br from-primary/10 via-surface-container-lowest/80 to-secondary-container/10 rounded-3xl p-8 md:p-14 flex flex-col items-center text-center gap-6 border border-outline-variant/30 backdrop-blur-xl shadow-md relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center gap-4 max-w-2xl">
            <h2 className="font-headline text-2xl md:text-4xl font-bold text-trust-navy">
              Ready to take the next step towards lasting financial security?
            </h2>
            <p className="font-body text-base md:text-lg text-on-surface-variant">
              Speak with a licensed specialist to evaluate your options and design a personalized protection strategy.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <button
                onClick={() => onNavigate('consultation')}
                className="px-8 py-3.5 bg-primary text-on-primary font-label font-bold text-base rounded-full shadow-md hover:bg-primary-container transition-all hover:scale-105 cursor-pointer"
              >
                Schedule Free Consultation
              </button>
              <button
                onClick={() => onNavigate('resources')}
                className="px-8 py-3.5 bg-surface-container-lowest text-primary border border-outline-variant font-label font-bold text-base rounded-full shadow-sm hover:bg-surface-container-low transition-all hover:scale-105 cursor-pointer"
              >
                Get Free Will Kit
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
