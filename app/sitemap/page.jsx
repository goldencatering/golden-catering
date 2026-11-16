import { cities, siteNavigation } from '../site-content';

export const metadata = {
  title: 'Sitemap | Golden Catering',
  description: 'Find Golden Catering’s menu, event services, booking form and catering pages for Georgetown, Brampton and the Greater Toronto Area.',
  alternates: { canonical: '/sitemap' },
};

export default function SiteMap() {
  return (
    <main className="section shell sitemap-page">
      <h1>Sitemap</h1>
      <div className="local-planning">
        <section aria-labelledby="sitemap-main">
          <h2 id="sitemap-main">Golden Catering</h2>
          <ul>
            <li><a href="/">Home</a></li>
            {siteNavigation.map(({ label, href }) => (
              <li key={href}><a href={href}>{label}</a></li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="sitemap-areas">
          <h2 id="sitemap-areas">Service areas</h2>
          <ul>
            {cities.map(({ name, slug }) => (
              <li key={slug}><a href={'/catering/' + slug}>{name} catering</a></li>
            ))}
          </ul>
        </section>
      </div>
      <a href="/sitemap.xml">XML sitemap</a>
    </main>
  );
}
