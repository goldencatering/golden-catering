import Image from 'next/image';
import { Menu, QuoteForm } from './interactive';
import { businessAddress, cities, contactEmail, googleProfile, phone, siteUrl } from './site-content';

function photo(id, width) {
  return 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=' + width;
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Golden Catering home">
      <Image className="official-logo" src="/golden-catering-logo.jpg" width={480} height={210} alt="Golden Catering" />
    </a>
  );
}

export const metadata = { alternates: { canonical: '/' } };

export default function Home() {
  const business = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": siteUrl + "/#business",
    name: "Golden Catering",
    url: siteUrl,
    logo: siteUrl + "/golden-catering-logo.jpg",
    email: contactEmail,
    telephone: phone,
    address: { "@type": "PostalAddress", ...businessAddress },
    hasMap: googleProfile,
    areaServed: cities.map(city => ({ "@type": "City", name: city.name })),
  };
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="header" id="top">
        <div className="shell header-inner">
          <Brand />
          <nav aria-label="Main navigation">
            <a href="#menu">Menu</a>
            <a href="#events">Services</a>
            <a href="#areas">Service areas</a>
            <a href="#reviews">Reviews</a>
          </nav>
          <a className="button outline" href="#quote">Book your event</a>
        </div>
      </header>

      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }} />
        <section className="hero" aria-labelledby="hero-heading">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-location">Family-owned &amp; operated in Ontario</p>
              <h1 id="hero-heading">A feast worth <em>gathering for.</em></h1>
              <p className="intro">
                Golden Catering is a family-run Indian and Pakistani caterer based in Georgetown, serving Brampton and the GTA. Plan a vegetarian, non-vegetarian, or mixed menu for your wedding, corporate event, or private celebration.
              </p>
              <div className="actions hero-actions">
                <a className="button button-primary" href="#quote">
                  Book your event <span className="button-arrow" aria-hidden="true" />
                </a>
                <a className="text-link" href="#menu">
                  Explore the menu <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="hero-experience">
                <strong>20+</strong>
                <span>years of experience<br /><a href="#chef">Chef Adrees Athwal</a></span>
              </p>
            </div>
            <div className="hero-visual">
              <div className="cloche" aria-hidden="true">
                <span className="cloche-handle" />
                <span className="cloche-dome" />
                <span className="cloche-tray" />
              </div>
              <div className="hero-frame">
                <Image
                  src={photo(29186507, 1100)}
                  alt="An assortment of Indian curries, kebabs, and starters"
                  fill
                  unoptimized
                  preload
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section shell" id="menu" aria-labelledby="menu-heading">
          <p className="eyebrow">Sample catering menu</p>
          <h2 id="menu-heading">Something for every guest.</h2>
          <p className="intro">Build your spread with starters, vegetarian and non-vegetarian mains, rice, breads, and sweets. Ask Chef Adrees about availability for your date.</p>
          <Menu />
        </section>

        <section className="events" id="events" aria-labelledby="events-heading">
          <div className="shell section split">
            <div className="event-photo">
              <Image src={photo(35247187, 1000)} alt="A buffet table with warm serving dishes" fill unoptimized />
            </div>
            <div>
              <p className="eyebrow">Catering for your occasion</p>
              <h2 id="events-heading">From the mehndi to the reception.</h2>
              <dl className="occasion-list">
                <div><dt>Weddings &amp; pre-wedding events</dt><dd>Plan a spread for the mehndi, sangeet, wedding, or reception.</dd></div>
                <div><dt>Family celebrations</dt><dd>Bring everyone around the table for birthdays, anniversaries, and holidays.</dd></div>
                <div><dt>Workplace &amp; community gatherings</dt><dd>Talk through menu options for team lunches and group celebrations.</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className="section shell chef" id="chef" aria-labelledby="chef-heading">
          <span className="chef-initials" aria-hidden="true">AA</span>
          <div>
            <p className="eyebrow">Family-owned and operated</p>
            <h2 id="chef-heading">Meet Chef Adrees Athwal.</h2>
            <p className="intro">Chef and owner Adrees Athwal brings more than 20 years of experience to our family-run catering business. Work with our family to plan a menu around the dishes your guests will look forward to.</p>
          </div>
        </section>

        <section className="services-areas" id="areas" aria-labelledby="areas-heading">
          <div className="section shell">
            <p className="eyebrow">Service areas</p>
            <h2 id="areas-heading">Catering in Halton Hills, Brampton and across the GTA.</h2>
            <p className="intro">Choose the city where you’re hosting your event for menu ideas and venue-planning details.</p>
            <ul className="city-grid">
              {cities.map(city => (
                <li key={city.slug}>
                  <a href={'/catering/' + city.slug}>
                    <strong>{city.name}</strong>
                    <span>Indian &amp; Pakistani catering <span aria-hidden="true">→</span></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section shell review-section" id="reviews" aria-labelledby="reviews-heading">
          <div>
            <p className="eyebrow">Google reviews</p>
            <h2 id="reviews-heading">What guests say about Golden Catering.</h2>
          </div>
          <div className="review-panel">
            <p className="review-score"><strong>5.0</strong> <span aria-label="5 out of 5 stars">★★★★★</span></p>
            <p>29 reviews on the Google listing</p>
            <a className="button" href={googleProfile}>Read reviews on Google <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section className="quote" id="quote" aria-labelledby="quote-heading" tabIndex={-1}>
          <div className="shell section split">
            <div>
              <p className="eyebrow">Booking inquiries</p>
              <h2 id="quote-heading">Book your event.</h2>
              <p className="intro">Share your date, location, and guest count to send your booking inquiry. You can include favourite dishes and dietary needs.</p>
            </div>
            <QuoteForm />
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="shell footer-inner">
          <Brand />
          <address className="footer-contact">
            <a href={googleProfile}>{businessAddress.streetAddress}, {businessAddress.addressLocality}, {businessAddress.addressRegion} {businessAddress.postalCode}</a>
            <a href={'tel:' + phone}>647-280-6639</a>
            <a href={'mailto:' + contactEmail}>{contactEmail}</a>
          </address>
          <a className="text-link" href="#quote">Book your event <span aria-hidden="true">→</span></a>
        </div>
      </footer>
    </>
  );
}



