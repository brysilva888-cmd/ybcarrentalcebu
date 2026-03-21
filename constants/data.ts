
import { TourPackage } from '../types';

export const BUSINESS_INFO = {
  name: "YB Car Rental Cebu",
  tagline: "Free Driver and Fuel Included",
  address: "Cebu City, Philippines",
  phone: "+63 961 572 7423",
  whatsapp: "639615727423",
  messenger: "ybcarrentalcebu",
  socials: {
    facebook: "https://www.facebook.com/ybcarrentalcebu",
    instagram: "https://instagram.com/ybcarrentaltours"
  }
};

export const TOURS: TourPackage[] = [
  {
    id: "cebu-city-tour",
    title: "Cebu City Highlands Tour and 10K Roses",
    description: "Experience Cebu's scenic highlands and rich history in one day—iconic viewpoints, cultural landmarks, and must-see city attractions, topped off with great local food and pasalubong shopping.",
    image: "https://res.cloudinary.com/dgwcfarmv/image/upload/v1774070304/cebu4-640_gvscty.png",
    highlights: [
      'Sirao Flower Garden',
      'Temple of Leah',
      'Taoist Temple',
      'Lunch at House of Lechon',
      'Cebu Heritage Monument',
      'Yap San Diego Ancestral House',
      'Magellan’s Cross',
      'Basilica Del Sto. Niño Church',
      'Fort San Pedro',
      'Pasalubong Center Shamrock (Optional)'
    ]
  },
  {
    id: "south-cebu-adventure",
    title: "Oslob Day Tour",
    description: "Experience an unforgettable Cebu adventure with sunrise views, whale shark watching, pristine sandbars, refreshing waterfalls, and historic churches—plus a stop for famous Carcar lechon and pasalubong shopping.",
    image: "https://res.cloudinary.com/dgwcfarmv/image/upload/v1774070495/whale-shark_hfcilm.png",
    highlights: [
      'Sunrise View at Tan-awan Oslob',
      'Whaleshark Watching',
      'Sumilon Island Sand Bar',
      'Tumalog Falls',
      'Oslob Cuartel Ruins',
      'Oslob Church',
      'Simala Shrine',
      'Carcar Lechon & Pasalubong Center',
      'Side Trip Boljo-on Church'
    ]
  },
  {
    id: 'moalboal-badian-canyoneering',
    title: 'Moalboal & Badian Kawasan Tour',
    description: 'The perfect adventure combo! Be amazed by the blue waters of Kawasan Falls and test your limits as you rappel, climb, jump, and swim through the clear blue lagoons of Badian canyoneering.',
    image: "https://res.cloudinary.com/dgwcfarmv/image/upload/v1774070493/kawasan-600_gba576.png", 
    highlights: [
      'Sardines Run Encounter',
      'Turtle Watching',
      'Snorkeling',
      'Coral Garden & Fish Viewing',
      'Scuba Diving (Optional)',
      'Full Canyoneering Adventure (Optional)',
      'Cliff Jumping & Rappelling',
      'Kawasan Falls Sightseeing',
      'Kawasan Falls Swimming'
    ]
  },
  {
    id: "north-cebu-safari",
    title: "Cebu Safari & Adventure Park",
    description: "A world-class wildlife sanctuary and adventure park located in the hills of Carmen, Northern Cebu.",
    image: "https://res.cloudinary.com/dgwcfarmv/image/upload/v1774070492/cebu-safari-640_bhmzlb.png",
    highlights: ["Safari Tour", "White Lion Enclosure", "Bird Show", "Adventure Rides"]
  },
  {
    id: 'simala-shrine-pilgrimage',
    title: 'Simala Shrine with Ocean Park Tour',
    description: 'A peaceful pilgrimage to the "Castle Church" of Sibonga. Meditate, attend the 12 NN mass, and marvel at the miraculous Simala Shrine. Includes optional stops for Carcar’s famous chicharon and the Shoe Expo.',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczMJe0dvaOiazFK5OcgNya95yDvCIpjsEjPGSYySghXV41sxGqqVfx8muIIIx_B8EsT3_f805BDCE_mkg5c-Ajq5Y_A3JUtVs0RFjols06ri3gM5HYs=w2400', 
    highlights: [
      'Castle-like Gothic Architecture',
      'Daily 12:00 NN Monastery Mass',
      'Miraculous Mother Mary Statue',
      'Carcar City Heritage Stop',
      'Carcar Lechon & Pasalubong center',
      'Cebu Ocean Park'

    ]
  }
];

export const SERVICE_LIST = [
  {
    title: "Airport Transfers",
    description: "Reliable airport pick-up and drop-off from Mactan-Cebu International Airport (MCIA). No waiting, no stress.",
    icon: "✈️"
  },
  {
    title: "Custom Itineraries",
    description: "Want to go off the beaten path? We help you design a personalized trip that fits your group's interests perfectly.",
    icon: "🗺️"
  },
  {
    title: "Events & Weddings",
    description: "Arrive in style. Premium sedans and SUVs available for special occasions and corporate events, driver included.",
    icon: "💍"
  }
];
