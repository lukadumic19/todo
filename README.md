# Opgaver

Personligt arbejds-, dokumentations- og hukommelsessystem til Luka —
pædagogisk mellemleder på Havana.

Én HTML-fil, React via CDN, ingen build-step, ingen server. Al data ligger i
`localStorage` på telefonen. PWA, så den kan lægges på hjemmeskærmen på iPhone.

## Version 2

- **Fem registreringstyper** med hver sin faste formular: Opgave, Beslutning,
  Aftale, Note og Standard — plus Idé som hurtig "parkeret tanke".
- **Opgaver** har status (Ikke startet / I gang / Afventer / Færdig), deadline,
  prioritet og "På min liste i dag". Afventer kan angive hvem/hvad og
  opfølgningsdato. Færdige opgaver slettes aldrig automatisk — de flyttes til
  Afsluttet med dato.
- **Kategorier** er brugerdefinerede mapper: navn, farve, rækkefølge, opret og
  slet (kun tomme). Ét element hører altid til præcis én kategori.
- **Beslutninger og Aftaler** journaliseres og kan skabe opgaver — relationen
  bevares, så man altid kan se, hvorfor en opgave findes.
- **Standarder** har status (Kladde / Gældende / Udgået) og automatisk
  versionshistorik: Hver redigering bevarer den tidligere version, som kan
  åbnes skrivebeskyttet. Standarder kan ikke slettes.
- **Opfølgning** er en funktion, ikke en type: Alle elementer kan få en
  opfølgningsdato og dukker op på forsiden, når datoen nås.
- **Forsiden "I dag"** har et hero-kort med hilsen, dato og levende ur, valgfrit
  vejr (Open-Meteo, telefonens placering) og dagens status — derunder
  opfølgninger, Min dag og deadlines (7 dage frem).
- **Kalender** med to kalendere, Arbejde og Privat: månedsoversigt med
  farveprikker, dagsliste og egne begivenheder. Kalendere kan importeres fra
  .ics-filer (Google, iPhone, Outlook); en ny import af samme kalender
  erstatter de tidligere importerede begivenheder, mens egne begivenheder
  bevares. Deadlines, opfølgninger og aftaler fra systemet vises automatisk
  i kalenderen.
- **Personalisering**: lyst/mørkt/automatisk tema, seks accentfarver og
  valgfrit navn til hilsenen.
- **Migration**: v1-data konverteres automatisk ved første åbning; den rå
  v1-JSON gemmes urørt under localStorage-nøglen `lukas-todo-v1-backup`.
  Gamle v1-backupfiler kan stadig importeres.

## Installation på iPhone

Appen serveres via GitHub Pages (gh-pages-branchen). Åbn adressen i Safari og
vælg Del → **Føj til hjemmeskærm**.

## Filer

| Fil | Indhold |
|---|---|
| `index.html` | Hele appen — markup, styling og al logik |
| `manifest.webmanifest` | PWA-manifest |
| `sw.js` | Service worker (offline-cache) |
| `icon-180.png` / `icon-512.png` | App-ikoner |

## Senere lag (ikke bygget endnu)

AI-assistent oven på de manuelle kernefunktioner, søgning, gentagne opgaver,
deling. Kernen skal fungere uden.
