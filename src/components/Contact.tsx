import { ArrowUpRight, MapPin, Navigation, Phone, MessageCircle } from "lucide-react";
import { getDirectionsUrl, getWhatsappDigits, siteConfig } from "../data/siteConfig";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  const whatsappDigits = getWhatsappDigits();

  return (
    <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title">
      <div className="page-wrap">
        <div className="contact-section__heading">
          <SectionHeading
            eyebrow="LET'S TALK"
            title="We're here to help."
            titleId="contact-title"
            description="Have questions about our locations, facilities, or availability? Contact Ojubanire Villa to discuss your preferred dates and accommodation needs."
          />
        </div>

        <div className="contact-layout">
          <div className="contact-phones" data-reveal>
            <p className="contact-overline"><Phone size={15} aria-hidden="true" /> CALL OJUBANIRE VILLA</p>
            <div className="contact-phones__list">
              {siteConfig.phoneNumbers.map((phone, index) => (
                <a href={phone.href} key={phone.href} className="contact-phone">
                  <span className="contact-phone__index">0{index + 1}</span>
                  <span>{phone.display}</span>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              ))}
            </div>
            {whatsappDigits ? (
              <a
                className="button button--forest contact-whatsapp"
                href={`https://wa.me/${whatsappDigits}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={16} aria-hidden="true" /> Message us on WhatsApp
              </a>
            ) : null}
          </div>

          <div className="contact-addresses" data-reveal>
            <p className="contact-overline"><MapPin size={15} aria-hidden="true" /> VISIT OUR LOCATIONS</p>
            {siteConfig.locations.map((location, index) => (
              <div className="contact-address" key={location.id}>
                <div className="contact-address__phase">0{index + 1} / {location.phase}</div>
                <address>{location.address}</address>
                <a
                  href={getDirectionsUrl(location.address)}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-address__directions"
                >
                  <Navigation size={14} aria-hidden="true" /> Get directions <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}