import { cities, siteUrl } from './site-content';

export default function sitemap() {
  return ['/', '/sitemap', ...cities.map(city => '/catering/' + city.slug)].map(path => ({ url: siteUrl + path }));
}
