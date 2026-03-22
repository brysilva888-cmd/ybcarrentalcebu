
import React from 'react';
import { BUSINESS_INFO } from '../constants/data';

const SchemaMarkup: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "YB Car Rental Cebu",
    "image": "https://images.unsplash.com/photo-1542125387-c71274d94f0a?auto=format&fit=crop&q=80&w=1200",
    "@id": "https://ybcarrentaltours.com",
    "url": "https://ybcarrentaltours.com",
    "telephone": BUSINESS_INFO.phone,
    "priceRange": "₱₱",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Cebu City",
      "addressLocality": "Cebu",
      "postalCode": "6000",
      "addressCountry": "PH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 10.3157,
      "longitude": 123.8854
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "48"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Cebu City"
      },
      {
        "@type": "City",
        "name": "Mactan"
      }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "09:00",
      "closes": "08:00"
    },
    "sameAs": [
      BUSINESS_INFO.socials.facebook,
      BUSINESS_INFO.socials.tiktok,
      BUSINESS_INFO.socials.instagram
    ]
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
};

export default SchemaMarkup;
