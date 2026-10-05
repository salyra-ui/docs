# Salyra UI: componente pe care merită să le construim

Propuneri pentru următoarele pachete. Lista nu reprezintă componente deja implementate sau un calendar de lansări.

Direcția pe care aș păstra-o: componente cu logică utilă, părți independente și UI pe care utilizatorul îl poate schimba. Color Picker și Calendar au pornit exact de la nevoia asta.

## Înainte de pachetele noi

Finalizăm navigarea calendarului între zile, luni și ani. Butoanele pentru lună și an, grilele și celulele lor trebuie să poată primi clase și conținut propriu. Schimbarea lunii afișate nu schimbă selecția.

Apoi extragem o bază comună pentru popover și dialog din comportamentele existente. Ea trebuie să rezolve focusul, Escape, click în afară, poziționarea, portalurile și suprapunerea mai multor popup-uri. Asta ajută pickerele existente și viitoarele meniuri, fără câte o implementare diferită în fiecare pachet.

## 20 de propuneri

| Componentă | Ce ar trebui să facă | Ce poate reutiliza |
| --- | --- | --- |
| Combobox | Căutare, opțiuni cu markup propriu, grupuri, încărcare async, anularea cererilor vechi și navigare din tastatură. | Baza pentru popup-uri și o colecție comună de opțiuni. |
| MultiSelect | Selecție multiplă, chips personalizabile, selectare pe grupuri, limite și căutare. | Colecția și navigarea din Combobox. |
| TagInput | Tag-uri introduse manual, paste cu mai multe valori, validare, deduplicare și editarea unui tag. | Colecția comună și rețetele de chips. |
| TreeView | Foldere sau categorii, expand/collapse, încărcarea copiilor la cerere și acțiuni pe fiecare nod. | Un motor comun pentru arbori și navigare din tastatură. |
| TreeSelect | Alegere simplă sau multiplă dintr-un arbore, căutare și selecție parțială a părinților. | Motorul TreeView și popup-ul Combobox. |
| FileUploader | Dropzone, listă de fișiere, validare, progres, anulare și retry. Utilizatorul furnizează funcția de upload. | Colecții și gestionarea operațiilor async. |
| NumberField | Numere localizate, monedă sau unități, limite, pași și separarea textului în curs de editare de valoarea validă. | Modelul draft/committed folosit de pickere. |
| RangeSlider | Unul sau mai multe thumbs, intervale, pași, valori blocate și etichete configurabile. | Un motor comun pentru geometrie și interacțiuni pointer/tastatură. |
| CommandMenu | Comenzi cu căutare, grupuri, shortcuts și navigare către submeniuri. | Colecția Combobox și baza pentru dialoguri. |
| DataTable | Coloane, sortare, filtre, selecție, paginare, resize și celule editabile. Stare locală sau gestionată de server. | Un motor headless de tabel și VirtualList pentru volume mari. |
| FilterBuilder | Condiții pe câmpuri, operatori, grupuri AND/OR și export într-un model de date clar. | Combobox, NumberField și pickerele de date. |
| VirtualList | Randarea unui număr limitat de elemente, dimensiuni variabile și scroll către un element. | Un motor de virtualizare evaluat separat. |
| Scheduler | Vederi zi, săptămână și lună, evenimente, mutare și redimensionare, resurse și fus orar. | Calendar și Date Time Picker. |
| AvailabilityPicker | Intervale disponibile, pauze, zile indisponibile, program săptămânal și excepții pentru anumite date. | Calendar, Time Picker și Date Time Picker. |
| RecurrenceEditor | Repetări pe zile, săptămâni sau luni, dată de terminare, număr de apariții și excepții. | Calendar și conversia explicită a timpului. |
| TimeZonePicker | Zone configurabile, căutare, etichete proprii și offset calculat pentru data aleasă. | Combobox și utilitățile pentru fusuri orare. |
| DurationInput | Zile, ore și minute, limite și rezultat într-o unitate explicită. Util pentru durate, separat de o oră din zi. | Câmpurile segmentate și NumberField. |
| SortableList | Reordonare cu mouse, touch și tastatură, handle custom și callback cu noua ordine. | Un motor comun pentru drag-and-drop. |
| Kanban | Coloane și carduri proprii, mutare între coloane, limite și validarea destinației. | SortableList, nu un alt motor de drag-and-drop. |
| ImageCropper | Crop liber sau cu raport fix, zoom, rotație și export la rezoluția cerută. | Un motor separat de geometrie. Procesarea se face doar în browser. |

## Ordinea în care aș începe

1. FileUploader. Direcția discutată pe 4 octombrie 2026 include chunks, retry, reluare după refresh, customizare și adaptoare de server. Vezi [planul detaliat](file-uploader.md).
2. Combobox. O bază bună aici ajută imediat MultiSelect, CommandMenu, TreeSelect și TimeZonePicker.
3. MultiSelect. Îl compunem din logica de selecție deja construită, cu chips care aparțin aplicației.
4. NumberField. Completează formularele și ne dă o bază reutilizabilă pentru filtre și durate.
5. Scheduler. Este cea mai naturală continuare a Calendar, dar îl împărțim în pași: afișarea și acțiunile evenimentelor, apoi mutarea și redimensionarea.

RecurrenceEditor și AvailabilityPicker vin după ce modelul de evenimente și fusuri orare este stabil. DataTable, Kanban și ImageCropper cer proiectare separată, fiind cele mai mari din listă.

## Motoare pe care merită să le evaluăm

Pentru DataTable aș evalua [TanStack Table](https://github.com/TanStack/table). Are un core independent de framework și lasă markup-ul și stilurile la alegerea aplicației. Pentru VirtualList aș evalua [TanStack Virtual](https://tanstack.com/virtual/latest/docs/introduction), care oferă virtualizare fără UI impus. Integrarea lor cu API-ul Salyra trebuie verificată înainte să alegem o dependență.

Putem livra și rețete instalabile printr-un [registry shadcn](https://ui.shadcn.com/docs/registry). Acesta ar distribui compozițiile și stilurile editabile, iar pachetele npm ar păstra motorul și adaptoarele. Este o opțiune de distribuție, nu încă un pachet de UI.

## Reguli pentru fiecare componentă

- Core independent de framework, cu adaptoare React, Svelte, Vue, Angular, Astro și Vanilla.
- Namespace de părți care pot fi compuse, cu opțiuni, clase, conținut și evenimente documentate individual.
- Stare controlled și uncontrolled, draft unde are sens, plus disabled și readOnly.
- SSR determinist. Accesul la DOM, fișiere și browser începe după mount.
- Integrare cu formulare, tastatură și comportamente de focus verificate.
- CSS implicit opțional. Nicio componentă nu schimbă tema globală fără o cerere explicită.
- Exporturi doar pentru datele configurate, unde componenta are exporturi.
- Randare proporțională cu ce este vizibil, cu măsurători reale înainte de promisiuni de performanță.
- Documentație versionată, changelog, exemple funcționale și cod de copiat pentru fiecare adapter.
- Build-uri minificate, Vanilla standard și minificat, fără sourcemaps în distribuție.

Pachetele sunt unități de logică reutilizabile. O celulă, un buton de navigare sau un chip nu trebuie să devină automat un pachet npm separat.
