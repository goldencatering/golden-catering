import { contactEmail } from '../site-content';

export const metadata = { title: 'Booking inquiry received | Golden Catering', robots: { index: false } };

export default function BookingReceived() {
  return (
    <main className="section shell">
      <h1>Booking inquiry received.</h1>
      <p className="intro">Golden Catering will contact you about your event.</p>
      <div className="actions">
        <a className="button" href="/">Back to Golden Catering</a>
        <a className="text-link" href={'mailto:' + contactEmail}>Contact us</a>
      </div>
    </main>
  );
}
