import React, { useState } from 'react';
import { Page } from '../types';

interface ResourcesViewProps {
  onNavigate: (page: Page) => void;
  onOpenQuote: () => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ onNavigate, onOpenQuote }) => {
  const [willKitForm, setWillKitForm] = useState({
    fullName: '',
    email: '',
    state: 'Select a state...',
  });
  const [downloaded, setDownloaded] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showWillDocumentModal, setShowWillDocumentModal] = useState(false);
  const [activeDocumentTab, setActiveDocumentTab] = useState<'will' | 'estateGuide'>('will');

  const handleWillKitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloaded(true);
    setShowWillDocumentModal(true);

    const subject = encodeURIComponent(`Free Will Kit Request - ${willKitForm.fullName}`);
    const body = encodeURIComponent(
      `New Free Will & Estate Kit Request:\n\n` +
      `Full Name: ${willKitForm.fullName}\n` +
      `Email: ${willKitForm.email}\n` +
      `State: ${willKitForm.state}\n\n` +
      `Submitted via Insurance Made Simple website.`
    );

    window.location.href = `mailto:JASON@INSURANCESIMPLIFIED.INFO?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section Banner */}
      <section className="bg-gradient-to-br from-[#002F56] via-[#003461] to-[#bb0027] text-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-white/20 text-center max-w-5xl mx-auto space-y-4">
        <div className="inline-flex mx-auto items-center gap-2 bg-white/10 text-white border border-white/30 px-4 py-1.5 rounded-full text-xs font-label uppercase tracking-wider font-bold">
          <span className="material-symbols-outlined text-sm">menu_book</span>
          Free Educational Resources &amp; Kits
        </div>
        <h1 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          Secure Your Family&apos;s Future Today.
        </h1>
        <p className="font-body text-base md:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed">
          Estate planning shouldn&apos;t be a luxury. Access our attorney-reviewed Free Will &amp; Testament Kit, insurance calculators, and comprehensive financial planning guides.
        </p>
      </section>

      {/* Free Will Kit Form Section */}
      <section className="max-w-4xl mx-auto bg-white border border-outline-variant rounded-3xl p-8 md:p-12 shadow-md">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="inline-block px-3.5 py-1.5 bg-primary/10 text-primary font-label text-xs font-bold rounded-full uppercase tracking-wider">
              Featured Resource
            </span>
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-trust-navy">Get Your Free Will &amp; Estate Kit</h2>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              Complete attorney-reviewed template package with step-by-step guidance for estate planning, asset distribution, and guardianship.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm font-label font-bold text-trust-navy">
                <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                <span>Protect Your Loved Ones With This Fillable PDF</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/60 shadow-inner">
            {downloaded ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl text-center space-y-4">
                <span className="material-symbols-outlined text-secondary text-4xl">download_done</span>
                <h3 className="font-headline font-bold text-xl text-trust-navy">Will &amp; Estate Kit Ready!</h3>
                <p className="font-body text-sm text-on-surface-variant">
                  Thank you, <strong>{willKitForm.fullName}</strong>. We have processed your request and forwarded your details to <strong>JASON@INSURANCESIMPLIFIED.INFO</strong>. Both kit documents are unlocked below:
                </p>
                <div className="flex flex-col gap-2.5 pt-2">
                  <button
                    onClick={() => {
                      setActiveDocumentTab('will');
                      setShowWillDocumentModal(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 bg-primary text-on-primary rounded-xl font-label font-bold text-sm shadow-md hover:bg-primary-container transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">description</span>
                    <span>1. View &amp; Print Last Will &amp; Testament PDF</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveDocumentTab('estateGuide');
                      setShowWillDocumentModal(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 bg-secondary text-on-secondary rounded-xl font-label font-bold text-sm shadow-md hover:bg-secondary-container transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">menu_book</span>
                    <span>2. View &amp; Print Estate Planning Guide PDF</span>
                  </button>
                  <button
                    onClick={() => {
                      setDownloaded(false);
                      setWillKitForm({ fullName: '', email: '', state: 'Select a state...' });
                    }}
                    className="text-xs font-label text-on-surface-variant hover:text-primary underline cursor-pointer mt-1"
                  >
                    Request for another name
                  </button>
                </div>
              </div>
            ) : (
            <form onSubmit={handleWillKitSubmit} className="space-y-4">
              <div>
                <label className="block font-label text-xs font-semibold text-on-surface mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  value={willKitForm.fullName}
                  onChange={(e) => setWillKitForm({ ...willKitForm, fullName: e.target.value })}
                  className="w-full border border-outline-variant/50 rounded-xl h-11 px-4 text-sm font-body focus:border-primary focus:ring-1 focus:ring-primary bg-surface-container-low"
                />
              </div>

              <div>
                <label className="block font-label text-xs font-semibold text-on-surface mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  value={willKitForm.email}
                  onChange={(e) => setWillKitForm({ ...willKitForm, email: e.target.value })}
                  className="w-full border border-outline-variant/50 rounded-xl h-11 px-4 text-sm font-body focus:border-primary focus:ring-1 focus:ring-primary bg-surface-container-low"
                />
              </div>

              <div>
                <label className="block font-label text-xs font-semibold text-on-surface mb-1">State of Residence</label>
                <select
                  value={willKitForm.state}
                  onChange={(e) => setWillKitForm({ ...willKitForm, state: e.target.value })}
                  className="w-full border border-outline-variant/50 rounded-xl h-11 px-4 text-sm font-body focus:border-primary focus:ring-1 focus:ring-primary bg-surface-container-low"
                >
                  <option>Select a state...</option>
                  <option>California</option>
                  <option>Texas</option>
                  <option>New York</option>
                  <option>Florida</option>
                  <option>Illinois</option>
                  <option>Other State</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-on-primary px-8 py-3.5 rounded-full shadow-md hover:bg-primary-container transition-all font-label font-bold text-sm mt-2 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Download Kit Now</span>
                <span className="material-symbols-outlined text-sm">download</span>
              </button>

              <p className="text-xs text-outline text-center mt-3">
                By downloading, you agree to our Terms of Service &amp; Privacy Policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>

      {/* Featured Resource Library Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-[600px] mx-auto space-y-2">
          <h2 className="font-headline text-2xl md:text-4xl font-bold text-trust-navy">Empower Yourself with Knowledge</h2>
          <p className="font-body text-base text-on-surface-variant">Explore our curated resources designed to demystify life insurance, estate planning, and financial security.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured Article Card */}
          <div
            onClick={() => setShowArticleModal(true)}
            className="bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/30 shadow-sm rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow group flex flex-col justify-between"
          >
            <div>
              <div className="h-48 w-full relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt="Financial advisor meeting couple"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHNa4o_3dDTA1wWsjX5o0NT5IArhjstend1giOKFi-Tnzqnm0aeaCWujLWGCgPOB_2YTBL5ewbRViETOUKrpy5Q9olGWCQDzg4MEz1BSiXOPVFZ13aEcDzwLIIsseHAGfbhu48x68JQ_Amg7flQJ2HLh7rBLaP_komaHp9j3lfou8gqbX6XQ32JN-cmwcbX3u-dIH8q-2rL4U2N_1tOpxW21yRDlZOx9J1QuQYqJeUXr3JMvLBGG5so7VthTxZnaF5uLLd-aKF0g"
                />
                <div className="absolute top-4 left-4 bg-primary text-on-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Featured Guide
                </div>
              </div>
              <div className="p-6 space-y-2">
                <span className="text-secondary font-label text-xs font-semibold">Estate Planning</span>
                <h3 className="font-headline text-lg font-bold text-trust-navy group-hover:text-primary transition-colors">
                  The Ultimate Guide to Term vs. Whole Life Insurance
                </h3>
                <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                  Understanding the fundamental differences between term and whole life insurance is the first step to securing your family&apos;s financial future.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0 flex items-center justify-between text-primary font-label text-sm font-semibold">
              <span className="flex items-center gap-1">
                Read Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
              <span className="text-xs text-on-surface-variant font-normal bg-surface-container-low px-2.5 py-1 rounded-full border border-outline-variant/30">
                PDF Guide Included
              </span>
            </div>
          </div>

          {/* Tool Card 1 */}
          <div
            onClick={() => onNavigate('calculator')}
            className="bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/30 shadow-sm rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="space-y-4">
              <div className="p-3 bg-secondary/10 rounded-xl text-secondary w-fit">
                <span className="material-symbols-outlined text-3xl">calculate</span>
              </div>
              <h4 className="font-headline text-xl font-bold text-trust-navy group-hover:text-primary transition-colors">
                Life Insurance Calculator
              </h4>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Determine exactly how much coverage you need with our interactive needs calculator.
              </p>
            </div>
            <div className="flex items-center text-primary font-label text-sm font-semibold pt-6">
              Launch Tool <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
            </div>
          </div>

          {/* Tool Card 2 */}
          <div
            onClick={() => onNavigate('medicare')}
            className="bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/30 shadow-sm rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="space-y-4">
              <div className="p-3 bg-success-green/10 rounded-xl text-success-green w-fit">
                <span className="material-symbols-outlined text-3xl">medical_services</span>
              </div>
              <h4 className="font-headline text-xl font-bold text-trust-navy group-hover:text-primary transition-colors">
                Free Medicare Resources
              </h4>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Navigate healthcare options with confidence. Access specialized guides and personalized enrollment support.
              </p>
            </div>
            <div className="flex items-center text-primary font-label text-sm font-semibold pt-6">
              Explore Medicare Options <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Viewer Modal */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-outline-variant my-8 relative flex flex-col animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 md:px-8 py-5 border-b border-outline-variant/30 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-primary/10 text-primary rounded-xl material-symbols-outlined">description</span>
                <div>
                  <span className="font-label text-xs uppercase tracking-wider font-bold text-secondary">Educational Guide</span>
                  <h3 className="font-headline text-lg md:text-xl font-bold text-trust-navy">Term vs. Whole Life Insurance</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="hidden sm:flex items-center gap-1 text-xs font-label font-semibold text-on-surface-variant hover:text-primary bg-surface-container-low px-3 py-2 rounded-lg border border-outline-variant/30 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">print</span>
                  Print Guide
                </button>
                <button
                  onClick={() => setShowArticleModal(false)}
                  className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>
            </div>

            {/* Article Content Container */}
            <div className="p-6 md:p-10 space-y-8 font-body text-on-surface leading-relaxed">
              {/* Document Header */}
              <div className="border-b border-outline-variant/30 pb-6 space-y-2">
                <h1 className="font-headline text-3xl md:text-4xl font-black text-trust-navy">
                  Term vs. Whole Life Insurance
                </h1>
                <p className="font-body text-base md:text-lg text-slate-600 italic">
                  A breakdown of the two core life insurance types.
                </p>
              </div>

              {/* Term Life Section */}
              <div className="space-y-4">
                <h2 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
                  <span className="w-2 h-6 bg-primary rounded-full inline-block"></span>
                  Term Life Insurance
                </h2>
                <p className="text-base text-on-surface font-medium">
                  <strong>What it is:</strong> Pure death benefit coverage for a fixed period (10, 20, 30 years).
                </p>
                <ul className="space-y-2 text-sm md:text-base text-slate-700 pl-4 border-l-2 border-primary/20">
                  <li><strong>Cost:</strong> Much cheaper — often 5–15x less than whole life for the same coverage amount, especially when you&apos;re younger and healthier</li>
                  <li><strong>Cash value:</strong> None. It&apos;s insurance only, no investment/savings component</li>
                  <li><strong>Duration:</strong> Expires at the end of the term. If you die during the term, beneficiaries get the payout. If you outlive it, coverage ends (unless you renew, usually at a much higher rate, or convert)</li>
                  <li><strong>Flexibility:</strong> Simple — you pick a coverage amount and term length</li>
                  <li><strong>Best fit for:</strong> Covering a specific need with an end date — like income replacement while raising kids, or paying off a mortgage — during years when your family depends most on your income</li>
                </ul>
              </div>

              {/* Whole Life Section */}
              <div className="space-y-4 pt-4 border-t border-outline-variant/20">
                <h2 className="font-headline text-2xl font-bold text-secondary flex items-center gap-2">
                  <span className="w-2 h-6 bg-secondary rounded-full inline-block"></span>
                  Whole Life Insurance
                </h2>
                <p className="text-base text-on-surface font-medium">
                  <strong>What it is:</strong> Permanent coverage that lasts your entire life, combined with a savings/investment component.
                </p>
                <ul className="space-y-2 text-sm md:text-base text-slate-700 pl-4 border-l-2 border-secondary/20">
                  <li><strong>Cost:</strong> Significantly higher premiums for the same death benefit</li>
                  <li><strong>Cash value:</strong> Builds over time, tax-deferred. You can borrow against it or (in some cases) withdraw from it while alive</li>
                  <li><strong>Duration:</strong> Never expires as long as premiums are paid</li>
                  <li><strong>Guarantees:</strong> Fixed premiums, guaranteed death benefit, guaranteed minimum cash value growth (rate is usually modest)</li>
                  <li><strong>Complexity:</strong> More moving parts — dividends (with participating policies), loan provisions, surrender charges if you cancel early</li>
                  <li><strong>Best fit for:</strong> Permanent needs — estate planning, leaving a guaranteed inheritance, covering final expenses, or as part of a broader wealth-transfer strategy</li>
                </ul>
              </div>

              {/* Common Trade-off Argument */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-3">
                <h3 className="font-headline text-xl font-bold text-amber-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-600">balance</span>
                  The Common Trade-off Argument
                </h3>
                <p className="text-sm md:text-base text-amber-950 leading-relaxed">
                  A frequently cited strategy is <strong>&quot;buy term and invest the difference&quot;</strong> — take the premium savings from term insurance and invest it separately (index funds, retirement accounts, etc.), rather than paying for the built-in savings component of whole life. Over long time horizons this often outperforms whole life&apos;s cash value growth, but it requires discipline to actually invest the difference rather than spend it, and it doesn&apos;t provide permanent coverage or the guarantees whole life offers.
                </p>
              </div>

              {/* Quick Decision Points Table */}
              <div className="space-y-4 pt-4 border-t border-outline-variant/20">
                <h3 className="font-headline text-2xl font-bold text-trust-navy">Quick Decision Points</h3>
                <div className="overflow-x-auto rounded-xl border border-outline-variant/40 shadow-sm">
                  <table className="w-full text-left font-body text-sm md:text-base">
                    <thead className="bg-[#002F56] text-white">
                      <tr>
                        <th className="p-4 font-headline font-bold"></th>
                        <th className="p-4 font-headline font-bold">Term</th>
                        <th className="p-4 font-headline font-bold">Whole Life</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20 bg-white">
                      <tr>
                        <td className="p-4 font-semibold text-trust-navy">Premiums</td>
                        <td className="p-4 text-slate-700">Low</td>
                        <td className="p-4 text-slate-700">High</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-semibold text-trust-navy">Coverage length</td>
                        <td className="p-4 text-slate-700">Fixed period</td>
                        <td className="p-4 text-slate-700">Lifetime</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-semibold text-trust-navy">Cash value</td>
                        <td className="p-4 text-slate-700">No</td>
                        <td className="p-4 text-slate-700">Yes</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-semibold text-trust-navy">Best for</td>
                        <td className="p-4 text-slate-700">Temporary needs (income replacement, debt)</td>
                        <td className="p-4 text-slate-700">Permanent needs (estate planning, guaranteed payout)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Disclaimer Note */}
              <p className="text-xs md:text-sm text-slate-500 italic pt-4 border-t border-outline-variant/20 leading-relaxed">
                This is general information, not a personalized recommendation. The right choice depends on your specific goals, budget, and how long you need coverage. A fee-only financial planner or insurance broker who isn&apos;t earning commission on whole life sales can help you run the actual numbers for your situation.
              </p>
            </div>

            {/* Modal Footer Actions */}
            <div className="sticky bottom-0 bg-surface-container-lowest/95 backdrop-blur-md px-6 md:px-8 py-4 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => {
                  setShowArticleModal(false);
                  onNavigate('term');
                }}
                className="text-xs font-label font-bold text-primary hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>View Interactive Comparison Tool</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowArticleModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant font-label text-sm font-semibold hover:bg-surface-container transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowArticleModal(false);
                    onOpenQuote();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-label text-sm font-bold shadow-md hover:bg-primary-container transition-all cursor-pointer"
                >
                  Get Custom Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Last Will and Testament Legal Document Modal */}
      {showWillDocumentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-outline-variant my-6 relative flex flex-col animate-in fade-in zoom-in duration-200">
            {/* Modal Sticky Top Controls */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 md:px-8 py-4 border-b border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-primary/10 text-primary rounded-xl material-symbols-outlined">folder_special</span>
                <div>
                  <span className="font-label text-xs uppercase tracking-wider font-bold text-secondary">Free Will &amp; Estate Kit</span>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => setActiveDocumentTab('will')}
                      className={`px-3 py-1 text-xs font-label font-bold rounded-lg transition-colors cursor-pointer ${
                        activeDocumentTab === 'will'
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      1. Last Will &amp; Testament
                    </button>
                    <button
                      onClick={() => setActiveDocumentTab('estateGuide')}
                      className={`px-3 py-1 text-xs font-label font-bold rounded-lg transition-colors cursor-pointer ${
                        activeDocumentTab === 'estateGuide'
                          ? 'bg-secondary text-on-secondary'
                          : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      2. Estate Planning Guide
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 bg-primary text-on-primary font-label text-xs md:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md hover:bg-primary-container transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">print</span>
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setShowWillDocumentModal(false)}
                  className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                  aria-label="Close document"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>
            </div>

            {/* Document Content Page */}
            {activeDocumentTab === 'will' ? (
            <div className="p-6 md:p-12 space-y-8 font-serif text-slate-900 leading-relaxed bg-white text-sm md:text-base">
              {/* Document Header Title */}
              <div className="text-center space-y-3 pb-6 border-b border-slate-300">
                <h1 className="font-headline text-2xl md:text-4xl font-extrabold tracking-tight uppercase text-slate-900">
                  LAST WILL AND TESTAMENT
                </h1>
                <p className="text-sm font-sans uppercase tracking-widest font-bold text-slate-700">
                  OF <span className="underline font-bold text-slate-900">{willKitForm.fullName || '__________________________________'}</span>
                </p>
              </div>

              {/* Disclaimer Notice Box */}
              <div className="bg-slate-50 border border-slate-300 p-4 rounded-xl text-xs font-sans text-slate-700 leading-normal">
                <strong>IMPORTANT:</strong> This is a general, universal template and is not a substitute for legal advice. Requirements for a valid will (number of witnesses, notarization, self-proving affidavits, holographic will rules, etc.) vary significantly by state and country. Some jurisdictions have additional requirements not reflected here. Have this document reviewed by a licensed attorney in your jurisdiction before signing, and sign it in accordance with your local laws.
              </div>

              {/* Preamble */}
              <p className="pt-2">
                I, <strong className="underline">{willKitForm.fullName || '__________________________________'}</strong>, of <span className="underline">______________________ (city)</span>, <strong className="underline">{willKitForm.state !== 'Select a state...' ? willKitForm.state : '______________________ (state/province)'}</strong>, being of legal age and sound mind, declare this to be my Last Will and Testament, and I hereby revoke all previous wills and codicils made by me.
              </p>

              {/* ARTICLE I */}
              <div className="space-y-2 pt-2">
                <h2 className="font-headline font-bold text-base md:text-lg text-slate-900 uppercase">ARTICLE I — DECLARATION</h2>
                <p>Date of birth: _________________ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Marital status: _________________</p>
              </div>

              {/* ARTICLE II */}
              <div className="space-y-2 pt-2">
                <h2 className="font-headline font-bold text-base md:text-lg text-slate-900 uppercase">ARTICLE II — FAMILY INFORMATION</h2>
                <p>Spouse&apos;s name (if applicable): __________________________________________________</p>
                <p className="pt-1">Children&apos;s names and dates of birth:</p>
                <ol className="list-decimal list-inside space-y-1.5 pl-2">
                  <li>______________________________________________________________________</li>
                  <li>______________________________________________________________________</li>
                  <li>______________________________________________________________________</li>
                </ol>
              </div>

              {/* ARTICLE III */}
              <div className="space-y-2 pt-2">
                <h2 className="font-headline font-bold text-base md:text-lg text-slate-900 uppercase">ARTICLE III — EXECUTOR</h2>
                <p>
                  I appoint ___________________________________ of ___________________________________ as the Executor of this Will, to serve without bond. If this person is unable or unwilling to serve, I appoint ___________________________________ of ___________________________________ as alternate Executor.
                </p>
              </div>

              {/* ARTICLE IV */}
              <div className="space-y-2 pt-2">
                <h2 className="font-headline font-bold text-base md:text-lg text-slate-900 uppercase">ARTICLE IV — GUARDIAN FOR MINOR CHILDREN</h2>
                <p>
                  If I have minor children at the time of my death, I appoint ___________________________________ of ___________________________________ as Guardian. If this person is unable or unwilling to serve, I appoint ___________________________________ as alternate Guardian.
                </p>
              </div>

              {/* ARTICLE V */}
              <div className="space-y-2 pt-2">
                <h2 className="font-headline font-bold text-base md:text-lg text-slate-900 uppercase">ARTICLE V — PAYMENT OF DEBTS AND EXPENSES</h2>
                <p>
                  I direct my Executor to pay all my just debts, funeral expenses, and expenses of administering my estate as soon as practicable after my death.
                </p>
              </div>

              {/* ARTICLE VI */}
              <div className="space-y-2 pt-2">
                <h2 className="font-headline font-bold text-base md:text-lg text-slate-900 uppercase">ARTICLE VI — SPECIFIC BEQUESTS</h2>
                <p>I give the following specific gifts:</p>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                  <li>To ___________________________________, I give: ___________________________________</li>
                  <li>To ___________________________________, I give: ___________________________________</li>
                  <li>To ___________________________________, I give: ___________________________________</li>
                </ol>
              </div>

              {/* ARTICLE VII */}
              <div className="space-y-2 pt-2">
                <h2 className="font-headline font-bold text-base md:text-lg text-slate-900 uppercase">ARTICLE VII — RESIDUARY ESTATE</h2>
                <p>I give all the rest, residue, and remainder of my estate, real and personal, wherever situated, to:</p>
                <p className="pl-4 font-mono">________________________________________________________________________________</p>
                <p className="pt-2">If the above beneficiary(ies) do not survive me, I give my residuary estate to:</p>
                <p className="pl-4 font-mono">________________________________________________________________________________</p>
              </div>

              {/* ARTICLE VIII */}
              <div className="space-y-2 pt-2">
                <h2 className="font-headline font-bold text-base md:text-lg text-slate-900 uppercase">ARTICLE VIII — DIGITAL ASSETS</h2>
                <p>
                  I authorize my Executor to access, manage, distribute, and close my digital accounts and assets, including email, social media, financial, and cloud storage accounts, as permitted by applicable law.
                </p>
              </div>

              {/* ARTICLE IX */}
              <div className="space-y-2 pt-2">
                <h2 className="font-headline font-bold text-base md:text-lg text-slate-900 uppercase">ARTICLE IX — NO CONTEST CLAUSE</h2>
                <p>
                  If any beneficiary under this Will contests the validity or any provision, that beneficiary shall forfeit their share of my estate, to the extent permitted by law.
                </p>
              </div>

              {/* ARTICLE X */}
              <div className="space-y-2 pt-2">
                <h2 className="font-headline font-bold text-base md:text-lg text-slate-900 uppercase">ARTICLE X — GOVERNING LAW</h2>
                <p>
                  This Will shall be governed by the laws of <strong className="underline">{willKitForm.state !== 'Select a state...' ? willKitForm.state : '______________________'}</strong> (state/province/country of residence).
                </p>
              </div>

              {/* SIGNATURES SECTION */}
              <div className="space-y-6 pt-6 border-t-2 border-slate-300">
                <h2 className="font-headline font-extrabold text-lg md:text-xl text-slate-900 uppercase tracking-wider text-center">SIGNATURES</h2>
                <p>
                  IN WITNESS WHEREOF, I have signed this Last Will and Testament, consisting of this and the preceding pages, on this _____ day of __________________, ________ (year), and I declare that I sign it willingly, as my free and voluntary act, for the purposes expressed in it.
                </p>

                <div className="pt-4 space-y-4 max-w-lg">
                  <div>
                    <p className="font-bold">Testator&apos;s Signature: __________________________________________________</p>
                  </div>
                  <div>
                    <p className="font-bold">Printed Name: <span className="underline">{willKitForm.fullName || '__________________________________________________'}</span></p>
                  </div>
                </div>

                {/* WITNESS ATTESTATION */}
                <div className="space-y-4 pt-6 border-t border-slate-300">
                  <h3 className="font-headline font-bold text-base uppercase text-slate-900">WITNESS ATTESTATION</h3>
                  <p className="text-xs md:text-sm text-slate-700">
                    The foregoing instrument was signed, published, and declared by the Testator named above as their Last Will and Testament, in our presence, and we, at the Testator&apos;s request and in the presence of the Testator and each other, have signed our names as witnesses. We declare under penalty of perjury that the Testator appeared to be of sound mind and under no duress, fraud, or undue influence. (Check your state/country&apos;s requirements for the number of witnesses and whether notarization is required.)
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2 text-xs md:text-sm">
                      <p><strong>Witness 1 Signature:</strong> ___________________________</p>
                      <p><strong>Printed Name:</strong> _______________________________</p>
                      <p><strong>Address:</strong> ____________________________________</p>
                      <p><strong>Date:</strong> _________________</p>
                    </div>

                    <div className="space-y-2 text-xs md:text-sm">
                      <p><strong>Witness 2 Signature:</strong> ___________________________</p>
                      <p><strong>Printed Name:</strong> _______________________________</p>
                      <p><strong>Address:</strong> ____________________________________</p>
                      <p><strong>Date:</strong> _________________</p>
                    </div>
                  </div>
                </div>

                {/* NOTARIZATION SECTION */}
                <div className="space-y-4 pt-6 border-t border-slate-300 bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <h3 className="font-headline font-bold text-base uppercase text-slate-900">NOTARIZATION (if required in your jurisdiction)</h3>
                  <p className="text-xs md:text-sm">
                    State/Province of _____________________ County/District of _____________________
                  </p>
                  <p className="text-xs md:text-sm leading-relaxed">
                    On this _____ day of __________________, ________, before me personally appeared the above-named Testator and Witnesses, known to me or satisfactorily proven to be the persons whose names are subscribed above, and acknowledged that they executed this document for the purposes therein contained.
                  </p>
                  <div className="pt-2 space-y-2 text-xs md:text-sm">
                    <p><strong>Notary Public Signature:</strong> ___________________________________</p>
                    <p><strong>My Commission Expires:</strong> _________________</p>
                    <p className="text-slate-400 italic pt-2">[Notary Seal]</p>
                  </div>
                </div>
              </div>
            </div>
            ) : (
            /* Estate Planning Step-by-Step Guide Content */
            <div className="p-6 md:p-12 space-y-8 font-body text-slate-900 leading-relaxed bg-white text-sm md:text-base">
              {/* Title Header */}
              <div className="border-b border-slate-300 pb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase tracking-wider mb-1">
                  <span className="material-symbols-outlined text-sm">menu_book</span>
                  Estate Planning Guide
                </div>
                <h1 className="font-headline text-2xl md:text-4xl font-extrabold text-trust-navy">
                  Estate Planning Step-by-Step Guide
                </h1>
                <p className="text-sm md:text-base text-slate-600 italic">
                  A practical walkthrough for organizing your estate plan, distributing assets, and planning guardianship.
                </p>
              </div>

              {/* Disclaimer Box */}
              <div className="bg-slate-50 border border-slate-300 p-4 rounded-xl text-xs text-slate-700 leading-normal">
                This guide provides general information, not legal advice. Estate planning laws vary by state and country. Consider having your final documents reviewed by a licensed attorney, especially if you have a blended family, own a business, have significant assets, or have a beneficiary with special needs.
              </div>

              {/* STEP 1 */}
              <div className="space-y-3">
                <h2 className="font-headline text-xl md:text-2xl font-bold text-trust-navy flex items-center gap-2">
                  <span className="w-2 h-6 bg-primary rounded-full inline-block"></span>
                  STEP 1: Take Inventory of Your Assets
                </h2>
                <p className="text-slate-700">
                  Before you can decide who gets what, you need a full picture of what you own and owe. Go through each category below and list specifics (account numbers, approximate values, locations of documents).
                </p>

                <div className="grid md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 space-y-2">
                    <h3 className="font-headline font-bold text-sm text-primary uppercase tracking-wide">Assets to list</h3>
                    <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-slate-700">
                      <li>Real estate (primary home, vacation property, rental property, land)</li>
                      <li>Bank accounts (checking, savings, CDs)</li>
                      <li>Retirement accounts (401(k), IRA, pension)</li>
                      <li>Investment accounts (brokerage, stocks, bonds, crypto)</li>
                      <li>Life insurance policies</li>
                      <li>Business interests or ownership stakes</li>
                      <li>Vehicles, boats, or other titled property</li>
                      <li>Valuable personal property (jewelry, art, collectibles, heirlooms)</li>
                      <li>Digital assets (domain names, online businesses, digital currency, significant online accounts)</li>
                    </ul>
                  </div>

                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 space-y-2">
                    <h3 className="font-headline font-bold text-sm text-secondary uppercase tracking-wide">Liabilities to list</h3>
                    <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-slate-700">
                      <li>Mortgages and home equity loans</li>
                      <li>Auto loans</li>
                      <li>Credit card debt</li>
                      <li>Personal or student loans</li>
                      <li>Any outstanding taxes owed</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs md:text-sm text-amber-900">
                  <strong>Tip:</strong> Keep this inventory in one place — a document or spreadsheet — and note where the original paperwork for each item is stored. Your executor will need this.
                </div>
              </div>

              {/* STEP 2 */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h2 className="font-headline text-xl md:text-2xl font-bold text-trust-navy flex items-center gap-2">
                  <span className="w-2 h-6 bg-primary rounded-full inline-block"></span>
                  STEP 2: Decide How to Distribute Your Assets
                </h2>
                <p className="text-slate-700">
                  With your inventory in hand, decide who receives what. There are a few common approaches:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-xs md:text-sm text-slate-800 pl-2">
                  <li><strong>Equal division:</strong> Split the residuary estate evenly among your beneficiaries (e.g., your children).</li>
                  <li><strong>Percentage-based:</strong> Assign specific percentages to each beneficiary if you want an uneven but defined split.</li>
                  <li><strong>Specific bequests:</strong> Assign particular items or accounts to particular people (e.g., &quot;my car to my son, my jewelry to my daughter&quot;), with the remainder split some other way.</li>
                  <li><strong>Conditional gifts:</strong> Attach conditions to a gift (e.g., a beneficiary must reach a certain age). These add complexity and are usually handled through a trust rather than a simple will.</li>
                </ol>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h3 className="font-headline font-bold text-sm text-trust-navy">Things to double-check:</h3>
                  <ul className="list-disc list-inside space-y-1.5 text-xs md:text-sm text-slate-700">
                    <li>Beneficiary designations on life insurance, 401(k)s, and IRAs override what your will says — update these separately.</li>
                    <li>Jointly owned property and payable-on-death (POD) or transfer-on-death (TOD) accounts also pass outside the will.</li>
                    <li>Decide what happens if a beneficiary dies before you (a &quot;contingent&quot; or backup beneficiary).</li>
                    <li>If you&apos;re leaving unequal amounts to children, consider whether you want to explain your reasoning to avoid family conflict later.</li>
                  </ul>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h2 className="font-headline text-xl md:text-2xl font-bold text-trust-navy flex items-center gap-2">
                  <span className="w-2 h-6 bg-primary rounded-full inline-block"></span>
                  STEP 3: Choose Your Executor
                </h2>
                <p className="text-slate-700">
                  The executor carries out your wishes: paying debts, filing final taxes, and distributing assets. Choose someone who is organized, trustworthy, and willing to take this on.
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-xs md:text-sm text-slate-700 pl-2">
                  <li>Ask them before naming them — it&apos;s a real time commitment.</li>
                  <li>Name at least one alternate in case your first choice can&apos;t serve.</li>
                  <li>Consider whether they live nearby, especially if real estate or a business needs to be managed.</li>
                  <li>For complex estates, some people name a professional (attorney or trust company) as executor or co-executor.</li>
                </ul>
              </div>

              {/* STEP 4 */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h2 className="font-headline text-xl md:text-2xl font-bold text-trust-navy flex items-center gap-2">
                  <span className="w-2 h-6 bg-primary rounded-full inline-block"></span>
                  STEP 4: Plan Guardianship for Minor Children
                </h2>
                <p className="text-slate-700">
                  If you have children under 18, naming a guardian is one of the most important parts of your estate plan — without it, a court decides who raises your children.
                </p>

                <div className="space-y-2 pl-2">
                  <h3 className="font-headline font-bold text-sm text-trust-navy">How to choose:</h3>
                  <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-slate-700">
                    <li>Think about the guardian&apos;s parenting values, stability, age, health, and existing relationship with your kids.</li>
                    <li>Talk to the person first and confirm they&apos;re willing.</li>
                    <li>Name a backup guardian in case your first choice is unable to serve.</li>
                    <li>Consider whether the person raising your children should be the same person managing their inheritance — you can split these roles (guardian vs. trustee) if you prefer.</li>
                  </ul>
                </div>

                <div className="space-y-2 pl-2 pt-2">
                  <h3 className="font-headline font-bold text-sm text-trust-navy">Financial support for the guardian:</h3>
                  <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-slate-700">
                    <li>Set up a trust or custodial account so the guardian has funds for the children&apos;s care without personally covering costs.</li>
                    <li>Specify how funds should be used (education, healthcare, general support) and at what age remaining funds are released to the child.</li>
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs md:text-sm text-amber-900">
                  <strong>Tip:</strong> Revisit your guardianship choice every few years — relationships and circumstances change.
                </div>
              </div>

              {/* STEP 5 */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h2 className="font-headline text-xl md:text-2xl font-bold text-trust-navy flex items-center gap-2">
                  <span className="w-2 h-6 bg-primary rounded-full inline-block"></span>
                  STEP 5: Consider Additional Estate Planning Tools
                </h2>
                <p className="text-slate-700">
                  A will is the foundation, but a complete plan often includes a few other documents:
                </p>

                <div className="grid md:grid-cols-2 gap-3 text-xs md:text-sm">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <strong className="text-trust-navy block">Living trust</strong>
                    <p className="text-slate-700">Holds assets during your lifetime and distributes them after death, often avoiding probate. Useful for larger/complex estates or multi-state property.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <strong className="text-trust-navy block">Durable power of attorney</strong>
                    <p className="text-slate-700">Names someone to make financial decisions on your behalf if you become incapacitated.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <strong className="text-trust-navy block">Healthcare directive / living will</strong>
                    <p className="text-slate-700">Specifies your medical care preferences and names a healthcare proxy to make decisions if you can&apos;t.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <strong className="text-trust-navy block">Letter of intent</strong>
                    <p className="text-slate-700">A non-binding letter to your executor or guardian with personal wishes — funeral preferences, pet care instructions, family history.</p>
                  </div>
                </div>
              </div>

              {/* STEP 6 */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h2 className="font-headline text-xl md:text-2xl font-bold text-trust-navy flex items-center gap-2">
                  <span className="w-2 h-6 bg-primary rounded-full inline-block"></span>
                  STEP 6: Draft the Documents
                </h2>
                <p className="text-slate-700">
                  Once you&apos;ve made these decisions, put them into your will (and any trusts or other documents). Be specific — vague language is the most common source of disputes.
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-slate-700 pl-2">
                  <li>Use full legal names for people and organizations.</li>
                  <li>Clearly identify property (addresses, account numbers, descriptions).</li>
                  <li>Include a residuary clause covering anything not specifically mentioned.</li>
                  <li>Name alternates for every role (executor, guardian, beneficiary) in case your first choice cannot serve.</li>
                </ul>
              </div>

              {/* STEP 7 */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h2 className="font-headline text-xl md:text-2xl font-bold text-trust-navy flex items-center gap-2">
                  <span className="w-2 h-6 bg-primary rounded-full inline-block"></span>
                  STEP 7: Sign and Execute Properly
                </h2>
                <p className="text-slate-700">
                  A will is only valid if it&apos;s signed correctly under your jurisdiction&apos;s rules. Getting this step wrong is one of the most common reasons wills are challenged or thrown out.
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-slate-700 pl-2">
                  <li>Most US states require two witnesses who are not beneficiaries, present at the same time as you sign.</li>
                  <li>Some states allow or require notarization, or offer a &quot;self-proving affidavit&quot; that speeds up probate.</li>
                  <li>A few states recognize handwritten (&quot;holographic&quot;) wills without witnesses — rules vary widely.</li>
                  <li>Check your state or country&apos;s specific requirements, or have an attorney supervise signing.</li>
                </ul>
              </div>

              {/* STEP 8 */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h2 className="font-headline text-xl md:text-2xl font-bold text-trust-navy flex items-center gap-2">
                  <span className="w-2 h-6 bg-primary rounded-full inline-block"></span>
                  STEP 8: Store and Communicate
                </h2>
                <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-slate-700 pl-2">
                  <li>Store the original signed document somewhere safe: a fireproof safe, safe deposit box, or with your attorney.</li>
                  <li>Tell your executor and a trusted family member where to find it — a will that can&apos;t be located is as good as no will.</li>
                  <li>Give copies (or at least let them know their role) to your named executor and guardian.</li>
                  <li>Keep a list of key contacts: attorney, financial advisor, accountant.</li>
                </ul>
              </div>

              {/* STEP 9 */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h2 className="font-headline text-xl md:text-2xl font-bold text-trust-navy flex items-center gap-2">
                  <span className="w-2 h-6 bg-primary rounded-full inline-block"></span>
                  STEP 9: Review and Update Regularly
                </h2>
                <p className="text-slate-700">
                  An estate plan isn&apos;t a one-time task. Revisit it after major life events:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-slate-700 pl-2">
                  <li>Marriage, divorce, or remarriage</li>
                  <li>Birth or adoption of a child</li>
                  <li>Death of a beneficiary, executor, or guardian</li>
                  <li>Significant change in assets (buying a home, starting a business, inheritance)</li>
                  <li>Moving to a new state or country (execution requirements differ)</li>
                  <li>Every 3–5 years even without a major life event, just to confirm it still reflects your wishes</li>
                </ul>
              </div>

              {/* QUICK CHECKLIST Table */}
              <div className="space-y-3 pt-6 border-t-2 border-slate-300">
                <h2 className="font-headline text-xl md:text-2xl font-bold text-trust-navy uppercase tracking-wider">
                  QUICK CHECKLIST
                </h2>
                <div className="overflow-x-auto rounded-xl border border-slate-300 shadow-sm">
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead className="bg-[#002F56] text-white">
                      <tr>
                        <th className="p-3 w-12 text-center">Done</th>
                        <th className="p-3 font-bold">Task</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      <tr><td className="p-3 text-center">☐</td><td className="p-3 text-slate-800">Inventory all assets and liabilities</td></tr>
                      <tr><td className="p-3 text-center">☐</td><td className="p-3 text-slate-800">Decide how assets will be distributed</td></tr>
                      <tr><td className="p-3 text-center">☐</td><td className="p-3 text-slate-800">Update beneficiary designations (life insurance, retirement accounts)</td></tr>
                      <tr><td className="p-3 text-center">☐</td><td className="p-3 text-slate-800">Choose an executor and an alternate</td></tr>
                      <tr><td className="p-3 text-center">☐</td><td className="p-3 text-slate-800">Choose a guardian for minor children and an alternate</td></tr>
                      <tr><td className="p-3 text-center">☐</td><td className="p-3 text-slate-800">Set up a trust or custodial account for children&apos;s inheritance, if needed</td></tr>
                      <tr><td className="p-3 text-center">☐</td><td className="p-3 text-slate-800">Consider a living trust, power of attorney, and healthcare directive</td></tr>
                      <tr><td className="p-3 text-center">☐</td><td className="p-3 text-slate-800">Draft the will with specific, clear language</td></tr>
                      <tr><td className="p-3 text-center">☐</td><td className="p-3 text-slate-800">Sign with the correct number of witnesses (and notarize if required)</td></tr>
                      <tr><td className="p-3 text-center">☐</td><td className="p-3 text-slate-800">Store the original safely and tell your executor where it is</td></tr>
                      <tr><td className="p-3 text-center">☐</td><td className="p-3 text-slate-800">Review every few years or after major life events</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer Disclaimer */}
              <p className="text-xs text-slate-500 italic pt-4 border-t border-slate-200">
                This guide is educational and general in nature. Laws differ by state and country, and your personal situation may call for tools not covered here (special needs trusts, business succession planning, estate tax planning, etc.). An estate planning attorney can help make sure your plan is valid and complete.
              </p>
            </div>
            )}

            {/* Modal Bottom Sticky Actions */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 md:px-8 py-4 border-t border-outline-variant/30 flex items-center justify-between">
              <button
                onClick={() => setShowWillDocumentModal(false)}
                className="px-5 py-2 rounded-xl border border-outline-variant text-on-surface-variant font-label text-sm font-semibold hover:bg-surface-container transition-colors cursor-pointer"
              >
                Close Window
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-primary text-on-primary font-label text-sm font-bold px-6 py-2.5 rounded-xl shadow-md hover:bg-primary-container transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                <span>Print / Save PDF Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
