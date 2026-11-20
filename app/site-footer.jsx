import Image from 'next/image';
import { businessAddress, cities, contactEmail, googleProfile, phone, secondPhone, siteNavigation } from './site-content';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-cta">
          <p>Planning an event?</p>
          <a className="button button-primary" href="/#quote">
            Request catering <span className="button-arrow" aria-hidden="true" />
          </a>
        </div>
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" aria-label="Golden Catering home">
              <Image className="official-logo" src="/golden-catering-logo.jpg" width={480} height={210} alt="Golden Catering" />
            </a>
            <p>Family-owned Indian and Pakistani catering in Halton Hills and the Greater Toronto Area.</p>
          </div>
          <nav className="footer-nav" aria-labelledby="footer-explore">
            <h2 id="footer-explore">Explore</h2>
            <ul>
              {siteNavigation.map(({ label, href }) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </nav>
          <nav className="footer-nav footer-cities" aria-labelledby="footer-areas">
            <h2 id="footer-areas">Service areas</h2>
            <ul>
              {cities.map(({ name, slug }) => (
                <li key={slug}><a href={'/catering/' + slug}>{name}</a></li>
              ))}
            </ul>
          </nav>
          <div className="footer-connect">
            <h2>Contact</h2>
            <address>
              <a href={googleProfile}>
                {businessAddress.streetAddress}<br />
                {businessAddress.addressLocality}, {businessAddress.addressRegion} {businessAddress.postalCode}
              </a>
              <a href={'tel:' + phone}>647-280-6639</a>
              <a href={'tel:' + secondPhone}>647-588-9916</a>
              <a href={'mailto:' + contactEmail}>{contactEmail}</a>
            </address>
          </div>
        </div>
        <div className="footer-base">
          <small>© {new Date().getUTCFullYear()} Golden Catering</small>
          <a href="/sitemap">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
