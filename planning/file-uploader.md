# File Uploader

Propunere de arhitectură pentru următoarea componentă Salyra UI. Scrisă pe 4 octombrie 2026. API-urile de mai jos sunt propuse, nu sunt exporturi disponibile în pachetele publicate.

## Pachet și responsabilități

Un pachet npm, `@salyra-ui/file-uploader`, cu un core independent de framework și intrări React, Svelte, Vue, Angular, Astro și Vanilla. Transporturile au subpath-uri proprii. Importul unui uploader simplu nu trebuie să includă implementarea tus sau toate adaptoarele.

Motorul gestionează fișierele, coada, concurența, stările, pauza, anularea, încercările, progresul și reluarea. Adaptorul de transport comunică cu serverul. Componentele conectează markup-ul aplicației la aceste comportamente.

Stilurile implicite sunt opționale. Fiecare parte primește clase, atribute native, conținut și evenimente. Textele, iconițele, layout-ul și reprezentarea metadatelor aparțin aplicației.

## Moduri de trimitere

| Mod | Utilizare | Reluare |
| --- | --- | --- |
| HTTP simplu | Un request cu fișierul sau FormData. Endpoint, metodă, headers și interpretarea răspunsului configurabile. | Retry pornește request-ul de la început. |
| Chunked custom | Aplicația mapează creare, verificare, trimiterea bucăților și finalizare pe propriile endpoint-uri. | Serverul confirmă offset-ul sau bucățile salvate. |
| tus | Adaptor pentru un server compatibil cu protocolul tus. Evaluăm un client existent înainte de a scrie unul. | Urmează protocolul și extensiile anunțate de server. |

