
import React, { useState } from 'react';
import SEO from '../components/SEO';
import { BUSINESS_INFO, TOURS } from '../constants/data';

const faqs = [
  {
    question: "Is the driver and fuel really included in the price?",
    answer: "Yes! All our tour packages are 'all-inclusive' of professional driver services and fuel. There are no hidden charges for the vehicle and driver during the duration of your booked tour."
  },
  {
    question: "How do I confirm my booking?",
    answer: "After you send us your inquiry on WhatsApp or Messenger, our team will check availability for your requested date. Once confirmed, we usually require a small reservation fee to secure your slot, with the balance payable on the day of the tour."
  },
  {
    question: "Can we customize our own itinerary?",
    answer: "Absolutely. While we have popular pre-set packages, we are happy to help you design a custom trip. Just let us know which spots you'd like to visit, and we will provide a personalized quote."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We understand plans change. Please inform us at least 48 hours in advance for a full refund of your reservation fee. Cancellations due to weather are always eligible for rescheduling."
  }
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    whatsappNumber: '',
    tour: '',
    date: '',
    adults: '1',
    children: '0',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'copying' | 'redirecting'>('idle');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Get today's date in YYYY-MM-DD format to set as the minimum for the date picker
  const today = new Date().toISOString().split('T')[0];

  const formatMessage = (data?: typeof formData) => {
    const name = data?.name || '[Your Name]';
    const contact = data?.whatsappNumber || '[Your Contact Number]';
    const tour = data?.tour || '[Selected Tour Package]';
    const date = data?.date || '[Target Tour Date]';
    const adults = data?.adults || '0';
    const children = data?.children || '0';
    const message = data?.message || '[Your Message/Special Requirements]';

    return `BOOKING INQUIRY FOR YB CAR RENTAL:
------------------------------
• NAME: ${name}
• CONTACT: ${contact}
• TOUR: ${tour}
• DATE: ${date}
• PAX: ${adults} Adult(s), ${children} Child(ren)
• NOTES: ${message}
------------------------------
I'm interested in this booking. Please check availability!`;
  };

  const handleMessengerAction = async (data?: typeof formData) => {
    const textToCopy = formatMessage(data);
    setStatus('copying');

    try {
      await navigator.clipboard.writeText(textToCopy);
      setStatus('redirecting');
      
      setTimeout(() => {
        window.open(`https://m.me/${BUSINESS_INFO.messenger}`, '_blank');
        setStatus('idle');
        setShowConfirmation(true);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      window.open(`https://m.me/${BUSINESS_INFO.messenger}`, '_blank');
      setStatus('idle');
      setShowConfirmation(true);
    }
  };

  const handleWhatsAppAction = (data?: typeof formData) => {
    const text = formatMessage(data);
    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodedText}`;
    window.open(url, '_blank');
    setShowConfirmation(true);
  };

  const isFormValid = formData.name && formData.whatsappNumber && formData.tour && formData.date;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numeric characters
    const numericValue = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, whatsappNumber: numericValue });
  };

  return (
    <div className="bg-white min-h-screen relative">
      <SEO 
        title="Contact YB Car Rental Cebu | Book a Car with Driver" 
        description="Book your Cebu car rental today. Contact YB Car Rental via WhatsApp or Facebook Messenger for inquiries about tours and airport transfers in Cebu."
        keywords="book car rental Cebu, Cebu car rental contact, rent car with driver Cebu, Messenger car rental Cebu, WhatsApp car rental Cebu"
      />

      {/* Redirecting Overlay for Messenger */}
      {status === 'redirecting' && (
        <div className="fixed inset-0 z-[100] bg-blue-600/95 backdrop-blur-md flex items-center justify-center text-white text-center p-6">
          <div className="max-w-md">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-tight">Inquiry Copied!</h2>
            <p className="text-xl mb-8 opacity-90">We are opening Messenger now. <br/><strong>Just Paste (Ctrl+V)</strong> into the chat box!</p>
            <div className="bg-white/10 p-4 rounded-xl text-xs font-mono break-all border border-white/20">
              Redirecting to m.me/{BUSINESS_INFO.messenger}...
            </div>
          </div>
        </div>
      )}

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h1 className="text-4xl font-extrabold text-black mb-6 uppercase tracking-tight">Get in Touch</h1>
              <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                Choose your preferred way to contact us. Whether it's WhatsApp or Facebook Messenger, our team is ready to assist you with your Cebu itinerary.
              </p>

              <div className="space-y-10">
                <div className="flex items-start group">
                  <div className="flex-shrink-0 bg-green-500 p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-black uppercase tracking-tight">WhatsApp Support</h3>
                    <p className="text-gray-600 mt-1 font-semibold">+{BUSINESS_INFO.whatsapp}</p>
                    <p className="text-sm text-gray-400 mt-1">Direct inquiries on WhatsApp.</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="flex-shrink-0 bg-blue-600 p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.453 5.501 3.734 7.245.195.148.312.378.312.626 0 .23-.058.462-.172.68l-.837 1.674c-.114.228.115.485.344.401l2.064-.75c.214-.078.448-.07.654.024 1.2.55 2.535.858 3.9.858 5.523 0 10-4.145 10-9.258S17.523 2 12 2zm1.006 12.834l-2.584-2.753-5.045 2.753 5.545-5.89 2.584 2.753 5.045-2.753-5.545 5.89z" />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-black uppercase tracking-tight">Direct Messenger</h3>
                    <p className="text-gray-600 mt-1 font-semibold">@{BUSINESS_INFO.messenger}</p>
                    <p className="text-sm text-gray-400 mt-1">Available 24/7 on Facebook.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 z-0"></div>
              
              {showConfirmation ? (
                <div className="relative z-10 py-8 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-black text-black mb-4 uppercase tracking-tight">Inquiry Initiated!</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    Thank you for reaching out to YB Car Rental Cebu. Your inquiry has been processed through your selected app.
                  </p>
                  <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                    <p className="text-red-600 font-bold uppercase tracking-widest text-sm">
                      Expected Response Time:
                    </p>
                    <p className="text-black text-xl font-black mt-1">
                      Within 24 Hours
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowConfirmation(false)}
                    className="mt-10 text-gray-400 hover:text-black font-bold uppercase tracking-widest text-xs transition-colors"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-2 text-black uppercase tracking-tight relative z-10">Booking Inquiry</h2>
                  <p className="text-sm text-gray-500 mb-8 relative z-10">Fill out your travel details below and select your preferred messaging app.</p>
                  
                  <div className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Full Name</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                          placeholder="Juan Dela Cruz"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Contact Number</label>
                        <input 
                          type="tel" 
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                          placeholder="Numbers only, e.g. 0917XXXXXXX"
                          value={formData.whatsappNumber}
                          onChange={handlePhoneChange}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Select Tour</label>
                        <select 
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all bg-white"
                          value={formData.tour}
                          onChange={(e) => setFormData({...formData, tour: e.target.value})}
                        >
                          <option value="">Choose a package...</option>
                          {TOURS.map((tour) => (
                            <option key={tour.id} value={tour.title}>{tour.title}</option>
                          ))}
                          <option value="Airport Transfer">Airport Transfer Only</option>
                          <option value="Custom Itinerary">Custom Itinerary</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Target Date</label>
                        <input 
                          type="date" 
                          min={today}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    {/* Passengers Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Adults</label>
                        <input 
                          type="number" 
                          min="1"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                          value={formData.adults}
                          onChange={(e) => setFormData({...formData, adults: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Children</label>
                        <input 
                          type="number" 
                          min="0"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                          value={formData.children}
                          onChange={(e) => setFormData({...formData, children: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Special Requirements</label>
                      <textarea 
                        rows={4} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                        placeholder="Tell us about your group size or specific requests..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>

                    <div className="flex flex-col space-y-4 pt-4">
                      <button 
                        onClick={() => handleWhatsAppAction(formData)}
                        disabled={!isFormValid || status !== 'idle'}
                        className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center space-x-3 transition-all shadow-xl ${!isFormValid ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        <span>Send via WhatsApp</span>
                      </button>
                      
                      <button 
                        onClick={() => handleMessengerAction(formData)}
                        disabled={!isFormValid || status !== 'idle'}
                        className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center space-x-3 transition-all shadow-xl ${!isFormValid ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.453 5.501 3.734 7.245.195.148.312.378.312.626 0 .23-.058.462-.172.68l-.837 1.674c-.114.228.115.485.344.401l2.064-.75c.214-.078.448-.07.654.024 1.2.55 2.535.858 3.9.858 5.523 0 10-4.145 10-9.258S17.523 2 12 2zm1.006 12.834l-2.584-2.753-5.045 2.753 5.545-5.89 2.584 2.753 5.045-2.753-5.545 5.89z" />
                        </svg>
                        <span>{status === 'idle' ? 'Send via Messenger' : 'Processing...'}</span>
                      </button>
                    </div>
                    {!isFormValid && (
                      <p className="text-[10px] text-center text-red-400 font-bold uppercase tracking-tighter">Please fill in Name, Contact, Tour, and Date to proceed.</p>
                    )}
                    <p className="text-[10px] text-center text-gray-400 uppercase tracking-tighter">Note: Messenger will open with the inquiry copied to your clipboard. Just Paste (Ctrl+V) to send.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black uppercase tracking-tight">Frequently Asked Questions</h2>
            <div className="w-20 h-1.5 bg-red-600 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-8">
                <h3 className="text-xl font-bold text-black mb-4 flex items-start">
                  <span className="text-red-600 mr-3">Q.</span>
                  {faq.question}
                </h3>
                <div className="flex items-start text-gray-600 leading-relaxed pl-8">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-black rounded-3xl text-center text-white">
            <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">Need more help?</h3>
            <p className="text-gray-400 mb-8">Click below to ask us anything. We'll pre-fill our contact template for you.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => handleWhatsAppAction()}
                className="inline-flex items-center space-x-3 bg-green-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-green-700 transition-all uppercase tracking-widest shadow-xl w-full sm:w-auto"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp Us</span>
              </button>
              <button 
                onClick={() => handleMessengerAction()}
                className="inline-flex items-center space-x-3 bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all uppercase tracking-widest shadow-xl w-full sm:w-auto"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.453 5.501 3.734 7.245.195.148.312.378.312.626 0 .23-.058.462-.172.68l-.837 1.674c-.114.228.115.485.344.401l2.064-.75c.214-.078.448-.07.654.024 1.2.55 2.535.858 3.9.858 5.523 0 10-4.145 10-9.258S17.523 2 12 2zm1.006 12.834l-2.584-2.753-5.045 2.753 5.545-5.89 2.584 2.753 5.045-2.753-5.545 5.89z" />
                </svg>
                <span>Messenger Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
