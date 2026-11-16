'use client';

import { useEffect, useRef, useState } from 'react';
import { cities, contactEmail } from './site-content';

const menus = {
  Starters: [
    ['Vegetable samosas', 'Crisp pastry filled with spiced potatoes and peas.'],
    ['Paneer tikka', 'Spiced paneer with peppers and onions.'],
    ['Aloo tikki chaat', 'Potato patties with yogurt, chutneys, and spices.'],
    ['Chicken seekh kebabs', 'Seasoned minced chicken skewers.'],
    ['Vegetable pakoras', 'Vegetables in a crisp chickpea-flour batter.'],
    ['Chicken tikka', 'Yogurt-marinated chicken with herbs and spices.'],
  ],
  Vegetarian: [
    ['Shahi paneer', 'Paneer in a creamy, gently spiced sauce.'],
    ['Chana masala', 'Chickpeas simmered with tomatoes, ginger, and spices.'],
    ['Dal makhani', 'Slow-cooked black lentils with butter and cream.'],
    ['Malai kofta', 'Vegetable and paneer dumplings in a creamy gravy.'],
    ['Palak paneer', 'Paneer folded into a seasoned spinach gravy.'],
    ['Aloo gobi', 'Potatoes and cauliflower cooked with warm spices.'],
  ],
  'Non-vegetarian': [
    ['Chicken kofta curry', 'Seasoned chicken meatballs in a spiced gravy.'],
    ['Butter chicken', 'Roasted chicken in a buttery tomato sauce.'],
    ['Tandoori chicken', 'Chicken marinated in yogurt and spices.'],
    ['Lamb karahi', 'Lamb cooked with tomatoes, ginger, and green chillies.'],
    ['Chicken karahi', 'Chicken with tomatoes, ginger, and fresh chillies.'],
    ['Beef nihari', 'Slow-cooked beef in a deeply spiced gravy.'],
  ],
  'Rice & breads': [
    ['Chicken biryani', 'Basmati rice layered with spiced chicken.'],
    ['Vegetable biryani', 'Fragrant basmati rice layered with vegetables and spices.'],
    ['Jeera rice', 'Basmati rice scented with cumin.'],
    ['Butter naan', 'Soft flatbread finished with butter.'],
    ['Garlic naan', 'Flatbread with garlic and herbs.'],
    ['Tandoori roti', 'Whole-wheat flatbread.'],
  ],
  Desserts: [
    ['Hot gulab jamun', 'Soft milk dumplings soaked in fragrant syrup.'],
    ['Kheer', 'Creamy rice pudding scented with cardamom.'],
    ['Gajar halwa', 'Slow-cooked carrot dessert with cardamom.'],
    ['Ras malai', 'Soft milk patties in cardamom-scented milk.'],
  ],
};

export function Menu() {
  const [selection, setSelection] = useState('Starters');

  return (
    <>
      <div className="filters" role="group" aria-label="Sample menu categories">
        {Object.keys(menus).map((category) => (
          <button type="button" key={category} aria-pressed={category === selection} onClick={() => setSelection(category)}>
            {category}
          </button>
        ))}
      </div>
      <h3 className="menu-category">{selection}</h3>
      <div className="dish-grid" aria-live="polite">
        {menus[selection].map(([name, description]) => (
          <article className="dish" key={name}><h3>{name}</h3><p>{description}</p></article>
        ))}
      </div>
      <a className="button menu-book" href="#quote">Plan a menu for your event <span aria-hidden="true">→</span></a>
    </>
  );
}

export function QuoteForm() {
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [venue, setVenue] = useState('');
  const pending = useRef(false);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('city');
    const city = cities.find(item => item.slug === slug);
    if (city) setVenue(city.name);
  }, []);

  async function sendInquiry(event) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const details = Object.fromEntries(new FormData(form));
    pending.current = true;
    setStatus({ type: 'sending', message: 'Sending your inquiry…' });
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details),
      });
      const result = await response.json();
      if (!response.ok) {
        setStatus({ type: 'error', message: result.message || 'Your inquiry could not be sent. Try again or email us.' });
        return;
      }
      form.reset();
      setStatus({ type: 'success', message: 'Inquiry received. Golden Catering will contact you about your event.' });
    } catch {
      setStatus({ type: 'error', message: 'We could not confirm receipt. Email us if the problem continues.' });
    } finally {
      pending.current = false;
    }
  }

  return (
    <form className="form" method="post" action="/api/booking" onSubmit={sendInquiry} aria-labelledby="booking-form-title">
      <h3 id="booking-form-title">Booking inquiry</h3>
      <p className="form-note form-lead">Include your date if you have one. A booking is confirmed once you hear back from Golden Catering.</p>
      <div className="fields">
        <label>Your name<input name="name" autoComplete="name" required maxLength={100} /></label>
        <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
        <label>Occasion
          <select name="occasion" defaultValue="" required>
            <option value="" disabled>Select an occasion</option>
            <option>Wedding or pre-wedding event</option>
            <option>Family celebration</option>
            <option>Workplace or community event</option>
            <option>Other</option>
          </select>
        </label>
        <label>Event date<input name="date" type="date" /></label>
        <label>Estimated guests<input name="guests" type="number" min="1" max="10000" step="1" required /></label>
        <label>Venue or city<input name="venue" defaultValue={venue} maxLength={150} required /></label>
        <label className="full">Menu preference
          <select name="preference">
            <option>Vegetarian and non-vegetarian</option>
            <option>Vegetarian</option>
            <option>Non-vegetarian</option>
            <option>Still deciding</option>
          </select>
        </label>
        <label className="full">Additional details
          <textarea name="details" rows={3} maxLength={800} placeholder="Favourite dishes, schedule, or dietary needs" />
        </label>
      </div>
      <div className="booking-check" aria-hidden="true">
        <label>Leave blank<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <button className="button" type="submit" disabled={status.type === 'sending'}>
        {status.type === 'sending' ? 'Sending…' : 'Send booking inquiry'} <span aria-hidden="true">→</span>
      </button>
      <p className="form-note">We’ll use your details to respond to your event inquiry.</p>
      <p className="status" role="status" aria-live="polite">{status.message}</p>
      {status.type === 'error' && <a className="text-link" href={'mailto:' + contactEmail}>Email Golden Catering</a>}
    </form>
  );
}
