import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight, CalendarDays, Check, Phone } from "lucide-react";
import { getWhatsappDigits, siteConfig, type LocationId } from "../data/siteConfig";

interface BookingEnquiryProps {
  initialLocation: LocationId | null;
}

interface EnquiryForm {
  fullName: string;
  phone: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  message: string;
}

type FormErrors = Partial<Record<keyof EnquiryForm, string>>;

const blankForm: EnquiryForm = {
  fullName: "",
  phone: "",
  location: "",
  checkIn: "",
  checkOut: "",
  guests: "",
  message: "",
};

function localDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function validateForm(form: EnquiryForm, today: string): FormErrors {
  const errors: FormErrors = {};
  const phoneDigits = form.phone.replace(/\D/g, "");

  if (!form.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!/^[+]?\d[\d\s().-]*$/.test(form.phone.trim()) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = "Enter a valid phone number, including your country code if needed.";
  }
  if (!siteConfig.locations.some((location) => location.id === form.location)) {
    errors.location = "Please choose a preferred location.";
  }
  if (!form.checkIn) {
    errors.checkIn = "Please choose a check-in date.";
  } else if (form.checkIn < today) {
    errors.checkIn = "Check-in cannot be in the past.";
  }
  if (!form.checkOut) {
    errors.checkOut = "Please choose a check-out date.";
  } else if (form.checkIn && form.checkOut <= form.checkIn) {
    errors.checkOut = "Check-out must be after check-in.";
  }
  if (!/^\d+$/.test(form.guests) || Number(form.guests) < 1) {
    errors.guests = "Enter a positive whole number of guests.";
  }

  return errors;
}

function formatDate(date: string) {
  if (!date) return "Not provided";
  return new Intl.DateTimeFormat("en-NG", { year: "numeric", month: "short", day: "numeric" }).format(
    new Date(`${date}T12:00:00`),
  );
}

function createEnquiryMessage(form: EnquiryForm) {
  const location = siteConfig.locations.find((item) => item.id === form.location);
  return [
    `Hello ${siteConfig.businessName}, I would like to enquire about a stay.`,
    "",
    `Name: ${form.fullName.trim()}`,
    `Phone: ${form.phone.trim()}`,
    `Preferred location: ${location?.phase ?? "Not selected"} - ${location?.address ?? ""}`,
    `Check-in: ${formatDate(form.checkIn)}`,
    `Check-out: ${formatDate(form.checkOut)}`,
    `Number of guests: ${form.guests}`,
    `Additional message: ${form.message.trim() || "None"}`,
  ].join("\n");
}

