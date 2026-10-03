export const componentInfo = {
  calendar: {
    name: "Calendar",
    namespace: "Calendar",
    kind: "date",
    description:
      "Build a calendar with your own cells, weekday headings and actions. Selection can stay off while your app handles date clicks.",
  },
  "date-picker": {
    name: "Date Picker",
    namespace: "DatePicker",
    kind: "date",
    description:
      "Choose a date or a date range. Keep edits in a draft until the user applies them, and place the calendar or fields in your own layout.",
  },
  "time-picker": {
    name: "Time Picker",
    namespace: "TimePicker",
    kind: "time",
    description:
      "Choose an hour and minute, add seconds or AM/PM, and define the ending day when a range crosses midnight.",
  },
  "date-time-picker": {
    name: "Date Time Picker",
    namespace: "DateTimePicker",
    kind: "datetime",
    description:
      "Compose date and time controls in one interval editor. Each endpoint can have its own date, including an end on a later day.",
  },
} as const;
export type DateComponent = keyof typeof componentInfo;
export function componentExamples(slug: DateComponent): Record<string, string> {
  const info = componentInfo[slug];
  const calendarOnly = slug === "calendar";
  const timeOnly = slug === "time-picker";
  const withTime = info.kind !== "date";
  const fields = !calendarOnly && !timeOnly;
  const range = !calendarOnly && !timeOnly;
  const selection = calendarOnly ? "none" : range ? "range" : "single";
  const options = `{ selection: '${selection}', commit: 'explicit', referenceDate: '2026-10-03', month: {year: 2026, month: 10} }`;
  const rootFile = calendarOnly ? "Root" : info.namespace;
  const calendar = `<Picker.${calendarOnly ? "View" : "Calendar"} className="sp-calendar" />`;
  const children = [
    ...(!timeOnly
      ? [
          '<Picker.MonthSelect aria-label="Month" />',
          '<Picker.YearSelect aria-label="Year" />',
          calendar,
        ]
      : []),
    ...(fields
      ? ['<label>Start date <Picker.Field endpoint="start" /></label>']
      : []),
    ...(withTime ? ['<Picker.Time endpoint="start" />'] : []),
    ...(fields
      ? ['<label>End date <Picker.Field endpoint="end" /></label>']
      : []),
    ...(withTime && range ? ['<Picker.Time endpoint="end" />'] : []),
    ...(!calendarOnly
      ? [
          '<Picker.Action action="apply">Save</Picker.Action>',
          '<Picker.Action action="cancel">Cancel</Picker.Action>',
        ]
      : []),
  ].join("\n    ");
  const pkg = `@salyra-ui/${slug}`;
  const imports = `import { ${info.namespace} as Picker } from '${pkg}/`;
  const native = children.replaceAll("className=", "class=");
  const vanillaMarkup = [
    ...(!timeOnly ? ['<div data-calendar class="sp-calendar"></div>'] : []),
    ...(fields
      ? [
          '<input data-date-field data-endpoint="start" aria-label="Start date">',
        ]
      : []),
    ...(withTime
      ? [
          '<input data-time-segment="hour" data-endpoint="start" aria-label="Start hours">',
          '<input data-time-segment="minute" data-endpoint="start" aria-label="Start minutes">',
        ]
      : []),
    ...(fields
      ? ['<input data-date-field data-endpoint="end" aria-label="End date">']
      : []),
    ...(withTime && range
      ? [
          '<input data-time-segment="hour" data-endpoint="end" aria-label="End hours">',
          '<input data-time-segment="minute" data-endpoint="end" aria-label="End minutes">',
        ]
      : []),
    ...(!calendarOnly
      ? ['<button data-picker-action="apply">Save</button>']
      : []),
  ];
  const directives = [
    "PickerRoot",
    ...(!timeOnly ? ["CalendarView"] : []),
    ...(fields ? ["DateField"] : []),
    ...(withTime ? ["TimeSegmentField"] : []),
  ];
  const angularMarkup = vanillaMarkup
    .map((line) =>
      line
        .replace("data-calendar", "spCalendar")
        .replace(/data-date-field data-endpoint="([^"]+)"/, 'spDateField="$1"')
        .replace(
          /data-time-segment="([^"]+)" data-endpoint="([^"]+)"/,
          'spTimeSegment="$1" endpoint="$2"',
        )
        .replace('data-picker-action="apply"', '(click)="store.apply()"'),
    )
    .join("\n    ");
  const astroImports = [
    `import Root from '${pkg}/astro/${rootFile}.astro';`,
    ...(!timeOnly
      ? [`import Calendar from '${pkg}/astro/Calendar.astro';`]
      : []),
    ...(fields ? [`import Field from '${pkg}/astro/Field.astro';`] : []),
    ...(withTime ? [`import Segment from '${pkg}/astro/Segment.astro';`] : []),
    ...(!calendarOnly
      ? [`import Action from '${pkg}/astro/Action.astro';`]
      : []),
  ].join("\n");
  const astroBody = [
    ...(!timeOnly ? ['<Calendar {options} class="sp-calendar" />'] : []),
    ...(fields ? ['<label>Start date <Field endpoint="start" /></label>'] : []),
    ...(withTime
      ? [
          '<label>Hours <Segment part="hour" endpoint="start" /></label>',
          '<label>Minutes <Segment part="minute" endpoint="start" /></label>',
        ]
      : []),
    ...(fields ? ['<label>End date <Field endpoint="end" /></label>'] : []),
    ...(withTime && range
      ? [
          '<label>End hours <Segment part="hour" endpoint="end" /></label>',
          '<label>End minutes <Segment part="minute" endpoint="end" /></label>',
        ]
      : []),
    ...(!calendarOnly ? ['<Action action="apply">Save</Action>'] : []),
  ].join("\n  ");
  return {
    React: `${imports}react';\nimport '${pkg}/styles.min.css';\n\nexport function Editor() {\n  return <Picker.Root {...${options}}>\n    ${children}\n  </Picker.Root>;\n}`,
    Svelte: `<script lang="ts">\n  ${imports}svelte';\n  import '${pkg}/styles.min.css';\n  const options = ${options} as const;\n</script>\n\n<Picker.Root {options}>\n  ${native.replaceAll("\n    ", "\n  ")}\n</Picker.Root>`,
    Vue: `<script setup lang="ts">\n${imports}vue';\nimport '${pkg}/styles.min.css';\nconst options = ${options} as const;\n</script>\n<template>\n  <Picker.Root :options="options">\n    ${native}\n  </Picker.Root>\n</template>`,
    Angular: `import { Component } from '@angular/core';\nimport { ${directives.join(", ")}, createPickerStore } from '${pkg}/angular';\n\n@Component({selector: 'app-editor', standalone: true,\n  imports: [${directives.join(", ")}],\n  template: \`<div [spRoot]="options" [store]="store">\n    ${angularMarkup}\n  </div>\`\n})\nexport class Editor {\n  readonly options = { ...${options}, kind: '${info.kind}' } as const;\n  readonly store = createPickerStore(this.options);\n}\n// Import '${pkg}/styles.min.css' in your global styles.`,
    Astro: `---\n${astroImports}\nimport '${pkg}/styles.min.css';\nconst options = { ...${options}, kind: '${info.kind}' } as const;\n---\n<Root {options}>\n  ${astroBody}\n</Root>`,
    Vanilla: `import { mountPicker } from '${pkg}/vanilla';\nimport '${pkg}/styles.min.css';\n\n// Existing markup inside #editor:\n${vanillaMarkup.map((line) => "// " + line).join("\n")}\n\nconst picker = mountPicker(document.querySelector<HTMLElement>('#editor')!, ${options});\n// Call picker.destroy() when removing the editor.`,
  };
}
