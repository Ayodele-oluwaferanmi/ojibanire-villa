import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { GalleryPhoto } from "../data/siteConfig";
import SiteImage from "./SiteImage";

interface LightboxProps {
  photo: GalleryPhoto;
  currentIndex: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Lightbox({
  photo,
  currentIndex,
  total,
  onClose,
  onPrevious,
  onNext,
}: LightboxProps) {
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "Tab") {
        const buttons = Array.from(
          document.querySelectorAll<HTMLButtonElement>(".lightbox button:not(:disabled)"),
        );
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Property photo viewer"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        className="lightbox__close"
        type="button"
        onClick={onClose}
        aria-label="Close photo viewer"
        ref={closeButton}
      >
        <X size={23} />
      </button>
      {total > 1 ? (
        <button
          className="lightbox__arrow lightbox__arrow--previous"
          type="button"
          onClick={onPrevious}
          aria-label="View previous photograph"
        >
          <ArrowLeft size={21} />
        </button>
      ) : null}
      <div className="lightbox__content" aria-live="polite">
        <SiteImage
          src={photo.src}
          alt={photo.alt}
          variant="gallery"
          fallbackLabel="This property photograph could not be loaded"
          eager
        />
        <div className="lightbox__caption">
          <p>{photo.caption ?? photo.alt}</p>
          <span>{String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        </div>
      </div>
      {total > 1 ? (
        <button
          className="lightbox__arrow lightbox__arrow--next"
          type="button"
          onClick={onNext}
          aria-label="View next photograph"
        >
          <ArrowRight size={21} />
        </button>
      ) : null}
    </div>
  );
}