export default function BookingEnquiry({ initialLocation }: BookingEnquiryProps) {
  const [form, setForm] = useState<EnquiryForm>(blankForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [preparedMessage, setPreparedMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const today = useMemo(() => localDateString(new Date()), []);
  const whatsappDigits = getWhatsappDigits();

  useEffect(() => {
    if (!initialLocation) return;
    setForm((current) => ({ ...current, location: initialLocation }));
    setErrors((current) => ({ ...current, location: undefined }));
    setPreparedMessage("");
    setSubmitted(false);
  }, [initialLocation]);

  const updateField = (field: keyof EnquiryForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setPreparedMessage("");
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(form, today);
    setErrors(nextErrors);
    setPreparedMessage("");
    setSubmitted(false);

    const firstInvalid = Object.keys(nextErrors)[0] as keyof EnquiryForm | undefined;
    if (firstInvalid) {
      document.getElementById(fieldIds[firstInvalid])?.focus();
      return;
    }

    setPreparedMessage(createEnquiryMessage(form));
    setSubmitted(true);
  };

  const whatsappUrl = preparedMessage && whatsappDigits
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(preparedMessage)}`
    : "";

  return (
    <section className="enquiry-section section-pad" id="enquiry" aria-labelledby="enquiry-title">
      <div className="enquiry-section__inner page-wrap">
        <div className="enquiry-section__intro" data-reveal>
          <p className="eyebrow">START A CONVERSATION</p>
          <h2 id="enquiry-title">Planning your stay?</h2>
          <p>
            Tell us a little about your visit, then contact Ojubanire Villa to enquire about availability, rates, and accommodation arrangements.
          </p>
          <div className="enquiry-section__note">
            <CalendarDays size={18} strokeWidth={1.5} aria-hidden="true" />
            <p>Availability, prices, and reservation arrangements must be confirmed directly with the business.</p>
          </div>
        </div>

        <div className="enquiry-form-wrap" data-reveal>
          <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
            <div className="enquiry-form__heading">
              <span>STAY ENQUIRY</span>
              <span className="enquiry-form__required">* Required fields</span>
            </div>

            <div className="form-grid">
              <FormField label="Full name" id="enquiry-name" error={errors.fullName}>
                <input
                  id="enquiry-name"
                  name="fullName"
                  autoComplete="name"
                  type="text"
                  value={form.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  placeholder="Your full name"
                  required
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "enquiry-name-error" : undefined}
                />
              </FormField>

              <FormField label="Phone number" id="enquiry-phone" error={errors.phone}>
                <input
                  id="enquiry-phone"
                  name="phone"
                  autoComplete="tel"
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="e.g. 08012345678"
                  required
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
                />
              </FormField>

              <FormField label="Preferred location" id="enquiry-location" error={errors.location}>
                <select
                  id="enquiry-location"
                  name="location"
                  value={form.location}
                  onChange={(event) => updateField("location", event.target.value)}
                  required
                  aria-invalid={Boolean(errors.location)}
                  aria-describedby={errors.location ? "enquiry-location-error" : undefined}
                >
                  <option value="">Select a location</option>
                  {siteConfig.locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.phase} - {location.shortAddress.split(",")[0]}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Number of guests" id="enquiry-guests" error={errors.guests}>
                <input
                  id="enquiry-guests"
                  name="guests"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  step="1"
                  value={form.guests}
                  onChange={(event) => updateField("guests", event.target.value)}
                  placeholder="Enter a number"
                  required
                  aria-invalid={Boolean(errors.guests)}
                  aria-describedby={errors.guests ? "enquiry-guests-error" : undefined}
                />
              </FormField>

              <FormField label="Check-in date" id="enquiry-checkin" error={errors.checkIn}>
                <input
                  id="enquiry-checkin"
                  name="checkIn"
                  type="date"
                  min={today}
                  value={form.checkIn}
                  onChange={(event) => updateField("checkIn", event.target.value)}
                  required
                  aria-invalid={Boolean(errors.checkIn)}
                  aria-describedby={errors.checkIn ? "enquiry-checkin-error" : undefined}
                />
              </FormField>

              <FormField label="Check-out date" id="enquiry-checkout" error={errors.checkOut}>
                <input
                  id="enquiry-checkout"
                  name="checkOut"
                  type="date"
                  min={form.checkIn || today}
                  value={form.checkOut}
                  onChange={(event) => updateField("checkOut", event.target.value)}
                  required
                  aria-invalid={Boolean(errors.checkOut)}
                  aria-describedby={errors.checkOut ? "enquiry-checkout-error" : undefined}
                />
              </FormField>

              <FormField label="Additional message" id="enquiry-message" wide required={false}>
                <textarea
                  id="enquiry-message"
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder="Anything else you would like us to know?"
                />
              </FormField>
            </div>

            <button className="button button--forest enquiry-form__submit" type="submit">
              Prepare my enquiry <ArrowUpRight size={16} aria-hidden="true" />
            </button>

            <p className="enquiry-form__disclaimer">
              This form prepares an enquiry only. It does not confirm a booking or reservation.
            </p>

            {submitted && preparedMessage ? (
              <div className="enquiry-feedback" role="status" aria-live="polite">
                <div className="enquiry-feedback__heading">
                  <span className="enquiry-feedback__check"><Check size={14} aria-hidden="true" /></span>
                  <div>
                    <h3>Your enquiry is ready.</h3>
                    <p>
                      {whatsappDigits
                        ? "Review the message and continue to WhatsApp to send it."
                        : "A WhatsApp recipient has not been confirmed. Please contact the business directly by phone."}
                    </p>
                  </div>
                </div>
                {whatsappUrl ? (
                  <a className="button button--forest enquiry-feedback__action" href={whatsappUrl} target="_blank" rel="noreferrer">
                    Continue in WhatsApp <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                ) : (
                  <div className="enquiry-feedback__phones">
                    {siteConfig.phoneNumbers.map((phone) => (
                      <a key={phone.href} href={phone.href}><Phone size={13} aria-hidden="true" /> {phone.display}</a>
                    ))}
                  </div>
                )}
                <details className="enquiry-feedback__details">
                  <summary>View prepared enquiry</summary>
                  <pre>{preparedMessage}</pre>
                </details>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}

const fieldIds: Record<keyof EnquiryForm, string> = {
  fullName: "enquiry-name",
  phone: "enquiry-phone",
  location: "enquiry-location",
  checkIn: "enquiry-checkin",
  checkOut: "enquiry-checkout",
  guests: "enquiry-guests",
  message: "enquiry-message",
};

interface FormFieldProps {
  label: string;
  id: string;
  error?: string;
  wide?: boolean;
  required?: boolean;
  children: ReactNode;
}

function FormField({ label, id, error, wide = false, required = true, children }: FormFieldProps) {
  return (
    <div className={`form-field${wide ? " form-field--wide" : ""}${error ? " has-error" : ""}`}>
      <label htmlFor={id}>{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
      {children}
      {error ? <p className="form-field__error" id={`${id}-error`}>{error}</p> : null}
    </div>
  );
}