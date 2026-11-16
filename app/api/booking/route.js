const visitorClient = '7a8b36df-bd60-4b83-8f2d-105a0e5e4d61';
const formId = '0a8279e0-1e6b-4b5e-aa36-0921e903dad6';

const occasions = {
  'Wedding or pre-wedding event': 'Wedding',
  'Family celebration': 'Other',
  'Workplace or community event': 'Corporate event',
  Other: 'Other',
};

const preferences = new Set([
  'Vegetarian and non-vegetarian',
  'Vegetarian',
  'Non-vegetarian',
  'Still deciding',
]);

const permittedOrigins = new Set([
  'https://goldencatering.ca',
  'https://www.goldencatering.ca',
  'https://golden-catering.vercel.app',
]);

function invalid(message, status = 400) {
  return Response.json({ message }, { status });
}

export async function POST(request) {
  const origin = request.headers.get('origin');
  if (origin && !permittedOrigins.has(origin) && origin !== new URL(request.url).origin) {
    return invalid('Please submit from the Golden Catering website.', 403);
  }

  let input;
  try {
    if (Number(request.headers.get('content-length')) > 10000) return invalid('The inquiry is too long.', 413);
    const type = request.headers.get('content-type') || '';
    input = type.startsWith('application/json')
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return invalid('The inquiry could not be read.');
  }

  if (!input || typeof input !== 'object') return invalid('The inquiry could not be read.');
  if (input.website) return invalid('The inquiry could not be accepted.');

  const value = key => typeof input[key] === 'string' ? input[key].trim() : '';
  const name = value('name');
  const email = value('email');
  const occasion = value('occasion');
  const date = value('date');
  const venue = value('venue');
  const guests = value('guests');
  const preference = value('preference');
  const details = value('details');
  if (
    !name || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
    !Object.hasOwn(occasions, occasion) || !preferences.has(preference) ||
    !/^[1-9]\d{0,4}$/.test(guests) || Number(guests) > 10000 ||
    !venue || venue.length > 150 || details.length > 800 ||
    (date && !/^\d{4}-\d{2}-\d{2}$/.test(date))
  ) return invalid('Check your contact details and event information, then try again.');

  const eventDetails = [
    'Occasion: ' + occasion,
    'Event date: ' + (date || 'To be confirmed'),
    'Estimated guests: ' + guests,
    'Venue or city: ' + venue,
    'Menu preference: ' + preference,
    ...(details ? ['', 'Additional details:', details] : []),
  ].join('\n');

  try {
    const tokenResponse = await fetch('https://www.wixapis.com/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId: visitorClient, grantType: 'anonymous' }),
      signal: AbortSignal.timeout(8000),
    });
    if (!tokenResponse.ok) {
      console.error('Booking visitor token rejected', tokenResponse.status);
      return invalid('We could not send your inquiry right now. Please try again or email us.', 502);
    }
    const token = await tokenResponse.json();
    if (!token.access_token) return invalid('We could not send your inquiry right now. Please try again or email us.', 502);

    const result = await fetch('https://www.wixapis.com/forms/v4/submissions', {
      method: 'POST',
      headers: { Authorization: token.access_token, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submission: {
          formId,
          submissions: {
            form_field_352c: name,
            form_field_28db: email,
            form_field_9776: occasions[occasion],
            form_field_d2cc: eventDetails,
          },
        },
      }),
      signal: AbortSignal.timeout(10000),
    });
    const body = await result.json();
    if (!result.ok || !body.submission?.id) {
      console.error('Booking submission rejected', result.status, body.details?.applicationError?.code);
      return invalid('We could not send your inquiry right now. Please try again or email us.', 502);
    }
    if (!(request.headers.get('content-type') || '').startsWith('application/json')) {
      return Response.redirect(new URL('/booking-received', request.url), 303);
    }
    return Response.json({ accepted: true }, { status: 201 });
  } catch (error) {
    console.error('Booking submission could not be confirmed', error.name);
    return invalid('We could not confirm receipt. Please email us if the problem continues.', 502);
  }
}
