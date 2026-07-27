import React, { useState } from 'react';
import { Page } from '../types';

interface FAQViewProps {
  onNavigate: (page: Page) => void;
  onOpenQuote: () => void;
}

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: '1',
    category: 'Policy Basics',
    question: 'What is the difference between Term and Whole Life Insurance?',
    answer:
      'Term Life provides financial protection for a specific time window (such as 10, 20, or 30 years) with lower initial monthly payments. Whole Life provides lifelong coverage, fixed premiums, and an accumulating cash value component that grows at a guaranteed rate.',
  },
  {
    id: '2',
    category: 'Policy Basics',
    question: 'How do I update my beneficiary information?',
    answer:
      'Updating your beneficiary is simple. You can log into your account portal, request an electronic Beneficiary Change form, or schedule a quick phone call with your advisor. Beneficiary changes take effect immediately upon written confirmation.',
  },
  {
    id: '3',
    category: 'Retirement Planning',
    question: 'How does an Indexed Universal Life (IUL) policy protect against market drops?',
    answer:
      'IUL policies credit interest based on equity market index performance (like the S&P 500) but feature a 0% floor guarantee. If the index drops by 15%, your account balance receives a 0% credit for that segment, protecting your accumulated principal from loss.',
  },
  {
    id: '4',
    category: 'Retirement Planning',
    question: 'What is an annuity and how does it guarantee income for life?',
    answer:
      'An annuity is a contract between you and an insurance carrier where you contribute funds (lump sum or monthly) in exchange for regular payout disbursements. Fixed and Indexed Annuities can be converted into guaranteed lifetime paychecks you cannot outlive.',
  },
  {
    id: '5',
    category: 'Claims',
    question: 'How long does a life insurance claim payout usually take?',
    answer:
      'Once necessary documentation (such as a death certificate and simple claim form) is submitted, standard claims are processed and paid out within 10 to 14 business days.',
  },
  {
    id: '6',
    category: 'Claims',
    question: 'Are life insurance death benefits taxable to beneficiaries?',
    answer:
      'Generally, life insurance death benefits paid directly to named beneficiaries are received federal and state income tax-free.',
  },
  {
    id: '7',
    category: 'Account & Security',
    question: 'Do I need a medical exam to get covered?',
    answer:
      'Not necessarily! While full underwriting medical exams often secure the absolute lowest rates for larger coverage amounts, we offer streamlined "Simplified Issue" policies requiring only a short health questionnaire.',
  },
];

export const FAQView: React.FC<FAQViewProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Questions');
  const [expandedIds, setExpandedExpandedIds] = useState<string[]>(['1']);

  const categories = ['All Questions', 'Policy Basics', 'Retirement Planning', 'Claims', 'Account & Security'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = selectedCategory === 'All Questions' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    if (expandedIds.includes(id)) {
      setExpandedExpandedIds(expandedIds.filter((item) => item !== id));
    } else {
      setExpandedExpandedIds([...expandedIds, id]);
    }
  };

  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Hero Section Banner */}
      <section className="bg-gradient-to-br from-[#002F56] via-[#003461] to-[#bb0027] text-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-white/20 text-center max-w-5xl mx-auto space-y-4">
        <div className="inline-flex mx-auto items-center gap-2 bg-white/10 text-white border border-white/30 px-4 py-1.5 rounded-full text-xs font-label uppercase tracking-wider font-bold">
          <span className="material-symbols-outlined text-sm">help</span>
          Help Center &amp; Frequently Asked Questions
        </div>
        <h1 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          How can we help you today?
        </h1>
        <p className="font-body text-base md:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed">
          Find clear, instant answers to common questions about coverage options, retirement growth, claims, and policy management.
        </p>

        {/* Live Search Input inside banner */}
        <div className="w-full relative max-w-2xl mx-auto pt-2">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-trust-navy text-2xl z-10">
            search
          </span>
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-trust-navy placeholder:text-slate-400 border-2 border-white/80 focus:outline-none focus:ring-4 focus:ring-emerald-400/50 shadow-lg font-body font-medium text-base"
          />
        </div>
      </section>

      {/* Category Pills */}
      <section className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full font-label text-sm font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/40 hover:border-primary hover:text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Accordion FAQ List */}
      <section className="max-w-3xl mx-auto w-full space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 space-y-2">
            <span className="material-symbols-outlined text-4xl text-outline">search_off</span>
            <h3 className="font-headline font-bold text-lg text-trust-navy">No Matching Questions Found</h3>
            <p className="font-body text-sm text-on-surface-variant">
              Try searching with different terms or select a category pill above.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-surface-container-lowest/80 backdrop-blur-md rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group cursor-pointer"
                >
                  <span className="font-headline text-base md:text-lg font-bold text-trust-navy group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                  <span
                    className={`material-symbols-outlined text-primary transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isExpanded && (
                  <div className="px-6 pb-6 pt-0 font-body text-sm md:text-base text-on-surface-variant border-t border-outline-variant/20 pt-4 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* CTA Section */}
      <section className="glass-panel rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto w-full border border-outline-variant/30 shadow-md">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <h3 className="font-headline text-2xl font-bold text-trust-navy">Still have questions?</h3>
          <p className="font-body text-sm md:text-base text-on-surface-variant">
            We&apos;re here to help you navigate your insurance options with clarity and confidence. Connect with one of our specialists.
          </p>
        </div>
        <button
          onClick={() => onNavigate('consultation')}
          className="px-8 py-3.5 bg-secondary text-on-secondary font-label font-bold text-sm rounded-xl hover:bg-secondary-container transition-all shadow-md flex items-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-base">calendar_month</span>
          Schedule Consultation
        </button>
      </section>
    </div>
  );
};
