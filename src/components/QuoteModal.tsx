import React, { useState } from 'react';
import { QuoteFormData } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: 35,
    coverageAmount: '$500,000',
    interest: 'Term Life',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const subject = encodeURIComponent(`New Quote Request - ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(
      `New Quote Request Received:\n\n` +
      `First Name: ${formData.firstName}\n` +
      `Last Name: ${formData.lastName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Age: ${formData.age}\n` +
      `Coverage Amount: ${formData.coverageAmount}\n` +
      `Primary Interest: ${formData.interest}\n\n` +
      `Submitted via Insurance Made Simple website.`
    );

    // Trigger mailto link to send details to JASON@INSURANCESIMPLIFIED.INFO
    window.location.href = `mailto:JASON@INSURANCESIMPLIFIED.INFO?subject=${subject}&body=${body}`;

    setTimeout(() => {
      if (onSubmitSuccess) onSubmitSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
      <div className="bg-white border-2 border-outline-variant rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-trust-navy transition-colors p-2 rounded-full hover:bg-slate-100 cursor-pointer z-10"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-success-green/10 text-success-green rounded-full mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-trust-navy">Quote Request Received!</h3>
            <p className="text-body-md text-on-surface-variant">
              Thank you, <strong className="text-on-surface">{formData.firstName}</strong>. Your request has been forwarded to <strong>JASON@INSURANCESIMPLIFIED.INFO</strong> and our advisor will send your customized quote options to <strong className="text-on-surface">{formData.email}</strong> shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-primary text-on-primary rounded-lg font-label font-semibold hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-label text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
                Free Instant Estimate
              </span>
              <h2 className="font-headline text-2xl font-bold text-trust-navy">Request a Custom Quote</h2>
              <p className="font-body text-sm text-on-surface-variant">
                Fast, transparent, and personalized coverage comparison without hard inquiries.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-label font-semibold text-on-surface mb-1">First Name</label>
                <input
                  required
                  type="text"
                  placeholder="Jane"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 border border-outline-variant/50 rounded-lg text-sm bg-surface-container-low focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-label font-semibold text-on-surface mb-1">Last Name</label>
                <input
                  required
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-outline-variant/50 rounded-lg text-sm bg-surface-container-low focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-label font-semibold text-on-surface mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-outline-variant/50 rounded-lg text-sm bg-surface-container-low focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-label font-semibold text-on-surface mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-outline-variant/50 rounded-lg text-sm bg-surface-container-low focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-label font-semibold text-on-surface mb-1">Your Age</label>
                <input
                  type="number"
                  min="18"
                  max="85"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-outline-variant/50 rounded-lg text-sm bg-surface-container-low focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-label font-semibold text-on-surface mb-1">Coverage Needed</label>
                <select
                  value={formData.coverageAmount}
                  onChange={(e) => setFormData({ ...formData, coverageAmount: e.target.value })}
                  className="w-full px-3 py-2 border border-outline-variant/50 rounded-lg text-sm bg-surface-container-low focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option>$250,000</option>
                  <option>$500,000</option>
                  <option>$1,000,000</option>
                  <option>$2,000,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-label font-semibold text-on-surface mb-1">Primary Interest</label>
              <select
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                className="w-full px-3 py-2 border border-outline-variant/50 rounded-lg text-sm bg-surface-container-low focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option>Term Life</option>
                <option>Whole Life</option>
                <option>Indexed Universal Life (IUL)</option>
                <option>Annuities & Retirement Income</option>
                <option>Not Sure - Need Guidance</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-secondary text-on-secondary rounded-lg font-label font-bold text-sm hover:opacity-90 transition-all shadow-md mt-2 flex items-center justify-center gap-2"
            >
              Submit Quote Request
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
