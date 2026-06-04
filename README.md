# Obiettivi & Note · _Argo_

App personale **offline-first** per **obiettivi** (giornalieri, settimanali, a lungo termine, ricorrenti con routine), **note** e **spese**. Un singolo file HTML, vanilla JS, installabile come **PWA**. Sync multi-device **opzionale** via Firebase (gratis, piano Spark).

**▶ Live:** https://chopper090.github.io/argo/

## Caratteristiche
- Obiettivi del giorno / settimana / **lungo termine** (data o trimestre/semestre/anno) con sotto-task
- **Routine ricorrenti** che si rigenerano da sole + carry-over degli incompleti
- Spese con categorie e **metodo di pagamento**, note con tag e ricerca
- **Modalità Oggi** (focus) con anello di avanzamento e trend dei task completati
- Doppio tema caldo (chiaro/scuro), IT/EN, export JSON · CSV · XLSX · Markdown · .ics · snapshot HTML

## Offline & installazione
I dati vivono in `localStorage`; il **service worker** (`sw.js`) mette in cache lo shell, così l'app si apre anche senza rete. Da mobile: _"Aggiungi a schermata Home"_; da desktop: icona _Installa_ nella barra degli indirizzi.

## Sync opzionale con Firebase
Senza configurazione l'app è 100% locale. Per sincronizzare telefono ↔ PC: **Impostazioni → Firebase → "Come sincronizzare con Firebase?"** (guida in 5 passi in-app), oppure la guida completa in [`firebase/README.md`](firebase/README.md). Security rules single-user in [`firebase/firestore.rules`](firebase/firestore.rules).

## Struttura
- `index.html` — l'app (con `manifest.webmanifest`, `sw.js`, icone)
- `gen_icons.py` — generatore delle icone PWA (Pillow)
- `mockups/` — esplorazione di design (Fase 1)
- `firebase/` — guida e regole di sicurezza per la sync
