import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import BrandMark from "./BrandMark";

interface NavbarProps {
  onEnquire: () => void;
}

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#amenities", label: "Amenities" },
  { href: "#locations", label: "Locations" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ onEnquire }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuToggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 10);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggle.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const handleEnquire = () => {
    closeMenu();
    onEnquire();
  };

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <BrandMark />

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <button className="button button--nav" type="button" onClick={handleEnquire}>
          <span>Enquire now</span>
          <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
        </button>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          ref={menuToggle}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-nav${menuOpen ? " is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
            {link.label}
          </a>
        ))}
        <button className="button button--nav mobile-nav__cta" type="button" onClick={handleEnquire}>
          Enquire now <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </nav>
    </header>
  );
}