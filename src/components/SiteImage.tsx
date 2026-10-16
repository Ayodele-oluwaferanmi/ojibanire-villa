import { useEffect, useState } from "react";
import { Camera } from "lucide-react";

export type ImageVariant = "hero" | "about" | "location" | "gallery";

interface SiteImageProps {
  src?: string;
  alt: string;
  variant: ImageVariant;
  fallbackLabel?: string;
  className?: string;
  eager?: boolean;
}

export default function SiteImage({
  src,
  alt,
  variant,
  fallbackLabel,
  className = "",
  eager = false,
}: SiteImageProps) {
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    setFailed(!src);
  }, [src]);

  const label = fallbackLabel ?? "Property photograph not added yet";

  return (
    <div className={`site-image site-image--${variant} ${className}`}>
      {!failed && src ? (
        <img
          className="site-image__photo"
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className={`site-image__fallback site-image__fallback--${variant}`}
          role="img"
          aria-label={`${alt}. ${label}.`}
        >
          <span className="site-image__fallback-rule" aria-hidden="true" />
          <span className="site-image__fallback-mark" aria-hidden="true">
            <Camera size={variant === "hero" ? 22 : 18} strokeWidth={1.25} />
          </span>
          <span className="site-image__fallback-label">{label}</span>
        </div>
      )}
    </div>
  );
}