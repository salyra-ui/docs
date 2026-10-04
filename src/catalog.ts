export const categories = [
  {
    id: "color",
    name: "Color & themes",
    description: "Choose colors and configure an application's appearance.",
  },
  {
    id: "date-time",
    name: "Dates & time",
    description: "Calendar views, date selection and time controls.",
  },
] as const;
export type ComponentCategory = (typeof categories)[number]["id"];

interface ComponentDefinition {
  slug: string;
  name: string;
  version: string;
  category: ComponentCategory;
  keywords: string;
  description: string;
  examples: string;
}

export const components = [
  {
    slug: "color-picker",
    name: "Color Picker",
    version: "1.0.1",
    category: "color",
    keywords: "hex rgb hsl hsv oklch oklab opacity alpha wheel eyedropper",
    description: "Color surfaces, channels, opacity and screen sampling.",
    examples: "color.html",
  },
  {
    slug: "theme-studio",
    name: "Theme Studio",
    version: "1.0.1",
    category: "color",
    keywords:
      "tokens tailwind primary accent secondary radius border dark mode",
    description: "Theme generation, scoped previews and loading states.",
    examples: "generator.html",
  },
  {
    slug: "calendar",
    name: "Calendar",
    version: "0.1.0",
    category: "date-time",
    keywords: "month year weekdays events grid scroll",
    description: "Month grids, custom cells and continuous scrolling.",
    examples: "date-examples.html#historical",
  },
  {
    slug: "date-picker",
    name: "Date Picker",
    version: "0.1.0",
    category: "date-time",
    keywords: "date range day selection",
    description: "Single dates and ranges with draft and applied values.",
    examples: "date-examples.html#picker",
  },
  {
    slug: "time-picker",
    name: "Time Picker",
    version: "0.1.0",
    category: "date-time",
    keywords: "clock hour minute second duration time range",
    description: "Time selection with explicit ending dates or day offsets.",
    examples: "date-examples.html#picker",
  },
  {
    slug: "date-time-picker",
    name: "Date Time Picker",
    version: "0.1.0",
    category: "date-time",
    keywords: "appointment schedule event dates clock range",
    description: "Dates and times together, including multi-day intervals.",
    examples: "date-examples.html#events",
  },
] as const satisfies readonly ComponentDefinition[];
export type ComponentSlug = (typeof components)[number]["slug"];
export const base = import.meta.env.BASE_URL;
export function componentURL(slug: string) {
  return `${base}${slug}.html`;
}
