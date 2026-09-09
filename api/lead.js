/**
 * Vercel Function: nimmt Kontaktanfragen und Leadmagnet-Anfragen entgegen.
 *
 * Env (in Vercel setzen):
 *   RESEND_API_KEY  – API-Key von resend.com (ohne Key wird nur geloggt)
 *   LEAD_TO         – Empfaengeradresse fuer Lead-Benachrichtigungen
 *   LEAD_FROM       – Absender, Domain muss bei Resend verifiziert sein
 *   LEAD_SHEET_URL  – Web-App-URL des Google-Apps-Scripts (scripts/leads-sheet.gs), traegt jeden Lead in die Tabelle ein
 */

const SITE = 'https://www.dk-finanzkanzlei.de';
const TO = process.env.LEAD_TO || 'info@dk-finanzkanzlei.de';
const FROM = process.env.LEAD_FROM || 'DK Finanzkanzlei <onboarding@resend.dev>';

const esc = (v) =>
  String(v == null ? '' : v).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

async function sendMail(mail) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM, ...mail }),
  });
  if (!res.ok) throw new Error(`resend ${res.status}: ${await res.text()}`);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const email = String(b.email || '').trim();
  const tel = String(b.tel || '').trim();
  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) && email.length <= 200;
  // E-Mail ist Pflicht, ausser der Lead kommt nur mit Handynummer (WhatsApp-Guide).
  if (!emailOk && tel.replace(/\D/g, '').length < 8) {
    return res.status(400).json({ ok: false, error: 'invalid email' });
  }

  const isMagnet = b.type === 'leadmagnet';
  const name = String(b.name || '').slice(0, 200);
  // Landet immer im Vercel-Log – so geht auch ohne Mailversand kein Lead verloren.
  console.log('[lead]', JSON.stringify({ type: b.type, thema: b.thema, name, email, guide: b.guide, plz: b.plz, tel: b.tel, qualifizierung: b.qualifizierung }));

  // Google-Sheet: Zeile anhaengen. Fehler blockieren den Lead nicht, er steht ja im Log.
  if (process.env.LEAD_SHEET_URL) {
    await fetch(process.env.LEAD_SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' }, // text/plain vermeidet den CORS-Preflight bei Apps Script
      body: JSON.stringify({ ...b, name, email, tel }),
    }).then((r) => { if (!r.ok) throw new Error(`sheet ${r.status}`); })
      .catch((err) => console.error('[lead] Sheet-Eintrag fehlgeschlagen:', err));
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn('[lead] RESEND_API_KEY fehlt – Lead wurde nur geloggt.');
    return res.status(200).json({ ok: true, mailed: false });
  }

  const rows = [
    ['Name', name],
    ['E-Mail', email],
    ['Telefon', b.tel],
    ['PLZ', b.plz],
    ['Thema', b.thema],
    ['Nachricht', b.nachricht],
    ['Qualifizierung', b.qualifizierung],
    ['Angefordert', b.guide],
    ['Newsletter', b.newsletter ? 'ja' : ''],
    ['Einwilligung', b.consent || b.datenschutz ? 'ja' : 'nein'],
  ].filter(([, v]) => v);

  try {
    await sendMail({
      to: [TO],
      ...(emailOk ? { reply_to: email } : {}),
      subject: isMagnet
        ? `Neuer Download-Lead: ${b.guide || 'Übersicht'}`
        : `Neue ${b.thema ? `${b.thema}-Anfrage` : 'Kontaktanfrage'} von ${name || email}`,
      html: `<h2>${isMagnet ? 'Download-Lead' : 'Kontaktanfrage'}</h2><table cellpadding="6">${rows
        .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`)
        .join('')}</table>`,
    });

    if (isMagnet && b.href && emailOk) {
      const url = `${SITE}${b.href}`;
      const isPdf = /\.pdf$/i.test(b.href);
      await sendMail({
        to: [email],
        subject: `Deine ${b.guide || 'Übersicht'} von der DK Finanzkanzlei`,
        html: `<p>Hallo ${esc(name) || 'und danke für dein Interesse'},</p>
<p>hier ist deine <b>${esc(b.guide || 'Übersicht')}</b>:</p>
<p><a href="${esc(url)}" style="background:#4d7abd;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;display:inline-block">${isPdf ? 'Guide herunterladen (PDF)' : 'Übersicht öffnen'}</a></p>
${isPdf ? '' : '<p style="color:#64748b;font-size:14px">Tipp: Im Browser über „Drucken → Als PDF sichern" speicherst du dir die Übersicht ab.</p>'}
<p>Wenn du deine Situation konkret durchrechnen lassen willst, melde dich einfach – das Erstgespräch ist kostenlos und unverbindlich.</p>
<p>Viele Grüße<br>Joel Dakaj<br>DK Finanzkanzlei · <a href="tel:+491731038570">+49 173 1038570</a></p>`,
      });
    }
    return res.status(200).json({ ok: true, mailed: true });
  } catch (err) {
    console.error('[lead] Mailversand fehlgeschlagen:', err);
    return res.status(200).json({ ok: true, mailed: false });
  }
}
