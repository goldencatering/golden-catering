import './globals.css';

export const metadata = {
  title: 'Golden Catering | Indian & Pakistani Catering in Brampton',
  description: 'Indian and Pakistani event catering in Brampton, Ontario, led by owner and chef Adrees Athwal. Vegetarian and non-vegetarian menu options.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-CA">
      <body>{children}</body>
    </html>
  );
}
