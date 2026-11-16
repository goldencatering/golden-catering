import Image from 'next/image';
import { Menu, QuoteForm } from './interactive';

function photo(id, width) {
  return 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=' + width;
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Golden Catering home">
      <span>Golden <small>Catering</small></span>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="header" id="top">
        <div className="shell header-inner">
          <Brand />
          <nav aria-label="Main navigation">
            <a href="#menu">Menu</a>
            <a href="#events">Events</a>
            <a href="#chef">Our chef</a>
          </nav>
          <a className="button outline" href="#quote">Book your event</a>
        </div>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-location">Brampton, Ontario</p>
              <h1 id="hero-heading">A feast worth <em>gathering for.</em></h1>
              <p className="intro">
                Indian and Pakistani catering for weddings and celebrations.
                Choose vegetarian and non-vegetarian dishes for your guests.
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
            <p className="eyebrow">Owner &amp; chef</p>
            <h2 id="chef-heading">Meet Chef Adrees Athwal.</h2>
            <p className="intro">With more than 20 years of experience, owner and chef Adrees Athwal leads Golden Catering in Brampton, Ontario. Work with Chef Adrees to plan a menu around the dishes your family loves.</p>
          </div>
        </section>

        <section className="quote" id="quote" aria-labelledby="quote-heading" tabIndex={-1}>
          <div className="shell section split">
            <div>
              <p className="eyebrow">Booking inquiries</p>
              <h2 id="quote-heading">Book your event.</h2>
              <p className="intro">Share your date, location, and guest count to prepare your booking inquiry. You can include favourite dishes and dietary needs.</p>
            </div>
            <QuoteForm />
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="shell footer-inner">
          <Brand />
          <p>Brampton, Ontario, Canada</p>
          <a className="text-link" href="#quote">Book your event <span aria-hidden="true">→</span></a>
        </div>
      </footer>
    </>
  );
}


