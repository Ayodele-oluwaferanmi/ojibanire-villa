interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  centered?: boolean;
  titleId?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  centered = false,
  titleId,
}: SectionHeadingProps) {
  return (
    <div
      className={`section-heading${light ? " section-heading--light" : ""}${centered ? " section-heading--centered" : ""}`}
      data-reveal
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId}>{title}</h2>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </div>
  );
}