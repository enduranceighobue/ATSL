import {
  BadgeCheck,
  BedDouble,
  Building2,
  CalendarCheck,
  CreditCard,
  Droplets,
  Phone,
  RefreshCw,
  UserPlus,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import innvistaLogo from "../assets/innvista.jpeg";
import ploginnLogo from "../assets/ploginn.jpeg";
import stafpayLogo from "../assets/stafpay.jpeg";
import innvistaScreen1 from "../assets/product6.jpeg";
import innvistaScreen2 from "../assets/product7.jpeg";
import innvistaScreen3 from "../assets/product8.jpeg";
import innvistaScreen4 from "../assets/product9.jpeg";

export const YOUTUBE_CHANNEL = "https://www.youtube.com/@atslng";

const paymentsHighlight = {
  icon: CreditCard,
  title: "Payments that stay in sync",
  text: "Multi-currency NGN/USD billing, folio sync, Paystack, Flutterwave, NIBSS, and POS sync.",
};

export const products = [
  {
    slug: "innvista",
    name: "InnVista",
    displayName: "The InnVista",
    tagline: "Hospitality Management",
    href: "/innvista",
    family: "hospitality",
    logo: innvistaLogo,
    logoBg: "bg-black",
    summary:
      "A cloud-ready hospitality platform for the full guest stay. Bookings, rooms, point of sale, and leak alerts run together, from the first reservation through checkout.",
    highlights: [
      {
        icon: CalendarCheck,
        title: "Booking engine",
        text: "Take reservations on your website and keep them tied to the front office.",
      },
      {
        icon: BedDouble,
        title: "Room management",
        text: "See occupancy, arrivals, and room status without a second system.",
      },
      {
        icon: UtensilsCrossed,
        title: "POS",
        text: "Outlet orders and charges stay with the guest folio.",
      },
      {
        icon: Droplets,
        title: "Leak alerts",
        text: "Flag unusual usage so the property can act before it becomes a loss.",
      },
      {
        icon: Wallet,
        title: "NGN and USD billing",
        text: "Bill in naira or dollars and keep the folio in step with the stay.",
      },
      paymentsHighlight,
    ],
    gallery: [
      { src: innvistaScreen1, alt: "InnVista dashboard" },
      { src: innvistaScreen2, alt: "InnVista rooms and occupancy" },
      { src: innvistaScreen3, alt: "InnVista reports" },
      { src: innvistaScreen4, alt: "InnVista point of sale" },
    ],
    video: {
      youtubeId: "",
      src: "",
      poster: innvistaScreen1,
      fit: "cover",
    },
    faqs: [
      {
        question: "What is InnVista?",
        answer:
          "InnVista is ATSL’s hospitality management product. It covers the booking engine, room management, point of sale, and leak alerts in one platform.",
      },
      {
        question: "How do guests book?",
        answer:
          "The booking engine connects website reservations to the property, so rooms and the front office stay on the same record.",
      },
      {
        question: "Which payments can a property take?",
        answer:
          "The hospitality suite bills in NGN and USD, syncs folios, and connects Paystack, Flutterwave, NIBSS, and POS.",
      },
      {
        question: "What do leak alerts do?",
        answer:
          "Leak alerts surface unusual consumption so the team can respond before it turns into a loss.",
      },
    ],
  },
  {
    slug: "ploginn",
    name: "PlogInn",
    displayName: "PlogInn",
    tagline: "Channel Manager",
    href: "/ploginn",
    family: "hospitality",
    logo: ploginnLogo,
    logoBg: "bg-black",
    summary:
      "Hospitality, orchestrated. PlogInn is the channel manager that keeps OTA rates and room inventory aligned from one screen, alongside InnVista.",
    highlights: [
      {
        icon: RefreshCw,
        title: "OTA rate sync",
        text: "Push rate changes to your online travel agencies from one screen.",
      },
      {
        icon: BedDouble,
        title: "Inventory sync",
        text: "Room availability updates with the rate, so channels do not oversell.",
      },
      {
        icon: Wallet,
        title: "NGN and USD billing",
        text: "Multi-currency billing stays with the folio, in naira or dollars.",
      },
      paymentsHighlight,
    ],
    gallery: [],
    video: {
      youtubeId: "",
      src: "",
      poster: ploginnLogo,
      fit: "contain",
    },
    faqs: [
      {
        question: "What does PlogInn do?",
        answer:
          "PlogInn is the channel manager in the hospitality suite. It syncs OTA rates and inventory from one screen.",
      },
      {
        question: "Do I update each OTA separately?",
        answer:
          "No. Rate and inventory changes are made once, then sent out from that screen.",
      },
      {
        question: "How does PlogInn work with InnVista?",
        answer:
          "PlogInn sits beside InnVista. Channel rates and inventory stay lined up with folios, rooms, and payments.",
      },
      {
        question: "Which payment connections are included?",
        answer:
          "Multi-currency NGN/USD billing, folio sync, Paystack, Flutterwave, NIBSS, and POS sync.",
      },
    ],
  },
  {
    slug: "stafpay",
    name: "StafPay",
    displayName: "StafPay",
    tagline: "People, Payroll, Performance Simplified",
    href: "/stafpay",
    family: "people",
    logo: stafpayLogo,
    logoBg: "bg-white",
    summary:
      "Recruitment, onboarding, and pay on one system. Built for outsourcing firms and standard companies that need people operations without a stack of separate tools.",
    highlights: [
      {
        icon: UserPlus,
        title: "Recruitment, onboarding, and pay",
        text: "Hiring, onboarding, and payroll stay connected instead of living in separate tools.",
      },
      {
        icon: BadgeCheck,
        title: "Automated state PAYE",
        text: "State PAYE compliance runs with payroll, so filings are not a manual chase.",
      },
      {
        icon: Phone,
        title: "Smartphone or analog clock-in",
        text: "Staff clock in on a smartphone or an analog phone.",
      },
      {
        icon: Building2,
        title: "Outsourcing firms and companies",
        text: "Designed for outsourcing firms and for standard companies with their own teams.",
      },
    ],
    gallery: [],
    video: {
      youtubeId: "",
      src: "",
      poster: stafpayLogo,
      fit: "contain",
    },
    faqs: [
      {
        question: "Who is StafPay for?",
        answer:
          "Outsourcing firms and standard companies that need people, payroll, and performance in one place.",
      },
      {
        question: "Are recruitment and payroll connected?",
        answer:
          "Yes. Recruitment, onboarding, and pay stay on the same flow, so hiring and payroll are not separate processes.",
      },
      {
        question: "Does StafPay handle PAYE?",
        answer: "State PAYE compliance is automated with payroll.",
      },
      {
        question: "How do staff clock in?",
        answer: "On a smartphone or an analog phone.",
      },
    ],
  },
];

export const hospitalitySuite = [
  {
    name: "InnVista",
    text: "Booking engine, room management, POS, and leak alerts.",
  },
  {
    name: "PlogInn",
    text: "OTA rate and inventory sync from one screen.",
  },
  {
    name: "Payments",
    text: "Multi-currency NGN/USD billing, folio sync, Paystack, Flutterwave, NIBSS, and POS sync.",
  },
];

export function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}
