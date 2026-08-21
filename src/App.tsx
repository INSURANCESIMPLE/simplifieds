import { useState, useEffect } from 'react';
import { Page, BookingDetails } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomeView } from './views/HomeView';
import { WholeLifeView } from './views/WholeLifeView';
import { TermVsWholeView } from './views/TermVsWholeView';
import { IULView } from './views/IULView';
import { AnnuitiesView } from './views/AnnuitiesView';
import { CalculatorView } from './views/CalculatorView';
import { MedicareView } from './views/MedicareView';
import { ResourcesView } from './views/ResourcesView';
import { FAQView } from './views/FAQView';
import { ConsultationView } from './views/ConsultationView';
import { ConfirmationView } from './views/ConfirmationView';
import { PrivacyView } from './views/PrivacyView';
import { TermsView } from './views/TermsView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  const handleOpenQuote = () => {
    window.open('https://scheduler.zoom.us/Insurance-Made-Simple', '_blank', 'noopener,noreferrer');
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleConfirmBooking = (details: BookingDetails) => {
    setBookingDetails(details);
    setCurrentPage('confirmation');
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Soft Ambient Background Radial Blurs */}
      <div className="fixed top-[-10%] left-[-5%] w-[60vw] h-[60vw] rounded-full bg-primary/10 blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-secondary/10 blur-[140px] -z-10 pointer-events-none"></div>
      <div className="fixed top-[40%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-tertiary/10 blur-[100px] -z-10 pointer-events-none"></div>

      {/* Main Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenQuote={handleOpenQuote}
      />

      {/* Page Content Canvas */}
      <main className="flex-grow pt-24 px-4 md:px-10 max-w-container-max mx-auto w-full relative z-10">
        {currentPage === 'home' && (
          <HomeView onNavigate={handleNavigate} onOpenQuote={handleOpenQuote} />
        )}
        {currentPage === 'whole-life' && (
          <WholeLifeView onNavigate={handleNavigate} onOpenQuote={handleOpenQuote} />
        )}
        {currentPage === 'term' && (
          <TermVsWholeView onNavigate={handleNavigate} onOpenQuote={handleOpenQuote} />
        )}
        {currentPage === 'iul' && (
          <IULView onNavigate={handleNavigate} onOpenQuote={handleOpenQuote} />
        )}
        {currentPage === 'annuities' && (
          <AnnuitiesView onNavigate={handleNavigate} onOpenQuote={handleOpenQuote} />
        )}
        {currentPage === 'calculator' && (
          <CalculatorView onNavigate={handleNavigate} onOpenQuote={handleOpenQuote} />
        )}
        {currentPage === 'medicare' && (
          <MedicareView onNavigate={handleNavigate} onOpenQuote={handleOpenQuote} />
        )}
        {currentPage === 'resources' && (
          <ResourcesView onNavigate={handleNavigate} onOpenQuote={handleOpenQuote} />
        )}
        {currentPage === 'faq' && (
          <FAQView onNavigate={handleNavigate} onOpenQuote={handleOpenQuote} />
        )}
        {currentPage === 'consultation' && (
          <ConsultationView
            onNavigate={handleNavigate}
            onConfirmBooking={handleConfirmBooking}
          />
        )}
        {currentPage === 'confirmation' && (
          <ConfirmationView bookingDetails={bookingDetails} onNavigate={handleNavigate} />
        )}
        {currentPage === 'privacy' && <PrivacyView onNavigate={handleNavigate} />}
        {currentPage === 'terms' && <TermsView onNavigate={handleNavigate} />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
