export type LocationId = "phase-1" | "phase-2";

export interface VillaLocation {
  id: LocationId;
  phase: string;
  name: string;
  shortAddress: string;
  address: string;
  image: string;
  imageAlt: string;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
  caption?: string;
  location?: LocationId;
}

export const siteConfig = {
  businessName: "Ojubanire Villa",
  category: "Short-let apartments",
  tagline: "Your comfort matters. Your stay starts here.",
  introduction:
    "Discover a welcoming short-let experience in Igbogbo, Ikorodu, Lagos.",
  phoneNumbers: [
    { display: "07086343019", href: "tel:+2347086343019" },
    { display: "08026900283", href: "tel:+2348026900283" },
    { display: "07075357197", href: "tel:+2347075357197" },
  ],
  // Leave blank until a WhatsApp-enabled business number has been verified.
  whatsappNumber: "",
  locations: [
    {
      id: "phase-1",
      phase: "Phase 1",
      name: "Ojubanire Villa - Phase 1",
      shortAddress: "2 Oluyinka Street, off Oreta Road",
      address:
        "2 Oluyinka Street, off Oreta Road, Igbogbo, Ikorodu, Lagos State, Nigeria.",
      // Confirmed exterior photograph for Phase 1 (supplied as address 1.jpeg).
      image: "/images/phase-1-exterior.jpeg",
      imageAlt: "Exterior photograph of Ojubanire Villa Phase 1",
    },
    {
      id: "phase-2",
      phase: "Phase 2",
      name: "Ojubanire Villa - Phase 2",
      shortAddress: "1 Ups Estate, Morekete Oreta Road",
      address:
        "1 Ups Estate, Morekete Oreta Road, Igbogbo, Ikorodu, Lagos State, Nigeria.",
      // Confirmed exterior photograph for Phase 2 (supplied as address 2.jpeg).
      image: "/images/phase-2-exterior.jpeg",
      imageAlt: "Exterior photograph of Ojubanire Villa Phase 2",
    },
  ] satisfies VillaLocation[],
  amenities: [
    {
      title: "Conducive Environment",
      description:
        "A welcoming environment designed to support a comfortable and relaxing stay.",
      icon: "leaf",
    },
    {
      title: "24-Hour Solar Lighting",
      description:
        "Solar-powered lighting to support visibility and convenience throughout the day and night.",
      icon: "sun",
    },
    {
      title: "Standby Generator",
      description: "Backup power available to support guests when needed.",
      icon: "power",
    },
    {
      title: "Security",
      description:
        "Security provisions designed to help guests feel safe and comfortable during their stay.",
      icon: "shield",
    },
  ] as const,
  images: {
    hero: {
      src: "/images/ojubanire-5.jpeg",
      alt: "Living room with leather sofas, wall-mounted TV and chandelier at Ojubanire Villa",
    },
    about: {
      src: "/images/ojubanire-2.jpeg",
      alt: "Double bedroom with patterned bedding and decorative wall mirror at Ojubanire Villa",
    },
  },
  // Gallery uses only ojubanire-1.jpeg to ojubanire-8.jpeg (all curtain-free).
  gallery: [
    {
      src: "/images/ojubanire-1.jpeg",
      alt: "Double bedroom with purple patterned bedding and marble flooring at Ojubanire Villa",
      caption: "Double bedroom with ceiling lighting",
    },
    {
      src: "/images/ojubanire-2.jpeg",
      alt: "Double bedroom with patterned bedding and decorative wall mirror at Ojubanire Villa",
      caption: "Double bedroom with wall mirror",
    },
    {
      src: "/images/ojubanire-3.jpeg",
      alt: "Double bedroom with windows, purple bedding and marble flooring at Ojubanire Villa",
      caption: "Double bedroom with windows",
    },
    {
      src: "/images/ojubanire-4.jpeg",
      alt: "Bedroom with grey bedding and illuminated Ojubanire mirror at Ojubanire Villa",
      caption: "Bedroom with illuminated mirror",
    },
    {
      src: "/images/ojubanire-5.jpeg",
      alt: "Living room with leather sofas, wall-mounted TV and chandelier at Ojubanire Villa",
      caption: "Living room with wall TV",
    },
    {
      src: "/images/ojubanire-6.jpeg",
      alt: "Six-seater dining table with leather chairs at Ojubanire Villa",
      caption: "Six-seater dining area",
    },
    {
      src: "/images/ojubanire-7.jpeg",
      alt: "Bedroom with grey bedding, dressing table and illuminated mirror at Ojubanire Villa",
      caption: "Bedroom with dressing table",
    },
    {
      src: "/images/ojubanire-8.jpeg",
      alt: "Dining area with mirror wall feature and six chairs at Ojubanire Villa",
      caption: "Dining area with mirror wall",
    },
  ] as GalleryPhoto[],
  faqs: [
    {
      question: "Where is Ojubanire Villa located?",
      answer:
        "Ojubanire Villa has two locations in Igbogbo, Ikorodu, Lagos State. Phase 1 is at 2 Oluyinka Street, off Oreta Road, while Phase 2 is at 1 Ups Estate, Morekete Oreta Road.",
    },
    {
      question: "What facilities are available?",
      answer:
        "The confirmed facilities include a conducive environment, 24-hour solar lighting, a standby generator, and security.",
    },
    {
      question: "How can I enquire about availability and prices?",
      answer:
        "Contact Ojubanire Villa through any of the listed phone numbers to enquire about available accommodation, rates, and reservation arrangements.",
    },
    {
      question: "How do I get directions to the property?",
      answer:
        "Use the Get Directions link provided for your preferred location to open a Google Maps search.",
    },
    {
      question: "How can I make a reservation?",
      answer:
        "Contact the business to confirm availability, prices, and the applicable reservation procedure.",
    },
    {
      question: "Are the two locations different?",
      answer:
        "Ojubanire Villa has Phase 1 and Phase 2 at separate addresses. Contact the business to determine which location best suits your needs.",
    },
  ],
  seo: {
    title: "Ojubanire Villa | Short-Let Apartments in Igbogbo, Ikorodu",
    description:
      "Discover Ojubanire Villa, a short-let apartment destination in Igbogbo, Ikorodu, Lagos, with two locations, solar lighting, standby power, and security.",
    // Set this to a supplied, share-ready image when one is available.
    openGraphImage: "/images/ojubanire-5.jpeg",
  },
} as const;

export function getDirectionsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function getWhatsappDigits() {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15 ? digits : "";
}