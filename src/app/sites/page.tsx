import EstateSite from "./estate-site";
import { ABOUT, BRAND, CONCEPT_NOTE, CONTACT, EXPERTISE, LISTINGS, PROCESS, SERVICES, TESTIMONIAL, XMEL_WHATSAPP } from "./content";

/**
 * sites.xmelautomations.xyz: Vantmere, a 3D real-estate website concept.
 * The visible experience is a WebGL architectural film (./engine); this page
 * server-renders the same content as semantic HTML. In 3D mode it is
 * available to screen readers and search engines; in the lite version it is
 * the page itself.
 */
export default function SitesLanding() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Vantmere — 3D real-estate website concept",
    creator: { "@type": "Organization", name: "XMEL Automations", url: "https://xmelautomations.xyz" },
    description: CONCEPT_NOTE,
  };

  return (
    <EstateSite>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header data-chapter="lake" className="estate-sec estate-hero">
        <p className="estate-kicker">{BRAND.place}</p>
        <h1>{BRAND.name}</h1>
        <p className="estate-lede"><em>{BRAND.tagline}.</em></p>
      </header>

      <section data-chapter="about" aria-labelledby="about-h" className="estate-sec">
        <h2 id="about-h">{ABOUT.title}</h2>
        <p>{ABOUT.body}</p>
      </section>

      <section data-chapter="services" aria-labelledby="services-h" className="estate-sec">
        <h2 id="services-h">{SERVICES.title}</h2>
        <ul className="estate-list">
          {SERVICES.items.map((s) => (
            <li key={s.name}><h3>{s.name}</h3><p>{s.body}</p></li>
          ))}
        </ul>
      </section>

      <section data-chapter="testimonial" aria-labelledby="testimonial-h" className="estate-sec">
        <h2 id="testimonial-h">A client’s words</h2>
        <figure>
          <blockquote><p>“{TESTIMONIAL.quote}”</p></blockquote>
          <figcaption>{TESTIMONIAL.by}, {TESTIMONIAL.where}</figcaption>
        </figure>
      </section>

      <section data-chapter="listings" aria-labelledby="listings-h" className="estate-sec">
        <h2 id="listings-h">Selected homes</h2>
        <ul className="estate-list">
          {LISTINGS.map((l) => (
            <li key={l.name}><h3>{l.name}</h3><p>{l.where} · {l.spec} · {l.price}</p></li>
          ))}
        </ul>
      </section>

      <section data-chapter="process" aria-labelledby="process-h" className="estate-sec">
        <h2 id="process-h">{PROCESS.title}</h2>
        <ol className="estate-list">
          {PROCESS.steps.map((s) => (
            <li key={s.n}><h3><span>{s.n}</span> {s.name}</h3><p>{s.body}</p></li>
          ))}
        </ol>
      </section>

      <section data-chapter="numbers" aria-labelledby="numbers-h" className="estate-sec">
        <h2 id="numbers-h">{EXPERTISE.title}</h2>
        <dl className="estate-stats">
          {EXPERTISE.stats.map((s) => (
            <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>
          ))}
        </dl>
      </section>

      <section data-chapter="contact" aria-labelledby="contact-h" className="estate-sec">
        <h2 id="contact-h">{CONTACT.title}</h2>
        <p>{CONTACT.body}</p>
        <p>
          <a href={XMEL_WHATSAPP} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-cta-location="lite-contact">
            Want a website like this? Talk to XMEL on WhatsApp
          </a>
        </p>
      </section>

      <footer data-chapter="footer" className="estate-sec">
        <p>{BRAND.name} · {BRAND.place} · {BRAND.founded}</p>
        <p className="estate-note">{CONCEPT_NOTE}</p>
        <p>
          <a href="https://xmelautomations.xyz">XMEL Automations</a> · <a href="https://xmelautomations.xyz/privacy">Privacy</a>
        </p>
      </footer>
    </EstateSite>
  );
}
