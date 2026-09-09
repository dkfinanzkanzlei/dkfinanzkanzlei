/**
 * Google Apps Script fuer die Lead-Tabelle "DK Leads".
 * Einrichtung: Tabelle oeffnen → Erweiterungen → Apps Script → diesen Code einfuegen
 * → Bereitstellen → Neue Bereitstellung → Typ "Web-App", Ausfuehren als "Ich",
 * Zugriff "Jeder" → URL kopieren und in Vercel als LEAD_SHEET_URL eintragen.
 */
const COLS = ['Datum', 'Quelle', 'Vorname', 'Nachname', 'Handynummer', 'E-Mail', 'Thema', 'PLZ', 'Nachricht', 'Qualifizierung', 'Einwilligung'];

function doPost(e) {
  const d = JSON.parse(e.postData.contents || '{}');
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLS);
    sheet.getRange(1, 1, 1, COLS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  const name = String(d.name || '').trim();
  const i = name.indexOf(' ');
  const vorname = i > 0 ? name.slice(0, i) : name;
  const nachname = i > 0 ? name.slice(i + 1) : '';
  // Spalten ab "Quelle" als Text formatieren, sonst wird "+49 …" als Formel gelesen (#ERROR!).
  const row = sheet.getLastRow() + 1;
  sheet.getRange(row, 2, 1, COLS.length - 1).setNumberFormat('@');
  sheet.getRange(row, 1, 1, COLS.length).setValues([[
    new Date(),
    d.guide || d.thema || (d.type === 'leadmagnet' ? 'Download' : 'Kontakt'),
    vorname, nachname,
    d.tel || '', d.email || '', d.thema || '', d.plz || '', d.nachricht || '', d.qualifizierung || '',
    d.consent || d.datenschutz ? 'ja' : 'nein',
  ]]);
  return ContentService.createTextOutput('ok');
}
