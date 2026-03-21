
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  category: string;
  content: string; // HTML content from rich text editor
  published?: boolean;
  updatedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "top-10-places-to-visit-cebu-2025",
    title: "Top 10 Must-Visit Places in Cebu for 2025",
    excerpt: "From the majestic Kawasan Falls to the historic Magellan's Cross, discover the top destinations in Cebu this year.",
    date: "May 15, 2024",
    author: "YB Travel Team",
    category: "Travel Guide",
    image: "https://lh3.googleusercontent.com/pw/AP1GczPdJEb9AFfsdepYmV7JAcujbr4EMbDSpjRSAXvwm_0uLMXov8wUVDEikBueLw_ygnq-9H5ylcv9uhoeovTamUHpvuKQUJzJCNslIRAM3xnSPrkzctc=w2400",
    published: true,
    content: `
      <p>Cebu is a paradise that offers a perfect mix of urban convenience and natural wonders. Whether you are a solo backpacker or traveling with family, the Queen City of the South has something for you.</p>
      <h2>1. Kawasan Falls & Canyoneering</h2>
      <p>No trip to Cebu is complete without visiting Badian. The canyoneering adventure is a world-class experience that ends at the breathtaking Kawasan Falls.</p>
      <h2>2. Sirao Garden (Little Amsterdam)</h2>
      <p>Located in the highlands, this flower farm offers stunning views and perfect photo opportunities with its giant hand structure and vibrant celosia flowers.</p>
      <h2>3. Temple of Leah</h2>
      <p>Often called the 'Taj Mahal of Cebu,' this massive Roman-style edifice was built as a symbol of undying love. It offers a panoramic view of the city.</p>
      <p>Planning your visit? Make sure to book a reliable car rental with a driver to navigate the steep mountain roads safely.</p>
    `
  },
  {
    slug: "cebu-city-tour-itinerary-tips",
    title: "The Ultimate Cebu City Tour Itinerary: Tips & Tricks",
    excerpt: "How to make the most of your 1-day city tour without feeling rushed. A local guide's perspective.",
    date: "June 02, 2024",
    author: "Nestor",
    category: "Pro Tips",
    image: "https://lh3.googleusercontent.com/pw/AP1GczO5u-HHXQuq80A8BTP272j6LuONCtc-OTTJFjywTu-iyg8lySxlLbEh2h_v4xfoC-pFPy8156YssI6wcM5pEiRSAYEVdUCYIMwJ-CX-eezLgjRQMCg=w2400",
    published: true,
    content: `
      <p>Visiting all the major landmarks in Cebu City in one day can be exhausting if not planned correctly. Here is how we recommend doing it.</p>
      <h2>Start Early</h2>
      <p>Begin your day at 8:00 AM at the Basilica del Santo Niño and Magellan's Cross. These sites are centrally located and best visited before the midday heat.</p>
      <h2>Lunch Like a Local</h2>
      <p>Head to the House of Lechon or Rico's for the world-famous Cebu Lechon. Don't forget to try the 'puso' (hanging rice).</p>
      <h2>Afternoon Highlands</h2>
      <p>Spend your afternoon in the cooler climate of the mountains. Visit the Taoist Temple first, then proceed to the Temple of Leah and Sirao Garden.</p>
      <p>By renting a car with a professional driver, you save time on parking and navigation, allowing you to relax between stops.</p>
    `
  },
  {
    slug: "why-hire-driver-cebu-tours",
    title: "5 Reasons Why You Should Hire a Driver for Your Cebu Tour",
    excerpt: "Traffic, navigation, and mountain roads can be tricky. Find out why a professional driver is a game-changer.",
    date: "June 10, 2024",
    author: "YB Admin",
    category: "Safety",
    image: "https://lh3.googleusercontent.com/pw/AP1GczPuySbgfyz9yuSTeXeui1Un76Cg2DPVaTiMuwUls2p6A21AJhBsnuS2Dy3A3pSP4XY5Pt8bdAYplimrjKm-3Zp2gNISp4epkBIOkXYdBuyaDhRoefg=w2400",
    published: true,
    content: `
      <p>Many tourists consider driving themselves when visiting Cebu, but here is why hiring a professional driver is actually more cost-effective and safer.</p>
      <h2>1. Expertise in Local Traffic</h2>
      <p>Cebu traffic can be unpredictable. Local drivers know the shortcuts and the best times to travel to avoid being stuck on the road for hours.</p>
      <h2>2. Safety on Mountain Roads</h2>
      <p>The roads to Sirao and Temple of Leah are steep and winding. Our drivers are experienced in handling these specific conditions daily.</p>
      <h2>3. No Parking Hassles</h2>
      <p>Finding parking at popular spots like Magellan's Cross can be a nightmare. With a driver, you can be dropped off right at the entrance and picked up whenever you are ready.</p>
      <h2>4. Local Insights</h2>
      <p>Our drivers are also informal guides. They can recommend the best local eateries that aren't necessarily on TripAdvisor.</p>
      <p>Enjoy your trip to the fullest by letting us handle the stress of the road.</p>
    `
  }
];
