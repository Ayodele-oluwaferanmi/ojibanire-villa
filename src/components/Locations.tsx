import { ArrowUpRight, MapPin, Navigation } from "lucide-react";
import { getDirectionsUrl, siteConfig, type LocationId } from "../data/siteConfig";
import SiteImage from "./SiteImage";
import SectionHeading from "./SectionHeading";

interface LocationsProps {
  onEnquire: (location: LocationId) => void;
}

export default function Locations({ onEnquire }: LocationsProps) {
  return (
    <section className="locations-section section-pad" id="locations" aria-labelledby="locations-title">
      <div className="page-wrap">
        <SectionHeading
          eyebrow="TWO LOCATIONS, ONE WELCOME"
          title="Find your Ojubanire Villa."
          titleId="locations-title"
          description="Explore our two locations in Igbogbo, Ikorodu, and contact us to enquire about the option that suits your needs."
          light
        />
        <div className="locations-grid">
          {siteConfig.locations.map((location, index) => (
            <article className="location-card" data-reveal key={location.id}>
              <div className="location-card__image">
                <SiteImage
                  src={location.image}
                  alt={location.imageAlt}
                  variant="location"
                  fallbackLabel={`${location.phase} property photograph not yet assigned`}
                />
              </div>
              <div className="location-card__content">
                <div className="location-card__heading">
                  <div>
                    <p className="location-card__phase">LOCATION 0{index + 1} <span /> {location.phase}</p>
                    <h3>{location.name}</h3>
                  </div>
                </div>
                <p className="location-card__address">
                  <MapPin size={17} strokeWidth={1.6} aria-hidden="true" />
                  <span>{location.address}</span>
                </p>
                <div className="location-card__actions">
                  <a
                    className="button button--outline-dark"
                    href={getDirectionsUrl(location.address)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Navigation size={15} aria-hidden="true" /> Get directions
                  </a>
                  <button
                    className="button button--forest"
                    type="button"
                    onClick={() => onEnquire(location.id)}
                  >
                    Enquire about {location.phase} <ArrowUpRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}