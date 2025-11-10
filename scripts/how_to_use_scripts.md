 How to use (Windows)



  - Build: ./scripts/build.ps1

  - Launch dev (non-blocking): ./scripts/launch.ps1 -Mode dev -Detach

  - Launch prod (non-blocking): ./scripts/launch.ps1 -Mode start -Detach

  - If you prefer to watch logs in the terminal, omit -Detach (it will tail logs). Use Ctrl+C to stop when tailing.



&nbsp;Local verification



&nbsp; - Build: cd web \&\& npm run build

&nbsp; - Preview locally by serving web/out with any static server (e.g., npx serve web/out)



&nbsp; Important notes



&nbsp; - Locale behavior: GitHub Pages serves a static site; only EN is included. I hid the language switcher for static

&nbsp;   deploys. To support multiple locales on Pages, we should move to path‑based locales (/en, /sv, /so) with app/

&nbsp;   \[locale]/ and generate all locales at build time. I can refactor to that pattern next.

&nbsp; - Newsletter: Falls back to mailto: on Pages; we can switch to Formspree/Mailchimp later.

&nbsp; - Base path: If your repo name is not trupasa, update NEXT\_BASE\_PATH and NEXT\_ASSET\_PREFIX in .github/workflows/

&nbsp;   pages.yml.





&nbsp;- cd web

&nbsp;     - npx serve out

&nbsp;     - Open http://localhost:3000/en/, http://localhost:3000/sv/, http://localhost:3000/so/

