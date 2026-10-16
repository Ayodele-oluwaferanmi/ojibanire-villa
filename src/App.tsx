import { useEffect, useState } from "react";
import About from "./components/About";
import Amenities from "./components/Amenities";
import BookingEnquiry from "./components/BookingEnquiry";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Locations from "./components/Locations";
import Navbar from "./components/Navbar";
import { siteConfig, type LocationId } from "./data/siteConfig";

function updateMeta(attribute: "name" | "property", key: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

export default function App() {
  const [preferredLocation, setPreferredLocation] = useState<LocationId | null>(null);

  useEffect(() => {
    document.title = siteConfig.seo.title;
    updateMeta("name", "description", siteConfig.seo.description);
    updateMeta("property", "og:title", siteConfig.seo.title);
    updateMeta("property", "og:description", siteConfig.seo.description);
    updateMeta("property", "og:type", "website");
    if (siteConfig.seo.openGraphImage) {
      updateMeta("property", "og:image", siteConfig.seo.openGraphImage);
    }
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
  };

  const startEnquiry = (location?: LocationId) => {
    if (location) setPreferredLocation(location);
    scrollTo("enquiry");
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar onEnquire={() => startEnquiry()} />
      <main id="main-content">
        <Hero onEnquire={() => startEnquiry()} onExploreLocations={() => scrollTo("locations")} />
        <About onExploreLocations={() => scrollTo("locations")} />
        <Amenities />
        <Locations onEnquire={(location) => startEnquiry(location)} />
        <Gallery />
        <BookingEnquiry initialLocation={preferredLocation} />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
