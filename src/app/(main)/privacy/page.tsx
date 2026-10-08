import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/kit/kit";
import MailtoLink from "@/components/shared/mailto-link";
import { CONTACT_EMAIL, PHONE_DISPLAY, MARKET_COOKIE } from "@/lib/market";

export const metadata: Metadata = pageMetadata({
  path: "/privacy",
  title: "Privacy Policy | XMEL Automations",
  description:
    "How XMEL Automations collects, uses and protects personal information across xmelautomations.xyz, its offer pages and its ads — and how to access or delete yours.",
});

/**
 * Written to match what the site actually does. If a tracker, form service or
 * ad platform is added or removed, update the relevant section and UPDATED.
 */
const UPDATED = "8 October 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Privacy" }]}
        eyebrow="Legal"
        title="Privacy"
        italic="policy."
        lede={`What we collect, why, who we share it with, and how to get it deleted. Plain language, no surprises. Last updated ${UPDATED}.`}
      />

      <section className="paper relative py-14 sm:py-20">
        <div className="prose-custom max-w-[760px] mx-auto px-4 sm:px-6">
          <h2>Who we are</h2>
          <p>
            XMEL Automations (&ldquo;XMEL&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) builds AI lead-response
            systems, websites and SEO for businesses in the United States, India and the UAE. This policy covers{" "}
            <strong>xmelautomations.xyz</strong>, our offer pages (including sites.xmelautomations.xyz and
            pro.xmelautomations.xyz), and the ads and lead forms we run on platforms such as LinkedIn. XMEL is
            responsible for the personal information described here. You can reach us at{" "}
            <MailtoLink email={CONTACT_EMAIL} /> or on WhatsApp at {PHONE_DISPLAY}.
          </p>

          <h2>What we collect</h2>
          <p>
            <strong>Information you give us.</strong> When you fill in a contact or callback form, use the ROI
            calculator, book a call, reply to an ad or message us, we receive what you choose to share. That is
            typically your name, email address, phone or WhatsApp number, company, what your business does or
            sells, and your message.
          </p>
          <p>
            <strong>Lead forms on ad platforms.</strong> If you submit a lead form inside one of our ads, the
            platform passes us the details you entered. The next section explains how this works on LinkedIn.
          </p>
          <p>
            <strong>Information collected automatically.</strong> Like most websites, we receive basic technical
            data when you visit. That includes pages viewed, which buttons you click (for example, a WhatsApp or
            booking button), the page that referred you, approximate location derived from your IP address, and
            device and browser type. We use Google Analytics for this, and our hosting provider keeps standard
            server logs.
          </p>
          <p>
            We do not ask for, and ask you not to send us, sensitive information such as health, financial account
            or government ID details.
          </p>

          <h2>LinkedIn ads and lead forms</h2>
          <p>
            When you tap one of our LinkedIn ads and submit its lead form, LinkedIn shares with us the information
            in that form. That is your <strong>name</strong>, <strong>email address</strong> and, if you provide it,
            your <strong>phone number</strong>. Depending on the form, it can also include your company name and job
            title. LinkedIn may pre-fill some fields from your profile, and you can review or edit them before you
            submit. Nothing is sent to us unless you press submit.
          </p>
          <p>We use these details only to:</p>
          <ul>
            <li>contact you by email, phone or WhatsApp about the service or offer you responded to;</li>
            <li>send you the quote, information or call booking you asked for;</li>
            <li>keep a record of your enquiry so we don&apos;t contact you twice or ask you to repeat yourself.</li>
          </ul>
          <p>
            We don&apos;t sell lead-form details, share them with other advertisers, or add you to a newsletter
            without asking. They&apos;re kept for the period described under &ldquo;How long we keep it&rdquo;. To
            have your details deleted or to stop hearing from us, email <MailtoLink email={CONTACT_EMAIL} />. How
            LinkedIn itself handles your data is covered by{" "}
            <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              LinkedIn&apos;s privacy policy
            </a>
            .
          </p>

          <h2>How we use it</h2>
          <ul>
            <li>To reply to your enquiry, prepare a quote and follow up about the service you asked about.</li>
            <li>To schedule and hold calls you book with us.</li>
            <li>To deliver work we agree to do for you, and to invoice for it.</li>
            <li>To understand which pages, ads and buttons are useful, so we can improve the site and our ads.</li>
            <li>To keep the site secure and working, and to meet legal obligations.</li>
          </ul>
          <p>
            We do not sell your personal information, and we do not share it for cross-context behavioural
            advertising. We do not add you to a marketing list unless you have asked to hear from us. You can opt
            out of any follow-up at any time by replying &ldquo;stop&rdquo; or emailing us.
          </p>
          <p>
            Where the law requires a legal basis (for example, the GDPR or UK GDPR), we rely on your consent, on
            taking steps you asked for before a contract, on performing a contract with you, and on our legitimate
            interest in responding to business enquiries and running our website.
          </p>

          <h2>Who we share it with</h2>
          <p>
            We share personal information only with service providers that help us run the business, and only for
            the purposes above:
          </p>
          <ul>
            <li><strong>Vercel</strong> hosts the website.</li>
            <li><strong>Google Analytics</strong> (Google) measures site usage and button clicks.</li>
            <li><strong>Web3Forms</strong> delivers website form submissions to our email inbox.</li>
            <li><strong>Calendly</strong> handles call bookings.</li>
            <li><strong>WhatsApp</strong> (Meta) carries the chats you start with us.</li>
            <li><strong>LinkedIn</strong> and other ad platforms we advertise on show our ads and pass us lead-form submissions.</li>
            <li>Our <strong>email provider</strong> stores the messages we exchange with you.</li>
          </ul>
          <p>
            Each of these providers handles data under its own privacy policy. We may also disclose information if
            required by law, or to protect our rights or the safety of others. If the business is ever sold or
            merged, information may transfer to the new owner under this policy.
          </p>

          <h2>Cookies and similar technology</h2>
          <ul>
            <li>
              <strong>{MARKET_COOKIE}</strong> remembers whether you are seeing our US or India pricing. It lasts
              one year and contains only that choice.
            </li>
            <li>
              <strong>Google Analytics cookies</strong> (<code>_ga</code>, <code>_ga_*</code>) tell visits apart and
              last up to two years.
            </li>
          </ul>
          <p>
            You can block or delete cookies in your browser settings, and opt out of Google Analytics with
            Google&apos;s{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              opt-out add-on
            </a>
            . The site still works without them.
          </p>

          <h2>How long we keep it</h2>
          <p>
            We keep enquiries and conversations for up to 24 months after our last contact, so we can pick up where
            we left off, unless you ask us to delete them sooner. If you become a client, we keep project and billing
            records for as long as the law requires. Google Analytics data is kept for the retention period set in
            our account, which is no longer than 14 months.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on where you live, including under the GDPR, the UK GDPR, India&apos;s Digital Personal Data
            Protection Act 2023, the UAE&apos;s Personal Data Protection Law and US state privacy laws, you can ask us
            to:
          </p>
          <ul>
            <li>tell you what personal information we hold about you and give you a copy;</li>
            <li>correct or update it;</li>
            <li>delete it;</li>
            <li>stop or restrict using it, or withdraw consent you gave earlier;</li>
            <li>move it to another provider where that applies.</li>
          </ul>
          <p>
            Email <MailtoLink email={CONTACT_EMAIL} /> with your request. We will confirm who you are, then respond
            within 30 days. We will not treat you differently for using these rights. You also have the right to
            complain to your local data protection authority.
          </p>

          <h2>Where your data is processed</h2>
          <p>
            We are based in India, and our service providers may process data in other countries, including the
            United States. Where data moves across borders, we rely on our providers&apos; standard safeguards,
            such as standard contractual clauses.
          </p>

          <h2>Security</h2>
          <p>
            We use reputable providers, encrypted connections (HTTPS) and access limited to the people who need it.
            No method of transmission or storage is completely secure, but we work to protect your information and
            will tell you and the relevant authorities about a breach where the law requires it.
          </p>

          <h2>Data we handle for our clients</h2>
          <p>
            When we build lead-response systems or websites for a client, we may process their customers&apos;
            details on the client&apos;s behalf. In that case the client decides how that data is used, and we
            follow their instructions and our agreement with them. Questions about that data are best sent to the
            business you dealt with.
          </p>

          <h2>Children</h2>
          <p>
            Our services are for businesses and are not directed at anyone under 18. We do not knowingly collect
            children&apos;s personal information. If you believe we have, contact us and we will delete it.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We will update this page if our practices change and revise the date at the top. Significant changes
            will be noted here.
          </p>

          <h2>Contact and grievances</h2>
          <p>
            For any privacy question or request, or to raise a grievance, contact Yashwardhan Chauhan, founder of
            XMEL Automations, at <MailtoLink email={CONTACT_EMAIL} /> or on WhatsApp at {PHONE_DISPLAY}.
          </p>
        </div>
      </section>
    </>
  );
}
