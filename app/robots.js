import { siteUrl } from './site-content';

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: '/api/' },
    ],
    sitemap: siteUrl + '/sitemap.xml',
  };
}
