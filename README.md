# Salyra UI documentation

The documentation and example site for Color Picker, Theme Studio, Calendar, Date Picker, Time Picker, Date Time Picker, File Uploader and Upload Server. Each package has its own page, installation steps and code examples.

Color Picker and Theme Studio document the released 1.0.1 API, with archived documentation for 0.3.0 and 1.0.0. Calendar, Date Picker, Time Picker and Date Time Picker document the released 0.1.0 API. All six build dependencies use exact npm versions, so this repository builds independently of the component workspaces. The documentation uses standard npm installation commands.

## Development

Use Node 24 and run:

```sh
npm ci
npm run dev
```

The site opens at http://127.0.0.1:4332. Run `npm run check`, `npm test` and `npm run build` before publishing. Browser tests need Chromium, installed with `npx playwright install chromium`.

The homepage keeps one curated Calendar/Theme composition. The components.html catalog separates frontend controls from backend libraries. Runtime and category filters combine with feature search, and each selection is shareable through the URL. Every package card links to a version permalink as well as its current guide. docs.html opens the same catalog and preserves redirects for legacy kit links. Color and theme workflows use the released npm packages. Calendar examples preserve their state when switching between Preview and Code and display the exact source modules they run. Standard and minified Vanilla scripts and styles are offered separately.

## Sources

- src/home.ts presents the library without indexing every package.
- src/showcase.ts mounts the fixed Calendar/Theme composition.
- src/components.ts renders and filters the standalone catalog.
- src/catalog.ts defines package names, versions, frontend/backend placement, categories, search terms and links. Add a catalog entry when adding a component. Its category is checked by TypeScript.
- public/package-versions.json registers navigable snapshots by package family. src/versions.ts renders version controls and refreshes their navigation catalog without changing archived page content.
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

## Versioned documentation

All package documentation lives in this repository. Current guides use short URLs. Version permalinks preserve the matching API, examples, runtime and browser downloads. Client and server guides for upload stay in the same protocol snapshot. Calendar, date, time and date-time share a calendar-suite snapshot. Each package has a selector in its guide.

- Color Picker and Theme Studio: `public/versions/<version>/`
- Calendar suite: `public/versions/calendar/<version>/`
- File Uploader and Upload Server: `public/versions/file-uploader/<version>/`

For a new calendar or upload release, update the catalog and release metadata, build the current pages with `PAGES_BASE=/docs/ npm run build`, then create the snapshot with `PAGES_BASE=/docs/ node scripts/archive-calendar.mjs <version>` or `PAGES_BASE=/docs/ node scripts/archive-upload.mjs <version>`. Register the generated release in `public/package-versions.json` and rebuild for deployment. Both archive scripts refuse to overwrite an existing snapshot. Published snapshots must not be regenerated.
