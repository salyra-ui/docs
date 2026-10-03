export const components = [
  {
    slug: "color-picker",
    name: "Color Picker",
    version: "1.0.1",
    status: "released",
    description: "Color surfaces, channels, opacity and screen sampling.",
    examples: "color.html",
  },
  {
    slug: "theme-studio",
    name: "Theme Studio",
    version: "1.0.1",
    status: "released",
    description: "Theme generation, scoped previews and loading states.",
    examples: "generator.html",
  },
  {
    slug: "calendar",
    name: "Calendar",
    version: "0.1.0",
    status: "preview",
    description: "Month grids, custom cells and continuous scrolling.",
    examples: "date-examples.html#historical",
  },
  {
    slug: "date-picker",
    name: "Date Picker",
    version: "0.1.0",
    status: "preview",
    description: "Single dates and ranges with draft and applied values.",
    examples: "date-examples.html#picker",
  },
  {
    slug: "time-picker",
    name: "Time Picker",
    version: "0.1.0",
    status: "preview",
    description: "Time selection with explicit ending dates or day offsets.",
    examples: "date-examples.html#picker",
  },
  {
    slug: "date-time-picker",
    name: "Date Time Picker",
    version: "0.1.0",
    status: "preview",
    description: "Dates and times together, including multi-day intervals.",
    examples: "date-examples.html#events",
  },
] as const;
export type ComponentSlug = (typeof components)[number]["slug"];
export const base = import.meta.env.BASE_URL;
export function componentURL(slug: string) {
  return `${base}${slug}.html`;
}
