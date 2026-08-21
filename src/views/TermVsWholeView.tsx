import React, { useState } from 'react';
import { Page } from '../types';

interface TermVsWholeViewProps {
  onNavigate: (page: Page) => void;
  onOpenQuote: () => void;
}

export const TermVsWholeView: React.FC<TermVsWholeViewProps> = ({ onNavigate, onOpenQuote }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interest: 'Term Life',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section Banner */}
      <section className="bg-gradient-to-br from-[#002F56] via-[#003461] to-[#bb0027] text-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-white/20 text-center max-w-5xl mx-auto space-y-4">
        <div className="inline-flex mx-auto items-center gap-2 bg-white/10 text-white border border-white/30 px-4 py-1.5 rounded-full text-xs font-label uppercase tracking-wider font-bold">
          <span className="material-symbols-outlined text-sm">compare</span>
          Coverage Strategy Analysis
        </div>
        <h1 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          Term vs. <span className="text-amber-300">Whole Life</span> Insurance
        </h1>
        <p className="font-body text-base md:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed">
          Understanding the key differences in duration, premiums, and cash growth to choose the optimal financial protection for your family.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-3">
          <button
            onClick={() => onNavigate('calculator')}
            className="bg-secondary text-white px-8 py-3.5 rounded-xl font-headline font-bold text-sm min-h-[48px] hover:bg-secondary-container transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            Calculate Your Coverage Need
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

      {/* Full Article Document Card */}
      <section className="bg-white border border-outline-variant/60 rounded-3xl p-6 md:p-10 shadow-md space-y-8 font-body max-w-5xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/30 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-sm">article</span>
              Official Educational Breakdown
            </div>
            <h2 className="font-headline text-2xl md:text-3xl font-black text-trust-navy">
              Term vs. Whole Life Insurance
            </h2>
            <p className="font-body text-sm md:text-base text-slate-600 italic mt-1">
              A breakdown of the two core life insurance types.
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="self-start sm:self-center flex items-center gap-2 px-4 py-2.5 bg-surface-container-low hover:bg-surface-container text-trust-navy font-label text-xs font-bold rounded-xl border border-outline-variant/50 shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            Print / Save Article
          </button>
        </div>

        {/* Term Life Section */}
        <div className="space-y-3">
          <h3 className="font-headline text-xl md:text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2 h-5 bg-primary rounded-full inline-block"></span>
            Term Life Insurance
          </h3>
          <p className="text-sm md:text-base text-on-surface font-medium">
            <strong>What it is:</strong> Pure death benefit coverage for a fixed period (10, 20, 30 years).
          </p>
          <ul className="space-y-2 text-xs md:text-sm text-slate-700 pl-4 border-l-2 border-primary/20">
            <li><strong>Cost:</strong> Much cheaper — often 5–15x less than whole life for the same coverage amount, especially when you&apos;re younger and healthier</li>
            <li><strong>Cash value:</strong> None. It&apos;s insurance only, no investment/savings component</li>
            <li><strong>Duration:</strong> Expires at the end of the term. If you die during the term, beneficiaries get the payout. If you outlive it, coverage ends (unless you renew, usually at a higher premium rate based on your new age).</li>
            <li><strong>Flexibility:</strong> Simple — you pick a coverage amount and term length</li>
            <li><strong>Best fit for:</strong> Covering a specific need with an end date — like income replacement while raising kids, or paying off a mortgage — during years when your family needs maximum protection on a budget.</li>
          </ul>
        </div>

        {/* Whole Life Section */}
        <div className="space-y-3 pt-4 border-t border-outline-variant/20">
          <h3 className="font-headline text-xl md:text-2xl font-bold text-secondary flex items-center gap-2">
            <span className="w-2 h-5 bg-secondary rounded-full inline-block"></span>
            Whole Life Insurance
          </h3>
          <p className="text-sm md:text-base text-on-surface font-medium">
            <strong>What it is:</strong> Permanent coverage that lasts your entire life, combined with a savings/investment component.
          </p>
          <ul className="space-y-2 text-xs md:text-sm text-slate-700 pl-4 border-l-2 border-secondary/20">
            <li><strong>Cost:</strong> Significantly higher premiums for the same death benefit</li>
            <li><strong>Cash value:</strong> Builds over time, tax-deferred. You can borrow against it or (in some cases) withdraw from it while alive</li>
            <li><strong>Duration:</strong> Never expires as long as premiums are paid</li>
            <li><strong>Guarantees:</strong> Fixed premiums, guaranteed death benefit, guaranteed minimum cash value growth (rate is usually modest)</li>
            <li><strong>Complexity:</strong> More moving parts — dividends (with participating policies), loan provisions, surrender charges if you cancel early</li>
            <li><strong>Best fit for:</strong> Permanent needs — estate planning, leaving a guaranteed inheritance, covering final expenses, or as part of a broader wealth-transfer strategy</li>
          </ul>
        </div>

        {/* Common Trade-off Argument */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 md:p-6 space-y-2">
          <h4 className="font-headline text-lg font-bold text-amber-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-600">balance</span>
            The Common Trade-off Argument
          </h4>
          <p className="text-xs md:text-sm text-amber-950 leading-relaxed">
            A frequently cited strategy is <strong>&quot;buy term and invest the difference&quot;</strong> — take the premium savings from term insurance and invest it separately (index funds, mutual funds, retirement accounts). Over 30 years, disciplined investing often accumulates more wealth than a whole life policy&apos;s guaranteed cash value. However, this requires investment discipline and doesn&apos;t offer the guaranteed floor that whole life provides.
          </p>
        </div>

        {/* Quick Decision Points Table */}
        <div className="space-y-3 pt-4 border-t border-outline-variant/20">
          <h4 className="font-headline text-xl font-bold text-trust-navy">Quick Decision Points</h4>
          <div className="overflow-x-auto rounded-xl border border-outline-variant/40 shadow-sm">
            <table className="w-full text-left font-body text-xs md:text-sm">
              <thead className="bg-[#002F56] text-white">
                <tr>
                  <th className="p-3.5 font-headline font-bold"></th>
                  <th className="p-3.5 font-headline font-bold">Term</th>
                  <th className="p-3.5 font-headline font-bold">Whole Life</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 bg-white">
                <tr>
                  <td className="p-3.5 font-semibold text-trust-navy">Premiums</td>
                  <td className="p-3.5 text-slate-700">Low</td>
                  <td className="p-3.5 text-slate-700">High</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-trust-navy">Coverage length</td>
                  <td className="p-3.5 text-slate-700">Fixed period</td>
                  <td className="p-3.5 text-slate-700">Lifetime</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-trust-navy">Cash value</td>
                  <td className="p-3.5 text-slate-700">No</td>
                  <td className="p-3.5 text-slate-700">Yes</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-trust-navy">Best for</td>
                  <td className="p-3.5 text-slate-700">Temporary needs (income replacement, debt)</td>
                  <td className="p-3.5 text-slate-700">Permanent needs (estate planning, guaranteed payout)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer Note */}
        <p className="text-xs text-slate-500 italic pt-3 border-t border-outline-variant/20 leading-relaxed">
          This is general information, not a personalized recommendation. The right choice depends on your specific goals, budget, and how long you need coverage. A fee-only financial planner or licensed insurance advisor can help you evaluate your unique situation.
        </p>
      </section>

      {/* Comparison Table Section */}
      <section className="w-full">
        <div className="flex flex-col items-center gap-2 mb-6 text-center">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-trust-navy">Detailed Feature Comparison</h2>
          <p className="text-sm text-on-surface-variant font-medium">Side-by-side view of term life vs permanent whole life policies</p>
        </div>

        <div className="overflow-x-auto bg-white border border-outline-variant rounded-2xl shadow-md">
          <table className="w-full font-body text-sm md:text-base text-left border-collapse min-w-[600px]">
            <thead className="bg-surface-container-low border-b border-outline-variant/30">
              <tr>
                <th className="w-1/3 p-4 md:p-6 font-headline font-bold text-trust-navy">Feature</th>
                <th className="w-1/3 p-4 md:p-6 font-headline font-bold text-success-green">Term Life</th>
                <th className="w-1/3 p-4 md:p-6 font-headline font-bold text-primary">Whole Life</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              <tr>
                <td className="p-4 md:p-6 font-semibold text-on-background">Duration</td>
                <td className="p-4 md:p-6 text-on-surface-variant">Specific term (e.g., 10, 20, 30 years)</td>
                <td className="p-4 md:p-6 text-on-surface-variant">Lifelong (as long as premiums are paid)</td>
              </tr>
              <tr>
                <td className="p-4 md:p-6 font-semibold text-on-background">Premium Cost</td>
                <td className="p-4 md:p-6 text-on-surface-variant">Lower initial premiums</td>
                <td className="p-4 md:p-6 text-on-surface-variant">Higher initial premiums, but locked & fixed</td>
              </tr>
              <tr>
                <td className="p-4 md:p-6 font-semibold text-on-background">Cash Value Accumulation</td>
                <td className="p-4 md:p-6 text-on-surface-variant">No cash value component</td>
                <td className="p-4 md:p-6 text-on-surface-variant">Builds cash value over time (tax-deferred)</td>
              </tr>
              <tr>
                <td className="p-4 md:p-6 font-semibold text-on-background">Complexity</td>
                <td className="p-4 md:p-6 text-on-surface-variant">Simple and straightforward protection</td>
                <td className="p-4 md:p-6 text-on-surface-variant">Comprehensive financial & estate planning asset</td>
              </tr>
              <tr>
                <td className="p-4 md:p-6 font-semibold text-on-background">Typical Use Cases</td>
                <td className="p-4 md:p-6 text-on-surface-variant">Income replacement, mortgage protection, child-raising years</td>
                <td className="p-4 md:p-6 text-on-surface-variant">Estate planning, lifelong dependents, wealth transfer & legacy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Bento Grid for Use Cases */}
      <section className="w-full space-y-6">
        <div className="text-center">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-trust-navy">Which is right for you?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Term Card */}
          <div className="bg-surface-container-lowest/80 backdrop-blur-lg border border-outline-variant/30 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="bg-success-green/10 p-3 rounded-xl text-success-green w-max mb-6">
                <span className="material-symbols-outlined text-3xl">hourglass_empty</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-on-background mb-4">Choose Term If...</h3>
              <ul className="space-y-4 font-body text-base text-on-surface-variant">
                <li className="flex gap-3 items-start">
                  <span className="material-symbols-outlined text-success-green text-xl mt-0.5">check_circle</span>
                  <span>You need maximum death benefit coverage for the lowest current monthly cost.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="material-symbols-outlined text-success-green text-xl mt-0.5">check_circle</span>
                  <span>Your primary goal is protecting specific debts like a 15 or 30-year home mortgage.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="material-symbols-outlined text-success-green text-xl mt-0.5">check_circle</span>
                  <span>You want to replace your working income until your children graduate college.</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onOpenQuote}
              className="mt-8 w-full py-3 bg-success-green text-white font-label font-semibold rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
            >
              Get Term Quotes
            </button>
          </div>

          {/* Whole Card */}
          <div className="bg-surface-container-lowest/80 backdrop-blur-lg border border-outline-variant/30 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="bg-primary/10 p-3 rounded-xl text-primary w-max mb-6">
                <span className="material-symbols-outlined text-3xl">all_inclusive</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-on-background mb-4">Choose Whole Life If...</h3>
              <ul className="space-y-4 font-body text-base text-on-surface-variant">
                <li className="flex gap-3 items-start">
                  <span className="material-symbols-outlined text-primary text-xl mt-0.5">check_circle</span>
                  <span>You want guaranteed, lifelong coverage that will never expire as long as premiums are paid.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="material-symbols-outlined text-primary text-xl mt-0.5">check_circle</span>
                  <span>You view insurance as an equity-building cash accumulation asset with guaranteed tax-deferred growth.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="material-symbols-outlined text-primary text-xl mt-0.5">check_circle</span>
                  <span>You want to plan for estate transfer, final expenses, or long-term family legacy protection.</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('whole-life')}
              className="mt-8 w-full py-3 bg-primary text-on-primary font-label font-semibold rounded-xl hover:bg-primary-container transition-colors cursor-pointer"
            >
              Explore Whole Life Details
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto w-full space-y-6">
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-trust-navy text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <details className="bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/30 shadow-sm rounded-xl p-6 group cursor-pointer">
            <summary className="font-headline text-lg font-bold text-on-background list-none flex justify-between items-center">
              Can I convert Term to Whole Life later?
              <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-primary">expand_more</span>
            </summary>
            <p className="mt-4 font-body text-base text-on-surface-variant pt-4 border-t border-outline-variant/20 leading-relaxed">
              Yes! Most quality term policies include a conversion rider that allows you to convert some or all of your term policy into a permanent whole life policy without requiring a new medical exam.
            </p>
          </details>

          <details className="bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/30 shadow-sm rounded-xl p-6 group cursor-pointer">
            <summary className="font-headline text-lg font-bold text-on-background list-none flex justify-between items-center">
              How is the cash value in Whole Life accessed?
              <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-primary">expand_more</span>
            </summary>
            <p className="mt-4 font-body text-base text-on-surface-variant pt-4 border-t border-outline-variant/20 leading-relaxed">
              You can borrow against your cash value through tax-free policy loans, use dividends to offset premium costs, or surrender portions of the cash value if cash is needed for emergencies or investment opportunities.
            </p>
          </details>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="w-full bg-gradient-to-br from-primary/10 via-surface-container-lowest/90 to-tertiary-container/10 rounded-3xl p-6 md:p-12 relative overflow-hidden shadow-sm border border-outline-variant/30">
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-headline text-2xl md:text-4xl font-bold text-trust-navy">Request a Custom Quote</h2>
            <p className="font-body text-base text-on-surface-variant">Let our licensed advisors help you find the exact balance of coverage and monthly premium.</p>
          </div>

          {formSubmitted ? (
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-success-green/10 text-success-green rounded-full mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-trust-navy">Thank You, {formData.firstName}!</h3>
              <p className="text-body-md text-on-surface-variant">
                We have received your custom quote request for <strong>{formData.interest}</strong>. A licensed specialist will review your details and email you a personalized comparison at <strong>{formData.email}</strong>.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="px-6 py-2 bg-primary text-on-primary font-label font-semibold rounded-lg text-sm cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 bg-white/70 backdrop-blur-md border border-outline-variant/30 p-6 md:p-8 rounded-2xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label text-sm font-semibold text-on-background mb-1" htmlFor="firstName">First Name</label>
                  <input
                    required
                    type="text"
                    id="firstName"
                    placeholder="Jane"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg h-11 px-4 text-on-background font-body focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block font-label text-sm font-semibold text-on-background mb-1" htmlFor="lastName">Last Name</label>
                  <input
                    required
                    type="text"
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg h-11 px-4 text-on-background font-body focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-label text-sm font-semibold text-on-background mb-1" htmlFor="email">Email Address</label>
                <input
                  required
                  type="email"
                  id="email"
                  placeholder="jane.doe@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg h-11 px-4 text-on-background font-body focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block font-label text-sm font-semibold text-on-background mb-1" htmlFor="interest">Primary Interest</label>
                <select
                  id="interest"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg h-11 px-4 text-on-background font-body focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option>Term Life</option>
                  <option>Whole Life</option>
                  <option>Indexed Universal Life (IUL)</option>
                  <option>Not Sure - Need Guidance</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-success-green text-white font-label font-bold text-base h-12 rounded-full hover:opacity-90 shadow-sm transition-all mt-2 cursor-pointer"
              >
                Get My Free Custom Quote
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Bottom CTA Section - Request Custom Quote Button */}
      <section className="flex justify-center items-center max-w-3xl mx-auto w-full">
        <button
          onClick={onOpenQuote}
          className="px-10 py-3 bg-secondary text-on-secondary font-label font-bold text-base rounded-full shadow-md hover:bg-secondary-container transition-all cursor-pointer flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-base">quote</span>
          Request a Custom Quote
        </button>
      </section>
    </div>
  );
};
