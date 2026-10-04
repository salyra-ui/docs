# Salyra UI documentation

The documentation and example site for Color Picker, Theme Studio, Calendar, Date Picker, Time Picker and Date Time Picker. Each package has its own page, installation steps and code examples.

Color Picker and Theme Studio document the released 1.0.1 API, with archived documentation for 0.3.0 and 1.0.0. Calendar, Date Picker, Time Picker and Date Time Picker document the released 0.1.0 API. All six build dependencies use exact npm versions, so this repository builds independently of the component workspaces. The documentation uses standard npm installation commands.

## Development

Use Node 24 and run:

```sh
npm ci
npm run dev
```

The site opens at http://127.0.0.1:4332. Run `npm run check`, `npm test` and `npm run build` before publishing. Browser tests need Chromium, installed with `npx playwright install chromium`.

The homepage keeps one curated Calendar/Theme composition. The separate components.html catalog provides category filters, feature search and links to each guide. Search and category selections are shareable through the URL. docs.html opens the same catalog and preserves redirects for legacy kit links. Color and theme workflows use the released npm packages. Calendar examples preserve their state when switching between Preview and Code and display the exact source modules they run. Standard and minified Vanilla scripts and styles are offered separately.

## Sources

- src/home.ts presents the library without indexing every package.
- src/showcase.ts mounts the fixed Calendar/Theme composition.
- src/components.ts renders and filters the standalone catalog.
- src/catalog.ts defines component names, versions, categories, search terms and links. Add a catalog entry when adding a component. Its category is checked by TypeScript.
- src/shell.ts provides shared navigation and the footer.
- src/color-theme contains the color/theme documentation, examples and API glossary.
- src/date contains calendar and picker documentation and live examples.
- documentation/releases.json records the released color/theme versions.
- public/versions preserves previously released documentation assets.
- public/downloads contains the public browser assets and Calendar browser builds.
- documentation/calendar/releases.json records the released calendar suite versions.

Update documentation here rather than in each component package. To refresh the calendar example modules and built assets, first build the component workspace, then run `node scripts/sync-calendar.mjs /path/to/salyra-date-picker`. Publish that version to npm before running npm install to refresh the dependencies and lockfile. The script updates package versions, browser downloads and reference files, while leaving the component-specific pages and common navigation alone. Update the catalog versions when shipping a release.

## Planning

planning/component-roadmap.md records proposed components and a suggested implementation order. These proposals are not listed as available components in the public catalog.

## GitHub Pages

The workflow builds with PAGES_BASE=/docs/, runs TypeScript and browser checks, and deploys the static dist directory. The compiled site contains no sourcemaps. Existing component documentation URLs can continue to serve their releases while linking here for the full catalog.
