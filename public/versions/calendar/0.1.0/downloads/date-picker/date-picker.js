"use strict";
var SalyraDatePicker = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // packages/date-picker/src/vanilla.ts
  var vanilla_exports = {};
  __export(vanilla_exports, {
    addDays: () => addDays,
    addMonths: () => addMonths,
    attribute: () => attribute,
    bindCalendar: () => bindCalendar,
    bindDateField: () => bindDateField,
    bindDayTrigger: () => bindDayTrigger,
    bindMonthScroller: () => bindMonthScroller,
    bindPickerForm: () => bindPickerForm,
    bindPickerPopover: () => bindPickerPopover,
    bindTimeSegment: () => bindTimeSegment,
    calendarMarkup: () => calendarMarkup,
    createCalendarEngine: () => createCalendarEngine,
    createDatePickerStore: () => createDatePickerStore,
    createPickerStore: () => createPickerStore2,
    dateFormatter: () => dateFormatter,
    dateString: () => dateString,
    dayAttributes: () => dayAttributes,
    dayNumber: () => dayNumber,
    dayTriggerAttributes: () => dayTriggerAttributes,
    daysInMonth: () => daysInMonth,
    escapeHTML: () => escapeHTML,
    formatDate: () => formatDate,
    formatMonth: () => formatMonth,
    fromDayNumber: () => fromDayNumber,
    isRange: () => isRange,
    leapYear: () => leapYear,
    monthScrollerMarkup: () => monthScrollerMarkup,
    mountDatePicker: () => mountDatePicker,
    mountPicker: () => mountPicker2,
    parseDate: () => parseDate,
    pointFor: () => pointFor,
    resolveZonedDateTime: () => resolveZonedDateTime,
    shiftDateMonths: () => shiftDateMonths,
    timeParts: () => timeParts,
    timeSeconds: () => timeSeconds,
    timeSegmentValue: () => timeSegmentValue,
    timeSlots: () => timeSlots,
    timeString: () => timeString,
    today: () => today,
    updateTime: () => updateTime,
    utcDate: () => utcDate,
    validateWeekStart: () => validateWeekStart,
    weekNumber: () => weekNumber,
    weekday: () => weekday,
    weekdayLabels: () => weekdayLabels
  });

  // packages/calendar/src/core/calendar.ts
  function leapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }
  function daysInMonth(year, month) {
    if (!Number.isInteger(year) || year < 1 || year > 9999 || !Number.isInteger(month) || month < 1 || month > 12)
      throw new RangeError(
        "Calendar supports Gregorian years 1\u20139999 and months 1\u201312"
      );
    return month === 2 ? leapYear(year) ? 29 : 28 : [4, 6, 9, 11].includes(month) ? 30 : 31;
  }
  function parseDate(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match) throw new RangeError("Use YYYY-MM-DD");
    const [, y, m, d] = match;
    const date = { year: Number(y), month: Number(m), day: Number(d) };
    if (date.day < 1 || date.day > daysInMonth(date.year, date.month))
      throw new RangeError("Invalid calendar date");
    return date;
  }
  function dateString(date) {
    if (!Number.isInteger(date.day) || date.day < 1 || date.day > daysInMonth(date.year, date.month))
      throw new RangeError("Invalid calendar date");
    return `${String(date.year).padStart(4, "0")}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
  }
  function dayNumber(input) {
    const date = typeof input === "string" ? parseDate(input) : parseDate(dateString(input));
    let y = date.year - (date.month <= 2 ? 1 : 0);
    const era = Math.floor(y / 400), yo = y - era * 400;
    const m = date.month + (date.month > 2 ? -3 : 9);
    const doy = Math.floor((153 * m + 2) / 5) + date.day - 1;
    return era * 146097 + yo * 365 + Math.floor(yo / 4) - Math.floor(yo / 100) + doy - 719468;
  }
  function fromDayNumber(n) {
    if (!Number.isInteger(n))
      throw new RangeError("Day number must be an integer");
    const z = n + 719468, era = Math.floor(z / 146097), doe = z - era * 146097;
    const yo = Math.floor(
      (doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365
    );
    let y = yo + era * 400;
    const doy = doe - (365 * yo + Math.floor(yo / 4) - Math.floor(yo / 100));
    const mp = Math.floor((5 * doy + 2) / 153);
    const day = doy - Math.floor((153 * mp + 2) / 5) + 1;
    const month = mp + (mp < 10 ? 3 : -9);
    y += month <= 2 ? 1 : 0;
    const result = { year: y, month, day };
    dateString(result);
    return result;
  }
  function addDays(date, count) {
    return dateString(fromDayNumber(dayNumber(date) + count));
  }
  function weekday(date) {
    return ((dayNumber(date) + 4) % 7 + 7) % 7;
  }
  function addMonths(month, count) {
    daysInMonth(month.year, month.month);
    if (!Number.isInteger(count))
      throw new RangeError("Month offset must be an integer");
    const n = (month.year - 1) * 12 + month.month - 1 + count;
    const next = {
      year: Math.floor(n / 12) + 1,
      month: (n % 12 + 12) % 12 + 1
    };
    daysInMonth(next.year, next.month);
    return next;
  }
  function shiftDateMonths(value, count) {
    const date = parseDate(value), next = addMonths(date, count);
    return dateString({
      ...next,
      day: Math.min(date.day, daysInMonth(next.year, next.month))
    });
  }
  function weekNumber(value) {
    const n = dayNumber(value), dow = (weekday(value) + 6) % 7;
    const thursday = fromDayNumber(n + 3 - dow);
    const jan4 = `${String(thursday.year).padStart(4, "0")}-01-04`;
    const first = dayNumber(jan4) - (weekday(jan4) + 6) % 7;
    return { year: thursday.year, week: Math.floor((n - first) / 7) + 1 };
  }
  function validateWeekStart(value) {
    if (!Number.isInteger(value) || value < 0 || value > 6)
      throw new RangeError("weekStartsOn must be 0\u20136");
    return value;
  }
  function createCalendarEngine(capacity = 48) {
    if (!Number.isInteger(capacity) || capacity < 1)
      throw new RangeError("Cache capacity must be positive");
    const cache = /* @__PURE__ */ new Map();
    return {
      month(year, month, options = {}) {
        daysInMonth(year, month);
        const start = validateWeekStart(options.weekStartsOn ?? 1);
        const key = `${year}:${month}:${start}:${!!options.fixedWeeks}:${options.outsideDays ?? "visible"}`;
        const cached = cache.get(key);
        if (cached) {
          cache.delete(key);
          cache.set(key, cached);
          return cached;
        }
        const first = dateString({ year, month, day: 1 }), leading = (weekday(first) - start + 7) % 7;
        const firstNumber = dayNumber(first), minNumber = dayNumber("0001-01-01"), maxNumber = dayNumber("9999-12-31");
        const length = options.fixedWeeks ? 42 : Math.ceil((leading + daysInMonth(year, month)) / 7) * 7;
        const weeks = [];
        for (let row = 0; row < length / 7; row++) {
          const cells = [];
          for (let col = 0; col < 7; col++) {
            const n = firstNumber - leading + row * 7 + col;
            if (n < minNumber || n > maxNumber) {
              cells.push(
                Object.freeze({
                  date: "",
                  day: 0,
                  weekday: (start + col) % 7,
                  outside: true,
                  hidden: true
                })
              );
              continue;
            }
            const date = fromDayNumber(n), outside = date.month !== month;
            cells.push(
              Object.freeze({
                date: dateString(date),
                day: date.day,
                weekday: (start + col) % 7,
                outside,
                hidden: outside && options.outsideDays === "hidden"
              })
            );
          }
          weeks.push(Object.freeze(cells));
        }
        const result = Object.freeze({
          year,
          month,
          weeks: Object.freeze(weeks)
        });
        cache.set(key, result);
        if (cache.size > capacity) cache.delete(cache.keys().next().value);
        return result;
      },
      clear() {
        cache.clear();
      },
      get cacheSize() {
        return cache.size;
      }
    };
  }

  // packages/calendar/src/core/format.ts
  var formatters = /* @__PURE__ */ new Map();
  function dateFormatter(locale, options) {
    const key = JSON.stringify([locale, options]);
    let f = formatters.get(key);
    if (!f) {
      f = new Intl.DateTimeFormat(locale, {
        ...options,
        calendar: "gregory",
        timeZone: "UTC"
      });
      formatters.set(key, f);
      if (formatters.size > 32)
        formatters.delete(formatters.keys().next().value);
    }
    return f;
  }
  function utcDate(value) {
    const { year, month, day } = parseDate(value);
    const date = /* @__PURE__ */ new Date(0);
    date.setUTCFullYear(year, month - 1, day);
    date.setUTCHours(12, 0, 0, 0);
    return date;
  }
  function formatDate(value, locale = "en-GB", options = { dateStyle: "long" }) {
    return dateFormatter(locale, options).format(utcDate(value));
  }
  function formatMonth(month, locale = "en-GB") {
    return formatDate(
      `${String(month.year).padStart(4, "0")}-${String(month.month).padStart(2, "0")}-01`,
      locale,
      { month: "long", year: "numeric" }
    );
  }
  function weekdayLabels(locale, weekStartsOn, width = "short") {
    const formatter = dateFormatter(locale, { weekday: width });
    return Array.from({ length: 7 }, (_, i) => {
      const day = (weekStartsOn + i) % 7;
      return {
        weekday: day,
        label: formatter.format(
          utcDate(`2023-01-${String(day + 1).padStart(2, "0")}`)
        )
      };
    });
  }
  function today(timeZone = "UTC", now = /* @__PURE__ */ new Date()) {
    const p = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      calendar: "gregory",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(now);
    const get = (type) => p.find((x) => x.type === type).value;
    return `${get("year").padStart(4, "0")}-${get("month")}-${get("day")}`;
  }

  // packages/calendar/src/core/time.ts
  function timeSeconds(value) {
    const m = /^(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(value);
    if (!m || Number(m[1]) > 23 || Number(m[2]) > 59 || Number(m[3] ?? 0) > 59)
      throw new RangeError("Use HH:mm or HH:mm:ss");
    return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3] ?? 0);
  }
  function timeString(seconds, withSeconds = false) {
    if (!Number.isInteger(seconds) || seconds < 0 || seconds > 86399)
      throw new RangeError("Time must fit within a day");
    const parts = [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60];
    if (withSeconds) parts.push(seconds % 60);
    return parts.map((n) => String(n).padStart(2, "0")).join(":");
  }
  function timeParts(value, hourCycle = 24) {
    const seconds = timeSeconds(value), hour = Math.floor(seconds / 3600);
    return {
      hour: hourCycle === 12 ? hour % 12 || 12 : hour,
      minute: Math.floor(seconds / 60) % 60,
      second: seconds % 60,
      period: hour < 12 ? "AM" : "PM"
    };
  }
  function updateTime(value, part, next, hourCycle = 24, seconds = false) {
    const p = timeParts(value, 24);
    let h = p.hour, m = p.minute, s = p.second;
    if (part === "period") {
      if (next !== "AM" && next !== "PM") throw new RangeError("Use AM or PM");
      h = h % 12 + (next === "PM" ? 12 : 0);
    } else {
      const n = Number(next), max = part === "hour" ? hourCycle === 12 ? 12 : 23 : 59, min = part === "hour" && hourCycle === 12 ? 1 : 0;
      if (!Number.isInteger(n) || n < min || n > max)
        throw new RangeError("Invalid time segment");
      if (part === "hour")
        h = hourCycle === 12 ? n % 12 + (p.period === "PM" ? 12 : 0) : n;
      if (part === "minute") m = n;
      if (part === "second") s = n;
    }
    return timeString(h * 3600 + m * 60 + s, seconds);
  }
  function timeSlots(stepMinutes = 30, min = "00:00", max = "23:59") {
    if (!Number.isInteger(stepMinutes) || stepMinutes < 1 || stepMinutes > 1440)
      throw new RangeError("Time step must be 1\u20131440 minutes");
    const slots = [], first = timeSeconds(min), last = timeSeconds(max), seconds = min.length === 8 || max.length === 8;
    if (first > last)
      throw new RangeError("Time slot bounds must be ordered within one day");
    for (let n = first; n <= last; n += stepMinutes * 60)
      slots.push(timeString(n, seconds));
    return Object.freeze(slots);
  }
  function timeSegmentValue(time, part, hourCycle = 24) {
    return !time && part !== "period" ? "" : String(timeParts(time ?? "00:00", hourCycle)[part]);
  }

  // packages/calendar/src/core/store.ts
  function isRange(value) {
    return value !== null && "start" in value;
  }
  function pointFor(value, endpoint = "start") {
    return isRange(value) ? value[endpoint] : endpoint === "start" ? value : null;
  }
  var eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  function resolve(options) {
    if (options.kind && !["date", "time", "datetime"].includes(options.kind))
      throw new RangeError("Invalid picker kind");
    if (options.selection && !["single", "range", "none"].includes(options.selection))
      throw new RangeError("Invalid selection");
    if (options.hourCycle !== void 0 && options.hourCycle !== 12 && options.hourCycle !== 24)
      throw new RangeError("hourCycle must be 12 or 24");
    const referenceDate = options.referenceDate ?? today(options.timeZone ?? "UTC");
    parseDate(referenceDate);
    const months = options.months ?? 1, minuteStep = options.minuteStep ?? 1;
    if (!Number.isInteger(months) || months < 1 || months > 12)
      throw new RangeError("months must be 1\u201312");
    if (!Number.isInteger(minuteStep) || minuteStep < 1 || minuteStep > 60)
      throw new RangeError("minuteStep must be 1\u201360");
    if (options.minDate) parseDate(options.minDate);
    if (options.maxDate) parseDate(options.maxDate);
    if (options.minDate && options.maxDate && options.minDate > options.maxDate)
      throw new RangeError("minDate must precede maxDate");
    if (options.minTime) timeSeconds(options.minTime);
    if (options.maxTime) timeSeconds(options.maxTime);
    if (options.minTime && options.maxTime && timeSeconds(options.minTime) > timeSeconds(options.maxTime))
      throw new RangeError("minTime must precede maxTime");
    for (const limit of [options.minDuration, options.maxDuration])
      if (limit !== void 0 && (!Number.isFinite(limit) || limit < 0))
        throw new RangeError("Duration must be nonnegative");
    if (options.minDuration !== void 0 && options.maxDuration !== void 0 && options.minDuration > options.maxDuration)
      throw new RangeError("minDuration must not exceed maxDuration");
    const weekend = Object.freeze([...options.weekend ?? [0, 6]]);
    weekend.forEach(validateWeekStart);
    const timeZone = options.timeZone ?? "UTC";
    new Intl.DateTimeFormat("en", { timeZone });
    return Object.freeze({
      ...options,
      kind: options.kind ?? "date",
      selection: options.selection ?? "single",
      referenceDate,
      locale: options.locale ?? "en-GB",
      timeZone,
      weekStartsOn: validateWeekStart(options.weekStartsOn ?? 1),
      months,
      weekend,
      hourCycle: options.hourCycle ?? 24,
      minuteStep
    });
  }
  function freezePoint(point, options) {
    if (!point) return null;
    const p = {};
    if (options.kind !== "time") {
      if (!point.date) throw new RangeError("Date is required");
      parseDate(point.date);
      p.date = point.date;
    } else if (point.date) {
      parseDate(point.date);
      p.date = point.date;
    }
    if (options.kind !== "date") {
      if (point.time) {
        timeSeconds(point.time);
        p.time = point.time;
      }
      if (point.dayOffset !== void 0) {
        if (p.date) throw new RangeError("Use date or dayOffset, not both");
        if (!Number.isInteger(point.dayOffset) || point.dayOffset < 0)
          throw new RangeError("dayOffset must be nonnegative");
        p.dayOffset = point.dayOffset;
      }
    }
    return Object.freeze(p);
  }
  function normalize(value, options) {
    if (!value)
      return options.selection === "range" ? Object.freeze({ start: null, end: null }) : null;
    if (options.selection === "range") {
      if (!isRange(value)) throw new RangeError("A range requires start and end");
      return Object.freeze({
        start: freezePoint(value.start, options),
        end: freezePoint(value.end, options)
      });
    }
    if (isRange(value))
      throw new RangeError("Single selection expects one point");
    return freezePoint(value, options);
  }
  function position(point) {
    return (point.date ? dayNumber(point.date) : point.dayOffset ?? 0) * 86400 + (point.time ? timeSeconds(point.time) : 0);
  }
  function createPickerStore(input = {}) {
    let options = resolve(input);
    const initial = normalize(
      input.value === void 0 ? input.defaultValue ?? null : input.value,
      options
    );
    const engine = createCalendarEngine();
    const month = input.month ?? parseDate(pointFor(initial)?.date ?? options.referenceDate);
    addMonths(month, options.months - 1);
    let snapshot = Object.freeze({
      options,
      value: initial,
      draft: initial,
      visibleMonth: Object.freeze({ year: month.year, month: month.month }),
      focusedDate: pointFor(initial)?.date ?? options.referenceDate,
      hoverDate: null,
      activeEndpoint: "start",
      open: false,
      error: null
    });
    const listeners = /* @__PURE__ */ new Set(), valueListeners = /* @__PURE__ */ new Set();
    const update = (patch) => {
      const previous = snapshot;
      if (Object.entries(patch).every(
        ([k, v]) => k === "options" ? previous.options === v : eq(previous[k], v)
      ))
        return;
      snapshot = Object.freeze({ ...snapshot, ...patch });
      listeners.forEach((fn) => fn());
      if (!eq(previous.value, snapshot.value)) {
        valueListeners.forEach((fn) => fn(snapshot.value));
        options.onValueChange?.(snapshot.value);
      }
    };
    const unavailable = (date) => !!(options.minDate && date < options.minDate || options.maxDate && date > options.maxDate || options.isDateUnavailable?.(date));
    function validation(value, complete = false) {
      const points = isRange(value) ? [value.start, value.end] : [value];
      if (points.every((point) => point === null)) return null;
      for (const p of points) {
        if (!p) {
          if (complete) return "Choose a complete value";
          continue;
        }
        if (p.date && unavailable(p.date)) return "This date is unavailable";
        if (options.kind !== "date") {
          if (!p.time) {
            if (complete) return "Choose a time";
            continue;
          }
          const t = timeSeconds(p.time);
          if (options.minTime && t < timeSeconds(options.minTime) || options.maxTime && t > timeSeconds(options.maxTime) || options.isTimeUnavailable?.(p.time, p))
            return "This time is unavailable";
        }
      }
      if (isRange(value) && value.start && value.end && (options.kind === "date" || value.start.time && value.end.time)) {
        if (options.kind === "time" && !!value.start.date !== !!value.end.date)
          return "Both endpoints need dates, or neither";
        const span = position(value.end) - position(value.start);
        if (span < 0) return "The end must follow the start";
        const duration = options.kind === "date" ? span / 86400 + 1 : span;
        if (options.minDuration !== void 0 && duration < options.minDuration)
          return "The interval is too short";
        if (options.maxDuration !== void 0 && duration > options.maxDuration)
          return "The interval is too long";
        if (options.isRangeUnavailable?.(value.start, value.end))
          return "This interval is unavailable";
      }
      return null;
    }
    function change(value, endpoint = snapshot.activeEndpoint, keepInvalid = false) {
      const next = normalize(value, options), error2 = validation(next);
      if (error2) {
        update(
          keepInvalid ? { draft: next, error: error2, activeEndpoint: endpoint } : { error: error2 }
        );
        return false;
      }
      const complete = validation(next, true) === null;
      update({
        draft: next,
        error: null,
        activeEndpoint: endpoint,
        ...options.commit !== "explicit" && complete ? { value: next } : {}
      });
      return true;
    }
    function replacePoint(point, endpoint) {
      return change(
        options.selection === "range" ? {
          start: pointFor(snapshot.draft, "start"),
          end: pointFor(snapshot.draft, "end"),
          [endpoint]: point
        } : point,
        endpoint,
        true
      );
    }
    const store = {
      getSnapshot: () => snapshot,
      subscribe(fn) {
        listeners.add(fn);
        return () => {
          listeners.delete(fn);
        };
      },
      subscribeValue(fn) {
        valueListeners.add(fn);
        return () => {
          valueListeners.delete(fn);
        };
      },
      getMonth(offset = 0) {
        const m = addMonths(snapshot.visibleMonth, offset);
        return engine.month(m.year, m.month, options);
      },
      getDay(date) {
        if (!date)
          return {
            selected: false,
            rangeStart: false,
            rangeEnd: false,
            inRange: false,
            preview: false,
            disabled: true,
            today: false,
            weekend: false,
            focused: false
          };
        const d = snapshot.draft, start = pointFor(d)?.date, end = isRange(d) ? d.end?.date : void 0;
        const hover = !end && start ? snapshot.hoverDate : null;
        const lo = hover && hover < start ? hover : start, hi = hover && hover < start ? start : hover ?? end;
        return {
          selected: date === start || date === end,
          rangeStart: date === start,
          rangeEnd: date === end,
          inRange: !!(lo && hi && date >= lo && date <= hi),
          preview: !!hover,
          disabled: !!options.disabled || unavailable(date),
          today: date === options.referenceDate,
          weekend: options.weekend.includes(weekday(date)),
          focused: date === snapshot.focusedDate
        };
      },
      setVisibleMonth(next) {
        addMonths(next, options.months - 1);
        update({
          visibleMonth: Object.freeze({ year: next.year, month: next.month }),
          hoverDate: null
        });
      },
      navigate(count) {
        store.setVisibleMonth(addMonths(snapshot.visibleMonth, count));
      },
      focus(date) {
        parseDate(date);
        update({ focusedDate: date });
        const d = parseDate(date), first = dateString({ ...snapshot.visibleMonth, day: 1 }), last = addMonths(snapshot.visibleMonth, options.months - 1);
        if (date < first || date > dateString({ ...last, day: daysInMonth(last.year, last.month) })) {
          const lastStart = addMonths(
            { year: 9999, month: 12 },
            -(options.months - 1)
          );
          store.setVisibleMonth(
            d.year > lastStart.year || d.year === lastStart.year && d.month > lastStart.month ? lastStart : d
          );
        }
      },
      moveFocus(key, shift = false) {
        let date = snapshot.focusedDate;
        const offsets = {
          ArrowLeft: -1,
          ArrowRight: 1,
          ArrowUp: -7,
          ArrowDown: 7
        };
        if (key in offsets) date = addDays(date, offsets[key]);
        else if (key === "Home")
          date = addDays(date, -((weekday(date) - options.weekStartsOn + 7) % 7));
        else if (key === "End")
          date = addDays(
            date,
            6 - (weekday(date) - options.weekStartsOn + 7) % 7
          );
        else if (key === "PageUp" || key === "PageDown")
          date = shiftDateMonths(
            date,
            (key === "PageUp" ? -1 : 1) * (shift ? 12 : 1)
          );
        else return false;
        store.focus(date);
        return true;
      },
      hover(date) {
        if (date) parseDate(date);
        if (options.selection === "range" && pointFor(snapshot.draft)?.date && !pointFor(snapshot.draft, "end"))
          update({ hoverDate: date });
      },
      selectDate(date) {
        parseDate(date);
        if (options.disabled || options.readOnly || unavailable(date))
          return false;
        if (options.selection === "none") {
          options.onSelect?.(date);
          return true;
        }
        if (options.kind === "time")
          return store.setDate(date, snapshot.activeEndpoint);
        const previous = pointFor(snapshot.draft, snapshot.activeEndpoint);
        let point = {
          date,
          ...options.kind === "datetime" && previous?.time ? { time: previous.time } : {}
        };
        let next = point, active = "start";
        if (options.selection === "range") {
          const start = pointFor(snapshot.draft), end = pointFor(snapshot.draft, "end");
          if (!start || end) {
            next = { start: point, end: null };
            active = "end";
          } else {
            next = date < start.date ? { start: point, end: start } : { start, end: point };
            active = "end";
          }
        }
        const accepted = change(next, active);
        if (accepted) {
          update({ focusedDate: date, hoverDate: null });
          options.onSelect?.(date);
        }
        return accepted;
      },
      setDate(date, endpoint = "start") {
        parseDate(date);
        if (options.disabled || options.readOnly) return false;
        const current = pointFor(snapshot.draft, endpoint);
        return replacePoint(
          {
            date,
            ...options.kind !== "date" && current?.time ? { time: current.time } : {}
          },
          endpoint
        );
      },
      setTime(time, endpoint = "start") {
        timeSeconds(time);
        if (options.disabled || options.readOnly || options.kind === "date")
          return false;
        const current = pointFor(snapshot.draft, endpoint);
        return replacePoint(
          {
            ...current,
            time,
            ...options.kind === "datetime" && !current?.date ? { date: options.referenceDate } : {}
          },
          endpoint
        );
      },
      setDayOffset(offset, endpoint = "end") {
        if (!Number.isInteger(offset) || offset < 0)
          throw new RangeError("Day offset must be nonnegative");
        if (options.disabled || options.readOnly || options.kind !== "time")
          return false;
        const current = pointFor(snapshot.draft, endpoint);
        return replacePoint(
          { ...current, date: void 0, dayOffset: offset },
          endpoint
        );
      },
      setEndpoint(endpoint) {
        if (endpoint === "end" && options.selection !== "range")
          throw new RangeError("End is available only for a range");
        update({ activeEndpoint: endpoint });
      },
      setValue(value) {
        const next = normalize(value, options), error2 = validation(next);
        if (error2) throw new RangeError(error2);
        update({ value: next, draft: next, error: null, hoverDate: null });
      },
      apply() {
        if (options.disabled || options.readOnly) return false;
        const error2 = validation(snapshot.draft, true);
        if (error2) {
          update({ error: error2 });
          return false;
        }
        update({ value: snapshot.draft, error: null, open: false });
        return true;
      },
      cancel() {
        update({
          draft: snapshot.value,
          error: null,
          hoverDate: null,
          open: false
        });
      },
      clear() {
        if (options.disabled || options.readOnly) return;
        const next = normalize(null, options);
        update({
          draft: next,
          value: options.commit === "explicit" ? snapshot.value : next,
          error: null,
          hoverDate: null,
          activeEndpoint: "start"
        });
      },
      setOpen(open) {
        if (open && options.disabled) return;
        update({ open });
      },
      setOptions(patch) {
        if (Object.entries(patch).every(
          ([key, value]) => Object.is(options[key], value)
        ))
          return;
        if (patch.kind && patch.kind !== options.kind || patch.selection && patch.selection !== options.selection)
          throw new RangeError("Create a new store to change kind or selection");
        const next = resolve({ ...options, ...patch });
        addMonths(snapshot.visibleMonth, next.months - 1);
        options = next;
        update({ options: next, error: validation(snapshot.draft) });
      },
      validate: () => validation(snapshot.draft, true),
      destroy() {
        listeners.clear();
        valueListeners.clear();
        engine.clear();
      },
      get cacheSize() {
        return engine.cacheSize;
      }
    };
    const error = validation(initial);
    if (error) throw new RangeError(error);
    return store;
  }

  // packages/calendar/src/core/timezone.ts
  function resolveZonedDateTime(point, timeZone, disambiguation = "reject") {
    if (!point.date || !point.time)
      throw new RangeError("Date and time are required");
    parseDate(point.date);
    const target = dayNumber(point.date) * 864e5 + timeSeconds(point.time) * 1e3;
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      calendar: "gregory",
      numberingSystem: "latn",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23"
    });
    const wall = (stamp) => {
      const p = formatter.formatToParts(new Date(stamp));
      const get = (key) => p.find((v) => v.type === key).value;
      return dayNumber(
        `${get("year").padStart(4, "0")}-${get("month")}-${get("day")}`
      ) * 864e5 + timeSeconds(`${get("hour")}:${get("minute")}:${get("second")}`) * 1e3;
    };
    const offsets = /* @__PURE__ */ new Set();
    for (const hours of [-48, -24, -12, 0, 12, 24, 48]) {
      const n = target + hours * 36e5;
      offsets.add(wall(n) - n);
    }
    const candidates = [...offsets].map((offset) => target - offset).sort((a, b) => a - b);
    const matches = candidates.filter((n) => wall(n) === target);
    if (matches.length === 1) return new Date(matches[0]);
    if (disambiguation === "reject")
      throw new RangeError(
        matches.length ? "This local time occurs twice" : "This local time does not exist"
      );
    const choice = matches.length ? matches : candidates;
    return new Date(
      disambiguation === "earlier" ? choice[0] : choice[choice.length - 1]
    );
  }

  // packages/calendar/src/core/dom.ts
  function escapeHTML(value) {
    return String(value ?? "").replace(
      /[&<>"']/g,
      (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]
    );
  }
  function attribute(el, name, value) {
    if (value === false || value == null) {
      if (el.hasAttribute(name)) el.removeAttribute(name);
    } else {
      const next = value === true ? "" : value;
      if (el.getAttribute(name) !== next) el.setAttribute(name, next);
    }
  }
  function dayAttributes(store, date, outside = false) {
    const state = store.getDay(date), options = store.getSnapshot().options;
    return {
      "data-date": date,
      "data-selected": state.selected ? "" : void 0,
      "data-range-start": state.rangeStart ? "" : void 0,
      "data-range-end": state.rangeEnd ? "" : void 0,
      "data-in-range": state.inRange ? "" : void 0,
      "data-preview": state.preview && state.inRange ? "" : void 0,
      "data-weekend": state.weekend ? "" : void 0,
      "data-outside": outside ? "" : void 0,
      "data-today": state.today ? "" : void 0,
      "aria-selected": state.selected || state.inRange && !state.preview ? "true" : "false"
    };
  }
  function dayTriggerAttributes(store, date, outside = false) {
    const { "aria-selected": selected, ...attributes } = dayAttributes(
      store,
      date,
      outside
    );
    return attributes;
  }
  function calendarMarkup(store, render = {}) {
    const { options, focusedDate } = store.getSnapshot(), labels = weekdayLabels(options.locale, options.weekStartsOn), fullLabels = weekdayLabels(options.locale, options.weekStartsOn, "long");
    const grids = Array.from(
      { length: options.months },
      (_, offset) => store.getMonth(offset)
    );
    const days = grids.flatMap((month) => month.weeks.flat()).filter((day) => !day.hidden && !day.outside);
    const tabDate = days.some(
      (day) => day.date === focusedDate && !store.getDay(day.date).disabled
    ) ? focusedDate : days.find((day) => !store.getDay(day.date).disabled)?.date;
    return Array.from({ length: options.months }, (_, index) => {
      const month = grids[index];
      const headings = labels.map((day) => {
        const custom = render.weekdays?.[day.weekday], label = custom?.label ?? day.label, accessible = custom?.ariaLabel ?? (custom?.label || fullLabels.find((v) => v.weekday === day.weekday).label);
        return `<th scope="col" data-part="weekday" data-weekday="${day.weekday}" class="${escapeHTML(custom?.class ?? "")}" ${options.weekend.includes(day.weekday) ? "data-weekend" : ""} aria-label="${escapeHTML(accessible)}">${render.renderWeekday?.(day.weekday, label) ?? escapeHTML(label)}</th>`;
      }).join("");
      return `<section class="sp-month" data-part="month"><h3 data-part="month-title" aria-live="polite">${escapeHTML(formatMonth(month, options.locale))}</h3><table role="grid" aria-readonly="${!!options.readOnly}" aria-multiselectable="${options.selection === "range"}" aria-label="${escapeHTML(formatMonth(month, options.locale))}" class="sp-grid"><thead><tr>${headings}</tr></thead><tbody>${month.weeks.map(
        (week) => `<tr>${week.map((day) => {
          if (day.hidden)
            return '<td role="gridcell" aria-disabled="true"></td>';
          const state = store.getDay(day.date), disabled = state.disabled || day.outside && options.outsideSelectable === false;
          const attrs = Object.entries(
            dayAttributes(store, day.date, day.outside)
          ).map(([k, v]) => v == null ? "" : `${k}="${escapeHTML(v)}"`).join(" ");
          const content = render.renderCell?.(day, state) ?? `<button type="button" data-day-trigger data-date="${day.date}" aria-label="${escapeHTML(formatDate(day.date, options.locale))}" ${disabled ? "disabled" : ""} tabindex="${day.date === tabDate && !day.outside ? "0" : "-1"}"><span data-part="number">${day.day}</span></button>`;
          return `<td role="gridcell" data-part="cell" ${attrs}>${content}</td>`;
        }).join("")}</tr>`
      ).join("")}</tbody></table></section>`;
    }).join("");
  }
  function bindCalendar(root, store, render = {}) {
    let gridKey = "", active = true;
    const pending = /* @__PURE__ */ new Set();
    const update = () => {
      const { options, visibleMonth, focusedDate } = store.getSnapshot();
      const key2 = JSON.stringify([
        visibleMonth,
        options.months,
        options.weekStartsOn,
        options.outsideDays,
        options.fixedWeeks,
        options.locale,
        options.weekend,
        render.weekdays
      ]);
      const hadFocus = root.contains(root.ownerDocument.activeElement);
      if (key2 !== gridKey) {
        root.innerHTML = calendarMarkup(store, render);
        gridKey = key2;
      }
      let focusable;
      for (const cell of root.querySelectorAll(
        '[data-part="cell"]'
      )) {
        const date = cell.dataset.date, outside = cell.hasAttribute("data-outside"), s = store.getDay(date);
        for (const [k, v] of Object.entries(dayAttributes(store, date, outside)))
          attribute(cell, k, v);
        const trigger = cell.querySelector("[data-day-trigger]");
        if (!trigger) continue;
        trigger.disabled = s.disabled || outside && options.outsideSelectable === false;
        if (!trigger.hasAttribute("aria-label"))
          attribute(trigger, "aria-label", formatDate(date, options.locale));
        attribute(trigger, "aria-current", s.today ? "date" : null);
        trigger.tabIndex = -1;
        if (!trigger.disabled && !outside && (!focusable || date === focusedDate))
          focusable = trigger;
      }
      if (focusable) focusable.tabIndex = 0;
      if (hadFocus && focusable && focusedDate === focusable.dataset.date && root.ownerDocument.activeElement !== focusable)
        focusable.focus();
      for (const grid of root.querySelectorAll('[role="grid"]')) {
        attribute(grid, "aria-readonly", String(!!options.readOnly));
        attribute(
          grid,
          "aria-multiselectable",
          String(options.selection === "range")
        );
      }
    };
    const click = (event) => {
      const trigger = event.target.closest(
        "[data-day-trigger]"
      );
      if (!trigger || !root.contains(trigger) || trigger.disabled) return;
      const date = trigger.dataset.date;
      render.onDayClick?.(date, event);
      const task = setTimeout(() => {
        pending.delete(task);
        if (active && root.isConnected && !event.defaultPrevented && store.selectDate(date))
          render.onSelect?.(date);
      }, 0);
      pending.add(task);
    };
    const hover = (event) => {
      if (event.pointerType === "touch") return;
      const trigger = event.target.closest(
        "[data-day-trigger]"
      );
      if (trigger && !trigger.hasAttribute("disabled"))
        store.hover(trigger.dataset.date);
    };
    const leave = () => store.hover(null);
    const key = (event) => {
      const trigger = event.target.closest(
        "[data-day-trigger]"
      );
      if (!trigger) return;
      if (event.key === "Escape") {
        store.cancel();
        event.preventDefault();
        return;
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Home" || event.key === "End" || event.key === "PageUp" || event.key === "PageDown") {
        event.preventDefault();
        store.focus(trigger.dataset.date);
        const rtl = getComputedStyle(root).direction === "rtl";
        const key2 = rtl && event.key === "ArrowLeft" ? "ArrowRight" : rtl && event.key === "ArrowRight" ? "ArrowLeft" : event.key;
        try {
          store.moveFocus(key2, event.shiftKey);
        } catch (error) {
          if (!(error instanceof RangeError)) throw error;
        }
      }
    };
    update();
    const stop = store.subscribe(update);
    root.addEventListener("click", click);
    root.addEventListener("pointerover", hover);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("keydown", key);
    return () => {
      active = false;
      for (const task of pending) clearTimeout(task);
      pending.clear();
      stop();
      root.removeEventListener("click", click);
      root.removeEventListener("pointerover", hover);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("keydown", key);
    };
  }
  function bindDateField(input, store, endpoint = "start") {
    const original = input.value, ownDisabled = input.disabled, ownReadonly = input.readOnly;
    const update = () => {
      const s = store.getSnapshot();
      input.disabled = ownDisabled || !!s.options.disabled;
      input.readOnly = ownReadonly || !!s.options.readOnly;
      if (input.ownerDocument.activeElement !== input) {
        input.value = pointFor(s.draft, endpoint)?.date ?? "";
        attribute(input, "aria-invalid", String(!!s.error));
      }
    };
    const change = () => {
      try {
        parseDate(input.value);
        const ok = store.setDate(input.value, endpoint);
        attribute(input, "aria-invalid", String(!ok));
      } catch {
        attribute(input, "aria-invalid", "true");
      }
    };
    const blur = () => {
      input.value = pointFor(store.getSnapshot().draft, endpoint)?.date ?? "";
      attribute(input, "aria-invalid", String(!!store.getSnapshot().error));
    };
    update();
    const stop = store.subscribe(update);
    input.addEventListener("input", change);
    input.addEventListener("blur", blur);
    return () => {
      stop();
      input.removeEventListener("input", change);
      input.removeEventListener("blur", blur);
      input.value = original;
    };
  }
  function bindTimeSegment(input, store, part, endpoint = "start") {
    let invalid = false;
    const ownDisabled = input.disabled, ownReadonly = input instanceof input.ownerDocument.defaultView.HTMLInputElement && input.readOnly;
    const value = () => timeSegmentValue(
      pointFor(store.getSnapshot().draft, endpoint)?.time,
      part,
      store.getSnapshot().options.hourCycle
    );
    const update = () => {
      const s = store.getSnapshot();
      input.disabled = ownDisabled || !!s.options.disabled;
      if (input instanceof input.ownerDocument.defaultView.HTMLInputElement) {
        input.readOnly = ownReadonly || !!s.options.readOnly;
        input.min = part === "hour" && s.options.hourCycle === 12 ? "1" : "0";
        input.max = part === "hour" ? s.options.hourCycle === 12 ? "12" : "23" : "59";
        input.step = part === "minute" ? String(s.options.minuteStep) : "1";
      } else
        input.disabled = ownDisabled || !!s.options.disabled || !!s.options.readOnly;
      if (input.ownerDocument.activeElement !== input || !invalid) {
        input.value = value();
        if (!s.error) invalid = false;
      }
      attribute(input, "aria-invalid", String(invalid || !!s.error));
    };
    const edit = () => {
      if (input.value.trim() === "") {
        invalid = true;
        attribute(input, "aria-invalid", "true");
        return;
      }
      try {
        const s = store.getSnapshot(), current = pointFor(s.draft, endpoint)?.time ?? "00:00";
        if (part === "minute" && Number(input.value) % s.options.minuteStep !== 0)
          throw new RangeError("Minute must match the configured step");
        const time = updateTime(
          current,
          part,
          input.value,
          s.options.hourCycle,
          !!s.options.seconds || current.length === 8 || part === "second"
        );
        invalid = !store.setTime(time, endpoint);
        attribute(input, "aria-invalid", String(invalid));
      } catch {
        invalid = true;
        attribute(input, "aria-invalid", "true");
      }
    };
    const blur = () => {
      invalid = false;
      input.value = value();
      attribute(input, "aria-invalid", String(!!store.getSnapshot().error));
    };
    update();
    const stop = store.subscribe(update);
    input.addEventListener("input", edit);
    input.addEventListener("blur", blur);
    return () => {
      stop();
      input.removeEventListener("input", edit);
      input.removeEventListener("blur", blur);
    };
  }
  function bindPickerForm(form, store, {
    name = "date",
    required = false
  } = {}) {
    const field = form.ownerDocument.createElement("input");
    field.type = "hidden";
    field.name = name;
    form.append(field);
    const initial = store.getSnapshot().value;
    const update = () => {
      field.disabled = !!store.getSnapshot().options.disabled;
      field.value = JSON.stringify(store.getSnapshot().value);
    };
    const submit = (event) => {
      if (field.disabled) return;
      const v = store.getSnapshot().value, empty = !v || "start" in v && !v.start && !v.end;
      if (empty && !required) return;
      if (required && empty || store.validate()) {
        event.preventDefault();
        form.dispatchEvent(
          new CustomEvent("picker-invalid", {
            detail: store.validate() ?? "Choose a value"
          })
        );
      }
    };
    const reset = () => queueMicrotask(() => store.setValue(initial));
    update();
    const stop = store.subscribe(update);
    form.addEventListener("submit", submit);
    form.addEventListener("reset", reset);
    return () => {
      stop();
      field.remove();
      form.removeEventListener("submit", submit);
      form.removeEventListener("reset", reset);
    };
  }

  // packages/calendar/src/core/day.ts
  function bindDayTrigger(button, store, date, {
    outside = false,
    onSelect,
    disabled
  } = {}) {
    let active = true;
    const pending = /* @__PURE__ */ new Set();
    const ownDisabled = disabled ?? button.disabled, ownLabel = button.getAttribute("aria-label");
    const update = () => {
      const s = store.getSnapshot(), state = store.getDay(date);
      for (const [k, v] of Object.entries(
        dayTriggerAttributes(store, date, outside)
      ))
        attribute(button, k, v);
      button.disabled = ownDisabled || state.disabled || outside && s.options.outsideSelectable === false;
      button.tabIndex = state.focused && !outside ? 0 : -1;
      attribute(button, "data-day-trigger", true);
      attribute(button, "aria-current", state.today ? "date" : null);
      attribute(
        button,
        "aria-label",
        ownLabel ?? formatDate(date, s.options.locale)
      );
      const active2 = button.ownerDocument.activeElement;
      if (state.focused && !outside && active2 !== button && active2?.matches("[data-day-trigger]") && active2.closest('[role="grid"]') === button.closest('[role="grid"]'))
        button.focus();
    };
    const click = (event) => {
      const task = setTimeout(() => {
        pending.delete(task);
        if (active && button.isConnected && !button.disabled && !event.defaultPrevented && !(outside && store.getSnapshot().options.outsideSelectable === false) && store.selectDate(date))
          onSelect?.(date);
      }, 0);
      pending.add(task);
    };
    const hover = (event) => {
      if (event.pointerType !== "touch" && !button.disabled) store.hover(date);
    };
    const key = (event) => {
      if (event.defaultPrevented) return;
      try {
        if (event.key === "Escape") {
          store.cancel();
          event.preventDefault();
          return;
        }
        store.focus(date);
        const rtl = getComputedStyle(button).direction === "rtl";
        const key2 = rtl && event.key === "ArrowLeft" ? "ArrowRight" : rtl && event.key === "ArrowRight" ? "ArrowLeft" : event.key;
        if (store.moveFocus(key2, event.shiftKey)) event.preventDefault();
      } catch (error) {
        if (!(error instanceof RangeError)) throw error;
      }
    };
    update();
    const stop = store.subscribe(update);
    button.addEventListener("click", click);
    button.addEventListener("pointerenter", hover);
    button.addEventListener("keydown", key);
    return () => {
      active = false;
      for (const task of pending) clearTimeout(task);
      pending.clear();
      stop();
      button.removeEventListener("click", click);
      button.removeEventListener("pointerenter", hover);
      button.removeEventListener("keydown", key);
    };
  }

  // packages/calendar/src/core/popover.ts
  function bindPickerPopover(trigger, content, store, {
    modal = false,
    label = "Choose a date"
  } = {}) {
    const doc = content.ownerDocument, oldHidden = content.hidden, ownDisabled = trigger.disabled;
    content.setAttribute("role", "dialog");
    content.setAttribute(
      "aria-label",
      content.getAttribute("aria-label") ?? label
    );
    if (modal) content.setAttribute("aria-modal", "true");
    trigger.setAttribute("aria-haspopup", "dialog");
    let wasOpen = store.getSnapshot().open;
    const update = () => {
      const s = store.getSnapshot();
      content.hidden = !s.open;
      trigger.disabled = ownDisabled || !!s.options.disabled;
      trigger.setAttribute("aria-expanded", String(s.open));
      if (s.open && !wasOpen)
        queueMicrotask(() => {
          if (store.getSnapshot().open)
            (content.querySelector(
              '[data-day-trigger][tabindex="0"],input:not(:disabled),button:not(:disabled)'
            ) ?? content).focus();
        });
      if (!s.open && wasOpen) trigger.focus();
      wasOpen = s.open;
    };
    const click = (event) => {
      if (event.defaultPrevented) return;
      if (store.getSnapshot().open) store.cancel();
      else store.setOpen(true);
    };
    const outside = (event) => {
      if (store.getSnapshot().open && !content.contains(event.target) && !trigger.contains(event.target))
        store.cancel();
    };
    const key = (event) => {
      if (!store.getSnapshot().open) return;
      if (event.key === "Escape") {
        event.preventDefault();
        store.cancel();
      }
      if (modal && event.key === "Tab") {
        const controls = [
          ...content.querySelectorAll(
            'button:not(:disabled),input:not(:disabled),select:not(:disabled),a[href],[tabindex="0"]'
          )
        ].filter(
          (el) => el.tabIndex >= 0 && !el.hidden && el.getClientRects().length
        );
        const first = controls[0], last = controls.at(-1);
        if (!first) {
          event.preventDefault();
          content.focus();
        } else if (event.shiftKey && doc.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && doc.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    update();
    const stop = store.subscribe(update);
    trigger.addEventListener("click", click);
    doc.addEventListener("pointerdown", outside);
    doc.addEventListener("keydown", key);
    return () => {
      stop();
      content.hidden = oldHidden;
      trigger.removeEventListener("click", click);
      doc.removeEventListener("pointerdown", outside);
      doc.removeEventListener("keydown", key);
    };
  }

  // packages/calendar/src/core/scroller.ts
  function monthScrollerMarkup(store, options = {}) {
    const state = store.getSnapshot(), engine = createCalendarEngine(1);
    const first = options.from ?? { year: 1900, month: 1 }, last = options.to ?? { year: 2100, month: 12 };
    const key = (month2) => month2.year * 12 + month2.month;
    const month = key(state.visibleMonth) < key(first) ? first : key(state.visibleMonth) > key(last) ? last : state.visibleMonth;
    const view = {
      ...store,
      getSnapshot: () => ({
        ...state,
        visibleMonth: month,
        options: { ...state.options, months: 1, fixedWeeks: true }
      }),
      getMonth: (offset = 0) => {
        const m = addMonths(month, offset);
        return engine.month(m.year, m.month, {
          ...state.options,
          fixedWeeks: true
        });
      }
    };
    return calendarMarkup(view, options);
  }
  function bindMonthScroller(root, store, options = {}) {
    const from = options.from ?? { year: 1900, month: 1 }, to = options.to ?? { year: 2100, month: 12 };
    addMonths(from, 0);
    addMonths(to, 0);
    const index = (m) => (m.year - from.year) * 12 + m.month - from.month;
    const count = index(to) + 1, height = options.monthHeight ?? 340, overscan = options.overscan ?? 1;
    if (count < 1 || count > 1e4 || height < 280 || !Number.isFinite(height) || !Number.isInteger(overscan) || overscan < 0 || overscan > 4)
      throw new RangeError("Invalid scrolling window or month geometry");
    const document = root.ownerDocument, container = document.createElement("div");
    container.style.height = `${count * height}px`;
    container.style.position = "relative";
    root.replaceChildren(container);
    const engine = createCalendarEngine(12);
    const entries = /* @__PURE__ */ new Map();
    let frame = 0, syncing = false;
    const view = (month) => {
      let previous, next;
      return {
        ...store,
        getSnapshot() {
          const source = store.getSnapshot();
          if (source !== previous) {
            previous = source;
            next = Object.freeze({
              ...source,
              visibleMonth: month,
              options: Object.freeze({
                ...source.options,
                months: 1,
                fixedWeeks: true
              })
            });
          }
          return next;
        },
        getMonth(offset = 0) {
          const m = addMonths(month, offset);
          return engine.month(m.year, m.month, {
            ...store.getSnapshot().options,
            fixedWeeks: true
          });
        }
      };
    };
    const render = () => {
      const top = Math.max(
        0,
        Math.min(count - 1, Math.floor(root.scrollTop / height))
      ), visible = Math.ceil((root.clientHeight || height) / height), first = Math.max(0, top - overscan), last = Math.min(count - 1, top + visible + overscan);
      for (const [n, entry] of entries)
        if (n < first || n > last) {
          entry.stop();
          entry.element.remove();
          entries.delete(n);
        }
      for (let n = first; n <= last; n++)
        if (!entries.has(n)) {
          const element = document.createElement("div");
          element.className = "sp-scroll-month";
          element.style.cssText = `position:absolute;top:${n * height}px;left:0;right:0;height:${height}px;overflow:hidden`;
          container.append(element);
          const month = addMonths(from, n);
          entries.set(n, {
            element,
            stop: bindCalendar(element, view(month), options)
          });
        }
      if (!syncing) {
        const month = addMonths(from, top), s = store.getSnapshot();
        if (month.year !== s.visibleMonth.year || month.month !== s.visibleMonth.month) {
          syncing = true;
          store.setVisibleMonth(month);
          syncing = false;
        }
      }
    };
    const onScroll = () => {
      if (!frame)
        frame = root.ownerDocument.defaultView.requestAnimationFrame(() => {
          frame = 0;
          render();
        });
    };
    const onStore = () => {
      if (syncing) return;
      const n = index(store.getSnapshot().visibleMonth);
      if (n < 0 || n >= count) return;
      if (Math.floor(root.scrollTop / height) !== n) {
        root.scrollTop = n * height;
        render();
      }
    };
    root.scrollTop = Math.max(0, Math.min(count - 1, index(store.getSnapshot().visibleMonth))) * height;
    render();
    const stop = store.subscribe(onStore);
    root.addEventListener("scroll", onScroll, { passive: true });
    const Observer = root.ownerDocument.defaultView?.ResizeObserver;
    const observer = Observer ? new Observer(onScroll) : void 0;
    observer?.observe(root);
    return () => {
      observer?.disconnect();
      stop();
      root.removeEventListener("scroll", onScroll);
      if (frame) root.ownerDocument.defaultView.cancelAnimationFrame(frame);
      for (const entry of entries.values()) entry.stop();
      entries.clear();
      engine.clear();
      container.remove();
    };
  }

  // packages/date-picker/src/index.ts
  function createPickerStore2(options = {}) {
    return createPickerStore({ ...options, kind: "date" });
  }
  var createDatePickerStore = createPickerStore2;

  // packages/calendar/src/vanilla/index.ts
  function mountPicker(root, options = {}) {
    const provided = "getSnapshot" in options;
    const store = provided ? options : createPickerStore(options);
    const cleanups = [];
    const own = (selector) => [...root.querySelectorAll(selector)].filter(
      (el) => !el.parentElement?.closest("[data-picker-root]") || el.parentElement.closest("[data-picker-root]") === root
    );
    attribute(root, "data-picker-root", true);
    for (const el of own("[data-continuous]"))
      cleanups.push(
        bindMonthScroller(el, store, JSON.parse(el.dataset.continuous ?? "{}"))
      );
    for (const el of own("[data-calendar]"))
      cleanups.push(
        bindCalendar(el, store, JSON.parse(el.dataset.calendarOptions ?? "{}"))
      );
    for (const el of own("[data-day-trigger]"))
      if (!el.closest("[data-calendar]"))
        cleanups.push(
          bindDayTrigger(el, store, el.dataset.date)
        );
    for (const el of own("[data-date-field]"))
      cleanups.push(
        bindDateField(
          el,
          store,
          el.dataset.endpoint ?? "start"
        )
      );
    for (const el of own("[data-time-segment]"))
      cleanups.push(
        bindTimeSegment(
          el,
          store,
          el.dataset.timeSegment,
          el.dataset.endpoint ?? "start"
        )
      );
    const click = (event) => {
      if (event.defaultPrevented) return;
      const button = event.target.closest(
        "[data-picker-action]"
      );
      if (!button || !root.contains(button) || button.closest("[data-picker-root]") !== root)
        return;
      const state = store.getSnapshot();
      if (state.options.disabled) return;
      const action = button.dataset.pickerAction;
      try {
        if (action === "previous") store.navigate(-1);
        else if (action === "next") store.navigate(1);
        else if (action === "open") store.setOpen(true);
        else if (action === "cancel" || action === "apply" || action === "clear")
          store[action]();
      } catch (error) {
        if (!(error instanceof RangeError)) throw error;
      }
    };
    const change = (event) => {
      const el = event.target;
      if (el.closest("[data-picker-root]") !== root || store.getSnapshot().options.disabled)
        return;
      try {
        if (el.hasAttribute("data-month-select"))
          store.setVisibleMonth({
            ...store.getSnapshot().visibleMonth,
            month: Number(el.value)
          });
        if (el.hasAttribute("data-year-select"))
          store.setVisibleMonth({
            ...store.getSnapshot().visibleMonth,
            year: Number(el.value)
          });
        if (el.hasAttribute("data-day-offset"))
          store.setDayOffset(
            Number(el.value),
            el.dataset.endpoint ?? "end"
          );
      } catch (error) {
        if (!(error instanceof RangeError)) throw error;
      }
    };
    const update = () => {
      const s = store.getSnapshot();
      for (const cell of own("[data-calendar-cell]"))
        for (const [key, value] of Object.entries(
          dayAttributes(
            store,
            cell.dataset.date,
            cell.hasAttribute("data-outside")
          )
        ))
          attribute(cell, key, value);
      for (const el of own("[data-picker-output]"))
        el.textContent = JSON.stringify(s.value, null, 2);
      for (const el of own("[data-picker-error]")) {
        el.textContent = s.error ?? "";
        el.hidden = !s.error;
      }
      for (const el of own("[data-month-heading]"))
        el.textContent = formatMonth(s.visibleMonth, s.options.locale);
      for (const el of own("[data-month-select]"))
        el.value = String(s.visibleMonth.month);
      for (const el of own("[data-year-select]"))
        el.value = String(s.visibleMonth.year);
      for (const el of own(
        "[data-picker-action], [data-month-select], [data-year-select], [data-day-offset]"
      ))
        el.disabled = !!s.options.disabled;
    };
    update();
    cleanups.push(store.subscribe(update));
    root.addEventListener("click", click);
    root.addEventListener("change", change);
    return {
      store,
      destroy() {
        cleanups.forEach((fn) => fn());
        root.removeEventListener("click", click);
        root.removeEventListener("change", change);
        if (!provided) store.destroy();
      }
    };
  }

  // packages/date-picker/src/vanilla.ts
  function mountPicker2(element, options = {}) {
    if ("getSnapshot" in options) {
      if (options.getSnapshot().options.kind !== "date")
        throw new RangeError("Use a date store with DatePicker");
      return mountPicker(element, options);
    }
    return mountPicker(element, { ...options, kind: "date" });
  }
  var mountDatePicker = mountPicker2;
  return __toCommonJS(vanilla_exports);
})();
