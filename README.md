# Salyra UI documentation

The documentation and example site for Color Picker, Theme Studio, Calendar, Date Picker, Time Picker and Date Time Picker. Each package has its own page, installation steps and code examples.

Color Picker and Theme Studio document the released 1.0.1 API, with archived documentation for 0.3.0 and 1.0.0. The calendar suite documents the 0.1.0 API. Compiled dependency archives are pinned under vendor/packages so this repository builds independently of the component workspaces. These are build inputs, not the installation instructions shown to users. The documentation uses standard npm installation commands.

## Development

Use Node 24 and run:

```sh
npm ci
npm run dev
```

The site opens at http://127.0.0.1:4332. Run `npm run check`, `npm test` and `npm run build` before publishing. Browser tests need Chromium, installed with `npx playwright install chromium`.

The homepage links to six separate component pages. Color and theme workflows use the released npm packages. Calendar examples preserve their state when switching between Preview and Code and display the exact source modules they run. Standard and minified Vanilla scripts and styles are offered separately.

## Sources

- src/home.ts provides the component library homepage and live demonstrations.
- src/catalog.ts defines component names, versions and links.
- src/shell.ts provides navigation and the component index.
- src/color-theme contains the color/theme documentation, examples and API glossary.
- src/date contains calendar and picker documentation and live examples.
- documentation/releases.json records the released color/theme versions.
- public/versions preserves previously released documentation assets.
- public/downloads contains the public browser assets and Calendar browser builds.
- vendor/packages pins the four pinned Calendar dependencies used to build the site.

Update documentation here rather than in each component package. To refresh the calendar example modules and built assets, first build the component workspace, then run `node scripts/sync-calendar.mjs /path/to/salyra-date-picker`. Run npm install after syncing to refresh the pinned dependency builds and their lockfile hashes. The script leaves the component-specific documentation and common navigation alone. Update the catalog and package dependency versions when shipping a release.

## GitHub Pages

The workflow builds with PAGES_BASE=/docs/, runs TypeScript and browser checks, and deploys the static dist directory. The compiled site contains no sourcemaps. Existing component documentation URLs can continue to serve their releases while linking here for the full catalog.
