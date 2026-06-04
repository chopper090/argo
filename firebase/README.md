# Firebase — attivare la sync multi-device (opzionale)

L'app **funziona al 100% offline e in locale senza Firebase**. Questa configurazione serve solo se vuoi che i dati si sincronizzino in tempo reale tra telefono e PC. Resta tutto nel piano **Spark gratuito** (niente carta di credito, niente Blaze).

## 1. Crea il progetto (piano Spark)
1. Vai su <https://console.firebase.google.com> → **Aggiungi progetto** (disattiva pure Google Analytics).
2. Nel progetto: **Build → Authentication → Get started → Email/Password → Abilita**.
3. **Authentication → Users → Add user**: crea il tuo unico utente (es. la tua email + una password). Single-user, niente registrazione pubblica.
4. **Build → Firestore Database → Create database** → modalità **Production** → scegli una region (es. `eur3`).

## 2. Pubblica le security rules
Le regole in [`firestore.rules`](firestore.rules) bloccano tutto all'UID proprietario.
- Veloce: **Firestore → Rules**, incolla il contenuto del file, **Publish**.
- Oppure via CLI: `npm i -g firebase-tools` → `firebase login` → `firebase deploy --only firestore:rules`.

## 3. Prendi la config web
**Project settings (⚙️) → Le tue app → `</>` (Web)** → registra l'app → copia l'oggetto `firebaseConfig`.
Ti serve solo il JSON, es:
```json
{ "apiKey": "AIza…", "authDomain": "tuoprogetto.firebaseapp.com", "projectId": "tuoprogetto", "appId": "1:…:web:…" }
```

## 4. Connetti l'app
Nell'app → **icona Impostazioni (in alto a sinistra) → sezione Firebase**:
1. Incolla il JSON della config.
2. Inserisci email + password dell'utente creato al punto 1.3.
3. **Connetti & Accedi**.

Da quel momento: scritture istantanee in cache locale (offline persistence ON) e sync realtime tra i dispositivi via listener mirati. Il badge in alto passa a **"Sincronizzato"**.

## Consumi (perché resti gratis)
- Spark: **50.000 letture / 20.000 scritture / 20.000 cancellazioni al giorno**.
- L'app usa listener mirati su `goals`/`notes`/`expenses` (no re-read di intere collezioni a ogni modifica) → per un singolo utente sei ordini di grandezza sotto i limiti.
- Le preferenze (tema, lingua, layout) restano **device-local** in `localStorage`: non consumano Firestore.

## Modello dati
```
users/{uid}/goals/{goalId}     { type:"daily"|"weekly", date|weekOf, title, done, order, subtasks:[{id,title,done}], createdAt, completedAt }
users/{uid}/notes/{noteId}     { title, body, tags:[], createdAt, updatedAt }
users/{uid}/expenses/{expId}   { amount, currency:"EUR", category, date, note, createdAt }
```
Lo stesso schema è usato dal bot Telegram (Fase 3), che scrive direttamente in queste collezioni.
