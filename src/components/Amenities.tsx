import { Leaf, ShieldCheck, Sun, Zap } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import SectionHeading from "./SectionHeading";

const amenityIcons = { leaf: Leaf, sun: Sun, power: Zap, shield: ShieldCheck };

export default function Amenities() {
  return (
    <section className="amenities-section section-pad" id="amenities" aria-labelledby="amenities-title">
      <div className="page-wrap">
        <SectionHeading
          eyebrow="THE ESSENTIALS"
          title="Designed around your comfort."
          titleId="amenities-title"
          description="Enjoy practical facilities that help make your stay more comfortable and convenient."
        />
        <div className="amenities-grid">
          {siteConfig.amenities.map((amenity, index) => {
            const Icon = amenityIcons[amenity.icon];
            return (
              <article className="amenity-item" data-reveal key={amenity.title}>
                <div className="amenity-item__topline">
                  <span className="amenity-item__number">0{index + 1}</span>
                  <Icon size={24} strokeWidth={1.45} aria-hidden="true" />
                </div>
                <h3>{amenity.title}</h3>
                <p>{amenity.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}