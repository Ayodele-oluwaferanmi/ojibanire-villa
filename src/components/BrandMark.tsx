interface BrandMarkProps {
  light?: boolean;
}

export default function BrandMark({ light = false }: BrandMarkProps) {
  return (
    <a
      className={`brand-mark${light ? " brand-mark--light" : ""}`}
      href="#home"
      aria-label="Ojubanire Villa home"
    >
      <span className="brand-mark__seal" aria-hidden="true">
        <span>O</span>
      </span>
      <span className="brand-mark__wording">
        <span className="brand-mark__name">Ojubanire</span>
        <span className="brand-mark__descriptor">VILLA</span>
      </span>
    </a>
  );
}