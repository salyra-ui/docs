export const categories = [
  {
    id: "files",
    name: "Files",
    description: "File selection, upload queues and transfer controls.",
  },
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
  environment: "frontend" | "backend";
  family: "color" | "calendar" | "upload";
  platforms: string;
}

export const components = [
  {
    slug: "file-uploader",
    name: "File Uploader",
    version: "0.1.0",
    category: "files",
    environment: "frontend",
    family: "upload",
    platforms: "React, Svelte, Vue, Angular, Astro, Vanilla",
    keywords: "file upload chunk resume retry dropzone progress attachment",
    description:
      "Composable file uploads with verified resume and custom previews.",
    examples: "upload-examples.html",
  },
  {
    slug: "color-picker",
    name: "Color Picker",
    version: "1.0.1",
    category: "color",
    environment: "frontend",
    family: "color",
    platforms: "React, Svelte, Vue, Angular, Astro, Vanilla",
    keywords: "hex rgb hsl hsv oklch oklab opacity alpha wheel eyedropper",
    description: "Color surfaces, channels, opacity and screen sampling.",
    examples: "color.html",
  },
  {
    slug: "theme-studio",
    name: "Theme Studio",
    version: "1.0.1",
    category: "color",
    environment: "frontend",
    family: "color",
    platforms: "React, Svelte, Vue, Angular, Astro, Vanilla",
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
    environment: "frontend",
    family: "calendar",
    platforms: "React, Svelte, Vue, Angular, Astro, Vanilla",
    keywords: "month year weekdays events grid scroll",
    description: "Month grids, custom cells and continuous scrolling.",
    examples: "date-examples.html#historical",
  },
  {
    slug: "date-picker",
    name: "Date Picker",
    version: "0.1.0",
    category: "date-time",
    environment: "frontend",
    family: "calendar",
    platforms: "React, Svelte, Vue, Angular, Astro, Vanilla",
    keywords: "date range day selection",
    description: "Single dates and ranges with draft and applied values.",
    examples: "date-examples.html#picker",
  },
  {
    slug: "time-picker",
    name: "Time Picker",
    version: "0.1.0",
    category: "date-time",
    environment: "frontend",
    family: "calendar",
    platforms: "React, Svelte, Vue, Angular, Astro, Vanilla",
    keywords: "clock hour minute second duration time range",
    description: "Time selection with explicit ending dates or day offsets.",
    examples: "date-examples.html#picker",
  },
  {
    slug: "date-time-picker",
    name: "Date Time Picker",
    version: "0.1.0",
    category: "date-time",
    environment: "frontend",
    family: "calendar",
    platforms: "React, Svelte, Vue, Angular, Astro, Vanilla",
    keywords: "appointment schedule event dates clock range",
    description: "Dates and times together, including multi-day intervals.",
    examples: "date-examples.html#events",
  },
  {
    slug: "upload-server",
    name: "Upload Server",
    version: "0.1.0",
    category: "files",
    environment: "backend",
    family: "upload",
    platforms: "Node.js package · Native adapters for Go, Rust, Java and more",
    keywords:
      "server backend node routes storage filesystem s3 r2 chunks java go rust python php ruby elixir dotnet c cpp",
    description:
      "Receive chunks, manage upload sessions and save files to your own storage.",
    examples: "upload-server.html#routing",
  },
] as const satisfies readonly ComponentDefinition[];
export type ComponentSlug = (typeof components)[number]["slug"];
export const base =
  (typeof document !== "undefined"
    ? document.body.dataset.siteRoot
    : undefined) ?? import.meta.env.BASE_URL;
export function componentURL(slug: string) {
  return `${base}${slug}.html`;
}
