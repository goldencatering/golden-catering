import { notFound } from 'next/navigation';
import Image from 'next/image';
import { cities, siteUrl } from '../../site-content';

export function generateStaticParams() {
  return cities.map(({ slug }) => ({ city: slug }));
}

export async function generateMetadata({ params }) {
  const { city: slug } = await params;
  const city = cities.find(item => item.slug === slug);
  if (!city) return {};
  return {
    title: 'Indian & Pakistani Catering in ' + city.name + ', ON | Golden Catering',
    description: city.intro,
    alternates: { canonical: '/catering/' + city.slug },
  };
}

export default async function CityPage({ params }) {
  const { city: slug } = await params;
  const city = cities.find(item => item.slug === slug);
  if (!city) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Indian and Pakistani catering in ' + city.name,
    url: siteUrl + '/catering/' + city.slug,
    provider: { '@id': siteUrl + '/#business' },
    areaServed: { '@type': 'City', name: city.name },
    description: city.intro,
  };

  return (
    <>
      <header className="header">
        <div className="shell header-inner">
          <a href="/" aria-label="Golden Catering home">
            <Image className="official-logo" src="/golden-catering-logo.jpg" width={480} height={210} alt="Golden Catering" />
          </a>
          <a className="button outline" href="/#quote">Request catering</a>
        </div>
      </header>
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <section className="hero city-hero">
          <div className="section shell">
            <a className="text-link city-back" href="/#areas">← All service areas</a>
            <p className="eyebrow">{city.name}, Ontario</p>
            <h1>Indian &amp; Pakistani catering in <em>{city.name}.</em></h1>
            <p className="intro">{city.intro}</p>
            <div className="actions">
              <a className="button button-primary" href={'/?city=' + city.slug + '#quote'}>Plan your {city.name} event</a>
              <a className="text-link" href="/#menu">Explore the menu</a>
            </div>
          </div>
        </section>
        <section className="section shell">
          <h2>{city.focus}</h2>
          <div className="local-planning">
            <article className="dish"><h3>Menu ideas</h3><p>{city.idea}</p></article>
            <article className="dish"><h3>What to share about your venue</h3><p>{city.venue}</p></article>
          </div>
          <div className="local-faq">
            <h2>Planning questions</h2>
            <details><summary>Can I include vegetarian and non-vegetarian dishes?</summary><p>Yes. Include your guest counts and dietary needs in your inquiry so we can discuss options for both groups.</p></details>
            <details><summary>How do I check availability in {city.name}?</summary><p>Share your date, venue, and estimated guest count on the <a href={'/?city=' + city.slug + '#quote'}>booking form</a>. Chef Adrees can discuss menu options and venue requirements.</p></details>
          </div>
        </section>
      </main>
    </>
  );
}
