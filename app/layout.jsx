import './globals.css';
import { siteUrl } from './site-content';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Golden Catering | Indian & Pakistani Catering in the GTA',
  description: 'Family-owned Indian and Pakistani catering in Georgetown, Brampton and the GTA, led by Chef Adrees Athwal. Wedding, corporate, and private events with vegetarian and non-vegetarian menus.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-CA">
      <body>{children}</body>
    </html>
  );
}

