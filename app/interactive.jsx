'use client';

import { useState } from 'react';

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
    setDraft(['Hello Golden Catering,', '', 'I’d like to inquire about booking catering.', '', ...lines].join('\n'));
    setStatus('Your booking inquiry is ready below.');
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
    ? 'mailto:' + cateringEmail + '?subject=' + encodeURIComponent('Catering booking inquiry') + '&body=' + encodeURIComponent(draft)
    : null;

  return (
    <form className="form" onSubmit={prepareInquiry} aria-labelledby="booking-form-title">
      <h3 id="booking-form-title">Booking inquiry</h3>
      <p className="form-note form-lead">Include your date if you have one. A booking is confirmed once you hear back from Golden Catering.</p>
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
      <button className="button" type="submit">Prepare booking inquiry <span aria-hidden="true">→</span></button>
      <p className="form-note">{cateringEmail ? 'Review your inquiry, then open it in your email app to send.' : 'Copy your prepared inquiry to share with Golden Catering.'}</p>
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

