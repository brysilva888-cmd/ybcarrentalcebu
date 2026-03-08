
import React from 'react';
import SEO from '../components/SEO';
import { BUSINESS_INFO } from '../constants/data';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      <SEO 
        title="About Us | YB Car Rental Tour Service Cebu" 
        description="Learn more about YB Car Rentaland Tour. We are a premier car rental service provider in Cebu, Philippines, offering all-in tour packages since 2023."
        keywords="Cebu car rental company, car rental Cebu with driver about, yb car rental cebu"
      />

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-red-600 font-bold tracking-widest uppercase text-sm">Our Story</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-black mt-4 mb-8">Serving Cebu's Travelers Since 2023</h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                YB Car Rental Tour Service started with a simple mission: to make Cebu's world-class attractions accessible to everyone without the stress of navigating unfamiliar roads or worrying about gas prices.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Today, we are one of the most trusted names for car rental in Cebu. Our fleet has grown, but our commitment to providing a "Free Driver and Fuel" experience remains the core of our business. We believe that when you're on vacation, the only thing you should worry about is making memories.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-bold text-red-600 mb-2">250+</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Happy Travelers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-red-600 mb-2">3+</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://lh3.googleusercontent.com/pw/AP1GczO5u-HHXQuq80A8BTP272j6LuONCtc-OTTJFjywTu-iyg8lySxlLbEh2h_v4xfoC-pFPy8156YssI6wcM5pEiRSAYEVdUCYIMwJ-CX-eezLgjRQMCg=w2400" 
                  alt="Cebu landmarks" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-red-600 p-8 rounded-3xl shadow-xl text-white hidden md:block border-4 border-white">
                <p className="text-xl font-italic font-serif">"Your comfort is our top priority."</p>
                <p className="mt-4 font-bold uppercase tracking-wider">— YB Car Rental Cebu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black uppercase tracking-tight">Our Core Values</h2>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Reliability", desc: "We are never late. Our drivers are trained to be punctual for every airport transfer or tour." },
              { title: "Transparency", desc: "No hidden fees. We explain our inclusions clearly so you can budget your trip with confidence." },
              { title: "Hospitality", desc: "Our drivers are more than just chauffeurs; they are your local guides and companions in Cebu." }
            ].map((v, i) => (
              <div key={i} className="text-center p-8 rounded-3xl bg-white hover:shadow-xl transition-all border border-gray-100">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-4 text-black uppercase tracking-tight">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
