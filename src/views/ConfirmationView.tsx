import React from 'react';
import { BookingDetails, Page } from '../types';

interface ConfirmationViewProps {
  bookingDetails: BookingDetails | null;
  onNavigate: (page: Page) => void;
}

export const ConfirmationView: React.FC<ConfirmationViewProps> = ({ bookingDetails, onNavigate }) => {
  const details: BookingDetails = bookingDetails || {
    date: 'October 15, 2026',
    time: '10:00 AM EST',
    advisor: 'Jason York',
    reason: 'Life Insurance Review',
    name: 'Valued Client',
    email: 'client@example.com',
    phone: '(555) 123-4567',
  };

  const handleAddToCalendar = () => {
    alert(`Calendar Event Created!\n\nConsultation with ${details.advisor}\nDate: ${details.date}\nTime: ${details.time}`);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 pb-20 w-full max-w-3xl mx-auto">
      <div className="bg-surface-container-lowest/80 backdrop-blur-xl rounded-3xl w-full p-8 md:p-12 relative text-center border border-outline-variant/40 shadow-lg space-y-8">
        {/* Success Indicator */}
        <div className="mx-auto w-20 h-20 bg-success-green/10 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-success-green text-5xl">check_circle</span>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary">Your Consultation is Confirmed!</h1>
          <p className="font-body text-base md:text-lg text-on-surface-variant max-w-xl mx-auto">
            Thank you, <strong>{details.name}</strong>. We look forward to reviewing your financial protection strategy.
          </p>
        </div>

        {/* Booking Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-surface-container-low/60 rounded-2xl p-6 border border-outline-variant/30 text-center">
          <div className="flex flex-col items-center space-y-1">
            <span className="material-symbols-outlined text-primary text-3xl">calendar_today</span>
            <span className="font-label text-on-surface-variant uppercase tracking-wider text-xs font-semibold">Date</span>
            <span className="font-headline text-base md:text-lg font-bold text-on-surface">{details.date}</span>
          </div>

          <div className="flex flex-col items-center space-y-1 md:border-l md:border-r border-outline-variant/30 px-2">
            <span className="material-symbols-outlined text-primary text-3xl">schedule</span>
            <span className="font-label text-on-surface-variant uppercase tracking-wider text-xs font-semibold">Time</span>
            <span className="font-headline text-base md:text-lg font-bold text-on-surface">{details.time}</span>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <span className="material-symbols-outlined text-primary text-3xl">person</span>
            <span className="font-label text-on-surface-variant uppercase tracking-wider text-xs font-semibold">Advisor</span>
            <span className="font-headline text-base md:text-lg font-bold text-on-surface">{details.advisor}</span>
          </div>
        </div>

        {/* Topic details */}
        <div className="text-xs md:text-sm font-body text-on-surface-variant bg-surface-container-low/30 py-2.5 px-4 rounded-xl inline-block border border-outline-variant/20">
          Reason for Call: <strong className="text-trust-navy">{details.reason}</strong> • Notification Sent to: <strong className="text-trust-navy">{details.email}</strong>
        </div>

        {/* What's Next Section */}
        <div className="text-left space-y-6 pt-2">
          <h2 className="font-headline text-xl font-bold text-trust-navy text-center">What&apos;s Next?</h2>
          <div className="space-y-4 max-w-2xl mx-auto font-body text-sm text-on-surface-variant">
            {/* Step 1 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 border border-outline-variant/20">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-sm">
                1
              </div>
              <div className="space-y-1">
                <h3 className="font-headline font-bold text-on-surface text-base">Check Your Inbox</h3>
                <p>We sent a confirmation email with a calendar invitation and phone dial-in details.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 border border-outline-variant/20">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-sm">
                2
              </div>
              <div className="space-y-1">
                <h3 className="font-headline font-bold text-on-surface text-base">Gather Key Documents</h3>
                <p>Have any current policy summaries or mortgage debt statements handy for quick reference.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 border border-outline-variant/20">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-sm">
                3
              </div>
              <div className="space-y-1">
                <h3 className="font-headline font-bold text-on-surface text-base">Prompt Call Confirmation</h3>
                <p>Jason will contact you directly at {details.phone} at the exact scheduled time.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <button
            onClick={() => onNavigate('home')}
            className="w-full sm:w-auto bg-primary hover:bg-primary-container text-white font-label py-3.5 px-8 rounded-full transition-all min-h-[48px] shadow-md flex items-center justify-center gap-2 font-bold cursor-pointer"
          >
            Return to Homepage
          </button>
          <button
            onClick={handleAddToCalendar}
            className="w-full sm:w-auto bg-white hover:bg-surface-container-low text-primary border border-outline-variant/50 font-label py-3.5 px-8 rounded-full transition-all min-h-[48px] shadow-sm flex items-center justify-center gap-2 font-bold cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">event</span>
            Add to Calendar
          </button>
        </div>
      </div>
    </div>
  );
};
