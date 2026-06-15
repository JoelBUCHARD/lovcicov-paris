import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const KLAVIYO_API_KEY = Deno.env.get('KLAVIYO_PRIVATE_API_KEY');
const LIST_ID = 'TRgxeg';
const KLAVIYO_REVISION = '2024-10-15';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (!KLAVIYO_API_KEY) {
      return new Response(JSON.stringify({ error: 'KLAVIYO_PRIVATE_API_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { email } = await req.json();
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Email invalide' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const headers = {
      'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
      'accept': 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json',
      'revision': KLAVIYO_REVISION,
    };

    // Subscribe profile to list (creates profile if needed + triggers welcome flow)
    const subResponse = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            profiles: {
              data: [
                {
                  type: 'profile',
                  attributes: {
                    email,
                    subscriptions: {
                      email: { marketing: { consent: 'SUBSCRIBED' } },
                    },
                  },
                },
              ],
            },
            custom_source: 'Footer - Rejoindre Le Cercle',
          },
          relationships: {
            list: { data: { type: 'list', id: LIST_ID } },
          },
        },
      }),
    });

    if (!subResponse.ok && subResponse.status !== 202) {
      const errText = await subResponse.text();
      console.error('Klaviyo error:', subResponse.status, errText);
      return new Response(JSON.stringify({ error: 'Erreur Klaviyo', details: errText }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('subscribe-newsletter error', err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
