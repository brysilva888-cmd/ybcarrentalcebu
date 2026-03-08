
import React from 'react';
import SEO from '../components/SEO';

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Terms of Service | YB Car Rental Cebu" 
        description="Review the terms and conditions for booking car rentals and tours with YB Car Rental Cebu."
      />

      <section className="py-20 bg-black text-white relative">
        <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-red-900/40 rounded-full blur-[120px]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-tight">Terms of Service</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Please read these terms carefully before booking with us.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-8"></p>
            
            <h2 className="text-2xl font-bold text-black mt-12 mb-6 uppercase tracking-tight">1. Booking and Reservations</h2>
            <p className="mb-6">
              Bookings are considered official only after availability is confirmed by our staff and, where applicable, a reservation fee has been paid. The balance is typically settled on the day of the tour or rental.
            </p>

            <h2 className="text-2xl font-bold text-black mt-12 mb-6 uppercase tracking-tight">2. Rental Inclusions</h2>
            <p className="mb-4">Our standard tour packages include:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Use of the vehicle for the specified duration/itinerary.</li>
              <li>Professional driver services.</li>
              <li>Fuel for the designated tour route.</li>
              <li>Parking fees (unless otherwise specified).</li>
            </ul>
            <p className="mb-6">
              Standard rentals do <strong>not</strong> include entrance fees, meals, personal expenses, or accommodation unless explicitly stated in your custom quote.
            </p>

            <h2 className="text-2xl font-bold text-black mt-12 mb-6 uppercase tracking-tight">3. Cancellation and Refunds</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Cancellations made 48 hours before the scheduled time are eligible for a full refund of the reservation fee.</li>
              <li>Cancellations made within 24-48 hours may be subject to a partial refund or rescheduling.</li>
              <li>"No-shows" on the day of the tour will result in forfeiture of the reservation fee.</li>
              <li>Weather-related cancellations will be handled with flexibility, offering full refunds or priority rescheduling.</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-12 mb-6 uppercase tracking-tight">4. Vehicle Use and Safety</h2>
            <p className="mb-6">
              Passengers are expected to treat the vehicle with respect. Smoking, illegal substances, and activities that may damage the vehicle are strictly prohibited. The driver reserves the right to refuse service to passengers who are abusive or present a safety risk.
            </p>

            <h2 className="text-2xl font-bold text-black mt-12 mb-6 uppercase tracking-tight">5. Liability</h2>
            <p className="mb-6">
              While we prioritize your safety, YB Car Rental Cebu is not liable for personal injuries, loss of items, or accidents that occur outside the vehicle at tour destinations. We recommend all travelers have personal travel insurance.
            </p>

            <h2 className="text-2xl font-bold text-black mt-12 mb-6 uppercase tracking-tight">6. Changes to Terms</h2>
            <p className="mb-6">
              YB Car Rental Cebu reserves the right to modify these terms at any time. Continued use of our services after changes are posted constitutes acceptance of the new terms.
            </p>

            <div className="mt-16 p-8 bg-red-50 rounded-3xl border border-red-100 text-center">
              <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-tight">Ready to book?</h3>
              <p className="text-gray-600 mb-6">By booking with us, you agree to these terms and conditions.</p>
              <a href="#/contact" className="inline-block bg-red-600 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-red-100 hover:bg-red-700 transition-all">Go to Contact Page</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
