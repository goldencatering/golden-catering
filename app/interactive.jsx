'use client';

import { useState } from 'react';

const menus = {
  Vegetarian: [
    ['Paneer tikka', 'Spiced paneer with peppers and onions.'],
    ['Chana masala', 'Chickpeas simmered with tomatoes, ginger, and spices.'],
    ['Dal makhani', 'Slow-cooked black lentils with butter and cream.'],
    ['Vegetable biryani', 'Fragrant basmati rice layered with vegetables and spices.'],
  ],
  'Non-vegetarian': [
    ['Chicken kofta curry', 'Seasoned chicken meatballs in a spiced gravy.'],
    ['Chicken biryani', 'Basmati rice layered with seasoned chicken and aromatic spices.'],
    ['Tandoori chicken', 'Yogurt-and-spice-marinated chicken.'],
    ['Lamb karahi', 'Lamb cooked with tomatoes, ginger, and green chillies.'],
  ],
};

export function Menu() {
  const [selection, setSelection] = useState('Vegetarian');

  return (
    <>
      <div className="filters" role="group" aria-label="Menu preference">
        {Object.keys(menus).map((category) => (
          <button type="button" key={category} aria-pressed={category === selection} onClick={() => setSelection(category)}>
            {category}
          </button>
        ))}
      </div>
      <div className="dish-grid" aria-live="polite">
        {menus[selection].map(([name, description]) => (
          <article className="dish" key={name}><h3>{name}</h3><p>{description}</p></article>
        ))}
      </div>
      <p className="menu-note">Ask about sides, breads, and desserts such as gulab jamun.</p>
    </>
  );
}

const cateringEmail = process.env.NEXT_PUBLIC_CATERING_EMAIL?.trim();

const labels = {
  name: 'Name',
  email: 'Reply email',
  occasion: 'Occasion',
  date: 'Event date',
  guests: 'Estimated guests',
  venue: 'Venue or city',
  preference: 'Menu preference',
  details: 'Additional details',
};

export function QuoteForm() {
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState('');

  function prepareInquiry(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = Object.entries(labels).flatMap(([field, label]) => {
      const value = String(data.get(field) ?? '').trim();
      return value ? [label + ': ' + value] : [];
    });
    setDraft(['Hello Golden Catering,', '', 'I’d like a catering quote.', '', ...lines].join('\n'));
    setStatus('Your inquiry is ready below.');
  }

  async function copyInquiry() {
    try {
      await navigator.clipboard.writeText(draft);
      setStatus('Inquiry copied.');
    } catch {
      setStatus('Select the inquiry text and copy it manually.');
    }
  }

  function clearDraft() {
    setDraft('');
    setStatus('');
  }

  const emailLink = cateringEmail && draft
    ? 'mailto:' + cateringEmail + '?subject=' + encodeURIComponent('Catering quote inquiry') + '&body=' + encodeURIComponent(draft)
    : null;

  return (
    <form className="form" onSubmit={prepareInquiry}>
      <div className="fields" onChange={clearDraft}>
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
        <label>Estimated guests<input name="guests" type="number" min="1" step="1" required /></label>
        <label>Venue or city<input name="venue" maxLength={150} required /></label>
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
      <button className="button" type="submit">Prepare inquiry <span aria-hidden="true">↗</span></button>
      <p className="form-note">{cateringEmail ? 'Review your inquiry, then open it in your email app to send.' : 'Online sending is coming soon. You can prepare and copy your event details here.'}</p>
      <p className="status" role="status">{status}</p>
      {draft && (
        <div className="draft">
          <label>Inquiry draft<textarea rows={8} value={draft} readOnly /></label>
          <div className="actions">
            <button className="button secondary" type="button" onClick={copyInquiry}>Copy inquiry</button>
            {emailLink && <a className="button secondary" href={emailLink}>Open email draft</a>}
          </div>
        </div>
      )}
    </form>
  );
}