Protocolul [tus](https://tus.io/protocols/resumable-upload) folosește HEAD pentru offset și PATCH pentru continuare. Extensiile descriu ștergerea sesiunilor, expirarea, checksum-urile și concatenarea. Suportul acestora trebuie verificat la server.

Toate transporturile implementează aceeași interfață de bază. Aplicația poate furniza un transport propriu.

Contractul propus:

- `create`: creează sau recuperează o sesiune și returnează identificatorul ei.
- `probe`: întoarce checkpoint-ul confirmat de server și eventuala expirare.
- `upload`: primește un Blob, poziția lui, un AbortSignal și un callback de progres.
- `complete`: finalizează transferul și returnează rezultatul aplicației.
- `terminate`: opțional, eliberează o sesiune neterminată.

Capabilitățile declarate includ reluare, progres, bucăți paralele, checksum și terminare. Engine-ul activează doar comportamentele suportate. Pentru request-uri ambigue, `create`, trimiterea bucăților și `complete` trebuie să aibă o regulă documentată de idempotency sau de reconciliere.

Headers și URL-urile pot veni din funcții async, evaluate la fiecare request. Astfel aplicația poate obține credențiale sau URL-uri semnate actuale. Toate operațiile primesc AbortSignal.

## Configurare inițială

| Opțiune | Propunere | Semnificație |
| --- | --- | --- |
| `autoUpload` | `false` | Selectarea adaugă fișierul în coadă. Aplicația decide când începe trimiterea. |
| `chunkSize` | `5 * 1024 * 1024` | Dimensiunea propusă pentru bucăți, 5 MiB. Transportul o validează față de cerințele serverului. |
| `maxConcurrentFiles` | `2` | Numărul maxim de fișiere active. |
| `maxConcurrentChunks` | `1` | Bucăți active pe fișier. Valori mai mari cer un transport cu suport pentru bucăți independente. |
| `maxConcurrentRequests` | `4` | Limita globală pentru request-urile uploaderului. |
| `retry.maxAttempts` | `4` | O încercare inițială și maximum trei retry-uri pentru fiecare operație eligibilă. |
| `retry.baseDelay` | `1000` | Delay inițial, în milisecunde. |
| `retry.maxDelay` | `30000` | Limita backoff-ului calculat local. Retry-After poate cere o așteptare mai lungă. |
| `retry.jitter` | `true` | Variație a delay-ului pentru a evita cereri simultane după o întrerupere. |
| `requestTimeout` | configurabil | Limita unui request. Un timeout permite reconciliere și retry conform politicii. |
| `persistence` | `false` | Stocare opțională a sesiunilor și metadatelor. |
| `accept`, `maxFileSize`, `maxTotalSize`, `maxFiles` | configurabile | Reguli de selecție, cu erori disponibile pentru UI-ul aplicației. |
| `validateFile` | callback async opțional | Validări suplimentare înainte de trimitere. |
| `disabled`, `readOnly` | `false` | Blochează interacțiunile definite pentru fiecare parte. Activarea lor nu anulează implicit un transfer deja pornit. |

Limitele numerice de mai sus sunt puncte de pornire pentru implementare și măsurători. Nu sunt cerințe ale unui protocol.

## Retry și reconciliere

Retry-ul automat acoperă erori de rețea, timeout și răspunsuri temporare eligibile. Politica poate fi modificată de aplicație. Erorile de validare, permisiuni și dimensiune nu intră într-o buclă automată. Abort-ul utilizatorului nu consumă o încercare și nu pornește un retry.

Respectăm [Retry-After](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Retry-After) când este disponibil. El poate conține o dată HTTP sau un număr de secunde. Countdown-ul, încercarea curentă și eroarea sunt expuse separat pentru UI.

După un request cu rezultat incert, transportul resumable verifică serverul. Confirmarea lipsă nu dovedește că bucata lipsește. Un offset server invalid, o sesiune expirată sau un fișier nepotrivit produc o stare explicită, nu un restart tăcut.

Pause, Cancel și Reset opresc timer-ele de retry și request-urile active. Fiecare rulare are un identificator propriu, astfel încât un răspuns întârziat dintr-o rulare anulată nu poate modifica noul transfer.

## Reluare după refresh

Persistăm metadatele fișierului, referința sesiunii, checkpoint-ul confirmat, informațiile necesare verificării identității și starea transferului. Cheile sunt izolate printr-un namespace configurabil pentru aplicație și utilizator. Persistența nu salvează implicit conținutul fișierului, headers de autentificare sau credențiale.

Fluxul dorit:

1. La mount restaurăm sesiunile ca `awaiting-file`.
2. Utilizatorul reselectează sau trage fișierul.
3. Îl asociem cu o sesiune candidată și verificăm identitatea conform politicii configurate.
4. Interogăm serverul pentru checkpoint-ul actual.
5. Continuăm din poziția confirmată, cu aceeași sesiune.

Numele și dimensiunea ajută la găsirea unui candidat, dar nu dovedesc că două fișiere au același conținut. Un fingerprint rapid este doar un indiciu. Înainte de a reutiliza un prefix deja trimis cerem verificarea lui, prin hash-uri ale bucăților sau o identitate puternică furnizată de aplicație. O verificare completă, când este cerută, folosește hashing incremental într-un worker și memorie limitată. Nu citim întregul fișier într-un singur buffer.

Adaptorul IndexedDB salvează checkpoint-uri după confirmarea serverului. Un adaptor custom poate utiliza altă stocare. Dacă persistența e indisponibilă, transferul curent poate continua în memorie, iar UI-ul primește o eroare de persistență. După restaurare, checkpoint-ul serverului rămâne autoritatea.

Mai multe tab-uri trebuie să evite folosirea simultană a aceleiași sesiuni, prin coordonare când este disponibilă și reconciliere în transport. O sesiune expirată cere o acțiune clară pentru a porni de la zero.

## Pause, Cancel, Reset și Remove

| Acțiune | Comportament |
| --- | --- |
| `pause(id)` | Oprește request-urile și păstrează sesiunea pentru continuare. |
| `resume(id)` | Verifică sesiunea și continuă transferul când fișierul este disponibil. |
| `retry(id)` | Reîncearcă operația eșuată conform modului de transport. |
| `cancel(id)` | Oprește transferul și cere cleanup prin `onCancel` sau `terminate`. |
| `reset(id)` | Oprește rularea, invalidează checkpoint-ul local și pregătește o sesiune nouă, pornind de la zero. Păstrează fișierul selectat dacă mai există în memorie. |
| `remove(id)` | Invocă `onRemove` pentru un fișier finalizat și elimină intrarea după confirmarea aplicației. |
| `forget(id)` | Scoate doar intrarea din lista și persistența locală. Nu solicită ștergerea fișierului remote. |

Cleanup-ul remote este async și poate eșua. Expunem starea lui și o acțiune de retry. Nu afișăm că serverul a șters datele fără confirmare. Cleanup-ul eșuat rămâne într-o înregistrare separată chiar dacă sesiunea de transfer a fost resetată.

`onCancel` gestionează datele temporare ale unei sesiuni. `onRemove` gestionează rezultatul final. Pentru ambele, aplicația alege endpoint-ul și regulile serverului. Un callback opțional nu face automat un request dacă nu a fost configurat.

## State și progres

Stări de transfer propuse: `idle`, `validating`, `queued`, `awaiting-file`, `verifying`, `uploading`, `retrying`, `paused`, `finalizing`, `completed`, `failed`, `canceled`, `expired`.

Stările de cleanup și remove sunt separate de starea transferului. Un fișier poate fi finalizat și apoi să intre în `removing`, fără să redevină uploading.

Fiecare element expune:

- Nume, extensie, MIME, dimensiune, metadate și rezultatul returnat de server.
- `uploadedBytes`, confirmat de server, și `transferredBytes`, progresul curent raportat de transport.
- `totalBytes`, procent, bytes rămași, viteza estimată și timpul estimat rămas.
- Durată activă, numărul încercării, momentul următoarei încercări și eroarea curentă.
- Capabilități precum `canPause`, `canResume`, `canReset` și `canRemove`.

Progresul retransmiterilor nu se adună la bytes unici ai fișierului. Contorizăm separat traficul real dacă aplicația vrea această informație. Un upload cu 100% din bytes transferați poate fi încă `finalizing` până la confirmarea serverului.

ETA este o estimare calculată dintr-o fereastră de măsurători. În pauză sau fără suficiente date, valoarea este `null`. UI-ul alege dacă arată text, procent, bară sau un indicator nedeterminat. Opțiunile de formatare includ locale, unități SI/IEC și funcții proprii.

Transportul HTTP implicit poate folosi [evenimentele XMLHttpRequest.upload](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload) pentru progres. Transporturile custom raportează progresul prin contract. Dacă nu îl pot măsura, UI-ul primește explicit un progres nedeterminat.

## Compoziția UI

Namespace propus: `FileUploader`.

| Parte | Rol |
| --- | --- |
| `Root` | Store, opțiuni și context, fără un layout obligatoriu. |
| `Input` | Input-ul nativ pentru selectare, conectat la engine. |
| `Trigger` | Buton cu text, iconiță și atribute native proprii. |
| `Dropzone` | Drag-and-drop, stări de drag și validare. Conținutul aparține aplicației. |
| `List` / `Item` | Contextul colecției și al fiecărui fișier. Aplicația alege listă, tabel sau grid. |
| `Preview` | Randare custom după format. Renderer-ul poate produce imagine, video, iconiță sau alt conținut. |
| `Name` / `Metadata` | Nume și valori selectate, cu formatters și markup propriu. |
| `Progress` | Valoare accesibilă, cu conținut și indicator vizual propriu. |
| `Status` | Etichete custom pentru stările transferului. |
| `Output` | O valoare sau rezultatul unei funcții asupra snapshot-ului. |
| `Action` | Acțiuni start, pause, resume, retry, cancel, reset, remove sau forget, cu conținut propriu. |

Hook-urile React propuse sunt `useUploader` și `useUploadItem`. Celelalte adaptoare oferă acces echivalent la store. Compozițiile pot folosi direct starea și acțiunile, fără toate părțile UI.

Native event handlers se compun cu comportamentul intern după o ordine documentată. `preventDefault` poate anula acțiunea implicită unde are sens. Iconițele și textele nu sunt hardcodate în primitive. Object URL-urile pentru preview au lifecycle explicit și sunt revocate când nu mai sunt folosite.

Nu adăugăm PDF/video parsers grele în core. Aplicația poate furniza propriul renderer și date pentru preview.

## Istoric și fișiere existente

Lista acceptă atât transferuri curente, cât și înregistrări ale fișierelor deja trimise. Acestea pot veni prin `initialFiles` sau un loader custom cu paginare. Nu necesită un obiect File local.

Istoricul local este un cache opțional. Aplicația poate reîncărca lista de pe server, iar ștergerea folosește `onRemove`. Un rezultat server poate include id, URL, thumbnails și metadatele proprii aplicației.

## Adaptoare de server

Adăugăm o familie separată de integrări backend pentru TypeScript/JavaScript, Go, Rust, Java, Kotlin, Scala, C#/.NET, Python, PHP, Ruby, Elixir, C și C++. Ele implementează același protocol HTTP și trec aceeași suită de compatibilitate. Framework-ul frontend nu determină limbajul serverului.

Codul backend are distribuție proprie, prin ecosistemul fiecărui limbaj. El nu intră în bundle-ul browserului. Pentru TypeScript, propunerea este un pachet separat `@salyra-ui/upload-server`. Numele pachetelor din celelalte registre se aleg înainte de publicare.

| Limbaj | Integrare propusă | Distribuție |
| --- | --- | --- |
| TypeScript / JavaScript | Engine pentru sesiuni și handler Node HTTP, cu declarații TypeScript și adaptoare pentru framework-uri adăugate separat. | npm |
| Go | Handler compatibil cu net/http și interfețe pentru stocare și hooks. | Go module |
| Rust | Engine cu traits pentru stocare și integrare HTTP separată de logică. | Cargo crate |
| Java | Bibliotecă JVM pentru sesiuni, streaming și hooks. Integrarea HTTP rămâne separată de engine. | Maven Central |
| Kotlin | API Kotlin peste engine-ul JVM comun, cu integrare pentru coroutines unde este necesară. | Maven Central |
| Scala | API Scala peste engine-ul JVM comun, cu integrare async separată. | Maven Central |
| C# / .NET | Bibliotecă pentru sesiuni și stocare, cu integrare ASP.NET Core și operații anulabile. | NuGet |
| Python | Engine și interfețe de stocare, cu integrarea HTTP și streaming definite separat. | PyPI |
| PHP | Bibliotecă pentru sesiuni, chunks și hooks, integrabilă în aplicația sau framework-ul ales. | Composer / Packagist |
| Ruby | Engine pentru sesiuni și integrare HTTP separată, cu hooks și stocare configurabilă. | RubyGems |
| Elixir | Integrare Plug, reutilizabilă în aplicații Phoenix, cu module de stocare configurabile. | Hex package |
| C | API explicit de sesiuni, streaming și callbacks, cu ownership și cleanup documentate. Integrarea HTTP este separată. | Bibliotecă și build CMake |
| C++ | Wrapper cu ownership automat peste motorul comun C, dacă evaluarea confirmă că păstrează integrarea simplă. | Bibliotecă și build CMake |

Aceste integrări sunt propuneri. Evaluăm separat costul de mentenanță al fiecăreia. C și C++ nu primesc câte o implementare diferită a aceleiași logici dacă o bază comună este potrivită.

Java, Kotlin și Scala reutilizează un engine JVM comun. Verificăm API-urile fiecărui limbaj și modelul său de concurență fără să duplicăm protocolul, persistența și regulile de reluare. TypeScript și JavaScript folosesc aceeași distribuție runtime, cu tipuri disponibile pentru TypeScript.

În documentație, aceste limbaje apar în secțiunea de integrare backend. Selectorul pentru componentele UI rămâne React, Svelte, Vue, Angular, Astro și Vanilla. Suportul pentru un limbaj nu implică automat adaptoare pentru toate framework-urile sale HTTP. Fiecare integrare concretă este documentată și testată separat.

### Contractul comun

Pentru modul chunked custom definim o specificație versionată, scheme pentru request-uri și răspunsuri și o suită de teste HTTP. Rutele de mai jos sunt propuse, cu prefix configurabil:

| Rută | Responsabilitate |
| --- | --- |
| `POST /uploads` | Crearea idempotentă a sesiunii, cu metadate, dimensiune și parametrii acceptați pentru chunks. |
| `GET /uploads/:id` | Starea sesiunii, bucățile confirmate, expirarea și rezultatul final când există. |
| `PUT /uploads/:id/parts/:part` | Trimiterea unei bucăți identificate. O retransmitere identică întoarce aceeași confirmare, fără a duplica datele. |
| `POST /uploads/:id/complete` | Verificarea bucăților și finalizarea idempotentă. |
| `DELETE /uploads/:id` | Anularea sesiunii și cleanup-ul datelor temporare. |

Lista fișierelor finalizate și ștergerea lor pot fi furnizate de aplicație prin loader și `onRemove`. Nu presupunem că un server generic de upload deține catalogul de documente al aplicației. O integrare poate expune și rute pentru acestea, configurate explicit.

Contractul custom și tus sunt moduri distincte. Un backend existent poate implementa tus fără rutele propuse mai sus. [tusd](https://github.com/tus/tusd) este serverul de referință în Go și îl putem folosi pentru verificarea adaptorului client tus. Nu îl tratăm drept implementare a protocolului custom Salyra.

### Stocare și hooks

Serverul primește interfețe pentru datele sesiunilor și pentru conținutul fișierelor. Implementarea de referință folosește stocare persistentă pe disc. Memoria simplă este potrivită pentru teste, nu pentru promisiunea de reluare după restart-ul serverului. Integrarea cu object storage, baze de date sau Redis se adaugă prin adaptoare, după nevoie.

Operațiile urmăresc aceste reguli:

- Corpul request-ului este procesat ca stream, cu limite aplicate pe măsură ce intră datele.
- O bucată este confirmată după salvarea ei și a checkpoint-ului. Recuperarea tratează și întreruperile dintre aceste două etape.
- Finalizarea nu produce două fișiere dacă aceeași cerere este repetată.
- Retry-urile cu același identificator și conținut diferit sunt respinse explicit.
- Expirarea și cleanup-ul sesiunilor abandonate sunt configurabile.
- Concurența și coordonarea între mai multe procese sunt responsabilități declarate ale adaptorului de stocare.

Hooks propuse: `authorize`, `validateUpload`, `onUploadCreated`, `onPartStored`, `onUploadCompleted`, `onUploadCanceled` și `onUploadExpired`. Aplicația primește identificatorul sesiunii, contextul request-ului și propriile metadate. Hooks care pot respinge operații sunt diferențiate de notificările de după commit. Pentru operații importante după commit, adaptorul poate utiliza un mecanism persistent de livrare, astfel încât un request repetat să nu repete efectele aplicației.

Serverul poate confirma progresul și reluarea fără să impună autentificarea, structura bazei de date sau modelul de fișier al aplicației. Pentru istoric și remove, aplicația păstrează controlul asupra regulilor sale.

### Compatibilitate verificată

Aceeași suită de teste rulează împotriva fiecărui adaptor backend. Include chunks repetate, chunks în ordine diferită când sunt suportate, checksum greșit, timeout după salvare, refresh, expirare, finalizare repetată, cancel și restart-ul serverului. Versiunea de protocol și capabilitățile sunt publicate explicit de fiecare adaptor.

Ordinea propusă este TypeScript pentru integrarea de referință, apoi Go, Rust și Java. Urmează C#/.NET, Python și PHP. Kotlin și Scala se construiesc peste engine-ul JVM, iar Elixir și Ruby urmează același contract HTTP. C și C++ vin după stabilizarea lui, cu verificări dedicate pentru memorie și lifecycle. Nu anunțăm un adaptor ca suportat înainte ca implementarea și testele sale să existe.

## Optimizare și SSR

- Fișierul este împărțit prin [Blob.slice](https://developer.mozilla.org/en-US/docs/Web/API/Blob/slice). Nu construim toate bucățile în avans și nu convertim întregul fișier în base64.
- Store-ul are subscriptions per item. Progresul unui fișier nu trebuie să rerandeze întreaga listă.
- Coalescăm notificările vizuale, inițial la cel mult aproximativ 10 pe secundă, configurabil. Evenimentele finale nu sunt amânate.
- Persistăm schimbările utile pentru recuperare, nu fiecare frame de progres.
- Concurența controlează și cantitatea de date active. Hashing-ul este incremental, iar lucrul intensiv poate merge în worker.
- SSR poate afișa compoziția și fișierele existente. Selectarea, upload-ul și restaurarea din browser încep după mount. Fiecare instanță are store și cleanup propriu.
- Toți listenerii, request-urile, subscriptions și timer-ele au cleanup. Răspunsurile unei rulări vechi sunt ignorate.

## Exemple și verificări

Exemple pentru toate cele șase adaptoare, cu Preview/Code, cod copiat și customizare:

1. Un singur fișier, upload HTTP simplu și buton custom.
2. Dropzone și listă compactă, nume, format și dimensiune configurabile.
3. Galerie cu preview-uri și renderers diferite pentru imagini, video și documente.
4. Upload în bucăți, dimensiune configurabilă și concurență limitată.
5. Eroare simulată, retry, countdown și oprirea retry-ului prin cancel.
6. Refresh, reselectarea fișierului și reluare după reconciliere.
7. Pause, Resume, Cancel și Reset ca acțiuni distincte.
8. Istoric, paginare, Remove async și eroare de cleanup.
9. Progres în procent, bytes și ETA, plus un transport fără progres măsurabil.
10. Disabled, readOnly, limite și erori de validare custom.

Testele trebuie să includă cazul în care serverul salvează un chunk, dar răspunsul se pierde. Alte cazuri necesare: dublarea request-urilor, refresh înainte de persistență, fișier diferit cu același nume, sesiune expirată, abort în timpul backoff-ului, finalize ambiguu, remove eșuat și răspuns întârziat după reset. Verificăm și resursele după destroy, izolarea SSR, accesibilitatea și numărul de notificări pentru liste mari.

Documentăm contractul de backend și implementările de referință pentru fiecare limbaj suportat. Simulările din docs trebuie să fie identificate drept simulări, iar testele de transfer trebuie să ruleze și împotriva serverelor reale de test.

## Ordine de implementare

1. Contractele, state machine-ul, coada și transportul HTTP.
2. Chunked transport, reconciliere și verificarea identității fișierului.
3. Persistență, restaurare și cleanup async.
4. Primitive și rețete UI pentru adaptoare, începând cu aceeași logică comună.
5. Adaptor tus izolat, dacă evaluarea clientului și protocolului confirmă integrarea.
6. Documentație completă, teste de backend, build-uri minificate și auditul arhivelor fără sourcemaps.

Implementarea TypeScript a serverului merge în paralel cu definirea transportului chunked. Extinderea la celelalte limbaje urmează suita comună de compatibilitate, fără a amâna documentarea contractului până la ultimul adaptor.

Separarea nu implică lansarea unor pachete npm pentru fiecare bucată vizuală. Componenta rămâne o unitate de logică reutilizabilă, cu părți care pot fi compuse.
