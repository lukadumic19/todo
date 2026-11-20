# Opgaver på TestFlight

iPhone-appen er den samme webapp pakket med Capacitor. Hver gang der pushes til
`main` på GitHub, bygger en Mac i skyen (GitHub Actions + fastlane) appen og
sender den til TestFlight. Kun intern test, så der kræves ingen godkendelse fra
Apple, og appen kommer ikke i App Store.

---

## Ny version – tjekliste

1. Lav ændringen i `index.html` (som før).
2. Test den i browseren.
3. Commit og push til `main`.
4. Følg bygget på GitHub: repo → fanen **Actions** → **TestFlight**. Grøn = færdig (ca. 10–20 min).
5. Vent 5–30 min, mens Apple behandler bygget. Du får en mail, når det er klar.
6. Åbn **TestFlight**-appen på iPhonen → **Opdater**.
7. Webappen (GitHub Pages) opdateres stadig separat via `gh-pages`, som før.

- Buildnummeret tælles automatisk op. Du skal ikke røre det.
- Bygget kan startes manuelt: **Actions** → **TestFlight** → **Run workflow**.
- Er bygget rødt: åbn kørslen, se hvilket trin der fejler, og hent evt. "byggelog" nederst.
- TestFlight-builds udløber efter **90 dage**. Push en ny version inden da.

## Dine data

- iOS-appen har sit eget lager, adskilt fra webappen i Safari.
- **Flytning første gang:** Webappen i Safari → Indstillinger → Backup → **Eksportér data** →
  gem filen i Filer. I iOS-appen: Indstillinger → Backup → **Importér** → vælg filen.
- Tag en eksport jævnligt (Eksportér åbner Del-menuen, så du kan gemme i Filer/iCloud).

---

## Engangsopsætning (er gjort én gang – her til opslag)

### 1. Registrér bundle ID
developer.apple.com/account → **Certificates, IDs & Profiles** → **Identifiers** → **+** →
**App IDs** → **App** → Description `Opgaver`, Bundle ID **Explicit** `dk.lukadumic.arbejde` →
**Continue** → **Register**.

### 2. Opret appen i App Store Connect
appstoreconnect.apple.com → **Apps** → **+** → **New App**:
Platform **iOS**, Name fx `Opgaver – Luka` (skal være unikt i hele App Store),
Primary Language **Danish**, Bundle ID `dk.lukadumic.arbejde`, SKU `opgaver-arbejde`,
User Access **Full Access** → **Create**.

### 3. Lav en App Store Connect API-nøgle
App Store Connect → **Users and Access** → fanen **Integrations** → **App Store Connect API** →
**Team Keys** → **+** (første gang: **Request Access**). Name `GitHub TestFlight`, Access **Admin** →
**Generate**. Notér **Issuer ID** (over tabellen) og **Key ID**, og klik **Download** på nøglen
(.p8-filen kan kun hentes én gang – gem den sikkert, del den aldrig).

### 4. Find dit Team ID
developer.apple.com/account → **Membership details** → **Team ID** (10 tegn).

### 5. Læg nøglerne i GitHub som secrets
github.com/lukadumic19/todo → **Settings** → **Secrets and variables** → **Actions** →
**New repository secret**, fire gange:

| Name | Værdi |
|---|---|
| `ASC_KEY_ID` | Key ID fra trin 3 |
| `ASC_ISSUER_ID` | Issuer ID fra trin 3 |
| `ASC_KEY_CONTENT` | Hele indholdet af .p8-filen (åbn i Notesblok, kopiér alt inkl. `-----BEGIN…` og `-----END…`) |
| `APPLE_TEAM_ID` | Team ID fra trin 4 |

### 6. Intern test
App Store Connect → appen → **TestFlight** → **Internal Testing** → **+** → gruppe `Mig` →
slå **Enable automatic distribution** til → tilføj dig selv som tester.
På iPhonen: installér **TestFlight** fra App Store, log ind med samme Apple-ID, og acceptér invitationen.

---

## Teknik (til opslag)

| Fil | Hvad |
|---|---|
| `capacitor.config.json` | App-navn, bundle ID |
| `scripts/build-www.mjs` | Bygger `www/` til iOS: kopierer webappen og lægger React lokalt (offline) |
| `ios/` | Xcode-projektet (ikon, opstartsskærm, Info.plist) |
| `assets/icon-only.png` | Kilde til app-ikonet |
| `fastlane/Fastfile` | Byg + upload til TestFlight |
| `.github/workflows/testflight.yml` | Kører fastlane på en Mac i skyen ved push |

Når der kommer en Mac: `npm ci && npm run ios:sync && npx cap open ios` åbner projektet i Xcode.
