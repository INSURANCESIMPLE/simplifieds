import React, { useState } from 'react';
import { Page } from '../types';

interface CalculatorViewProps {
  onNavigate: (page: Page) => void;
  onOpenQuote: () => void;
}

export const CalculatorView: React.FC<CalculatorViewProps> = ({ onNavigate, onOpenQuote }) => {
  const [calcMode, setCalcMode] = useState<'life' | 'retire'>('life');

  // Life Insurance State
  const [age, setAge] = useState<number>(35);
  const [income, setIncome] = useState<number>(85000);
  const [mortgage, setMortgage] = useState<number>(250000);
  const [debt, setDebt] = useState<number>(25000);
  const [education, setEducation] = useState<number>(100000);
  const [years, setYears] = useState<number>(10);

  // Retirement Income State
  const [currentAge, setCurrentAge] = useState<number>(45);
  const [retireAge, setRetireAge] = useState<number>(65);
  const [initialInvest, setInitialInvest] = useState<number>(250000);
  const [monthlyContrib, setMonthlyContribution] = useState<number>(1000);
  const [expectedGrowth, setExpectedGrowth] = useState<number>(6);

  // Life Calculations
  const incomeNeeds = income * years;
  const debtNeeds = mortgage + debt;
  const totalLifeCoverage = incomeNeeds + debtNeeds + education;

  const incomePct = totalLifeCoverage > 0 ? Math.round((incomeNeeds / totalLifeCoverage) * 100) : 0;
  const debtPct = totalLifeCoverage > 0 ? Math.round((debtNeeds / totalLifeCoverage) * 100) : 0;
  const eduPct = totalLifeCoverage > 0 ? 100 - incomePct - debtPct : 0;

  // Retirement Calculations (Future Value & Monthly Income)
  const yearsToRetire = Math.max(1, retireAge - currentAge);
  const r = expectedGrowth / 100 / 12;
  const n = yearsToRetire * 12;

  // FV of lump sum: P * (1 + r)^n
  const fvLump = initialInvest * Math.pow(1 + r, n);
  // FV of annuity stream: PMT * [((1 + r)^n - 1) / r]
  const fvStream = r > 0 ? monthlyContrib * ((Math.pow(1 + r, n) - 1) / r) : monthlyContrib * n;
  const totalRetirementAccumulated = Math.round(fvLump + fvStream);

  // Safe withdrawal rate rule (e.g. 5.5% annual payout from annuity)
  const estimatedMonthlyRetireIncome = Math.round((totalRetirementAccumulated * 0.055) / 12);
  const guaranteedPortion = Math.round(estimatedMonthlyRetireIncome * 0.75);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#002F56] via-[#003461] to-[#bb0027] text-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-white/20 text-center max-w-5xl mx-auto space-y-6">
        {/* High-Contrast Mode Toggle Bar */}
        <div className="inline-flex p-1.5 bg-[#001c38] rounded-2xl border border-white/20 shadow-inner max-w-full overflow-x-auto">
          <button
            onClick={() => setCalcMode('life')}
            className={`px-6 py-2.5 rounded-xl font-headline font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
              calcMode === 'life'
                ? 'bg-secondary text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-base">shield</span>
            Life Insurance Needs
          </button>
          <button
            onClick={() => setCalcMode('retire')}
            className={`px-6 py-2.5 rounded-xl font-headline font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
              calcMode === 'retire'
                ? 'bg-secondary text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-base">trending_up</span>
            Retirement &amp; Annuity Income
          </button>
        </div>

        <h1 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          {calcMode === 'life' ? (
            <>
              Calculate Your <span className="text-amber-300">Life Insurance</span> Needs
            </>
          ) : (
            <>
              Visualize Your <span className="text-amber-300">Retirement Income</span>
            </>
          )}
        </h1>
        <p className="font-body text-base md:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed">
          {calcMode === 'life'
            ? 'Adjust values to get an instant, personalized estimate of the total coverage your family requires to preserve their lifestyle.'
            : 'Estimate your accumulated wealth and lifetime guaranteed monthly income for retirement using annuity growth projections.'}
        </p>
      </section>

      {calcMode === 'life' ? (
        /* Life Insurance Calculator Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Top Highlight Banner for Required Coverage */}
            <div className="bg-gradient-to-br from-[#002D56] via-[#003461] to-[#276839] text-white rounded-2xl p-6 md:p-8 shadow-xl border-2 border-secondary/40 space-y-4">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <span className="font-label text-xs uppercase tracking-wider text-emerald-300 font-bold bg-white/10 px-3 py-1 rounded-full border border-white/20">
                    Real-time Estimate
                  </span>
                  <h2 className="font-headline text-lg md:text-xl font-bold text-white/90 mt-2">
                    Total Required Coverage Calculation
                  </h2>
                </div>
                <div className="bg-white text-trust-navy px-4 py-1.5 rounded-full font-label text-xs font-bold shadow-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-secondary">verified</span>
                  Tailored For Age {age}
                </div>
              </div>

              <div className="flex items-baseline gap-2 pt-1">
                <span className="font-headline text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-md">
                  {formatCurrency(totalLifeCoverage)}
                </span>
              </div>

              <p className="font-body text-xs sm:text-sm text-white/90 leading-relaxed border-t border-white/15 pt-3">
                This amount ensures your family can replace <strong>{years} years</strong> of income ({formatCurrency(incomeNeeds)}), fully payoff mortgage &amp; debts ({formatCurrency(debtNeeds)}), and fund college education ({formatCurrency(education)}).
              </p>
            </div>

            {/* Personal Info Card */}
            <div className="bg-surface-container-lowest backdrop-blur-md rounded-2xl border border-outline-variant shadow-sm p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                  <span className="material-symbols-outlined text-xl">person</span>
                </div>
                <h2 className="font-headline text-xl font-bold text-trust-navy">1. Personal &amp; Income Baseline</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/50">
                  <div className="flex justify-between items-center">
                    <label className="font-label text-sm font-bold text-on-surface" htmlFor="age">
                      Your Age
                    </label>
                    <span className="bg-primary text-white font-headline text-base font-bold px-3 py-0.5 rounded-full shadow-sm">
                      {age} yrs
                    </span>
                  </div>
                  <input
                    id="age"
                    type="range"
                    min="18"
                    max="85"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="custom-slider w-full mt-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-on-surface-variant/70">
                    <span>18</span>
                    <span>85 yrs</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/50">
                  <label className="font-label text-sm font-bold text-on-surface" htmlFor="income">
                    Annual Working Income ($)
                  </label>
                  <input
                    id="income"
                    type="number"
                    step="5000"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full border-2 border-outline-variant rounded-lg px-4 py-2 text-lg font-headline font-bold text-trust-navy bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-inner"
                  />
                  <span className="text-xs text-on-surface-variant/80">Gross annual earnings before taxes</span>
                </div>
              </div>
            </div>

            {/* Financial Obligations Card */}
            <div className="bg-surface-container-lowest backdrop-blur-md rounded-2xl border border-outline-variant shadow-sm p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary font-bold">
                  <span className="material-symbols-outlined text-xl">home_work</span>
                </div>
                <h2 className="font-headline text-xl font-bold text-trust-navy">2. Liabilities &amp; Mortgage</h2>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col gap-2 bg-surface-container-low p-4.5 rounded-xl border border-outline-variant/50">
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-label text-sm font-bold text-on-surface" htmlFor="mortgage">
                      Remaining Mortgage Balance
                    </label>
                    <span className="bg-secondary text-white font-headline text-base font-bold px-3 py-1 rounded-full shadow-sm">
                      {formatCurrency(mortgage)}
                    </span>
                  </div>
                  <input
                    id="mortgage"
                    type="range"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={mortgage}
                    onChange={(e) => setMortgage(Number(e.target.value))}
                    className="custom-slider w-full cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-on-surface-variant/70">
                    <span>$0</span>
                    <span>$1,000,000+</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 bg-surface-container-low p-4.5 rounded-xl border border-outline-variant/50">
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-label text-sm font-bold text-on-surface" htmlFor="debt">
                      Other Debts (Auto, Credit Cards, Loans)
                    </label>
                    <span className="bg-secondary text-white font-headline text-base font-bold px-3 py-1 rounded-full shadow-sm">
                      {formatCurrency(debt)}
                    </span>
                  </div>
                  <input
                    id="debt"
                    type="range"
                    min="0"
                    max="250000"
                    step="5000"
                    value={debt}
                    onChange={(e) => setDebt(Number(e.target.value))}
                    className="custom-slider w-full cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-on-surface-variant/70">
                    <span>$0</span>
                    <span>$250,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Family Needs Card */}
            <div className="bg-surface-container-lowest backdrop-blur-md rounded-2xl border border-outline-variant shadow-sm p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
                <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary font-bold">
                  <span className="material-symbols-outlined text-xl">family_restroom</span>
                </div>
                <h2 className="font-headline text-xl font-bold text-trust-navy">3. Family &amp; Income Protection</h2>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col gap-2 bg-surface-container-low p-4.5 rounded-xl border border-outline-variant/50">
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-label text-sm font-bold text-on-surface" htmlFor="education">
                      Child College / Education Fund
                    </label>
                    <span className="bg-primary text-white font-headline text-base font-bold px-3 py-1 rounded-full shadow-sm">
                      {formatCurrency(education)}
                    </span>
                  </div>
                  <input
                    id="education"
                    type="range"
                    min="0"
                    max="500000"
                    step="10000"
                    value={education}
                    onChange={(e) => setEducation(Number(e.target.value))}
                    className="custom-slider w-full cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-on-surface-variant/70">
                    <span>$0</span>
                    <span>$500,000</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 bg-surface-container-low p-4.5 rounded-xl border border-outline-variant/50">
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-label text-sm font-bold text-on-surface" htmlFor="replacement">
                      Income Replacement Duration
                    </label>
                    <span className="bg-primary text-white font-headline text-base font-bold px-3 py-1 rounded-full shadow-sm">
                      {years} Years
                    </span>
                  </div>
                  <input
                    id="replacement"
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="custom-slider w-full cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-on-surface-variant/70">
                    <span>1 Year</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Sticky Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="bg-trust-navy text-on-primary rounded-2xl p-6 md:p-8 shadow-2xl border-2 border-emerald-500/40 relative overflow-hidden space-y-6">
              <div className="space-y-2">
                <span className="font-label text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-md border border-emerald-500/30">
                  RECOMMENDED POLICY BENEFIT
                </span>
                <h3 className="font-headline text-base font-bold text-slate-200">Required Life Insurance Coverage</h3>
                <div className="font-headline text-4xl sm:text-5xl font-black text-white tracking-tight leading-none drop-shadow-md py-1">
                  {formatCurrency(totalLifeCoverage)}
                </div>
              </div>

              {/* Visual Breakdown Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Coverage Distribution</span>
                  <span>100% Total</span>
                </div>
                <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden flex border border-white/20 p-0.5">
                  <div className="bg-emerald-500 h-full rounded-l-full transition-all duration-300" style={{ width: `${incomePct}%` }} title="Income Replacement" />
                  <div className="bg-blue-400 h-full transition-all duration-300" style={{ width: `${debtPct}%` }} title="Mortgage & Debts" />
                  <div className="bg-amber-400 h-full rounded-r-full transition-all duration-300" style={{ width: `${eduPct}%` }} title="Education" />
                </div>
              </div>

              <div className="space-y-3 font-body text-sm pt-2 border-t border-white/15">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm" />
                    <span className="text-white/90 font-medium">Income ({years} yrs)</span>
                  </div>
                  <span className="font-bold text-white font-headline">{formatCurrency(incomeNeeds)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-blue-400 shadow-sm" />
                    <span className="text-white/90 font-medium">Mortgage &amp; Debts</span>
                  </div>
                  <span className="font-bold text-white font-headline">{formatCurrency(debtNeeds)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-sm" />
                    <span className="text-white/90 font-medium">Child Education Fund</span>
                  </div>
                  <span className="font-bold text-white font-headline">{formatCurrency(education)}</span>
                </div>
              </div>

              <button
                onClick={onOpenQuote}
                className="w-full py-4 bg-secondary text-white font-headline font-extrabold text-base rounded-xl hover:opacity-95 active:scale-98 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                Get Custom Rates For {formatCurrency(totalLifeCoverage)}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>

            {/* Expert Advisor Call Card */}
            <div className="bg-white border border-outline-variant/60 shadow-sm p-6 rounded-2xl flex items-center gap-5">
              <img
                alt="Jason York Headshot"
                className="w-16 h-16 rounded-full object-cover border-2 border-secondary shadow-md flex-shrink-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgvVoLMyxu46YyjPRd102HqbTd5pVZohsFuIGiA-1eE7iIE2oRDnejobZqDeXBnOt1UMGzMJinyr4GyBc-F23vo7KC2CsFSqoEqm6xUpeYJN9o9-AOA5oig3hIPsJ3I0M5LVTsD9Z_ZJEt9oe4ohIduVbUuhs50IaZTV3Thcp5bGhRuRi2TPlW1ntWjXxVl7_YgjjBp7BuY-8BPGtNEfWQyfqoDO1WKwhrTBnguAiIlEtzMC83ckFreKyIaV__3lti_Wywxqbg-Q"
              />
              <div className="flex-grow space-y-1">
                <h4 className="font-headline font-bold text-trust-navy text-base">Talk to Jason York</h4>
                <p className="font-body text-xs text-slate-600">Review your coverage calculation with a licensed advisor.</p>
                <button
                  onClick={() => onNavigate('consultation')}
                  className="mt-2 text-secondary font-label text-xs font-extrabold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">phone_in_talk</span>
                  Schedule Free 1-on-1 Call →
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Retirement Income Calculator Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-6 md:p-8 space-y-6 relative border border-outline-variant shadow-sm">
            <h2 className="text-xl font-headline font-bold text-trust-navy border-b border-outline-variant/30 pb-3">
              Your Retirement Parameters
            </h2>

            <div className="space-y-5">
              <div className="flex flex-col gap-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/50">
                <div className="flex justify-between items-center">
                  <span className="font-label text-sm font-bold text-on-surface">Current Age</span>
                  <span className="bg-primary text-white font-headline font-bold text-sm px-3 py-0.5 rounded-full shadow-sm">{currentAge} yrs</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="80"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  className="custom-slider w-full mt-1 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/50">
                <div className="flex justify-between items-center">
                  <span className="font-label text-sm font-bold text-on-surface">Planned Retirement Age</span>
                  <span className="bg-secondary text-white font-headline font-bold text-sm px-3 py-0.5 rounded-full shadow-sm">{retireAge} yrs</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="90"
                  value={retireAge}
                  onChange={(e) => setRetireAge(Number(e.target.value))}
                  className="custom-slider w-full mt-1 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/50">
                <label className="text-sm font-label font-bold text-on-surface">Initial Investment Amount ($)</label>
                <input
                  type="number"
                  step="5000"
                  value={initialInvest}
                  onChange={(e) => setInitialInvest(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border-2 border-outline-variant bg-surface-container-lowest text-lg font-headline font-bold text-trust-navy focus:border-primary shadow-inner"
                />
              </div>

              <div className="flex flex-col gap-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/50">
                <label className="text-sm font-label font-bold text-on-surface">Monthly Contribution ($)</label>
                <input
                  type="number"
                  step="100"
                  value={monthlyContrib}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border-2 border-outline-variant bg-surface-container-lowest text-lg font-headline font-bold text-trust-navy focus:border-primary shadow-inner"
                />
              </div>

              <div className="flex flex-col gap-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/50">
                <div className="flex justify-between items-center">
                  <span className="font-label text-sm font-bold text-on-surface">Expected Growth Rate</span>
                  <span className="bg-primary text-white font-headline font-bold text-sm px-3 py-0.5 rounded-full shadow-sm">{expectedGrowth}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="0.5"
                  value={expectedGrowth}
                  onChange={(e) => setExpectedGrowth(Number(e.target.value))}
                  className="custom-slider w-full mt-1 cursor-pointer"
                />
                <p className="text-xs text-on-surface-variant/80 italic mt-1">Indexed annuity strategies protect principal with 0% downside risk.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="accent-gradient rounded-2xl p-8 text-on-primary shadow-lg text-center space-y-3">
              <span className="text-xs font-label uppercase tracking-wider text-white/80 font-semibold">Estimated Guaranteed Monthly Income</span>
              <div className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tight">
                {formatCurrency(estimatedMonthlyRetireIncome)} <span className="text-lg font-body font-normal text-white/80">/ mo</span>
              </div>
              <p className="text-sm font-body text-white/90 max-w-md mx-auto">
                Based on starting income at age <strong>{retireAge}</strong> for the rest of your life.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-6 border-t-4 border-t-primary space-y-1">
                <div className="flex items-center gap-2 text-on-surface-variant text-sm font-semibold">
                  <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                  Total Accumulated
                </div>
                <div className="text-2xl font-headline font-bold text-trust-navy">{formatCurrency(totalRetirementAccumulated)}</div>
                <div className="text-xs text-outline">Projected balance at age {retireAge}</div>
              </div>

              <div className="glass-card rounded-2xl p-6 border-t-4 border-t-secondary space-y-1">
                <div className="flex items-center gap-2 text-on-surface-variant text-sm font-semibold">
                  <span className="material-symbols-outlined text-secondary">verified_user</span>
                  Guaranteed Floor
                </div>
                <div className="text-2xl font-headline font-bold text-trust-navy">{formatCurrency(guaranteedPortion)} / mo</div>
                <div className="text-xs text-outline">Protected with 0% market downside floor</div>
              </div>
            </div>

            <div className="bg-surface-container-low/60 rounded-2xl p-6 text-center space-y-4 border border-outline-variant/30">
              <h4 className="font-headline font-bold text-lg text-trust-navy">Customize Your Retirement Strategy</h4>
              <p className="font-body text-sm text-on-surface-variant">
                Speak with our Annuity &amp; IUL Specialist to verify current payout rates and tax advantages.
              </p>
              <button
                onClick={() => onNavigate('consultation')}
                className="px-8 py-3 bg-primary text-on-primary font-label font-bold text-sm rounded-full shadow-sm hover:bg-primary-container transition-all cursor-pointer"
              >
                Schedule Free Strategy Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
