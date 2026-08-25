/**
 * Reine Inhaltsdaten der Leistungsseiten – ohne React-Abhängigkeiten,
 * damit sowohl die App als auch scripts/prerender.mjs darauf zugreifen koennen.
 */

export type ServiceKey = 'krankenversicherung' | 'arbeitskraft' | 'kfz' | 'sach' | 'gewerbe' | 'rente' | 'hinterbliebene' | 'immobilien' | 'sparprodukte' | 'geldanlagen' | 'vorsorge' | 'finanzierungen' | 'aktien' | 'vwl';

export type ServicePageData = {
  category: string; title: string; hook: string; intro: string;
  stats: { value: string; label: string }[];
  comparison?: { heading: string; left: { label: string; points: { text: string; pos: boolean }[] }; right: { label: string; points: { text: string; pos: boolean }[] } };
  types?: { title: string; desc: string; tag?: string }[];
  problems: string[]; solution: string; cta: string;
  deepDive?: { heading: string; sections: { title: string; body: string }[] };
  checklist?: { heading: string; intro?: string; items: string[] };
  leadMagnet?: { title: string; subtitle: string; bullets: string[]; href: string; fileLabel: string };
  faq: { q: string; a: string }[];
};

export const SERVICE_DATA: Record<ServiceKey, ServicePageData> = {
  krankenversicherung: {
    deepDive: {
      heading: 'PKV oder GKV – was du vor der Entscheidung wirklich wissen musst',
      sections: [
        { title: 'Wer darf überhaupt in die private Krankenversicherung?', body: 'Nicht jeder hat die Wahl. Angestellte dürfen nur wechseln, wenn ihr Bruttoeinkommen die Jahresarbeitsentgeltgrenze übersteigt – und zwar voraussichtlich auch im Folgejahr. Selbstständige und Freiberufler können unabhängig vom Einkommen jederzeit wechseln. Beamte und Beamtenanwärter erhalten Beihilfe vom Dienstherrn und versichern in der PKV nur den Restanteil, was die private Absicherung für sie fast immer zur günstigeren Variante macht. Studenten können sich zu Studienbeginn von der Versicherungspflicht befreien lassen – eine Entscheidung, die für das gesamte Studium bindend ist und deshalb sorgfältig durchgerechnet gehört.' },
        { title: 'Wie der PKV-Beitrag tatsächlich zustande kommt', body: 'In der gesetzlichen Krankenversicherung zahlst du einen Prozentsatz deines Einkommens. In der PKV zahlst du für Leistung: Der Beitrag richtet sich nach Eintrittsalter, Gesundheitszustand und dem gewählten Leistungsumfang – nicht nach deinem Gehalt. Wer jung und gesund einsteigt, sichert sich dauerhaft günstige Kalkulationsgrundlagen. Wer mit 50 wechselt, zahlt für denselben Schutz deutlich mehr. Zusätzlich steuerst du den Beitrag über den Selbstbehalt: Ein Selbstbehalt von 600 bis 1.200 Euro im Jahr senkt die Monatsprämie spürbar und lohnt sich, wenn du selten zum Arzt gehst.' },
        { title: 'Alterungsrückstellungen: Warum der Beitrag im Alter nicht explodieren muss', body: 'Ein Teil deines Beitrags fließt in die Alterungsrückstellung – ein Kapitalstock, der die höheren Krankheitskosten im Alter abfedert. Seriöse Tarife kalkulieren diese Rückstellung ausreichend, unseriöse locken mit Einstiegspreisen und holen sich das Geld später über Beitragsanpassungen zurück. Genau hier trennt sich die Spreu vom Weizen: Wir prüfen für dich die Beitragshistorie der letzten zehn Jahre, die Überschussbeteiligung und die Finanzstärke des Versicherers. Wer zusätzlich einen Beitragsentlastungstarif einschließt, senkt seinen Beitrag ab Rentenbeginn planbar um einen festen Betrag.' },
        { title: 'Die Gesundheitsprüfung ist der kritischste Schritt', body: 'Anders als in der GKV entscheidet dein Gesundheitszustand über Annahme, Zuschlag oder Ablehnung. Vorerkrankungen führen zu Risikozuschlägen oder Leistungsausschlüssen – und ein einmal abgelehnter Antrag wird bei anderen Versicherern über das Hinweis- und Informationssystem sichtbar. Deshalb stellen wir grundsätzlich zuerst eine anonyme Risikovoranfrage: Dein Profil wird ohne Namensnennung mehreren Versicherern vorgelegt, und erst wenn eine Annahme zu guten Konditionen feststeht, geht ein echter Antrag raus. Das kostet dich nichts und schützt dich vor einer Ablehnung, die dich jahrelang verfolgt.' },
        { title: 'Rückkehr in die GKV – ehrlich betrachtet', body: 'Die Rückkehr ist möglich, aber an enge Bedingungen geknüpft. Vor dem 55. Lebensjahr geht sie etwa über ein sozialversicherungspflichtiges Angestelltenverhältnis unterhalb der Versicherungspflichtgrenze oder über die Familienversicherung des Partners. Ab 55 ist der Weg zurück faktisch verschlossen. Wer in die PKV wechselt, sollte das deshalb als langfristige Entscheidung treffen – und nicht als Sparmaßnahme für die nächsten drei Jahre. Wir rechnen dir vor der Entscheidung beide Szenarien bis ins Rentenalter durch.' },
        { title: 'Die Zusatzversicherung als Mittelweg', body: 'Nicht jeder muss oder sollte komplett wechseln. Wer in der GKV bleibt, kann die relevanten Lücken gezielt schließen: Eine Zahnzusatzversicherung übernimmt bis zu 100 Prozent bei Zahnersatz statt der gesetzlichen Festzuschüsse, eine stationäre Zusatzversicherung bringt Chefarztbehandlung und Ein- oder Zweibettzimmer, eine ambulante Zusatzversicherung Heilpraktiker, Sehhilfen und Vorsorgeleistungen. Für viele Familien ist diese Kombination aus GKV plus gezielten Zusatzbausteinen die wirtschaftlich klügste Lösung.' },
      ],
    },
    checklist: {
      heading: 'PKV-Check: Die 8 Punkte, die über deinen Tarif entscheiden',
      intro: 'Wenn du einen PKV-Tarif vergleichst, achte auf diese Punkte – sie entscheiden im Leistungsfall über Tausende Euro.',
      items: [
        'Ambulant: Werden Heilpraktiker, Psychotherapie und Vorsorgeuntersuchungen ohne enge Höchstsätze erstattet?',
        'Stationär: Chefarztbehandlung und Zweibettzimmer eingeschlossen – und gilt das auch in Privatkliniken?',
        'Zahn: Wie hoch ist die Erstattung bei Zahnersatz, Implantaten und Kieferorthopädie, und wie lange laufen die Summenbegrenzungen der ersten Jahre?',
        'Beitragsstabilität: Wie hat sich der Tarif in den letzten zehn Jahren entwickelt?',
        'Beitragsentlastung im Alter: Ist ein Entlastungstarif eingeschlossen oder optional zubuchbar?',
        'Selbstbehalt: Passt die Höhe zu deinem tatsächlichen Arztverhalten?',
        'Wechseloptionen: Kannst du innerhalb des Versicherers ohne neue Gesundheitsprüfung in andere Tarife wechseln?',
        'Auslandsschutz: Wie lange bist du weltweit versichert, und gilt der Schutz auch bei längeren Auslandsaufenthalten?',
      ],
    },
    leadMagnet: {
      title: 'Die große PKV-Übersicht',
      subtitle: 'GKV und PKV im direkten Vergleich, Beitragsbeispiele nach Alter, die komplette Leistungs-Checkliste und die häufigsten Fehler beim Wechsel – kompakt aufbereitet zum Mitnehmen und Ausdrucken.',
      bullets: [
        'GKV vs. PKV: Beitrag, Leistung und Langfristrechnung im Direktvergleich',
        'Beitragsbeispiele für Angestellte, Selbstständige, Beamte und Studenten',
        'Die 8-Punkte-Checkliste zur Tarifprüfung',
        'Anonyme Risikovoranfrage: wie sie funktioniert und was sie dir spart',
      ],
      href: '/guides/pkv-uebersicht',
      fileLabel: 'PKV-Übersicht',
    },
    category: 'Versicherungen', title: 'Krankenversicherung',
    hook: 'Die falsche Krankenversicherung kostet dich jeden Monat bares Geld – und du merkst es erst, wenn du sie wirklich brauchst.',
    intro: 'In Deutschland besteht Krankenversicherungspflicht. Die entscheidende Frage ist nicht ob, sondern wie du versichert bist. GKV oder PKV, Basistarif oder Premiumschutz: Wir helfen dir, die richtige Entscheidung zu treffen.',
    stats: [
      { value: '11,5 %', label: 'GKV-Beitragssatz 2024' },
      { value: '66.600 €', label: 'Versicherungspflichtgrenze p.a.' },
      { value: '∅ 40 %', label: 'bessere Leistungen in der PKV' },
      { value: '500+', label: 'Tarifoptionen im Vergleich' },
    ],
    comparison: {
      heading: 'GKV vs. PKV im Direktvergleich',
      left: { label: 'Gesetzliche Krankenversicherung', points: [
        { text: 'Beitrag abhängig vom Einkommen', pos: false },
        { text: 'Familienversicherung kostenlos möglich', pos: true },
        { text: 'Oft monatelange Wartezeiten beim Facharzt', pos: false },
        { text: 'Begrenzte Leistungen (z.B. Zahnersatz)', pos: false },
        { text: 'Für alle zugänglich', pos: true },
      ]},
      right: { label: 'Private Krankenversicherung', points: [
        { text: 'Beitrag nach Gesundheitszustand & Alter', pos: true },
        { text: 'Terminpriorität & Chefarztbehandlung', pos: true },
        { text: 'Freie Arzt- und Krankenhauswahl', pos: true },
        { text: 'Individuell konfigurierbare Leistungen', pos: true },
        { text: 'Nur für bestimmte Personengruppen', pos: false },
      ]},
    },
    types: [
      { title: 'Gesetzliche KV (GKV)', desc: 'Pflichtversicherung für Angestellte unter der Versicherungspflichtgrenze. Einkommensabhängige Beiträge, kostenlose Familienversicherung möglich.', tag: 'Für Angestellte' },
      { title: 'Private KV (PKV)', desc: 'Für Selbstständige, Beamte und gutverdienende Angestellte. Bessere Leistungen, freie Arztwahl, Chefarztbehandlung inklusive.', tag: 'Für Selbstständige & Beamte' },
      { title: 'Kranken-Zusatzversicherung', desc: 'Ergänze deine GKV gezielt: Zahnzusatz, Krankenhaus-Zusatz, Auslandskranken – für die Lücken der gesetzlichen Versicherung.', tag: 'Für GKV-Versicherte' },
    ],
    problems: [
      'Du zahlst hohe Beiträge, bekommst aber Standardleistungen – und weißt nicht, ob du zu viel zahlst.',
      'Als GKV-Versicherter wartest du Monate auf einen Facharzttermin, während Privatpatienten bevorzugt behandelt werden.',
      'Selbstständige zahlen in der GKV den vollen Beitrag – ohne Arbeitgeberzuschuss.',
      'Viele wechseln nie die Krankenkasse und verschenken Jahr für Jahr Hunderte Euro.',
    ],
    solution: 'Wir vergleichen kundenorientiert alle gesetzlichen und privaten Anbieter – ohne Provisionsinteressen. Du bekommst unsere ehrliche Empfehlung, welches Modell wirklich zu deiner Lebenssituation, deinem Einkommen und deinen Gesundheitswünschen passt.',
    cta: 'Kostenlose Analyse starten',
    faq: [
      { q: 'Wer kann in die PKV wechseln?', a: 'Angestellte, die die Versicherungspflichtgrenze (66.600 € Brutto p.a. in 2024) überschreiten, Selbstständige, Beamte und Studenten können sich privat versichern.' },
      { q: 'Lohnt sich ein Wechsel der gesetzlichen Krankenkasse?', a: 'Ja – Beitragssätze, Zusatzbeiträge und Leistungen unterscheiden sich deutlich. Ein Vergleich kann Hunderte Euro jährlich sparen.' },
      { q: 'Kann ich aus der PKV zurück in die GKV?', a: 'Das ist möglich, aber schwierig. Unter die Versicherungspflichtgrenze zu fallen (z.B. durch Jobwechsel) oder das Rentenalter zu erreichen sind typische Wege.' },
      { q: 'Was kostet eine Kranken-Zusatzversicherung?', a: 'Je nach Leistungsumfang und Alter ab ca. 10–50 € monatlich. Zahnzusatz, Krankenhaustagegeld oder Auslandsschutz lassen sich gezielt kombinieren.' },
    ],
  },

  arbeitskraft: {
    deepDive: {
      heading: 'Berufsunfähigkeit im Detail: Woran du einen wirklich guten Vertrag erkennst',
      sections: [
        { title: 'Verzicht auf die abstrakte Verweisung', body: 'Das ist die wichtigste Klausel überhaupt. Ohne diesen Verzicht darf der Versicherer dich auf einen anderen Beruf verweisen, den du theoretisch noch ausüben könntest – auch wenn du diesen Beruf nie gelernt hast und es dafür keine offene Stelle gibt. Ein Dachdecker mit Rückenleiden wäre dann als Pförtner verweisbar und bekäme keine Rente. Jeder ernstzunehmende Tarif verzichtet heute vollständig auf die abstrakte Verweisung. Steht das nicht ausdrücklich in den Bedingungen, ist der Vertrag für uns nicht vergleichsfähig.' },
        { title: 'Die 50-Prozent-Regel und der Prognosezeitraum', body: 'Leistung gibt es, wenn du deinen zuletzt ausgeübten Beruf zu mindestens 50 Prozent nicht mehr ausüben kannst – nicht erst bei vollständiger Arbeitsunfähigkeit. Entscheidend ist zusätzlich der Prognosezeitraum: Gute Verträge leisten, wenn die Berufsunfähigkeit voraussichtlich sechs Monate andauert. Schwächere Bedingungen verlangen drei Jahre oder einen ärztlichen Nachweis der Dauerhaftigkeit – eine Hürde, an der viele Leistungsfälle scheitern. Ebenso wichtig ist die rückwirkende Leistung: Der Vertrag sollte auch dann zahlen, wenn die Berufsunfähigkeit erst nachträglich festgestellt wird und bereits sechs Monate ununterbrochen bestand.' },
        { title: 'Nachversicherungsgarantien ohne erneute Gesundheitsprüfung', body: 'Mit 25 brauchst du vielleicht 1.500 Euro Rente, mit 35 und Familie und Immobilienkredit sind es 2.800 Euro. Eine gute Nachversicherungsgarantie erlaubt dir, den Schutz bei bestimmten Ereignissen – Heirat, Geburt, Immobilienkauf, Gehaltssprung, Studienabschluss, Aufnahme einer Selbstständigkeit – ohne neue Gesundheitsfragen aufzustocken. Damit sicherst du dir deinen heutigen Gesundheitszustand für die Zukunft. Achte auf die Fristen: Manche Tarife verlangen die Ausübung binnen sechs Monaten nach dem Ereignis, andere lassen dir volle zwölf Monate.' },
        { title: 'Anonyme Risikovoranfrage statt Antragsablehnung', body: 'Ein abgelehnter oder zurückgestellter Antrag wird im Hinweis- und Informationssystem der Versicherungswirtschaft gespeichert und erschwert dir jeden weiteren Abschluss – auch bei anderen Gesellschaften. Deshalb fragen wir dein Risikoprofil grundsätzlich zuerst anonym an. Wir erstellen aus deinen Gesundheitsdaten ein Profil ohne Namen und legen es mehreren Versicherern vor. Du erfährst vorab, wer dich zu welchen Konditionen annimmt, und stellst den Antrag erst dort, wo die Zusage steht. Für Menschen mit Rückenbeschwerden, Allergien, Psychotherapie in der Vorgeschichte oder BMI-Auffälligkeiten ist das der entscheidende Unterschied zwischen Schutz und Ablehnung.' },
        { title: 'Warum derselbe Schutz je nach Beruf dreimal so viel kostet', body: 'Versicherer teilen Berufe in Risikogruppen ein. Ein Bürokaufmann zahlt für 2.000 Euro Monatsrente einen Bruchteil dessen, was ein Gerüstbauer zahlt. Entscheidend ist aber nicht nur die Berufsbezeichnung, sondern der tatsächliche Anteil körperlicher Tätigkeit – und genau hier bewerten die Gesellschaften sehr unterschiedlich. Ein Meister mit 80 Prozent Büroanteil kann bei einem Versicherer als Handwerker eingestuft werden und beim nächsten als kaufmännisch Tätiger. Dieselbe Person, derselbe Schutz, bis zu dreifacher Beitragsunterschied. Wer nur einen Anbieter anfragt, erfährt davon nie.' },
        { title: 'Leistungsdauer, Dynamik und Inflationsschutz', body: 'Der Vertrag sollte bis zum tatsächlichen Renteneintritt laufen, also in der Regel bis 67. Endet er mit 60, klafft genau in den teuersten Jahren eine Lücke. Die Beitragsdynamik sorgt dafür, dass Rente und Beitrag jährlich steigen, ohne dass du erneut Gesundheitsfragen beantworten musst – wichtig, weil 2.000 Euro Rente in 30 Jahren real deutlich weniger wert sind. Ergänzend gibt es die Leistungsdynamik, die deine Rente auch während des Leistungsbezugs jährlich anhebt. Beides kostet Beitrag, beides ist bei langen Laufzeiten sein Geld wert.' },
      ],
    },
    checklist: {
      heading: 'BU-Check: Die 9 Klauseln, die im Ernstfall wirklich zählen',
      intro: 'Ein BU-Vertrag ist nur so gut wie seine Bedingungen. Diese Punkte prüfen wir bei jedem Angebot.',
      items: [
        'Vollständiger Verzicht auf die abstrakte Verweisung',
        'Prognosezeitraum von sechs Monaten statt drei Jahren',
        'Rückwirkende Leistung ab Beginn der Berufsunfähigkeit',
        'Nachversicherungsgarantien ohne erneute Gesundheitsprüfung',
        'Leistung auch bei psychischen Erkrankungen ohne Sonderklausel',
        'Weltweiter Versicherungsschutz ohne Meldepflichten',
        'Verzicht auf das Kündigungsrecht bei Anzeigepflichtverletzung nach Ablauf der Frist',
        'Vertragslaufzeit bis zum 67. Lebensjahr',
        'Beitrags- und Leistungsdynamik zum Inflationsausgleich',
      ],
    },
    leadMagnet: {
      title: 'Die große BU-Übersicht',
      subtitle: 'Alle entscheidenden Vertragsklauseln erklärt, Richtwerte für die passende Rentenhöhe, Beitragsbeispiele nach Beruf und Alter sowie der komplette Ablauf der anonymen Risikovoranfrage.',
      bullets: [
        'Die 9 Klauseln, an denen sich gute von schlechten Verträgen trennen',
        'Wie hoch deine BU-Rente sein muss – mit Rechenbeispiel',
        'BU, Grundfähigkeit oder Erwerbsunfähigkeit: was zu welchem Beruf passt',
        'Vorerkrankungen: der Ablauf der anonymen Risikovoranfrage Schritt für Schritt',
      ],
      href: '/guides/bu-uebersicht',
      fileLabel: 'BU-Übersicht',
    },
    category: 'Versicherungen', title: 'Arbeitskraftabsicherung',
    hook: 'Jeder vierte Arbeitnehmer wird berufsunfähig. Der Staat zahlt dann nur ca. 30 % deines letzten Gehalts.',
    intro: 'Deine Arbeitskraft ist dein größtes Kapital. Ein Unfall, eine Erkrankung, psychische Erschöpfung – und du kannst nicht mehr arbeiten. Wir sichern dich so ab, dass du auch im schlimmsten Fall finanziell stabil bleibst.',
    stats: [
      { value: '25 %', label: 'aller Arbeitnehmer werden BU' },
      { value: '~30 %', label: 'staatliche Absicherung des Gehalts' },
      { value: '43 %', label: 'BU-Fälle durch psychische Erkrankungen' },
      { value: '∅ 47', label: 'Jahre – mittleres BU-Eintrittsalter' },
    ],
    comparison: {
      heading: 'Staatliche Absicherung vs. Private BU',
      left: { label: 'Staatliche Erwerbsminderungsrente', points: [
        { text: 'Nur ~30 % des letzten Nettogehalts', pos: false },
        { text: 'Erst nach 5 Jahren Beitragszahlung', pos: false },
        { text: 'Nur bei vollständiger Erwerbsunfähigkeit', pos: false },
        { text: 'Keine Absicherung bei Berufsunfähigkeit', pos: false },
        { text: 'Keine Anpassung an Lebenshaltungskosten', pos: false },
      ]},
      right: { label: 'Private Berufsunfähigkeitsversicherung', points: [
        { text: 'Individuell vereinbarte Rente (z.B. 3.000 €/Monat)', pos: true },
        { text: 'Zahlt bereits bei 50 % BU im zuletzt ausgeübten Beruf', pos: true },
        { text: 'Auch bei psychischen Erkrankungen', pos: true },
        { text: 'Dynamische Beitrags- und Rentenanpassung möglich', pos: true },
        { text: 'Sofort wirksam nach Abschluss', pos: true },
      ]},
    },
    types: [
      { title: 'Berufsunfähigkeitsversicherung (BU)', desc: 'Der Goldstandard. Zahlt, wenn du deinen zuletzt ausgeübten Beruf zu mindestens 50 % nicht mehr ausüben kannst.', tag: 'Empfohlen' },
      { title: 'Grundfähigkeitsversicherung', desc: 'Alternative zur BU bei körperlichen Berufen. Zahlt, wenn grundlegende Fähigkeiten (Sehen, Sprechen, Greifen) dauerhaft verloren gehen.', tag: 'Für Handwerker' },
      { title: 'Erwerbsunfähigkeitsversicherung (EU)', desc: 'Günstigere Alternative zur BU. Zahlt, wenn du überhaupt keine Arbeit mehr ausüben kannst – strengeres Kriterium, niedrigerer Beitrag.', tag: 'Günstiger Einstieg' },
      { title: 'Dread Disease / Schwere Krankheiten', desc: 'Einmalzahlung bei Diagnose schwerer Krankheiten (Krebs, Herzinfarkt, Schlaganfall). Ideal als Ergänzung zur BU.', tag: 'Ergänzend' },
    ],
    problems: [
      'Du wirst berufsunfähig – aber deine Miete, Kredite und Lebenshaltungskosten laufen einfach weiter.',
      'Die staatliche Erwerbsminderungsrente deckt nur einen Bruchteil deines tatsächlichen Bedarfs.',
      'Viele Berufsgruppen werden abgelehnt oder zahlen überhöhte Prämien – ohne professionelle Beratung.',
      'Wer zu lange wartet, zahlt deutlich mehr oder bekommt gar keinen Schutz mehr.',
    ],
    solution: 'Wir finden für deinen Beruf und deine Gesundheitshistorie den richtigen Schutz – zum besten Preis. Mit anonymer Risikovoranfrage prüfen wir zuerst deine Chancen, bevor ein Antrag gestellt wird.',
    cta: 'BU-Schutz jetzt prüfen',
    faq: [
      { q: 'Wann sollte ich eine BU abschließen?', a: 'So früh wie möglich. Mit 25 Jahren ist der Beitrag deutlich günstiger als mit 35. Außerdem steigt das Risiko, Vorerkrankungen zu haben, die zum Ausschluss führen.' },
      { q: 'Was passiert, wenn ich Vorerkrankungen habe?', a: 'Durch eine anonyme Risikovoranfrage klären wir, ob und zu welchen Konditionen du versicherbar bist – ohne dass deine Daten gespeichert werden.' },
      { q: 'Wie hoch sollte die BU-Rente sein?', a: 'Als Faustregel: 70–80 % deines Nettoeinkommens. Bei 3.000 € Netto empfehlen wir eine BU-Rente von mindestens 2.000–2.400 € monatlich.' },
      { q: 'Gibt es Alternativen zur BU?', a: 'Ja – Grundfähigkeits- und Erwerbsunfähigkeitsversicherungen sind günstiger, bieten aber weniger Schutz. Wir zeigen dir alle Optionen im direkten Vergleich.' },
    ],
  },

  kfz: {
    category: 'Versicherungen', title: 'KFZ-Versicherung',
    hook: 'Die meisten zahlen für ihre Autoversicherung deutlich zu viel – und erfahren es erst, wenn es zu spät ist.',
    intro: 'Tausende Tarife, kaum Transparenz. Ob Haftpflicht, Teil- oder Vollkasko – der Unterschied zwischen richtigem und falschem Schutz kann dich im Schadensfall Zehntausende Euro kosten.',
    stats: [
      { value: '∅ 300 €', label: 'jährliche Ersparnis durch Vergleich' },
      { value: '300+', label: 'KFZ-Tarife im Vergleich' },
      { value: '67 %', label: 'wechseln nie ihren KFZ-Anbieter' },
      { value: '48h', label: 'schnelle Schadensregulierung' },
    ],
    comparison: {
      heading: 'Welcher KFZ-Schutz ist der richtige?',
      left: { label: 'Haftpflicht + Teilkasko', points: [
        { text: 'Deckt Schäden an anderen Fahrzeugen', pos: true },
        { text: 'Schutz bei Diebstahl, Unwetter, Wildunfall', pos: true },
        { text: 'Keine Deckung bei selbstverschuldetem Unfall', pos: false },
        { text: 'Günstigere Prämie', pos: true },
        { text: 'Empfehlung für ältere Fahrzeuge', pos: true },
      ]},
      right: { label: 'Vollkasko', points: [
        { text: 'Zahlt auch bei selbstverschuldetem Unfall', pos: true },
        { text: 'Vandalismusschäden abgedeckt', pos: true },
        { text: 'Schutz bei Fahrerflucht des Verursachers', pos: true },
        { text: 'Höhere monatliche Prämie', pos: false },
        { text: 'Empfehlung für Neuwagen & Finanzierungen', pos: true },
      ]},
    },
    types: [
      { title: 'Kfz-Haftpflicht', desc: 'Gesetzlich vorgeschrieben. Deckt Personen- und Sachschäden, die du anderen im Straßenverkehr zufügst.', tag: 'Pflicht' },
      { title: 'Teilkasko', desc: 'Ergänzt die Haftpflicht um Schäden durch Diebstahl, Glasbruch, Sturm, Hagel, Überschwemmung und Wildunfälle.', tag: 'Empfohlen' },
      { title: 'Vollkasko', desc: 'Maximaler Schutz. Deckt zusätzlich selbstverschuldete Unfälle und Vandalismus ab.', tag: 'Für Neuwagen' },
    ],
    problems: [
      'Wer nie vergleicht, verschenkt im Schnitt über 300 € pro Jahr – bei gleichem oder schlechterem Schutz.',
      'Im Schadensfall streiten viele Versicherer um Zuständigkeiten – du bleibst ohne Hilfe stehen.',
      'Der falsche Schutzumfang kann dich nach einem Unfall mit Tausenden Euro belasten.',
    ],
    solution: 'Wir vergleichen kundenorientiert über 300 KFZ-Tarife und finden den optimalen Schutz für dein Fahrzeug – zum besten Preis, sofort wirksam.',
    cta: 'Jetzt KFZ-Tarif vergleichen',
    faq: [
      { q: 'Wann lohnt sich Vollkasko?', a: 'Grundsätzlich bei Neuwagen, Fahrzeugen mit einem Wert über 10.000 € oder bei laufenden Finanzierungen und Leasingverträgen.' },
      { q: 'Kann ich während des Jahres wechseln?', a: 'Ja – bei Beitragserhöhung hast du ein Sonderkündigungsrecht. Auch nach einem Schadensfall oder zum Jahresende kannst du kündigen.' },
      { q: 'Was beeinflusst meinen KFZ-Beitrag?', a: 'Fahrzeugtyp, Regionalklasse, Schadenfreiheitsklasse (SF), jährliche Kilometer, Fahrerkreis und Abstellplatz.' },
    ],
  },

  sach: {
    category: 'Versicherungen', title: 'Sachversicherungen',
    hook: 'Ein Wasserschaden, ein Einbruch, ein Unfall – und plötzlich stehst du vor Kosten, die dich finanziell Jahre zurückwerfen.',
    intro: 'Hausrat, Haftpflicht, Wohngebäude, Rechtsschutz – die wenigsten wissen, ob ihre Absicherung wirklich vollständig ist. Wir analysieren deine bestehenden Verträge und schließen Lücken, bevor etwas passiert.',
    stats: [
      { value: '∅ 15.000 €', label: 'Kosten eines typischen Wasserschadens' },
      { value: '3 Mio. €', label: 'typische Haftpflicht-Deckungssumme' },
      { value: '47 %', label: 'Haushalte ohne ausreichende Absicherung' },
      { value: '24h', label: 'Schadenmeldung möglich' },
    ],
    types: [
      { title: 'Privathaftpflicht', desc: 'Die wichtigste Versicherung überhaupt. Schützt dich vor Schadensersatzforderungen Dritter – von der zerbrochenen Fensterscheibe bis zum Millionenschaden.', tag: 'Muss-haben' },
      { title: 'Hausratversicherung', desc: 'Schützt deinen gesamten Hausrat (Möbel, Elektronik, Kleidung) bei Einbruch, Brand, Leitungswasser und Sturm/Hagel.', tag: 'Für Mieter & Eigentümer' },
      { title: 'Wohngebäudeversicherung', desc: 'Pflicht für Immobilieneigentümer. Schützt das Gebäude selbst gegen Feuer, Leitungswasser und Sturm – inkl. optionaler Elementarschadendeckung.', tag: 'Für Eigentümer' },
      { title: 'Rechtsschutzversicherung', desc: 'Deckt Anwalts- und Gerichtskosten ab – im Arbeitsrecht, Verkehrsrecht oder bei Mietstreitigkeiten.', tag: 'Optional' },
    ],
    problems: [
      'Hausrat, Haftpflicht, Wohngebäude: Die meisten sind entweder doppelt oder gar nicht richtig versichert.',
      'Im Schadensfall streiten Versicherer um Zuständigkeiten – du bleibst auf den Kosten sitzen.',
      'Veraltete Verträge decken moderne Risiken (Starkregen, Elementarschäden) oft nicht ab.',
    ],
    solution: 'Wir analysieren deine bestehenden Verträge, schließen Lücken und bündeln sinnvoll – ohne Überversicherung und ohne versteckte Kosten.',
    cta: 'Absicherung prüfen lassen',
    faq: [
      { q: 'Brauche ich wirklich eine Privathaftpflicht?', a: 'Absolut – sie ist eine der wichtigsten Versicherungen. Ohne sie haftest du mit deinem gesamten Privatvermögen für Schäden, die du anderen zufügst. Oft ab 3 € monatlich.' },
      { q: 'Was ist der Unterschied zwischen Hausrat und Wohngebäude?', a: 'Hausrat versichert alles in der Wohnung (Möbel, Geräte, Kleidung). Wohngebäude versichert das Haus selbst (Wände, Dach, Leitungen).' },
      { q: 'Lohnt sich eine Elementarschadenversicherung?', a: 'Durch den Klimawandel steigt das Risiko von Überschwemmungen und Starkregen stark. Wir prüfen, ob dein Standort gefährdet ist – kostenlos.' },
    ],
  },

  gewerbe: {
    category: 'Versicherungen', title: 'Gewerbeversicherungen',
    hook: 'Ein einziger Fehler in deinem Unternehmen kann dich persönlich ruinieren – wenn du nicht richtig versichert bist.',
    intro: 'Als Selbstständiger oder Unternehmer trägst du Risiken, die Angestellte nie kennen. Betriebshaftpflicht, Cyber-Risiken, Betriebsausfall – ein maßgeschneidertes Konzept schützt deinen Lebensunterhalt.',
    stats: [
      { value: '60 %', label: 'der KMU haben Lücken im Versicherungsschutz' },
      { value: '∅ 2 Jahre', label: 'bis zur Insolvenz nach Betriebsunterbrechung' },
      { value: '1 in 5', label: 'Unternehmen Opfer eines Cyberangriffs' },
      { value: '0 €', label: 'Selbstbeteiligung mit richtigem Vertrag möglich' },
    ],
    types: [
      { title: 'Betriebshaftpflicht', desc: 'Schützt vor Schadenersatzansprüchen Dritter durch deine Betriebstätigkeit. Für Selbstständige und Unternehmen unverzichtbar.', tag: 'Grundlage' },
      { title: 'Berufshaftpflicht', desc: 'Für beratende Berufe (Anwälte, IT, Architekten). Deckt Vermögensschäden durch Beratungsfehler und Pflichtverletzungen.', tag: 'Für Berater' },
      { title: 'Cyber-Versicherung', desc: 'Schützt vor den Folgen von Hackerangriffen, Datenverlust und Betriebsunterbrechung durch Cyber-Kriminalität.', tag: 'Zunehmend wichtig' },
      { title: 'Betriebsunterbrechungsversicherung', desc: 'Wenn dein Betrieb stillsteht – zahlt laufende Kosten und entgangenen Gewinn.', tag: 'Existenzsicherung' },
    ],
    problems: [
      'Betriebshaftpflicht, Cyber, Betriebsunterbrechung: Selbstständige unterschätzen regelmäßig ihre Unternehmensrisiken.',
      'Standardpolicen passen selten zur tatsächlichen Tätigkeit – im Schadensfall zahlt die Versicherung nicht.',
      'Ohne Absicherung haftest du als Einzelunternehmer oder GmbH-Geschäftsführer mit deinem Privatvermögen.',
    ],
    solution: 'Wir entwickeln ein maßgeschneidertes Versicherungskonzept für dein Unternehmen – mit den richtigen Produkten, der richtigen Deckung und zum besten Preis.',
    cta: 'Unternehmen jetzt absichern',
    faq: [
      { q: 'Muss ich als Freiberufler eine Betriebshaftpflicht haben?', a: 'Nicht gesetzlich vorgeschrieben, aber de facto unverzichtbar. Ohne sie haftest du persönlich und unbegrenzt für Schäden aus deiner Tätigkeit.' },
      { q: 'Was kostet eine Betriebshaftpflicht?', a: 'Je nach Branche, Umsatz und Deckungssumme ab ca. 100–300 € jährlich. Wir finden den optimalen Preis-Leistungs-Tarif für dich.' },
      { q: 'Brauche ich als kleines Unternehmen eine Cyber-Versicherung?', a: 'Ja – gerade kleine Unternehmen sind beliebte Ziele, weil sie oft schlechter geschützt sind. Ein Angriff kann den gesamten Betrieb lahmlegen.' },
    ],
  },

  rente: {
    deepDive: {
      heading: 'Private Rentenversicherung im Detail: Was den Unterschied macht',
      sections: [
        { title: 'Klassisch, Hybrid oder Fondspolice – die Grundentscheidung', body: 'Klassische Rentenversicherungen arbeiten mit dem Sicherungsvermögen des Versicherers und einem garantierten Rechnungszins. Sie sind planbar, aber renditeschwach – über lange Laufzeiten schlägt die Inflation die Garantie regelmäßig. Fondspolicen investieren dein Guthaben in Fonds und ETFs und bieten dafür kein oder nur ein geringes Garantieniveau, dafür eine deutlich höhere Renditeerwartung. Hybridprodukte teilen den Beitrag auf und sichern eine Teilgarantie ab. Als Faustregel gilt: Je länger die Laufzeit, desto weniger brauchst du Garantien und desto teurer werden sie dich in Form entgangener Rendite zu stehen kommen. Bei mehr als 20 Jahren Anlagehorizont ist eine Fondspolice mit breit gestreuten ETFs in aller Regel die wirtschaftlichere Wahl.' },
        { title: 'Der Rentenfaktor entscheidet, was am Ende ankommt', body: 'Der Rentenfaktor gibt an, wie viel monatliche Rente du je 10.000 Euro Kapital erhältst. Er ist die wichtigste und zugleich am häufigsten übersehene Kennzahl. Zwei Verträge mit identischem Endkapital können sich in der monatlichen Rente um 20 Prozent unterscheiden – allein wegen des Rentenfaktors. Entscheidend ist, ob er garantiert ist oder nur als aktueller, unverbindlicher Wert ausgewiesen wird. Achte außerdem auf die Treueregelung: Gute Verträge garantieren, dass der bei Rentenbeginn gültige Faktor angewendet wird, wenn er höher ist als der ursprünglich garantierte.' },
        { title: 'Der Steuervorteil der 12-62-Regel', body: 'Läuft dein Vertrag mindestens zwölf Jahre und erfolgt die Auszahlung frühestens mit 62, wird bei einer Kapitalauszahlung nur die Hälfte des Ertrags mit deinem persönlichen Steuersatz belastet. Bei einer lebenslangen Verrentung ist es noch günstiger: Dann versteuerst du nur den Ertragsanteil, der bei Rentenbeginn mit 67 lediglich 17 Prozent der Rente beträgt. Im Vergleich zum Depot, wo jeder Ertrag der Abgeltungsteuer unterliegt und die Vorabpauschale schon während der Ansparphase greift, ist das über lange Laufzeiten ein erheblicher Vorteil – vorausgesetzt, die Produktkosten fressen ihn nicht wieder auf.' },
        { title: 'Fondspolice oder ETF-Depot – der ehrliche Vergleich', body: 'Das Depot gewinnt bei den laufenden Kosten, die Police bei der Besteuerung und beim steuerfreien Umschichten. Wer 30 Jahre lang stur denselben Welt-ETF bespart und im Alter langsam entnimmt, fährt mit dem Depot meist günstiger. Wer die Fondsauswahl über die Jahre anpassen will, wer im Alter eine planbare lebenslange Rente statt eines Entnahmeplans möchte oder wer einen hohen Grenzsteuersatz hat, kann mit einer kostengünstigen Nettopolice besser dastehen. Es gibt keinen pauschalen Sieger – es gibt nur eine Rechnung mit deinen Zahlen. Wir stellen beide Varianten mit identischen Annahmen nebeneinander, inklusive aller Kosten und Steuern.' },
        { title: 'Flexibilität: das unterschätzte Kriterium', body: 'Ein Vertrag über 35 Jahre muss Lebensveränderungen aushalten. Prüfe, ob du Beiträge pausieren, reduzieren oder erhöhen kannst, ohne dass Stornokosten anfallen. Ob Zuzahlungen möglich sind, um Bonuszahlungen oder Erbschaften einzubringen. Ob Teilentnahmen vor Rentenbeginn erlaubt sind. Und ob du den Rentenbeginn flexibel vorziehen oder verschieben kannst. Gerade Verträge mit hohen Abschlusskosten in den ersten fünf Jahren bestrafen jede Änderung – Nettotarife ohne Abschlussprovision sind hier deutlich beweglicher.' },
      ],
    },
    checklist: {
      heading: 'Renten-Check: 7 Punkte, bevor du einen Vertrag unterschreibst',
      items: [
        'Ist der Rentenfaktor garantiert – und wie hoch ist er im Marktvergleich?',
        'Wie hoch ist die Effektivkostenquote laut Produktinformationsblatt?',
        'Welche Fonds stehen zur Auswahl, und sind kostengünstige ETFs dabei?',
        'Sind Zuzahlungen, Entnahmen und Beitragspausen kostenfrei möglich?',
        'Was passiert im Todesfall vor und nach Rentenbeginn?',
        'Erfüllt der Vertrag die 12-62-Regel für die steuerbegünstigte Auszahlung?',
        'Kannst du zwischen Kapitalauszahlung und lebenslanger Rente frei wählen?',
      ],
    },
    leadMagnet: {
      title: 'Die große Altersvorsorge-Übersicht',
      subtitle: 'Alle Vorsorgewege im Vergleich, die Förderungen mit konkreten Zahlen, eine Anleitung zur Berechnung deiner Rentenlücke und die Kostenfallen, die dich am meisten kosten.',
      bullets: [
        'Private Rente, Riester, Rürup und bAV im direkten Vergleich',
        'Rentenlücke berechnen – Schritt für Schritt mit Rechenbeispiel',
        'Rentenfaktor und Effektivkosten: die zwei Kennzahlen, die zählen',
        'Fondspolice oder ETF-Depot: die Entscheidungshilfe',
      ],
      href: '/guides/altersvorsorge-uebersicht',
      fileLabel: 'Altersvorsorge-Übersicht',
    },
    category: 'Versicherungen', title: 'Private Rentenversicherung',
    hook: 'Die gesetzliche Rente wird nicht reichen. Das ist keine Meinung – das sind Zahlen.',
    intro: 'Das Rentenniveau sinkt seit Jahren. Wer heute 40 ist, kann im Alter nur noch mit etwa 48 % seines letzten Nettogehalts als staatlicher Rente rechnen. Die Lücke musst du selbst schließen – mit dem richtigen Produkt.',
    stats: [
      { value: '48 %', label: 'Rentenniveau – Prognose 2040' },
      { value: '∅ 978 €', label: 'monatliche Nettorente (2023)' },
      { value: '~500 €', label: 'monatliche Rentenlücke im Schnitt' },
      { value: '175 €', label: 'Riester-Grundzulage p.a.' },
    ],
    comparison: {
      heading: 'Welche Vorsorge passt zu dir?',
      left: { label: 'Staatlich gefördert (Riester / Rürup)', points: [
        { text: 'Staatliche Zulagen & Steuervorteile', pos: true },
        { text: 'Riester: ideal für Angestellte mit Kindern', pos: true },
        { text: 'Rürup: ideal für Selbstständige', pos: true },
        { text: 'Lebenslange Rentenzahlung garantiert', pos: true },
        { text: 'Weniger flexibel bei Kapitalauszahlung', pos: false },
      ]},
      right: { label: 'Private Rente / Fondspolice', points: [
        { text: 'Maximale Flexibilität & Verfügbarkeit', pos: true },
        { text: 'Höhere Renditechancen durch Fonds/ETFs', pos: true },
        { text: 'Auszahlung als Einmalbetrag möglich', pos: true },
        { text: 'Steueroptimiert in der Rentenphase', pos: true },
        { text: 'Keine staatliche Förderung', pos: false },
      ]},
    },
    types: [
      { title: 'Riester-Rente', desc: 'Mit staatlichen Zulagen (175 € Grundzulage, bis zu 300 € Kinderzulage) und Steuervorteilen. Ideal für Angestellte mit Kindern.', tag: 'Für Angestellte' },
      { title: 'Rürup-Rente (Basisrente)', desc: 'Steuerlich hochattraktiv, besonders für Selbstständige. Beiträge bis zu 27.566 € (2024) jährlich steuerlich absetzbar.', tag: 'Für Selbstständige' },
      { title: 'Betriebliche Altersvorsorge (bAV)', desc: 'Arbeitgeber zahlt mit. Beiträge direkt vom Bruttolohn – steuer- und sozialabgabenfrei. Seit 2019 muss der Arbeitgeber 15 % zuschießen.', tag: 'Mit Arbeitgeberbeteiligung' },
      { title: 'Private Rentenversicherung / ETF-Police', desc: 'Maximale Flexibilität, hohe Renditechancen. Keine staatliche Förderung, aber freie Gestaltung von Laufzeit und Auszahlung.', tag: 'Flexibel' },
    ],
    problems: [
      'Das Rentenniveau sinkt seit Jahren – wer heute 40 ist, bekommt im Alter deutlich weniger als erwartet.',
      'Wer zu spät anfängt, zahlt doppelt so viel für dasselbe Ergebnis.',
      'Staatliche Förderungen wie Riester, Rürup oder bAV werden massiv unterschätzt und nicht genutzt.',
    ],
    solution: 'Wir berechnen deine persönliche Rentenlücke und finden das Vorsorgemodell, das sich für dich wirklich rechnet – steueroptimiert, mit staatlicher Förderung und passend zu deiner Lebenssituation.',
    cta: 'Rentenlücke jetzt berechnen',
    faq: [
      { q: 'Mit welchem Alter sollte ich anfangen?', a: 'So früh wie möglich. Mit 25 Jahren reichen bereits 100 € monatlich für eine ordentliche Zusatzrente. Mit 45 müsstest du über 300 € einzahlen für dasselbe Ergebnis.' },
      { q: 'Ist Riester noch sinnvoll?', a: 'Ja – besonders für Familien mit Kindern oder wenn dein Steuersatz im Alter geringer ist als heute. Wir rechnen es konkret für dich durch.' },
      { q: 'Was ist die betriebliche Altersvorsorge (bAV)?', a: 'Du wandelst Teile deines Bruttolohns in Altersvorsorge um – steuer- und sozialabgabenfrei bis zu 3.624 € p.a. Dein Arbeitgeber muss seit 2019 15 % als Zuschuss zahlen.' },
    ],
  },

  hinterbliebene: {
    category: 'Versicherungen', title: 'Hinterbliebenenvorsorge',
    hook: 'Was passiert mit deiner Familie, wenn du morgen nicht mehr da bist? Bist du sicher, dass sie ohne dich auskommt?',
    intro: 'Der Gedanke ist unangenehm, aber unvermeidbar. Wer anderen Menschen gegenüber finanzielle Verantwortung trägt, muss sie auch im schlimmsten Fall absichern. Wir helfen dir, das lückenlos zu tun.',
    stats: [
      { value: '∅ 200.000 €', label: 'empfohlene Deckungssumme Risikoleben' },
      { value: '25 %', label: 'gesetzliche Witwen-/Witwerrente vom Rentenanspruch' },
      { value: '~10 €', label: 'monatlich – schon mit 30 Jahren' },
      { value: '48h', label: 'schnelle Auszahlung im Todesfall' },
    ],
    types: [
      { title: 'Risikolebensversicherung', desc: 'Zahlt eine festgelegte Summe im Todesfall. Günstig, einfach, effektiv – besonders wichtig bei Krediten, Immobilien oder kleinen Kindern.', tag: 'Empfohlen' },
      { title: 'Sterbegeldversicherung', desc: 'Deckt die Bestattungskosten ab (∅ 8.000–15.000 €). Sinnvoll für Ältere ohne große Ersparnisse, die Angehörige nicht belasten möchten.', tag: 'Für Ältere' },
      { title: 'Hinterbliebenenrente (privat)', desc: 'Zahlt deiner Familie monatlich eine Rente statt einer Einmalsumme. Sinnvoll, wenn dein Partner keine eigene Altersvorsorge hat.', tag: 'Langfristiger Schutz' },
    ],
    problems: [
      'Die gesetzliche Witwen- und Waisenrente deckt nur einen Bruchteil des tatsächlichen Bedarfs.',
      'Kredite, Miete und Lebenshaltungskosten laufen weiter – auch ohne dein Einkommen.',
      'Viele schieben das Thema auf – und hinterlassen ihre Familie ungeschützt.',
    ],
    solution: 'Wir sichern deine Familie mit dem richtigen Produkt ab – Risikolebensversicherung, Sterbegeldversicherung oder Hinterbliebenenrente. Günstig abgeschlossen, schnell wirksam.',
    cta: 'Familie jetzt absichern',
    faq: [
      { q: 'Wie hoch sollte die Risikolebensversicherung sein?', a: 'Als Faustregel: 3–5 Jahreseinkommen. Bei laufenden Krediten mindestens die Restschuld. Wir berechnen den genauen Bedarf für dich.' },
      { q: 'Brauche ich eine Risikoleben ohne Kinder?', a: 'Wenn dein Partner finanziell von dir abhängig ist oder ihr gemeinsame Kredite habt, ja. Ansonsten ist der Bedarf individuell zu prüfen.' },
      { q: 'Was kostet eine Risikolebensversicherung?', a: 'Für 300.000 € Deckungssumme mit 25 Jahren zahlen gesunde Menschen oft unter 15 € monatlich. Der Beitrag hängt von Alter, Gesundheit und Laufzeit ab.' },
    ],
  },
  immobilien: {
    category: 'Vermögensaufbau', title: 'Immobilien',
    hook: 'Immobilien machen reich – aber nur, wenn man weiß, welche man kauft, wo man finanziert und wann man einsteigt.',
    intro: 'Immobilien sind eine der kraftvollsten Formen des Vermögensaufbaus. Du investierst Fremdkapital, das andere (deine Mieter) für dich zurückzahlen. Mit dem richtigen Objekt und der richtigen Finanzierung baust du Vermögen, ohne alles aus eigener Tasche zu stemmen.',
    stats: [
      { value: '500+', label: 'Bankpartner für beste Konditionen' },
      { value: '∅ 3 %', label: 'Mietrendite in deutschen Städten' },
      { value: '110 %', label: 'Finanzierung möglich (ohne Eigenkapital)' },
      { value: '14+', label: 'Jahre Erfahrung im Immobilienbereich' },
    ],
    comparison: {
      heading: 'Immobilie kaufen vs. weiter mieten',
      left: { label: 'Weiter mieten', points: [
        { text: 'Flexibel und kurzfristig kündbar', pos: true },
        { text: 'Mietzahlung baut kein Vermögen auf', pos: false },
        { text: 'Miete steigt regelmäßig', pos: false },
        { text: 'Kein Inflationsschutz', pos: false },
        { text: 'Keine steuerlichen Vorteile', pos: false },
      ]},
      right: { label: 'Immobilie kaufen / investieren', points: [
        { text: 'Vermögensaufbau mit Fremdkapital', pos: true },
        { text: 'Inflationsschutz durch Sachwert', pos: true },
        { text: 'Steuerliche Absetzbarkeit (bei Vermietung)', pos: true },
        { text: 'Passives Einkommen durch Mieteinnahmen', pos: true },
        { text: 'Langfristige Vermögensbindung', pos: false },
      ]},
    },
    types: [
      { title: 'Eigentumswohnung zur Vermietung', desc: 'Klassischer Einstieg. Mieter zahlt die Finanzierung, du baust Eigenkapital auf. Oft mit 10–20 % Eigenkapital realisierbar.', tag: 'Einsteiger' },
      { title: 'Eigengenutzte Immobilie', desc: 'Du zahlst nicht mehr Miete, sondern tilgst – für dich selbst. Mietfreies Leben im Alter als Ziel.', tag: 'Selbstnutzung' },
      { title: 'Immobilienportfolio', desc: 'Mehrere Objekte für maximale Streuung und skaliertes passives Einkommen. Mit professioneller Begleitung realisierbar.', tag: 'Fortgeschrittene' },
    ],
    problems: [
      'Wer falsch finanziert, zahlt Zehntausende Euro zu viel über die gesamte Laufzeit.',
      'Die meisten kaufen emotional statt strategisch – und bereuen es.',
      'Ohne Marktzugang bekommst du nicht die besten Objekte und nicht die besten Konditionen.',
    ],
    solution: 'Wir begleiten dich beim Kauf der richtigen Immobilie – von der Objektanalyse über die Finanzierung bis zum Abschluss. Mit Zugang zu über 500 Banken sichern wir dir die besten Konditionen.',
    cta: 'Immobilienberatung starten',
    faq: [
      { q: 'Wie viel Eigenkapital brauche ich?', a: 'Idealerweise 20–30 % des Kaufpreises plus Kaufnebenkosten (ca. 10 %). In manchen Fällen ist auch eine 110 %-Finanzierung ohne Eigenkapital möglich.' },
      { q: 'Lohnt sich kaufen statt mieten noch?', a: 'Mit gesunkenen Zinsen und stabilen Preisen in vielen Regionen: ja. Entscheidend sind Standort, Mietrendite und deine Finanzierungskonditionen. Wir rechnen es durch.' },
      { q: 'Was kostet eure Immobilienberatung?', a: 'Für Käufer ist die Beratung kostenlos – wir werden durch die Finanzierung vergütet. Du profitierst trotzdem von unserem Vergleich über 100+ geprüfte Anbieter.' },
    ],
  },

  sparprodukte: {
    category: 'Vermögensaufbau', title: 'Sparprodukte',
    hook: 'Geld auf dem Girokonto zu lassen ist keine Strategie – es ist ein schleichender Vermögensverlust durch Inflation.',
    intro: 'Sparen ist wichtig. Aber wie und wo du sparst, macht einen gewaltigen Unterschied. Vom Tagesgeld bis zum Bausparvertrag – wir helfen dir, das Produkt zu finden, das wirklich zu deinen Zielen und deinem Zeithorizont passt.',
    stats: [
      { value: '∅ 2,8 %', label: 'Tagesgeldrendite (2024)' },
      { value: '26 %', label: 'Kaufkraftverlust bei 3 % Inflation in 10 Jahren' },
      { value: '100.000 €', label: 'Einlagensicherung pro Kunde pro Bank' },
      { value: '0 €', label: 'Mindestanlage beim Tagesgeld' },
    ],
    comparison: {
      heading: 'Sicherheit vs. Rendite: Was passt zu dir?',
      left: { label: 'Sichere Sparprodukte', points: [
        { text: 'Tagesgeld: 2–4 % Zinsen, täglich verfügbar', pos: true },
        { text: 'Festgeld: höhere Zinsen bei fester Laufzeit', pos: true },
        { text: 'Bausparvertrag: staatlich gefördert', pos: true },
        { text: 'Geringeres Renditepotenzial', pos: false },
        { text: 'Ideal für kurzfristige Ziele', pos: true },
      ]},
      right: { label: 'Renditeorientierte Alternativen', points: [
        { text: 'ETFs: ∅ 7–9 % p.a. historisch langfristig', pos: true },
        { text: 'Höhere Renditechancen', pos: true },
        { text: 'Kurzfristig schwankend (Marktrisiko)', pos: false },
        { text: 'Ideal für langfristige Ziele (5+ Jahre)', pos: true },
        { text: 'Steuerliche Freibeträge nutzbar', pos: true },
      ]},
    },
    types: [
      { title: 'Tagesgeld', desc: 'Täglich verfügbar, aktuell mit 2–4 % verzinst. Ideal als Notgroschen (3–6 Monatsgehälter) und für kurzfristige Ziele.', tag: 'Notgroschen' },
      { title: 'Festgeld', desc: 'Höhere Zinsen als Tagesgeld für eine feste Laufzeit (3 Monate bis 5 Jahre). Ideal für Geld, das du nicht sofort brauchst.', tag: 'Kurzfristig' },
      { title: 'Bausparvertrag', desc: 'Staatlich gefördert durch Wohnungsbauprämie. Sichert dir heute einen festen Zinssatz für eine zukünftige Baufinanzierung.', tag: 'Für Eigenheim-Planer' },
    ],
    problems: [
      'Inflation frisst dein Erspartes auf – 3 % Inflation bedeuten in 10 Jahren 26 % weniger Kaufkraft.',
      'Die meisten Sparer nutzen Produkte, die sich für die Bank rechnen – nicht für sie.',
      'Ohne Struktur bleibt Sparen zufällig und ineffizient – kein Notgroschen, keine Strategie.',
    ],
    solution: 'Wir strukturieren dein Sparverhalten mit den richtigen Produkten – von Tagesgeld bis Bausparvertrag – passend zu deinen Zielen. Kurzfristig verfügbar, mittelfristig verzinst, langfristig renditeorientiert.',
    cta: 'Sparstrategie entwickeln',
    faq: [
      { q: 'Wie viel Notgroschen sollte ich haben?', a: '3–6 Monatsnettogehälter als Rücklage auf einem gut verzinsten Tagesgeldkonto. Danach beginnt der sinnvolle Aufbau von Renditeportfolios.' },
      { q: 'Ist ein Bausparvertrag noch sinnvoll?', a: 'Wenn du in den nächsten 7–15 Jahren eine Immobilie kaufen oder sanieren möchtest – ja. Der garantierte Kreditzins wird durch die Wohnungsbauprämie staatlich gefördert.' },
      { q: 'Wie vergleiche ich Tagesgeldkonten?', a: 'Wir übernehmen das für dich. Aktuell gibt es teils erhebliche Unterschiede im Zinssatz – und wechseln lohnt sich fast immer.' },
    ],
  },

  geldanlagen: {
    category: 'Vermögensaufbau', title: 'Geldanlagen',
    hook: 'Wer sein Geld nicht für sich arbeiten lässt, arbeitet sein Leben lang für Geld.',
    intro: 'ETFs, Fonds, Anleihen – der Kapitalmarkt bietet viele Möglichkeiten. Entscheidend ist eine wissenschaftlich fundierte Strategie, konsequente Diversifikation und das Vermeiden emotionaler Fehler. Wir begleiten dich dabei.',
    stats: [
      { value: '∅ 8 %', label: 'globaler ETF-Ertrag p.a. (MSCI World, langfristig)' },
      { value: '10 €', label: 'monatlich – so wenig genügt zum Starten' },
      { value: '2x', label: 'mehr Ertrag durch Zinseszins über 20 Jahre' },
      { value: '1.000 €', label: 'jährlicher Steuerfreibetrag Kapitalerträge' },
    ],
    comparison: {
      heading: 'ETFs vs. aktiv gemanagte Fonds',
      left: { label: 'ETFs (passiv)', points: [
        { text: 'Niedrige Kosten (∅ 0,2 % TER)', pos: true },
        { text: 'Breite Diversifikation (1.600+ Unternehmen)', pos: true },
        { text: 'Wissenschaftlich empfohlen', pos: true },
        { text: 'Kein Fondsmanager-Risiko', pos: true },
        { text: 'Marktrendite, kein Alpha-Anspruch', pos: false },
      ]},
      right: { label: 'Aktiv gemanagte Fonds', points: [
        { text: 'Höhere Kosten (∅ 1,5–2 % TER)', pos: false },
        { text: 'Ziel: Markt schlagen', pos: true },
        { text: 'Nur ~15 % schlagen langfristig den Index', pos: false },
        { text: 'Abhängig vom Fondsmanager', pos: false },
        { text: 'Potenzial für überdurchschnittliche Renditen', pos: true },
      ]},
    },
    types: [
      { title: 'ETF-Sparplan', desc: 'Monatlich automatisch in globale Aktienindizes investieren. Günstig, diversifiziert, wissenschaftlich empfohlen. Ideal für den langfristigen Vermögensaufbau.', tag: 'Empfohlen' },
      { title: 'Fondsvermögensverwaltung', desc: 'Professionell verwaltetes Portfolio für größere Beträge. Vollautomatische Anpassung, Steueroptimierung und aktives Risikomanagement.', tag: 'Ab 25.000 €' },
      { title: 'Anleihen & Mischfonds', desc: 'Für konservativere Anleger: mehr Stabilität, weniger Renditeschwankungen. Gut als Beimischung in der Nähe des Ruhestands.', tag: 'Konservativ' },
    ],
    problems: [
      'Die meisten legen ihr Geld zu konservativ an und verlieren real an Wert.',
      'Ohne Strategie und Diversifikation ist jede Geldanlage ein Glücksspiel.',
      'Banken empfehlen oft die Produkte, die ihnen am meisten einbringen – nicht die, die dir am meisten nützen.',
    ],
    solution: 'Wir entwickeln eine wissenschaftlich fundierte Anlagestrategie mit ETFs und Fonds – kundenorientiert, auf dich zugeschnitten und ohne Provisionsinteressen. Langfristig, diversifiziert und steueroptimiert.',
    cta: 'Anlagestrategie erstellen',
    faq: [
      { q: 'Wie viel Geld brauche ich, um anzufangen?', a: 'Schon ab 10–25 € monatlich kannst du mit einem ETF-Sparplan starten. Wichtig ist der frühe Beginn, nicht die Höhe der ersten Einzahlung.' },
      { q: 'Ist der aktuelle Zeitpunkt gut zum Investieren?', a: 'Langfristig spielt der Einstiegszeitpunkt eine untergeordnete Rolle. Regelmäßiges Investieren (Cost-Average-Effekt) ist besser als auf den perfekten Moment zu warten.' },
      { q: 'Was passiert, wenn der Markt einbricht?', a: 'Kurzfristige Korrekturen sind normal. Historisch hat sich der Markt immer erholt. Wer in der Krise verkauft, realisiert Verluste.' },
      { q: 'Welcher ETF ist der beste?', a: 'Das hängt von Zeithorizont, Risikobereitschaft und Zielen ab. Wir erstellen dir ein konkretes Portfolio – kostenlos und unverbindlich.' },
    ],
  },

  vorsorge: {
    deepDive: {
      heading: 'Altersvorsorge im Detail: Die drei Schichten und was sie dir wirklich bringen',
      sections: [
        { title: 'Schicht 1 – Basisversorgung: gesetzliche Rente und Rürup', body: 'Die erste Schicht umfasst die gesetzliche Rentenversicherung, Versorgungswerke und die Rürup- oder Basisrente. Gemeinsames Merkmal: hohe steuerliche Absetzbarkeit in der Ansparphase, dafür strenge Regeln in der Auszahlung. Rürup-Beiträge sind bis zum Höchstbetrag als Sonderausgaben absetzbar, was besonders für Selbstständige mit hoher Steuerlast attraktiv ist – bei einem Grenzsteuersatz von 42 Prozent finanziert der Staat einen erheblichen Teil des Beitrags mit. Der Preis dafür: Das Kapital ist nicht kündbar, nicht beleihbar, nicht vererbbar an beliebige Personen und wird ausschließlich als lebenslange monatliche Rente ausgezahlt. Rürup ist damit ein exzellentes Steuersparinstrument und ein schlechtes Flexibilitätsinstrument.' },
        { title: 'Schicht 2 – Geförderte Zusatzvorsorge: Riester und betriebliche Altersvorsorge', body: 'Riester lebt von den Zulagen: Grundzulage pro Person und Kinderzulage pro Kind, solange mindestens vier Prozent des Vorjahresbruttos eingezahlt werden. Für Familien mit mehreren Kindern und mittlerem Einkommen ist die Förderquote dadurch außergewöhnlich hoch – teilweise finanziert der Staat mehr als die Hälfte der Einzahlung. Für kinderlose Gutverdiener fällt die Rechnung dagegen oft nüchtern aus. Die betriebliche Altersvorsorge wiederum profitiert doppelt: Die Beiträge gehen aus dem Bruttogehalt, sparen also Steuern und Sozialabgaben, und der Arbeitgeber muss mindestens 15 Prozent Zuschuss leisten – viele zahlen freiwillig deutlich mehr. Entscheidend ist, ob dein Arbeitgeber einen guten Rahmenvertrag hat und wie die Verrentung im Alter kalkuliert wird.' },
        { title: 'Schicht 3 – Private Vorsorge: Fondspolice und ETF-Depot', body: 'Die dritte Schicht ist die flexibelste. Hier zählt vor allem, wie viel von der Rendite nach Kosten und Steuern bei dir ankommt. Ein ETF-Sparplan im Depot ist günstig und jederzeit verfügbar, wird aber laufend über die Abgeltungsteuer und die Vorabpauschale besteuert und jedes Umschichten löst Steuer aus. Eine Fondspolice kostet mehr im laufenden Betrieb, erlaubt dafür steuerfreies Umschichten innerhalb des Vertrags und wird bei Auszahlung nach dem 62. Lebensjahr und mindestens zwölf Jahren Laufzeit nur zur Hälfte des Ertrags mit dem persönlichen Steuersatz belastet. Welche Variante gewinnt, hängt von Anlagehorizont, Umschichtungsverhalten und Steuersatz ab – das lässt sich ausrechnen, und genau das tun wir.' },
        { title: 'Nachgelagerte Besteuerung: der Punkt, den fast alle übersehen', body: 'Fast jede geförderte Vorsorge verschiebt die Steuer in die Zukunft: Du sparst heute Steuern und versteuerst später die Rente. Das rechnet sich, solange dein Steuersatz im Alter niedriger liegt als heute – bei den meisten ist das der Fall, aber eben nicht bei allen. Wer im Ruhestand hohe Mieteinnahmen, mehrere Renten oder Kapitalerträge hat, kann im Alter in einer ähnlichen Progression landen wie im Berufsleben. Dazu kommen Kranken- und Pflegeversicherungsbeiträge, die auf Betriebsrenten in voller Höhe anfallen. Eine ehrliche Vorsorgeplanung rechnet deshalb nicht nur die Einzahlphase, sondern die Auszahlphase mit durch.' },
        { title: 'Kosten sind die stille Rendite-Bremse', body: 'Ein Prozentpunkt laufende Kosten pro Jahr kostet dich über 35 Jahre grob ein Viertel deines Endkapitals. Bei Vorsorgeprodukten verstecken sich Kosten an mehreren Stellen: Abschluss- und Vertriebskosten, Verwaltungskosten auf den Beitrag, Kosten auf das Fondsguthaben, Fondskosten selbst und teilweise Stückkosten. Die entscheidende Kennzahl ist die Effektivkostenquote, die alle Kosten in eine jährliche Renditeminderung umrechnet und seit 2017 in jedem Produktinformationsblatt ausgewiesen werden muss. Wir vergleichen Angebote grundsätzlich über diese Kennzahl – sie macht Produkte vergleichbar, die auf dem Papier völlig verschieden aussehen.' },
        { title: 'Wie viel musst du eigentlich sparen?', body: 'Der Ausgangspunkt ist nicht das Produkt, sondern die Lücke. Nimm dein heutiges Nettoeinkommen, rechne mit rund 80 Prozent Bedarf im Alter, ziehe deine prognostizierte gesetzliche Rente laut Renteninformation ab und rechne die verbleibende Differenz mit der Inflation bis zum Rentenbeginn hoch. Aus dieser inflationsbereinigten Lücke ergibt sich das benötigte Kapital – und daraus die monatliche Sparrate. Erst danach stellt sich die Frage, über welche Schicht und welches Produkt diese Sparrate am effizientesten läuft. Genau in dieser Reihenfolge arbeiten wir: Bedarf, Lücke, Sparrate, Produkt. Nicht umgekehrt.' },
      ],
    },
    checklist: {
      heading: 'Vorsorge-Check: 8 Punkte, bevor du irgendetwas unterschreibst',
      intro: 'Diese Fragen sollte jedes Vorsorgeangebot beantworten können – wenn nicht, ist es kein gutes Angebot.',
      items: [
        'Wie hoch ist deine tatsächliche Rentenlücke, inflationsbereinigt bis zum Rentenbeginn?',
        'Wie hoch ist die Effektivkostenquote des Produkts – und wie schneidet sie im Marktvergleich ab?',
        'Welche staatliche Förderung steht dir konkret zu, und wird sie voll ausgeschöpft?',
        'Wie flexibel sind Beitragspausen, Zuzahlungen und Entnahmen?',
        'Was passiert im Todesfall vor Rentenbeginn – und danach?',
        'Wie wird die Auszahlung besteuert, und welche Sozialabgaben fallen an?',
        'Ist der Rentenfaktor garantiert oder nur unverbindlich kalkuliert?',
        'Kannst du die Fondsauswahl innerhalb des Vertrags kostenfrei anpassen?',
      ],
    },
    leadMagnet: {
      title: 'Die große Altersvorsorge-Übersicht',
      subtitle: 'Alle drei Schichten der Altersvorsorge im Vergleich, die Förderungen mit konkreten Zahlen, eine Anleitung zur Berechnung deiner Rentenlücke und die Kostenfallen, die dich am meisten kosten.',
      bullets: [
        'Riester, Rürup, bAV und private Vorsorge im direkten Vergleich',
        'Rentenlücke berechnen – Schritt für Schritt mit Rechenbeispiel',
        'Effektivkosten verstehen: die eine Kennzahl, die wirklich zählt',
        'Die 8-Punkte-Checkliste vor jedem Abschluss',
      ],
      href: '/guides/altersvorsorge-uebersicht',
      fileLabel: 'Altersvorsorge-Übersicht',
    },
    category: 'Vermögensaufbau', title: 'Vorsorgekonzepte',
    hook: 'Die Rentenlücke ist real. Und je später du handelst, desto teurer wird es.',
    intro: 'Viele unterschätzen, wie viel Geld sie im Alter wirklich brauchen. Gleichzeitig werden staatliche Förderungen kaum genutzt. Wir entwickeln dein persönliches Vorsorgekonzept – mit allem, was der Staat dir bietet.',
    stats: [
      { value: '~500 €', label: 'monatliche Rentenlücke im Schnitt' },
      { value: '27.566 €', label: 'steuerlich absetzbar per Rürup (2024)' },
      { value: '300 €', label: 'Riester-Kinderzulage pro Kind (ab 2008)' },
      { value: '15 %', label: 'Pflicht-Arbeitgeberzuschuss bei bAV' },
    ],
    comparison: {
      heading: 'Staatlich geförderte Vorsorge im Vergleich',
      left: { label: 'Riester-Rente', points: [
        { text: '175 € Grundzulage p.a.', pos: true },
        { text: 'Bis zu 300 € je Kind (ab 2008 geboren)', pos: true },
        { text: 'Für rentenversicherungspflichtige Angestellte', pos: true },
        { text: 'Im Alter vollständig zu versteuern', pos: false },
        { text: 'Staatliche Garantie der Einzahlungen', pos: true },
      ]},
      right: { label: 'Rürup-Rente (Basisrente)', points: [
        { text: 'Bis zu 27.566 € jährlich absetzbar (2024)', pos: true },
        { text: 'Ideal für Selbstständige & Gutverdiener', pos: true },
        { text: 'Nicht kapitalisierbar oder übertragbar', pos: false },
        { text: 'Im Alter nachgelagert zu versteuern', pos: false },
        { text: 'Pfändungssicher', pos: true },
      ]},
    },
    types: [
      { title: 'Riester-Rente', desc: 'Mit staatlichen Zulagen. Ideal für Angestellte, besonders mit Kindern. Steuerlich absetzbar als Sonderausgabe.', tag: 'Für Angestellte' },
      { title: 'Rürup-Rente', desc: 'Für Selbstständige und Gutverdienende. Hohe steuerliche Absetzbarkeit, lebenslange Rente, pfändungssicher.', tag: 'Für Selbstständige' },
      { title: 'Betriebliche Altersvorsorge (bAV)', desc: 'Beiträge steuer- und sozialabgabenfrei bis zur Grenze. Arbeitgeber muss seit 2019 mindestens 15 % zuschießen.', tag: 'Arbeitgeberbeteiligung' },
      { title: 'Private Fondspolice', desc: 'Ohne staatliche Förderung, aber maximale Flexibilität. Renditeorientiert über ETFs, steueroptimiert in der Auszahlphase.', tag: 'Flexibel' },
    ],
    problems: [
      'Viele unterschätzen, wie viel Geld sie im Alter tatsächlich brauchen werden.',
      'Staatliche Förderungen wie Riester, Rürup oder bAV werden massiv unterschätzt.',
      'Ohne ganzheitliches Konzept verlierst du bares Geld durch Steuern, Gebühren und falsche Produkte.',
    ],
    solution: 'Wir erstellen dein persönliches Vorsorgekonzept – mit allen staatlichen Förderungen, steueroptimiert und auf deine Ziele ausgerichtet. Wir zeigen dir genau, was du heute tun musst, um morgen sorgenfrei zu leben.',
    cta: 'Vorsorgekonzept erstellen lassen',
    faq: [
      { q: 'Wie hoch ist meine Rentenlücke?', a: 'Das hängt von deinem Rentenanspruch, deinem gewünschten Lebensstandard im Alter und deiner Lebenserwartung ab. Wir berechnen sie kostenlos für dich.' },
      { q: 'Lohnt sich Riester noch?', a: 'Ja – besonders wenn du Kinder hast oder einen niedrigen Steuersatz im Alter erwartest. Mit Kindern kann die staatliche Förderung erheblich sein.' },
      { q: 'Muss ich bAV nutzen?', a: 'Kein Muss – aber sinnvoll. Durch die Entgeltumwandlung zahlst du weniger Steuern und Sozialabgaben, und dein Arbeitgeber muss mindestens 15 % dazugeben.' },
    ],
  },

  finanzierungen: {
    category: 'Vermögensaufbau', title: 'Finanzierungen',
    hook: 'Der Unterschied zwischen einer guten und einer schlechten Finanzierung kann dich leicht 50.000 € kosten.',
    intro: 'Ob Immobilie, Fahrzeug oder Unternehmensinvestition – eine Finanzierung ist sinnvoll, wenn das Kapital produktiv arbeitet. Wir vergleichen für dich über 500 Banken und holen das beste Angebot heraus.',
    stats: [
      { value: '500+', label: 'Bankpartner im Vergleich' },
      { value: '~2.500 €', label: 'Ersparnis pro 0,1 % Zinsvorteil über 20 Jahre' },
      { value: '∅ 2 %', label: 'niedrigere Zinsen durch Vergleich' },
      { value: '48h', label: 'Kreditentscheidung möglich' },
    ],
    comparison: {
      heading: 'Hausbank vs. Vergleich über 500+ Banken',
      left: { label: 'Direktfinanzierung bei der Hausbank', points: [
        { text: 'Nur ein Angebot zum Vergleich', pos: false },
        { text: 'Oft höhere Zinsen ohne Gegendruck', pos: false },
        { text: 'Bekannte Ansprechpartner vor Ort', pos: true },
        { text: 'Keine Markttransparenz', pos: false },
        { text: 'Schnelle Entscheidung möglich', pos: true },
      ]},
      right: { label: 'Vergleich über DK', points: [
        { text: 'Vergleich von 500+ Banken', pos: true },
        { text: 'Durchschnittlich 0,2–0,5 % besserer Zins', pos: true },
        { text: 'Ein Ansprechpartner, alle Angebote', pos: true },
        { text: 'Volle Markttransparenz', pos: true },
        { text: 'Komplett kostenlos für dich', pos: true },
      ]},
    },
    types: [
      { title: 'Immobilienfinanzierung', desc: 'Kauf, Bau oder Anschlussfinanzierung. Wir vergleichen über 500 Banken für alle Objekttypen und holen die besten Konditionen heraus.', tag: 'Immobilien' },
      { title: 'Konsumentenkredit', desc: 'Für Fahrzeuge, Renovierungen oder größere Anschaffungen. Schnell, unkompliziert und deutlich günstiger als bei der Hausbank.', tag: 'Schnell' },
      { title: 'Unternehmensfinanzierung', desc: 'Investitionskredite, Betriebsmittellinien, KfW-Förderkredite – wir finden die richtige Finanzierungsstruktur für dein Unternehmen.', tag: 'Für Unternehmen' },
    ],
    problems: [
      'Wer nur bei seiner Hausbank fragt, bekommt selten das beste Angebot.',
      'Kleine Unterschiede im Zinssatz machen über 20 Jahre einen riesigen Unterschied.',
      'Ohne Vergleich bezahlst du zu viel – oft ohne es zu merken.',
    ],
    solution: 'Wir vergleichen für dich über 500 Banken und Finanzierungspartner – kostenlos und vollständig digital. Ein einziger Antrag, das beste Ergebnis.',
    cta: 'Jetzt Finanzierung vergleichen',
    faq: [
      { q: 'Was kostet eure Finanzierungsvermittlung?', a: 'Für dich gar nichts. Wir werden von der finanzierenden Bank vergütet – das ändert aber nichts daran, dass wir für dich das beste Angebot am Markt suchen.' },
      { q: 'Wie viel Eigenkapital brauche ich?', a: 'Empfohlen: 20–30 % des Kaufpreises plus Kaufnebenkosten. In Einzelfällen sind auch Vollfinanzierungen möglich – wir prüfen deine Situation.' },
      { q: 'Wann ist der richtige Zeitpunkt für eine Anschlussfinanzierung?', a: 'Am besten 12–18 Monate vor Ablauf deiner Zinsbindung. So hast du Zeit, den Markt zu vergleichen und die besten Konditionen zu sichern.' },
    ],
  },

  aktien: {
    category: 'Vermögensaufbau', title: 'Aktien',
    hook: 'Die reichsten Menschen der Welt haben eines gemeinsam: Sie besitzen Unternehmensanteile. Du auch?',
    intro: 'Aktien sind keine Spekulation – sie sind Eigentumsanteile an Unternehmen. Wer mit Strategie investiert, langfristig denkt und breit diversifiziert, nutzt die kraftvollste Renditemachine der Geschichte.',
    stats: [
      { value: '∅ 10 %', label: 'MSCI World Rendite p.a. (50 Jahre)' },
      { value: '174.000 €', label: '10.000 € werden nach 30 Jahren daraus' },
      { value: '1.600+', label: 'Unternehmen im MSCI World' },
      { value: '1.000 €', label: 'jährlicher Steuerfreibetrag Kapitalerträge' },
    ],
    comparison: {
      heading: 'Einzelaktien vs. ETFs',
      left: { label: 'Einzelaktien', points: [
        { text: 'Chance auf überdurchschnittliche Rendite', pos: true },
        { text: 'Hohes Einzelrisiko (Klumpenrisiko)', pos: false },
        { text: 'Aufwendige Unternehmensanalyse nötig', pos: false },
        { text: 'Emotionale Entscheidungen häufig', pos: false },
        { text: 'Für erfahrene Anleger geeignet', pos: true },
      ]},
      right: { label: 'ETFs (Indexfonds)', points: [
        { text: 'Breite Diversifikation mit einem Produkt', pos: true },
        { text: 'Niedrige Kosten (∅ 0,1–0,3 % p.a.)', pos: true },
        { text: 'Wissenschaftlich empfohlen', pos: true },
        { text: 'Kein Fondsmanager-Risiko', pos: true },
        { text: 'Auch für Einsteiger geeignet', pos: true },
      ]},
    },
    types: [
      { title: 'ETF-Sparplan', desc: 'Regelmäßig in globale Indizes investieren (z.B. MSCI World). Günstig, diversifiziert, automatisch. Ideal für den langfristigen Vermögensaufbau.', tag: 'Einsteiger & Fortgeschrittene' },
      { title: 'Einzelaktien-Depot', desc: 'Direkter Kauf von Unternehmensanteilen. Höheres Renditepotenzial bei höherem Risiko. Erfordert Analyse und Disziplin.', tag: 'Für Erfahrene' },
      { title: 'Dividendenstrategie', desc: 'Fokus auf dividendenstarke Unternehmen für passives Einkommen. Kombination aus Kursgewinnen und regelmäßigen Ausschüttungen.', tag: 'Passives Einkommen' },
    ],
    problems: [
      'Viele trauen sich nicht an Aktien – und verpassen die kraftvollste Form des Vermögensaufbaus.',
      'Ohne Strategie ist der Aktienmarkt ein Casino. Mit Strategie ist er eine Maschine.',
      'Wer zu spät einsteigt oder emotional handelt, verliert – systematisch.',
    ],
    solution: 'Wir begleiten dich beim Einstieg in den Kapitalmarkt – mit klarer Strategie, langfristiger Perspektive und wissenschaftlich belegten Ansätzen. Kein Rätselraten, keine Emotion.',
    cta: 'Kapitalmarkt-Beratung starten',
    faq: [
      { q: 'Ist jetzt ein guter Zeitpunkt zum Einstieg?', a: 'Langfristig spielt der Einstiegszeitpunkt eine untergeordnete Rolle. Regelmäßiges Investieren (Sparplan) ist besser als auf den perfekten Moment zu warten.' },
      { q: 'Wie hoch kann ich verlieren?', a: 'Bei breit diversifizierten ETFs ist ein Totalverlust historisch nicht vorgekommen. Kurzfristige Einbrüche von 30–50 % sind aber normal und kein Grund zur Panik.' },
      { q: 'Muss ich Steuern auf Kursgewinne zahlen?', a: '26,375 % Abgeltungssteuer auf realisierte Gewinne. Der jährliche Freibetrag beträgt 1.000 € (2.000 € für Ehepaare). Nicht realisierte Gewinne sind steuerfrei.' },
    ],
  },

  vwl: {
    category: 'Vermögensaufbau', title: 'Vermögenswirksame Leistungen',
    hook: 'Dein Arbeitgeber zahlt dir Geld für den Vermögensaufbau – und die meisten lassen es einfach verfallen.',
    intro: 'Vermögenswirksame Leistungen (VWL) sind Zuschüsse deines Arbeitgebers, die direkt in einen Anlagevertrag fließen – steuer- und sozialabgabenfrei. Mit dem richtigen Vertrag und staatlicher Förderung kannst du das Maximum herausholen.',
    stats: [
      { value: '40 €', label: 'maximaler Arbeitgeberzuschuss monatlich' },
      { value: '480 €', label: 'jährliche VWL – oft ungenutzt verfallend' },
      { value: '20 %', label: 'staatliche Arbeitnehmer-Sparzulage (Fonds)' },
      { value: '6 Jahre', label: 'typische Laufzeit mit Sperrfrist' },
    ],
    comparison: {
      heading: 'VWL: Banksparplan vs. Fondssparplan',
      left: { label: 'Banksparplan (klassisch)', points: [
        { text: 'Festes, oft sehr niedriges Zinsniveau', pos: false },
        { text: 'Keine staatliche Arbeitnehmer-Sparzulage', pos: false },
        { text: 'Kapitalgarantie', pos: true },
        { text: 'Kaum Rendite über Inflation', pos: false },
        { text: 'Einfach und verständlich', pos: true },
      ]},
      right: { label: 'Fondssparplan (empfohlen)', points: [
        { text: '20 % staatliche Sparzulage auf bis zu 400 €/Jahr', pos: true },
        { text: 'Höhere Renditechancen durch Fonds/ETFs', pos: true },
        { text: 'Langfristig deutlich mehr Vermögen', pos: true },
        { text: 'Kurzfristige Wertschwankungen möglich', pos: false },
        { text: 'Einkommensgrenze für Sparzulage beachten', pos: false },
      ]},
    },
    types: [
      { title: 'Fonds-VWL-Sparplan', desc: 'Empfehlung für alle, die die Einkommensgrenzen erfüllen. Arbeitgeberzuschuss + staatliche Sparzulage + Rendite durch Fonds/ETFs.', tag: 'Empfohlen' },
      { title: 'Bauspar-VWL', desc: 'VWL in einen Bausparvertrag. Staatlich gefördert durch Wohnungsbauprämie. Ideal, wenn du künftig Wohneigentum anstrebst.', tag: 'Für Eigenheim-Planer' },
      { title: 'Direkt-VWL (Bank)', desc: 'Einfachste Variante. Arbeitgeberzuschuss fließt auf ein verzinstes Konto. Wenig Renditechancen, aber einfach und sicher.', tag: 'Einfacher Einstieg' },
    ],
    problems: [
      'Viele Arbeitnehmer wissen nicht, dass ihr Arbeitgeber bis zu 40 € monatlich als VWL-Zuschuss zahlt – Geld, das einfach verfällt.',
      'Ohne den richtigen Anlagevertrag fließen VWL auf ein schlechtverzinstes Konto und verlieren real an Wert.',
      'Staatliche Arbeitnehmer-Sparzulage wird nicht beantragt, weil niemand über die Voraussetzungen informiert.',
    ],
    solution: 'Wir richten deinen VWL-Vertrag optimal ein – passend zu deinem Einkommen, deinen staatlichen Förderansprüchen und deiner langfristigen Anlagestrategie.',
    cta: 'VWL kostenlos optimieren',
    faq: [
      { q: 'Hat jeder Arbeitnehmer Anspruch auf VWL?', a: 'Nein – der Anspruch hängt vom Tarifvertrag oder Arbeitsvertrag ab. Frag deinen Arbeitgeber. Viele wissen nicht, ob sie VWL zahlen.' },
      { q: 'Wer hat Anspruch auf die Arbeitnehmer-Sparzulage?', a: 'Singles mit maximal 40.000 € zu versteuerndem Jahreseinkommen (Ehepaare 80.000 €) können 20 % staatliche Förderung auf Fonds-VWL erhalten.' },
      { q: 'Wie lange sind VWL-Verträge gesperrt?', a: 'Die Sperrfrist beträgt 6 Jahre beim Banksparplan bzw. 6+1 Jahre beim Bausparvertrag. Fonds-Sparpläne haben keine gesetzliche Sperrfrist.' },
    ],
  },
};
