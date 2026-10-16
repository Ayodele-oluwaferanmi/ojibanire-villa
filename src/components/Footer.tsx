import { ArrowUpRight, ArrowUp } from "lucide-react";
import BrandMark from "./BrandMark";
import { siteConfig } from "../data/siteConfig";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#amenities", label: "Amenities" },
  { href: "#locations", label: "Locations" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQs" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main page-wrap">
        <div className="site-footer__brand-column">
          <BrandMark light />
          <p>A welcoming short-let experience in Igbogbo, Ikorodu, Lagos.</p>
          <a className="site-footer__enquire" href="#enquiry">
            Make an enquiry <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>

        <div className="site-footer__column">
          <h2>Explore</h2>
          <ul>
            {footerLinks.map((link) => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}
          </ul>
        </div>

        <div className="site-footer__column site-footer__column--addresses">
          <h2>Our locations</h2>
          {siteConfig.locations.map((location) => (
            <address key={location.id}><span>{location.phase}</span>{location.address}</address>
          ))}
        </div>

        <div className="site-footer__column">
          <h2>Get in touch</h2>
          <ul className="site-footer__phones">
            {siteConfig.phoneNumbers.map((phone) => (
              <li key={phone.href}><a href={phone.href}>{phone.display}</a></li>
            ))}
          </ul>
          <p className="site-footer__amenities">Conducive environment / 24-hour solar lighting / Standby generator / Security</p>
        </div>
      </div>

      <div className="site-footer__bottom page-wrap">
        <p>&copy; {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.</p>
        <p>Short-let apartments in Igbogbo, Ikorodu.</p>
        <a className="back-to-top" href="#home" aria-label="Back to top"><ArrowUp size={16} /> Back to top</a>
      </div>
    </footer>
  );
}