const n=`import "./picker-controls.css";
import {
  escapeHTML,
  formatDate,
  parseDate,
  pointFor,
  timeParts,
  updateTime,
  type Endpoint,
  type PickerStore,
} from "@salyra-ui/calendar";
import { mountDatePicker } from "@salyra-ui/date-picker/vanilla";
import { createTimePickerStore } from "@salyra-ui/time-picker";

/** Application-owned composition, not another npm component API. */
export function pickerControlMarkup(
  endpoint: Endpoint,
  part: "date" | "time",
  label: string,
) {
  const icon =
    part === "date"
      ? '<rect x="3" y="5" width="18" height="16"/><path d="M7 3v4m10-4v4M3 11h18"/>'
      : '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>';
  return \`<div class="picker-control" data-choice-picker="\${part}" data-endpoint="\${endpoint}"><span class="picker-control-label">\${escapeHTML(label)}</span><button type="button" class="picker-control-trigger" aria-label="\${escapeHTML(label)}" aria-haspopup="dialog" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true">\${icon}</svg><span data-choice-value>Choose \${part}</span></button><div class="endpoint-popup" data-picker-root role="dialog" aria-label="Choose \${escapeHTML(label.toLowerCase())}" hidden></div></div>\`;
}

type Control = {
  part: "date" | "time";
  endpoint: Endpoint;
  trigger: HTMLButtonElement;
  value: HTMLElement;
  panel: HTMLElement;
};
let panelId = 0;

/** Each popup edits one parent endpoint. Closing a popup does not cancel the parent draft. */
export function mountEndpointPickers(root: HTMLElement, parent: PickerStore) {
  const controls = [
    ...root.querySelectorAll<HTMLElement>("[data-choice-picker]"),
  ].map((el) => {
    const control: Control = {
      part: el.dataset.choicePicker as Control["part"],
      endpoint: el.dataset.endpoint as Endpoint,
      trigger: el.querySelector<HTMLButtonElement>(".picker-control-trigger")!,
      value: el.querySelector<HTMLElement>("[data-choice-value]")!,
      panel: el.querySelector<HTMLElement>(".endpoint-popup")!,
    };
    control.panel.id = \`endpoint-popup-\${++panelId}\`;
    control.trigger.setAttribute("aria-controls", control.panel.id);
    return control;
  });
  let active: Control | undefined;
  let stopContent: (() => void) | undefined;
  const handlers = new AbortController();
  const listen = (el: EventTarget, type: string, fn: (event: Event) => void) =>
    el.addEventListener(type, fn, { signal: handlers.signal });

  function close(returnFocus = false) {
    if (!active) return;
    const control = active;
    active = undefined;
    control.panel.hidden = true;
    control.trigger.setAttribute("aria-expanded", "false");
    stopContent?.();
    stopContent = undefined;
    control.panel.replaceChildren();
    if (returnFocus && control.trigger.isConnected && !control.trigger.disabled)
      control.trigger.focus({ preventScroll: true });
  }

  function position() {
    if (!active) return;
    const { panel, trigger } = active;
    const rect = trigger.getBoundingClientRect();
    const width = Math.min(320, window.innerWidth - 24);
    panel.style.width = \`\${width}px\`;
    panel.style.maxHeight = \`\${Math.max(120, window.innerHeight - 24)}px\`;
    const height = panel.getBoundingClientRect().height;
    panel.style.left = \`\${Math.max(12, Math.min(rect.left, window.innerWidth - width - 12))}px\`;
    const below = rect.bottom + 8;
    panel.style.top = \`\${Math.max(12, Math.min(below + height <= window.innerHeight - 12 ? below : rect.top - height - 8, window.innerHeight - height - 12))}px\`;
  }

  function mountDate(control: Control) {
    const state = parent.getSnapshot();
    const date = pointFor(state.draft, control.endpoint)?.date;
    control.panel.innerHTML = \`<div class="calendar-navigation"><button type="button" data-picker-action="previous" aria-label="Previous month"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg></button><span data-month-heading aria-live="polite"></span><button type="button" data-picker-action="next" aria-label="Next month"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></button></div><div data-calendar class="sp-calendar"></div><div class="endpoint-popup-footer"><button type="button" data-close-choice>Close</button></div>\`;
    const picker = mountDatePicker(control.panel, {
      referenceDate: state.options.referenceDate,
      locale: state.options.locale,
      weekStartsOn: state.options.weekStartsOn,
      minDate: state.options.minDate,
      maxDate: state.options.maxDate,
      isDateUnavailable: state.options.isDateUnavailable,
      fixedWeeks: true,
      defaultValue: date ? { date } : null,
      month: date ? parseDate(date) : state.visibleMonth,
      onSelect(date) {
        parent.setDate(date, control.endpoint);
        // Let the child calendar finish notifying before disposing its bindings.
        queueMicrotask(() => {
          if (active === control) close(true);
        });
      },
    });
    return () => picker.destroy();
  }

  function mountTime(control: Control) {
    const state = parent.getSnapshot();
    const point = pointFor(state.draft, control.endpoint);
    const cycle = state.options.hourCycle;
    const seconds = !!state.options.seconds || point?.time?.length === 8;
    const clock = createTimePickerStore({
      referenceDate: state.options.referenceDate,
      commit: "explicit",
      hourCycle: cycle,
      seconds,
      defaultValue: point?.time ? { time: point.time } : null,
    });
    const columns = [
      {
        part: "hour",
        label: "Hours",
        values: Array.from({ length: cycle }, (_, i) =>
          cycle === 12 ? i + 1 : i,
        ),
      },
      {
        part: "minute",
        label: "Minutes",
        values: Array.from(
          { length: Math.ceil(60 / state.options.minuteStep) },
          (_, i) => i * state.options.minuteStep,
        ),
      },
      ...(seconds
        ? [
            {
              part: "second",
              label: "Seconds",
              values: Array.from({ length: 60 }, (_, i) => i),
            },
          ]
        : []),
    ];
    control.panel.innerHTML = \`<div class="time-choice-columns">\${columns.map((column) => \`<div class="time-choice-column"><h3>\${column.label}</h3><div class="time-choice-list" role="radiogroup" aria-label="\${column.label}">\${column.values.map((value) => \`<button type="button" role="radio" aria-checked="false" tabindex="-1" data-time-choice="\${column.part}" data-value="\${value}" aria-label="\${value} \${column.label.toLowerCase()}">\${String(value).padStart(2, "0")}</button>\`).join("")}</div></div>\`).join("")}</div>\${cycle === 12 ? '<div class="time-choice-period" role="radiogroup" aria-label="Period"><button type="button" role="radio" aria-checked="false" data-time-choice="period" data-value="AM">AM</button><button type="button" role="radio" aria-checked="false" data-time-choice="period" data-value="PM">PM</button></div>' : ""}<div class="endpoint-popup-footer"><span data-clock-preview aria-live="polite">Choose a time</span><button type="button" data-close-choice>Done</button></div>\`;
    const buttons = [
      ...control.panel.querySelectorAll<HTMLButtonElement>(
        "[data-time-choice]",
      ),
    ];
    const paint = () => {
      const time = pointFor(clock.getSnapshot().draft)?.time;
      const parts = timeParts(time ?? "00:00", cycle);
      for (const group of control.panel.querySelectorAll(
        '[role="radiogroup"]',
      )) {
        const choices = [
          ...group.querySelectorAll<HTMLButtonElement>("[data-time-choice]"),
        ];
        const chosen =
          time &&
          choices.find(
            (button) =>
              String(parts[button.dataset.timeChoice as keyof typeof parts]) ===
              button.dataset.value,
          );
        for (const button of choices) {
          const selected = button === chosen;
          button.setAttribute("aria-checked", String(selected));
          button.tabIndex = button === (chosen || choices[0]) ? 0 : -1;
        }
      }
      control.panel.querySelector("[data-clock-preview]")!.textContent = time
        ? displayTime(time, cycle)
        : "Choose a time";
    };
    const choose = (button: HTMLButtonElement) => {
      const current = pointFor(clock.getSnapshot().draft)?.time ?? "00:00";
      const next = updateTime(
        current,
        button.dataset.timeChoice as "hour" | "minute" | "second" | "period",
        button.dataset.value!,
        cycle,
        seconds,
      );
      clock.setTime(next);
      parent.setTime(next, control.endpoint);
    };
    const click = (event: MouseEvent) => {
      const button = (event.target as Element).closest<HTMLButtonElement>(
        "[data-time-choice]",
      );
      if (button) choose(button);
    };
    const key = (event: KeyboardEvent) => {
      const button = (event.target as Element).closest<HTMLButtonElement>(
        "[data-time-choice]",
      );
      if (
        !button ||
        ![
          "ArrowDown",
          "ArrowUp",
          "ArrowLeft",
          "ArrowRight",
          "Home",
          "End",
        ].includes(event.key)
      )
        return;
      event.preventDefault();
      const choices = buttons.filter(
        (candidate) =>
          candidate.dataset.timeChoice === button.dataset.timeChoice,
      );
      const index = choices.indexOf(button);
      const next =
        event.key === "Home"
          ? choices[0]
          : event.key === "End"
            ? choices.at(-1)!
            : choices[
                (index +
                  (["ArrowUp", "ArrowLeft"].includes(event.key) ? -1 : 1) +
                  choices.length) %
                  choices.length
              ];
      choose(next);
      next.focus({ preventScroll: true });
      next.scrollIntoView({ block: "nearest" });
    };
    control.panel.addEventListener("click", click);
    control.panel.addEventListener("keydown", key);
    paint();
    const stop = clock.subscribe(paint);
    return () => {
      stop();
      control.panel.removeEventListener("click", click);
      control.panel.removeEventListener("keydown", key);
      clock.destroy();
    };
  }

  for (const control of controls) {
    listen(control.trigger, "click", () => {
      if (active === control) {
        close(true);
        return;
      }
      close();
      if (control.trigger.disabled) return;
      active = control;
      control.panel.hidden = false;
      control.trigger.setAttribute("aria-expanded", "true");
      stopContent =
        control.part === "date" ? mountDate(control) : mountTime(control);
      position();
      for (const selected of control.panel.querySelectorAll<HTMLElement>(
        '[aria-checked="true"]',
      ))
        selected.scrollIntoView({ block: "center" });
      const first = control.panel.querySelector<HTMLElement>(
        '[data-day-trigger][tabindex="0"], [data-time-choice][tabindex="0"]',
      );
      first?.focus({ preventScroll: true });
    });
    listen(control.panel, "click", (event) => {
      if ((event.target as Element).closest("[data-close-choice]")) close(true);
    });
  }
  listen(document, "pointerdown", (event) => {
    if (
      active &&
      !active.panel.contains(event.target as Node) &&
      !active.trigger.contains(event.target as Node)
    )
      close();
  });
  listen(document, "keydown", (event) => {
    if (active && (event as KeyboardEvent).key === "Escape") {
      event.preventDefault();
      // Closing a child popup leaves the parent's draft untouched.
      close(true);
    }
  });
  listen(document, "focusin", (event) => {
    if (
      active &&
      !active.panel.contains(event.target as Node) &&
      event.target !== active.trigger
    )
      close();
  });
  listen(root, "click", (event) => {
    if (
      (event.target as Element).closest(
        '[data-picker-action="apply"], [data-picker-action="cancel"], [data-picker-action="clear"]',
      )
    )
      close();
  });
  listen(window, "resize", position);
  // A popup must not remain floating away from its trigger when the page scrolls.
  window.addEventListener(
    "scroll",
    (event) => {
      if (
        active &&
        !(event.target instanceof Node && active.panel.contains(event.target))
      )
        position();
    },
    { capture: true, signal: handlers.signal },
  );
  const update = () => {
    const state = parent.getSnapshot();
    for (const control of controls) {
      const point = pointFor(state.draft, control.endpoint);
      const value = point?.[control.part];
      const text = value
        ? control.part === "date"
          ? formatDate(value, state.options.locale, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : displayTime(value, state.options.hourCycle)
        : \`Choose \${control.part}\`;
      if (control.value.textContent !== text) control.value.textContent = text;
      control.trigger.disabled = !!(
        state.options.disabled || state.options.readOnly
      );
      control.trigger.dataset.value = value ?? "";
      if (control.trigger.disabled && active === control) close();
    }
  };
  update();
  const stop = parent.subscribe(update);
  return {
    close,
    destroy() {
      close();
      stop();
      handlers.abort();
    },
  };
}

function displayTime(value: string, cycle: 12 | 24) {
  const parts = timeParts(value, cycle);
  return \`\${String(parts.hour).padStart(2, "0")}:\${String(parts.minute).padStart(2, "0")}\${value.length === 8 ? ":" + String(parts.second).padStart(2, "0") : ""}\${cycle === 12 ? " " + parts.period : ""}\`;
}
`,t=`/* Example compositions: package calendars and clock state, app-owned popups. */
.picker-control-trigger,
.endpoint-popup button {
  box-sizing: border-box;
  font: inherit;
  color: inherit;
  background: #fff;
  border: 1px solid var(--rule, #dddde2);
  border-radius: 0;
  min-height: 40px;
  padding: 8px 12px;
  cursor: pointer;
}
.picker-control-trigger:disabled {
  opacity: 0.4;
  cursor: default;
}
.picker-control-trigger:focus-visible,
.endpoint-popup button:focus-visible {
  outline: 2px solid var(--accent, #e4002b);
  outline-offset: 3px;
}
.picker-control {
  display: grid;
  gap: 8px;
  min-width: 0;
}
.picker-control + .picker-control {
  margin-top: 16px;
}
.picker-control-label {
  font-size: 12px;
}
.picker-control-trigger {
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  width: 100%;
  min-height: 44px;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}
.picker-control-trigger[aria-expanded="true"] {
  border-color: var(--accent, #e4002b);
}
.picker-control-trigger svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}
.endpoint-popup {
  box-sizing: border-box;
  position: fixed;
  z-index: 10;
  padding: 16px;
  border: 1px solid #181818;
  background: #fff;
  overflow: auto;
}
.endpoint-popup[hidden] {
  display: none;
}
.endpoint-popup .calendar-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}
.endpoint-popup .calendar-navigation span {
  font-size: 14px;
}
.endpoint-popup .calendar-navigation button {
  display: grid;
  place-items: center;
  width: 40px;
  padding: 8px;
}
.endpoint-popup .calendar-navigation svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}
.endpoint-popup .sp-month h3 {
  display: none;
}
.endpoint-popup .sp-grid [data-day-trigger] {
  width: 34px;
  height: 36px;
  min-height: 36px;
  border-radius: 0;
}
.endpoint-popup-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--rule, #dddde2);
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}
.endpoint-popup-footer button {
  margin-left: auto;
  min-height: 36px;
  font-size: 12px;
}
.time-choice-columns {
  display: flex;
  gap: 12px;
}
.time-choice-column {
  flex: 1;
  min-width: 0;
}
.time-choice-column h3 {
  font-size: 12px;
  margin: 0 0 12px;
  font-weight: 500;
}
.time-choice-list {
  height: 240px;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  border: 1px solid var(--rule, #dddde2);
}
.time-choice-list button {
  display: block;
  width: 100%;
  border: 0;
  min-height: 40px;
  font-size: 14px;
  font-variant-numeric: tabular-nums;
}
.time-choice-list button:hover {
  background: #f7f7f8;
}
.time-choice-list button:focus-visible {
  outline-offset: -3px;
}
.time-choice-period {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}
.time-choice-period button {
  flex: 1;
  font-size: 12px;
}
.endpoint-popup [data-time-choice][aria-checked="true"] {
  background: var(--accent, #e4002b);
  color: #fff;
}
@media (max-height: 560px) {
  .time-choice-list {
    height: 160px;
  }
}
`;export{t as a,n as c};
