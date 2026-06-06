# CLAUDE.md — Argo

**Scopo.** PWA personale di produttività **offline-first**: obiettivi (giornalieri/settimanali/
lungo termine), routine ricorrenti con carry-over degli incompleti, note con tag, spese con categorie.

**Stack.** HTML **single-file vanilla JS** (`index.html`, ~1258 righe, CSS+JS inline). PWA
(`sw.js` + `manifest`). Doppio tema light/dark, Inter + JetBrains Mono. Export JSON/CSV/XLSX/
Markdown/.ics/HTML. **Firebase Firestore opzionale** (piano Spark) per sync multi-device.

**Mappa file.** `index.html` (app), `sw.js`, `manifest.webmanifest`, icone, `firebase/`
(guida + security rules), `gen_icons.py` (helper icone), `mockups/` (esplorazioni Fase 1),
`intro.mp4` (media pesante).

**Dove stanno i dati.** `localStorage` granulare = sorgente di verità locale; Firestore è
un layer di sync opzionale (rete = opzionale, non necessaria).

**Come si edita.** Tutto in `index.html` (stato centrale + render). Per le icone: preferire
`_scripts/gen_pwa_icons.py` del workspace al posto del `gen_icons.py` locale.

**Gotcha.** `.claude/launch.json` conteneva un path errato (`Tools/Argo` invece di `Argo`).
`intro.mp4` è pesante: valutarne il `.gitignore`. Estensione prevista: bot Telegram (Fase 3).

**Deploy.** GitHub Pages (`chopper090.github.io/argo/`). Versionare con `_scripts\Publish-Project.ps1`.
