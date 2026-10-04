/** One app-owned composition. Adding packages to the catalog never changes this demo. */
export async function mountShowcase(host: HTMLElement): Promise<() => void> {
  const [calendar, theme] = await Promise.all([
    import("@salyra-ui/calendar/vanilla"),
    import("@salyra-ui/theme-studio/vanilla"),
    import("@salyra-ui/calendar/styles.css"),
  ]);
  const choices = [
    { name: "Red", value: "#E4002B" },
    { name: "Blue", value: "#5268E0" },
    { name: "Green", value: "#277D59" },
  ];
  host.innerHTML = `<div class="showcase-controls"><fieldset><legend>Theme color</legend>${choices.map((choice, i) => `<button type="button" data-theme-color="${choice.value}" aria-label="${choice.name} theme" aria-pressed="${i === 0}" style="--choice:${choice.value}"></button>`).join("")}</fieldset><div role="group" aria-label="Appearance"><button type="button" data-theme-mode="light" aria-pressed="true">Light</button><button type="button" data-theme-mode="dark" aria-pressed="false">Dark</button></div></div><div class="showcase-scope"><div class="showcase-calendar-heading"><span>Choose a date range</span><div><button type="button" data-picker-action="previous" aria-label="Previous month"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m10 3-5 5 5 5"/></svg></button><button type="button" data-picker-action="next" aria-label="Next month"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5"/></svg></button></div></div><div data-calendar class="sp-calendar"></div><div class="showcase-selection"><span>Selected dates</span><output aria-live="polite"></output></div></div>`;
  const scopeElement = host.querySelector<HTMLElement>(".showcase-scope")!;
  const themeStore = theme.createThemeStore({
    theme: theme.generateTheme(choices[0].value, { background: "tinted" }),
    mode: "light",
    modeStorage: false,
  });
  const unbindScope = theme.bindThemeScope(scopeElement, themeStore);
  const picker = calendar.mountPicker(scopeElement, {
    referenceDate: "2026-10-04",
    locale: "en",
    selection: "range",
    fixedWeeks: true,
    defaultValue: {
      start: { date: "2026-10-09" },
      end: { date: "2026-10-12" },
    },
  });
  const updateSelection = () => {
    const value = picker.store.getSnapshot().value;
    const range = value && "start" in value ? value : null;
    scopeElement.querySelector("output")!.textContent = range?.start
      ? `${range.start.date}${range.end ? " to " + range.end.date : " · Choose the end date"}`
      : "Choose a start and end date";
  };
  updateSelection();
  const unsubscribe = picker.store.subscribe(updateSelection);
  const handlers = new AbortController();
  host.addEventListener(
    "click",
    (event) => {
      const target = (event.target as Element).closest<HTMLButtonElement>(
        "[data-theme-color], [data-theme-mode]",
      );
      if (!target) return;
      if (target.dataset.themeColor) {
        themeStore.setTheme(
          theme.generateTheme(target.dataset.themeColor, {
            background: "tinted",
          }),
        );
        host
          .querySelectorAll("[data-theme-color]")
          .forEach((button) =>
            button.setAttribute("aria-pressed", String(button === target)),
          );
      } else {
        themeStore.setMode(target.dataset.themeMode as "light" | "dark");
        host
          .querySelectorAll("[data-theme-mode]")
          .forEach((button) =>
            button.setAttribute("aria-pressed", String(button === target)),
          );
      }
    },
    { signal: handlers.signal },
  );
  host.setAttribute("aria-busy", "false");
  return () => {
    handlers.abort();
    unsubscribe();
    picker.destroy();
    unbindScope();
    themeStore.stop();
  };
}
