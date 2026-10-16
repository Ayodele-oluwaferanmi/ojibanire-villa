import { useState } from "react";
import { Plus } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import SectionHeading from "./SectionHeading";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="faq-section section-pad" id="faq" aria-labelledby="faq-title">
      <div className="faq-section__inner page-wrap">
        <div className="faq-section__intro" data-reveal>
          <SectionHeading
            eyebrow="GOOD TO KNOW"
            title="A few helpful answers."
            titleId="faq-title"
            description="Have another question? Get in touch and we will be happy to help."
          />
          <a className="text-link" href="#contact">Contact the villa <ArrowIcon /></a>
        </div>
        <div className="faq-list" data-reveal>
          {siteConfig.faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-answer-${index + 1}`;
            return (
              <article className={`faq-item${isOpen ? " is-open" : ""}`} key={item.question}>
                <h3>
                  <button
                    className="faq-item__question"
                    type="button"
                    id={`faq-question-${index + 1}`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex((current) => current === index ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-item__toggle" aria-hidden="true"><Plus size={17} /></span>
                  </button>
                </h3>
                <div
                  className="faq-item__answer"
                  id={panelId}
                  aria-hidden={!isOpen}
                  role="region"
                  aria-labelledby={`faq-question-${index + 1}`}
                >
                  <div>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return <span className="text-link__arrow" aria-hidden="true">&rarr;</span>;
}