import { ArrowRight } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import SiteImage from "./SiteImage";

interface AboutProps {
  onExploreLocations: () => void;
}

export default function About({ onExploreLocations }: AboutProps) {
  return (
    <section className="about-section section-pad" id="about" aria-labelledby="about-title">
      <div className="about-section__inner page-wrap">
        <div className="about-section__photo" data-reveal>
          <SiteImage
            src={siteConfig.images.about.src}
            alt={siteConfig.images.about.alt}
            variant="about"
            fallbackLabel="About Ojubanire Villa photograph not yet assigned"
          />
          <span className="about-section__photo-caption">A welcoming stay in Igbogbo</span>
        </div>
        <div className="about-section__copy" data-reveal>
          <p className="eyebrow">A PLACE TO SETTLE IN</p>
          <h2 id="about-title">A comfortable place to call your own.</h2>
          <p>
            At Ojubanire Villa, we understand the importance of having a comfortable and welcoming place to stay. Our short-let apartments offer a conducive environment, solar lighting, standby power, and security provisions to help make your experience convenient and relaxing.
          </p>
          <p>
            With two locations in Igbogbo, Ikorodu, we invite you to get in touch and discover the option that best suits your stay.
          </p>
          <button className="text-link" type="button" onClick={onExploreLocations}>
            Explore our locations <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}