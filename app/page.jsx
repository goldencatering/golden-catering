import Image from 'next/image';
import { Menu, QuoteForm } from './interactive';

function photo(id, width) {
  return 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=' + width;
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Golden Catering home">
      <span className="monogram" aria-hidden="true">G</span>
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
          <a className="button outline" href="#quote">Request a quote</a>
        </div>
      </header>

      <main id="main">
        <section className="hero">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Indian &amp; Pakistani catering · Brampton, ON</p>
              <h1>Set the table.<br /><em>Bring everyone together.</em></h1>
              <p className="intro">From wedding feasts to family celebrations, Chef Adrees Athwal brings Indian and Pakistani cooking to your event, with vegetarian and non-vegetarian options for your guests.</p>
              <div className="actions">
                <a className="button" href="#quote">Plan your event <span aria-hidden="true">↗</span></a>
                <a className="text-link" href="#menu">Explore the menu <span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <div className="hero-frame">
              <Image src={photo(29186507, 1100)} alt="An assortment of Indian curries, kebabs, and starters" fill unoptimized preload />
            </div>
          </div>
        </section>

        <section className="section shell" id="menu" aria-labelledby="menu-heading">
          <p className="eyebrow">Sample catering menu</p>
          <h2 id="menu-heading">Something for every guest.</h2>
          <p className="intro">Explore dishes to discuss with Chef Adrees when planning your menu.</p>
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
            <p className="intro">Chef Adrees Athwal owns and leads Golden Catering in Brampton, Ontario. Share the dishes your family loves and what your guests need, and discuss a menu for your occasion.</p>
          </div>
        </section>

        <section className="quote" id="quote" aria-labelledby="quote-heading">
          <div className="shell section split">
            <div>
              <p className="eyebrow">Catering inquiries</p>
              <h2 id="quote-heading">Let’s plan your event.</h2>
              <p className="intro">Share your event date, venue, and estimated guest count. Include any menu preferences or dietary needs you’d like to discuss.</p>
            </div>
            <QuoteForm />
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="shell footer-inner">
          <Brand />
          <p>Brampton, Ontario, Canada</p>
          <a className="text-link" href="#quote">Catering inquiries <span aria-hidden="true">↗</span></a>
        </div>
      </footer>
    </>
  );
}
