import { ArrowRight, ArrowUpRight, Leaf, ShieldCheck, Sun, Zap } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import SiteImage from "./SiteImage";

interface HeroProps {
  onEnquire: () => void;
  onExploreLocations: () => void;
}

export default function Hero({ onEnquire, onExploreLocations }: HeroProps) {
  const amenityIcons = [Leaf, Sun, Zap, ShieldCheck];

  return (
    <>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero__visual" aria-hidden="true">
          <SiteImage
            src={siteConfig.images.hero.src}
            alt={siteConfig.images.hero.alt}
            variant="hero"
            fallbackLabel="Your property photograph will appear here"
            eager
          />
          <div className="hero__shade" />
        </div>

        <div className="hero__content page-wrap">
          <p className="hero__eyebrow"><span /> SHORT-LET APARTMENTS IN IGBOGBO, IKORODU</p>
          <h1 id="hero-title">Ojubanire<br /><span>Villa</span></h1>
          <h2 className="hero__promise">Comfort, privacy and<br className="desktop-only" /> peace of mind.</h2>
          <p className="hero__description">
            Discover a welcoming short-let experience in Igbogbo, Ikorodu, Lagos.
          </p>
          <div className="hero__actions">
            <button className="button button--light" type="button" onClick={onEnquire}>
              Enquire about your stay <ArrowUpRight size={16} aria-hidden="true" />
            </button>
            <button className="hero__text-link" type="button" onClick={onExploreLocations}>
              Explore our locations <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
          <p className="hero__note">{siteConfig.tagline}</p>
        </div>

      </section>

      <section className="essentials-strip" aria-label="Confirmed facilities">
        <div className="essentials-strip__inner page-wrap">
          {siteConfig.amenities.map((amenity, index) => {
            const Icon = amenityIcons[index];
            return (
              <div className="essentials-strip__item" key={amenity.title}>
                <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
                <span>{amenity.title}</span>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}