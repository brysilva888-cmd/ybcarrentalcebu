
import React from 'react';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Privacy Policy | YB Car Rental Cebu" 
        description="Read our privacy policy to understand how YB Car Rental Cebu collects, uses, and protects your personal information."
      />

      <section className="py-20 bg-black text-white relative">
        <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-red-900/40 rounded-full blur-[120px]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-tight">Privacy Policy</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Your privacy is important to us. Here's how we handle your data.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-8"></p>
            
            <h2 className="text-2xl font-bold text-black mt-12 mb-6 uppercase tracking-tight">1. Information We Collect</h2>
            <p className="mb-6">
              When you use YB Car Rental Cebu services, we may collect personal information such as your name, contact number, email address, and travel details (e.g., arrival dates, group size, and destination preferences). This is primarily collected through our website inquiry forms or direct communication via WhatsApp and Messenger.
            </p>

            <h2 className="text-2xl font-bold text-black mt-12 mb-6 uppercase tracking-tight">2. How We Use Your Information</h2>
            <p className="mb-4">We use the collected information to:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Process and confirm your car rental and tour bookings.</li>
              <li>Communicate with you regarding your itinerary and travel requirements.</li>
              <li>Provide customer support and respond to your inquiries.</li>
              <li>Improve our services and website user experience.</li>
              <li>Comply with local legal requirements in the Philippines.</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-12 mb-6 uppercase tracking-tight">3. Data Security</h2>
            <p className="mb-6">
              We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-black mt-12 mb-6 uppercase tracking-tight">4. Third-Party Services</h2>
            <p className="mb-6">
              Our website links to external messaging platforms like WhatsApp and Facebook Messenger. Please be advised that these services have their own privacy policies. We do not sell your personal data to third-party marketing companies.
            </p>

            <h2 className="text-2xl font-bold text-black mt-12 mb-6 uppercase tracking-tight">5. Cookies</h2>
            <p className="mb-6">
              Our website may use cookies to improve functionality and analyze traffic. You can choose to disable cookies through your browser settings, though this may affect your experience on our site.
            </p>

            <h2 className="text-2xl font-bold text-black mt-12 mb-6 uppercase tracking-tight">6. Your Rights</h2>
            <p className="mb-6">
              You have the right to request access to the personal data we hold about you or to ask for it to be corrected or deleted. For such requests, please contact us through our official channels.
            </p>

            <div className="mt-16 p-8 bg-gray-50 rounded-3xl border border-gray-100">
              <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-tight">Contact Us</h3>
              <p className="text-gray-600">If you have any questions about this Privacy Policy, please reach out via Messenger or WhatsApp listed on our contact page.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
