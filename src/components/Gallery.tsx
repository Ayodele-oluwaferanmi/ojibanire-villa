import { useCallback, useState } from "react";
import { ArrowUpRight, Expand } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import SiteImage from "./SiteImage";
import SectionHeading from "./SectionHeading";
import Lightbox from "./Lightbox";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const photos = siteConfig.gallery;
  const indexedPhotos = photos.map((photo, index) => ({ photo, index }));
  const groupedPhotos = [
    ...siteConfig.locations
      .map((location) => ({
        key: location.id,
        title: location.phase,
        items: indexedPhotos.filter((item) => item.photo.location === location.id),
      }))
      .filter((group) => group.items.length > 0),
    ...(indexedPhotos.some((item) => !item.photo.location)
      ? [{
          key: "unassigned",
          title: "Additional photographs",
          items: indexedPhotos.filter((item) => !item.photo.location),
        }]
      : []),
  ];

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const showPrevious = useCallback(() => {
    setActiveIndex((index) =>
      index === null ? null : (index - 1 + photos.length) % photos.length,
    );
  }, [photos.length]);
  const showNext = useCallback(() => {
    setActiveIndex((index) => (index === null ? null : (index + 1) % photos.length));
  }, [photos.length]);

  return (
    <section className="gallery-section section-pad" id="gallery" aria-labelledby="gallery-title">
      <div className="page-wrap">
        <SectionHeading
          eyebrow="A CLOSER LOOK"
          title="A place to make yourself at home."
          titleId="gallery-title"
          description="Explore photographs of Ojubanire Villa and its spaces."
        />

        {photos.length > 0 ? (
          <div className="gallery-collections">
            {groupedPhotos.map((group) => (
              <div className="gallery-group" key={group.key}>
                <div className="gallery-group__heading">
                  <span>{group.title === "Additional photographs" ? "PROPERTY PHOTOGRAPHY" : "CONFIRMED LOCATION"}</span>
                  <h3>{group.title}</h3>
                </div>
                <div className="gallery-grid">
                  {group.items.map(({ photo, index }) => (
                    <button
                      className="gallery-item"
                      type="button"
                      key={`${photo.src}-${index}`}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Open photograph: ${photo.caption ?? photo.alt}`}
                      data-reveal
                    >
                      <SiteImage
                        src={photo.src}
                        alt={photo.alt}
                        variant="gallery"
                        fallbackLabel="Configured property photograph could not be loaded"
                      />
                      <span className="gallery-item__caption">{photo.caption ?? photo.alt}</span>
                      <span className="gallery-item__expand" aria-hidden="true"><Expand size={16} /></span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="gallery-empty" data-reveal>
            <div className="gallery-empty__ornament" aria-hidden="true">
              <span /><span /><span />
            </div>
            <div className="gallery-empty__copy">
              <p className="eyebrow">PROPERTY PHOTOGRAPHY</p>
              <h3>Your Ojubanire Villa photographs will appear here.</h3>
              <p>Add confirmed image paths to the gallery list in <code>src/data/siteConfig.ts</code> when ready.</p>
            </div>
            <a className="gallery-empty__link" href="#contact" aria-label="Contact Ojubanire Villa">
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>

      {activeIndex !== null && photos[activeIndex] ? (
        <Lightbox
          photo={photos[activeIndex]}
          currentIndex={activeIndex}
          total={photos.length}
          onClose={closeLightbox}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      ) : null}
    </section>
  );
}