import React, { useState, useEffect } from 'react';
import { BookingDetails, Page } from '../types';
import { googleSignIn, initAuth, getAccessToken, logout } from '../lib/googleAuth';
import { createGoogleCalendarEvent, buildGoogleCalendarWebUrl } from '../lib/googleCalendar';
import { User } from 'firebase/auth';

interface ConsultationViewProps {
  onNavigate: (page: Page) => void;
  onConfirmBooking: (details: BookingDetails) => void;
}

export const ConsultationView: React.FC<ConsultationViewProps> = ({ onConfirmBooking }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [reason, setReason] = useState('Life Insurance Review');
  const [selectedDay, setSelectedDay] = useState('15');
  const [selectedMonth, setSelectedMonth] = useState('October 2026');
  const [selectedTime, setSelectedTime] = useState('10:00 AM EST');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmedDetails, setConfirmedDetails] = useState<BookingDetails | null>(null);

  // Google Calendar & Auth States
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [syncingCalendar, setSyncingCalendar] = useState(false);
  const [calendarSynced, setCalendarSynced] = useState(false);
  const [calendarError, setCalendarError] = useState<string | null>(null);
  const [calendarSuccessUrl, setCalendarSuccessUrl] = useState<string | null>(null);
  const [showConfirmCalendarModal, setShowConfirmCalendarModal] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        setGoogleToken(token);
        if (user.email && !email) {
          setEmail(user.email);
        }
        if (user.displayName) {
          const parts = user.displayName.split(' ');
          if (parts[0] && !firstName) setFirstName(parts[0]);
          if (parts.slice(1).join(' ') && !lastName) setLastName(parts.slice(1).join(' '));
        }
      },
      () => {
        setGoogleUser(null);
        setGoogleToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    setCalendarError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        setGoogleToken(res.accessToken);
        if (res.user.email && !email) setEmail(res.user.email);
        if (res.user.displayName) {
          const parts = res.user.displayName.split(' ');
          if (parts[0] && !firstName) setFirstName(parts[0]);
          if (parts.slice(1).join(' ') && !lastName) setLastName(parts.slice(1).join(' '));
        }
      }
    } catch (err: any) {
      console.error('Google Auth Failed:', err);
      setCalendarError('Google Sign-In was cancelled or failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleSignOut = async () => {
    await logout();
    setGoogleUser(null);
    setGoogleToken(null);
    setCalendarSynced(false);
  };

  const timeSlots = [
    '09:00 AM EST',
    '09:30 AM EST',
    '10:00 AM EST',
    '10:30 AM EST',
    '11:00 AM EST',
    '01:00 PM EST',
    '01:30 PM EST',
    '02:00 PM EST',
  ];

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const parseBookingDateIso = (details: BookingDetails) => {
    try {
      const timeClean = details.time.replace(' EST', '').trim();
      const dateStr = `${details.date} ${timeClean}`;
      const startDate = new Date(dateStr);
      if (isNaN(startDate.getTime())) {
        const fallbackStart = new Date();
        fallbackStart.setDate(fallbackStart.getDate() + 1);
        fallbackStart.setHours(10, 0, 0, 0);
        const fallbackEnd = new Date(fallbackStart.getTime() + 30 * 60000);
        return { startIso: fallbackStart.toISOString(), endIso: fallbackEnd.toISOString() };
      }
      const endDate = new Date(startDate.getTime() + 30 * 60000);
      return { startIso: startDate.toISOString(), endIso: endDate.toISOString() };
    } catch {
      const now = new Date();
      return { startIso: now.toISOString(), endIso: new Date(now.getTime() + 30 * 60000).toISOString() };
    }
  };

  const handleSyncGoogleCalendar = async () => {
    if (!confirmedDetails) return;
    setSyncingCalendar(true);
    setCalendarError(null);

    try {
      let token = googleToken;
      if (!token) {
        const authRes = await googleSignIn();
        if (authRes) {
          setGoogleUser(authRes.user);
          token = authRes.accessToken;
          setGoogleToken(authRes.accessToken);
        }
      }

      if (!token) {
        setCalendarError('Please sign in with Google to sync this appointment to your Google Calendar.');
        setSyncingCalendar(false);
        return;
      }

      const { startIso, endIso } = parseBookingDateIso(confirmedDetails);

      const res = await createGoogleCalendarEvent(
        {
          summary: `1-on-1 Insurance Consultation: ${confirmedDetails.reason} (${confirmedDetails.name})`,
          description: `Consultation with Jason York (Senior Protection Specialist).\n\nTopic: ${confirmedDetails.reason}\nClient Name: ${confirmedDetails.name}\nClient Email: ${confirmedDetails.email}\nClient Phone: ${confirmedDetails.phone}\nAdvisor: Jason York (JASON@INSURANCESIMPLIFIED.INFO)\n\nBooked via Insurance Made Simple.`,
          startDateTime: startIso,
          endDateTime: endIso,
          attendeeEmail: confirmedDetails.email,
        },
        token
      );

      if (res.success) {
        setCalendarSynced(true);
        if (res.eventUrl) setCalendarSuccessUrl(res.eventUrl);
        setShowConfirmCalendarModal(false);
      } else {
        setCalendarError(res.error || 'Could not sync event to Google Calendar.');
      }
    } catch (err: any) {
      console.error('Error syncing to Google Calendar:', err);
      setCalendarError('An error occurred while creating the event on Google Calendar.');
    } finally {
      setSyncingCalendar(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const details: BookingDetails = {
      date: `${selectedMonth.split(' ')[0]} ${selectedDay}, ${selectedMonth.split(' ')[1] || '2026'}`,
      time: selectedTime,
      advisor: 'Jason York',
      reason,
      name: `${firstName} ${lastName}`.trim() || 'Valued Client',
      email: email || 'client@example.com',
      phone: phone || '(555) 123-4567',
    };
    setConfirmedDetails(details);
    setCurrentStep(4);
    onConfirmBooking(details);

    const subject = encodeURIComponent(`New Consultation Booking - ${details.name}`);
    const body = encodeURIComponent(
      `New Consultation Booking Request:\n\n` +
      `Name: ${details.name}\n` +
      `Email: ${details.email}\n` +
      `Phone: ${details.phone}\n` +
      `Topic: ${details.reason}\n` +
      `Date & Time: ${details.date} at ${details.time}\n` +
      `Specialist: ${details.advisor}\n\n` +
      `Submitted via Insurance Made Simple website.`
    );

    window.location.href = `mailto:JASON@INSURANCESIMPLIFIED.INFO?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Hero Section Banner */}
      <section className="bg-gradient-to-br from-[#001430] via-[#002855] to-[#bb0027] text-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-white/20 text-center max-w-5xl mx-auto space-y-4">
        <div className="inline-flex mx-auto items-center gap-2 bg-white/10 text-white border border-white/30 px-4 py-1.5 rounded-full text-xs font-label uppercase tracking-wider font-bold">
          <span className="material-symbols-outlined text-sm">calendar_month</span>
          Personalized 1-on-1 Advisory
        </div>
        <h1 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          Speak with a Protection Specialist
        </h1>
        <p className="font-body text-base md:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed">
          Schedule your free, no-obligation consultation today. Follow the simple steps below to select your date, time, and topic.
        </p>
      </section>

      {/* Main Booking Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Booking Widget (Left) */}
        <div className="lg:col-span-8 bg-white border border-outline-variant shadow-md rounded-3xl p-6 md:p-8 space-y-6">
          
          {/* VISUAL STEP INDICATOR PROGRESS BAR */}
          <div className="w-full bg-surface-container-low p-4 rounded-2xl border border-outline-variant/60">
            <div className="relative flex items-center justify-between max-w-xl mx-auto px-4">
              {/* Connecting line */}
              <div className="absolute left-8 right-8 top-5 h-1 bg-outline-variant/50 -z-0" />
              <div
                className="absolute left-8 top-5 h-1 bg-primary transition-all duration-300 -z-0"
                style={{
                  width: `${((Math.min(currentStep, 4) - 1) / 3) * 88}%`,
                }}
              />

              {[
                { step: 1, label: 'Reason', icon: 'assignment' },
                { step: 2, label: 'Date & Time', icon: 'calendar_month' },
                { step: 3, label: 'Your Info', icon: 'person' },
                { step: 4, label: 'Confirmed', icon: 'check_circle' },
              ].map((item) => {
                const isCompleted = currentStep > item.step;
                const isCurrent = currentStep === item.step;
                return (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => {
                      if (item.step < currentStep && currentStep !== 4) {
                        setCurrentStep(item.step);
                      }
                    }}
                    disabled={item.step >= currentStep}
                    className="relative z-10 flex flex-col items-center group cursor-pointer disabled:cursor-not-allowed"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm ${
                        isCompleted
                          ? 'bg-secondary text-white ring-4 ring-secondary/20'
                          : isCurrent
                          ? 'bg-primary text-white ring-4 ring-primary/20 scale-110'
                          : 'bg-surface-container-high text-on-surface-variant border border-outline-variant'
                      }`}
                    >
                      {isCompleted ? (
                        <span className="material-symbols-outlined text-lg">check</span>
                      ) : (
                        <span>{item.step}</span>
                      )}
                    </div>
                    <span
                      className={`mt-1.5 font-label text-xs transition-colors hidden sm:block ${
                        isCurrent
                          ? 'text-primary font-bold'
                          : isCompleted
                          ? 'text-secondary font-semibold'
                          : 'text-on-surface-variant/70'
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* STEP 1: Reason for Consultation */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-outline-variant/30 pb-3">
                  <h2 className="font-headline text-xl md:text-2xl font-bold text-trust-navy">
                    Step 1: Select Topic for Consultation
                  </h2>
                  <p className="font-body text-xs md:text-sm text-on-surface-variant mt-1">
                    What would you like to focus on during your session?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'life_insurance', label: 'Life Insurance Review', desc: 'Term, Whole Life, or IUL policy comparison and coverage calculation.' },
                    { id: 'retirement', label: 'Retirement & Annuities', desc: 'Guaranteed lifetime income streams and market-protected growth.' },
                    { id: 'estate', label: 'Estate & Will Planning', desc: 'Legacy protection, Free Will Kit setup, and tax-efficient transfer.' },
                  ].map((item) => {
                    const isSelected = reason === item.label;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setReason(item.label)}
                        className={`p-5 border-2 rounded-2xl cursor-pointer text-left font-body transition-all flex flex-col justify-between space-y-3 ${
                          isSelected
                            ? 'border-primary bg-primary/5 text-primary shadow-md ring-2 ring-primary/20'
                            : 'border-outline-variant/60 bg-white text-on-surface-variant hover:border-primary'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-headline font-bold text-base text-trust-navy">{item.label}</span>
                            {isSelected && (
                              <span className="material-symbols-outlined text-secondary font-bold">check_circle</span>
                            )}
                          </div>
                          <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-primary text-white font-headline font-bold px-8 py-3.5 rounded-xl hover:bg-primary-container transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Choose Date &amp; Time</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Calendar & Time Slots */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-outline-variant/30 pb-3">
                  <h2 className="font-headline text-xl md:text-2xl font-bold text-trust-navy">
                    Step 2: Choose Your Date &amp; Time
                  </h2>
                  <p className="font-body text-xs md:text-sm text-on-surface-variant mt-1">
                    Select a convenient day and time slot for your call.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Calendar Grid */}
                  <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/60 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-headline text-base font-bold text-trust-navy">{selectedMonth}</h3>
                      <div className="text-xs font-label font-bold text-primary">Mon - Fri Available</div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-label font-bold text-on-surface-variant/80 mb-1">
                      <div>Su</div>
                      <div>Mo</div>
                      <div>Tu</div>
                      <div>We</div>
                      <div>Th</div>
                      <div>Fr</div>
                      <div>Sa</div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center font-body text-xs md:text-sm">
                      {[28, 29, 30].map((d) => (
                        <div key={`prev-${d}`} className="p-2 text-on-surface-variant/30">
                          {d}
                        </div>
                      ))}
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(
                        (d) => {
                          const dayStr = String(d);
                          const isSelected = selectedDay === dayStr;
                          return (
                            <button
                              key={d}
                              type="button"
                              onClick={() => setSelectedDay(dayStr)}
                              className={`p-2 rounded-full cursor-pointer transition-all font-semibold ${
                                isSelected
                                  ? 'bg-secondary text-white font-bold shadow-md scale-105'
                                  : 'hover:bg-primary/10 text-on-surface'
                              }`}
                            >
                              {d}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/60 flex flex-col justify-between">
                    <div>
                      <h3 className="font-headline text-base font-bold text-trust-navy mb-1">Available Time Slots</h3>
                      <p className="font-body text-xs text-on-surface-variant mb-4">
                        Date: <strong className="text-primary">{selectedMonth.split(' ')[0]} {selectedDay}, {selectedMonth.split(' ')[1]}</strong>
                      </p>

                      <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                        {timeSlots.map((slot) => {
                          const isSelected = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`p-2.5 rounded-xl border-2 text-center font-headline text-xs font-bold cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-primary bg-primary text-white shadow-md'
                                  : 'border-outline-variant/60 bg-white text-on-surface hover:border-primary'
                              }`}
                            >
                              {slot.replace(' EST', '')}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-outline-variant/30 text-xs text-on-surface-variant font-medium">
                      Selected Time: <strong className="text-secondary">{selectedTime}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3 border border-outline-variant rounded-xl font-headline font-bold text-sm text-on-surface hover:bg-surface-container-low transition-all cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-primary text-white font-headline font-bold px-8 py-3.5 rounded-xl hover:bg-primary-container transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Contact Details</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Contact Details */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-outline-variant/30 pb-3">
                  <h2 className="font-headline text-xl md:text-2xl font-bold text-trust-navy">
                    Step 3: Enter Your Contact Details
                  </h2>
                  <p className="font-body text-xs md:text-sm text-on-surface-variant mt-1">
                    Where should we send your appointment confirmation?
                  </p>
                </div>

                {/* Google Sign-in Banner for quick sign-in & Google Calendar sync */}
                <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm flex-shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-headline text-sm font-bold text-trust-navy">
                        {googleUser ? `Signed in as ${googleUser.displayName || googleUser.email}` : 'Sign in with Google'}
                      </h4>
                      <p className="font-body text-xs text-on-surface-variant">
                        {googleUser
                          ? 'Your name and email are synced. Calendar sync is enabled!'
                          : 'Auto-fill contact info and enable 1-click Google Calendar sync.'}
                      </p>
                    </div>
                  </div>

                  {googleUser ? (
                    <button
                      type="button"
                      onClick={handleGoogleSignOut}
                      className="px-4 py-2 border border-outline-variant bg-white text-xs font-headline font-bold text-slate-700 rounded-xl hover:bg-slate-100 transition-all cursor-pointer whitespace-nowrap"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={isLoggingIn}
                      className="px-4 py-2.5 bg-white text-trust-navy border-2 border-outline-variant hover:border-primary text-xs font-headline font-bold rounded-xl shadow-sm hover:bg-primary/5 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
                    >
                      {isLoggingIn ? 'Connecting...' : 'Sign in with Google'}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-headline text-xs font-bold text-trust-navy mb-1">First Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="Jane"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full border-2 border-outline-variant rounded-xl p-3 bg-white text-sm font-body focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-headline text-xs font-bold text-trust-navy mb-1">Last Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full border-2 border-outline-variant rounded-xl p-3 bg-white text-sm font-body focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-headline text-xs font-bold text-trust-navy mb-1">Email Address *</label>
                    <input
                      required
                      type="email"
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border-2 border-outline-variant rounded-xl p-3 bg-white text-sm font-body focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-headline text-xs font-bold text-trust-navy mb-1">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border-2 border-outline-variant rounded-xl p-3 bg-white text-sm font-body focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/60 text-xs text-on-surface-variant flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-xl flex-shrink-0">lock</span>
                  <span>Your information is strictly confidential and protected by high-standard encryption. We never share your data.</span>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3 border border-outline-variant rounded-xl font-headline font-bold text-sm text-on-surface hover:bg-surface-container-low transition-all cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="bg-secondary hover:bg-secondary-container text-white font-headline font-bold text-base py-3.5 px-8 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xl">event_available</span>
                    Confirm Consultation Booking
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Confirmation Screen */}
            {currentStep === 4 && confirmedDetails && (
              <div className="space-y-6 text-center py-6 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-500/10 text-success-green border-2 border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-headline text-2xl md:text-3xl font-black text-trust-navy">
                    Consultation Reserved!
                  </h2>
                  <p className="font-body text-sm text-on-surface-variant max-w-md mx-auto">
                    Thank you, <strong>{confirmedDetails.name}</strong>. Your 1-on-1 advisory call has been confirmed.
                  </p>
                </div>

                <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant text-left max-w-lg mx-auto space-y-3 font-body text-sm">
                  <div className="flex justify-between border-b border-outline-variant/40 pb-2">
                    <span className="text-on-surface-variant font-medium">Topic:</span>
                    <strong className="text-trust-navy">{confirmedDetails.reason}</strong>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/40 pb-2">
                    <span className="text-on-surface-variant font-medium">Date &amp; Time:</span>
                    <strong className="text-trust-navy">{confirmedDetails.date} at {confirmedDetails.time}</strong>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/40 pb-2">
                    <span className="text-on-surface-variant font-medium">Specialist:</span>
                    <strong className="text-trust-navy">{confirmedDetails.advisor}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant font-medium">Confirmation Email:</span>
                    <strong className="text-trust-navy">{confirmedDetails.email}</strong>
                  </div>
                </div>

                {calendarSynced && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl max-w-lg mx-auto text-emerald-800 text-xs font-headline font-bold flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg text-emerald-600">event_available</span>
                      <span>Successfully synced to your Google Calendar!</span>
                    </div>
                    {calendarSuccessUrl && (
                      <a
                        href={calendarSuccessUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-emerald-900 hover:text-emerald-700 font-bold"
                      >
                        View Event
                      </a>
                    )}
                  </div>
                )}

                {calendarError && (
                  <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl max-w-lg mx-auto text-rose-700 text-xs text-left">
                    <strong>Notice:</strong> {calendarError}
                  </div>
                )}

                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  {!calendarSynced && (
                    <button
                      type="button"
                      onClick={() => setShowConfirmCalendarModal(true)}
                      className="bg-primary text-white font-headline font-bold text-sm px-6 py-3 rounded-xl shadow-md hover:bg-primary-container transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">calendar_add_on</span>
                      Add to Google Calendar
                    </button>
                  )}

                  <a
                    href={buildGoogleCalendarWebUrl({
                      title: `1-on-1 Insurance Consultation with Jason York`,
                      details: `Topic: ${confirmedDetails.reason}\nSpecialist: Jason York (JASON@INSURANCESIMPLIFIED.INFO)\nClient: ${confirmedDetails.name} (${confirmedDetails.email})`,
                      startIso: parseBookingDateIso(confirmedDetails).startIso,
                      endIso: parseBookingDateIso(confirmedDetails).endIso,
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className="border-2 border-slate-300 bg-white text-slate-700 font-headline font-bold text-sm px-5 py-3 rounded-xl hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">open_in_new</span>
                    Open in Google Calendar Web
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(1);
                      setConfirmedDetails(null);
                      setCalendarSynced(false);
                      setCalendarError(null);
                    }}
                    className="border-2 border-outline-variant bg-white text-trust-navy font-headline font-bold text-sm px-5 py-3 rounded-xl hover:bg-surface-container-low transition-all cursor-pointer"
                  >
                    Book Another Session
                  </button>
                </div>
              </div>
            )}

            {/* CONFIRMATION DIALOG MODAL FOR CREATING GOOGLE CALENDAR EVENT */}
            {showConfirmCalendarModal && confirmedDetails && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-outline-variant space-y-5">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="p-2.5 bg-primary/10 text-primary rounded-xl material-symbols-outlined">
                      calendar_month
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-lg text-trust-navy">Confirm Google Calendar Sync</h3>
                      <p className="font-body text-xs text-slate-500">Google Calendar API Integration</p>
                    </div>
                  </div>

                  <p className="font-body text-sm text-slate-700 leading-relaxed">
                    Would you like to add <strong>&quot;1-on-1 Insurance Consultation: {confirmedDetails.reason}&quot;</strong> to your Google Calendar for <strong>{confirmedDetails.date} at {confirmedDetails.time}</strong>?
                  </p>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1 text-slate-600">
                    <div><strong>Event:</strong> Consultation with Jason York</div>
                    <div><strong>Date/Time:</strong> {confirmedDetails.date} at {confirmedDetails.time}</div>
                    <div><strong>Attendee:</strong> {confirmedDetails.email}</div>
                  </div>

                  {calendarError && (
                    <div className="p-3 bg-rose-50 text-rose-700 rounded-lg text-xs">
                      {calendarError}
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowConfirmCalendarModal(false)}
                      className="px-4 py-2.5 border border-slate-300 rounded-xl font-headline font-bold text-xs text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSyncGoogleCalendar}
                      disabled={syncingCalendar}
                      className="px-5 py-2.5 bg-primary text-white rounded-xl font-headline font-bold text-xs shadow-md hover:bg-primary-container transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {syncingCalendar ? 'sync' : 'event_available'}
                      </span>
                      <span>{syncingCalendar ? 'Syncing...' : 'Confirm & Sync Event'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Sidebar Context (Right) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Meet Your Advisor */}
          <div className="bg-white rounded-3xl p-6 border border-outline-variant shadow-md space-y-4 text-center">
            <h3 className="font-headline text-lg font-bold text-trust-navy text-left">Meet Your Specialist</h3>
            <div className="w-28 h-28 rounded-full overflow-hidden mx-auto border-4 border-white shadow-md relative">
              <img
                alt="Headshot of Jason York"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzlKXFE1Qv5InZ5KrIxMF2Gll-vKChrjGawCHfty1Oryaa1ENA1e2-oUO7lPsRgwC-Ymv0rNxAMcgsxgHRIm9TSUkWE3IuOTbFtaTU1jHixnnfZ3citBVnJk3WJCOz84Xolhylel4mIw9HUBTx6TZBjvX0EJmR839omKoZbXKPVlhaCsKzIII-YNu5KXUJH_lAi7fXM2zotvBqGKoKZlssnxomIf8tqaPhG7l1jknbD9ogBNQuiXnVy_pQFpbxljg4EmiBOajfNA"
              />
            </div>
            <div>
              <h4 className="font-headline font-bold text-lg text-trust-navy">Jason York</h4>
              <p className="font-label text-xs font-bold text-secondary">Senior Protection Specialist</p>
            </div>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed text-left">
              With over 13 years of experience helping families secure their wealth, Jason specializes in translating complicated insurance policies into transparent financial roadmaps.
            </p>
          </div>

          {/* 3 Easy Steps */}
          <div className="bg-white rounded-3xl p-6 border border-outline-variant shadow-md space-y-4">
            <h3 className="font-headline text-lg font-bold text-trust-navy">What to Expect</h3>
            <div className="space-y-4 font-body text-xs text-on-surface-variant">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-primary text-white font-bold flex items-center justify-center flex-shrink-0 text-xs shadow-sm">
                  1
                </div>
                <div>
                  <strong className="text-trust-navy block text-sm font-headline font-bold">Select Topic &amp; Schedule</strong>
                  Choose your call focus and pick a convenient calendar time slot.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-primary text-white font-bold flex items-center justify-center flex-shrink-0 text-xs shadow-sm">
                  2
                </div>
                <div>
                  <strong className="text-trust-navy block text-sm font-headline font-bold">1-on-1 Consultation Call</strong>
                  Jason will reach out directly at your appointed time with no obligation.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-primary text-white font-bold flex items-center justify-center flex-shrink-0 text-xs shadow-sm">
                  3
                </div>
                <div>
                  <strong className="text-trust-navy block text-sm font-headline font-bold">Clear Custom Action Plan</strong>
                  Receive transparent policy options and calculations tailored to your family.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

