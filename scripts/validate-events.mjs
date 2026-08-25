import { readFileSync } from "node:fs";

const KNOWN_CATEGORIES = ["outdoors", "food", "games", "culture", "chill"];
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const errors = [];
const warnings = [];
let count = 0;

function err(id, msg) {
  errors.push(`  x [${id}] ${msg}`);
}
function warn(id, msg) {
  warnings.push(`  ! [${id}] ${msg}`);
}

function isValidCalendarDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return (
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() === m - 1 &&
    dt.getUTCDate() === d
  );
}

let data;
try {
  data = JSON.parse(
    readFileSync(new URL("../src/data/events.json", import.meta.url), "utf8")
  );
} catch (e) {
  console.error("x Could not read src/data/events.json:");
  console.error(`    ${e.message}`);
  process.exit(1);
}

if (!Array.isArray(data.activities)) {
  console.error("x Top level of events.json must be an object with an 'activities' array.");
  process.exit(1);
}

const seenIds = new Set();

for (const act of data.activities) {
  count++;
  const id = typeof act.id === "string" && act.id ? act.id : `activity #${count}`;

  if (typeof act.id !== "string" || !act.id.trim()) err(id, "missing or empty 'id'");
  else if (seenIds.has(act.id)) err(id, `duplicate id '${act.id}'`);
  else seenIds.add(act.id);

  if (typeof act.title !== "string" || !act.title.trim()) err(id, "missing or empty 'title'");

  if (typeof act.date !== "string" || !DATE_RE.test(act.date)) {
    err(id, `'date' must be YYYY-MM-DD, got '${act.date}'`);
  } else if (!isValidCalendarDate(act.date)) {
    err(id, `'date' '${act.date}' is not a real calendar date`);
  }

  if (typeof act.startTime !== "string" || !TIME_RE.test(act.startTime)) {
    err(id, `'startTime' must be HH:MM (24h), got '${act.startTime}'`);
  }

  if (act.endTime !== undefined && act.endTime !== null && act.endTime !== "") {
    if (typeof act.endTime !== "string" || !TIME_RE.test(act.endTime)) {
      err(id, `'endTime' must be HH:MM (24h), got '${act.endTime}'`);
    } else if (
      typeof act.startTime === "string" &&
      TIME_RE.test(act.startTime) &&
      act.endTime <= act.startTime
    ) {
      err(id, `'endTime' (${act.endTime}) must be after 'startTime' (${act.startTime})`);
    }
  }

  if (typeof act.category !== "string" || !act.category.trim()) {
    warn(id, "no 'category' set - will render with default color");
  } else if (!KNOWN_CATEGORIES.includes(act.category)) {
    warn(id, `unknown category '${act.category}' (known: ${KNOWN_CATEGORIES.join(", ")})`);
  }

  if (act.location !== undefined && act.location !== null) {
    if (typeof act.location === "object") {
      if (!act.location.name || !String(act.location.name).trim()) {
        warn(id, "location given but has no 'name'");
      }
      if (act.location.mapsUrl && !/^https:\/\/(maps\.google\.com|www\.google\.com\/maps)/.test(act.location.mapsUrl)) {
        warn(id, "'location.mapsUrl' does not look like a Google Maps link");
      }
    } else {
      err(id, "'location' must be an object with name/mapsUrl");
    }
  }

  if (act.notes !== undefined && typeof act.notes !== "string") {
    err(id, "'notes' must be a string");
  }

  if (act.maxAttendees !== undefined && act.maxAttendees !== null) {
    if (!Number.isInteger(act.maxAttendees) || act.maxAttendees < 1) {
      err(id, `'maxAttendees' must be a positive whole number, got '${act.maxAttendees}'`);
    }
  }

  if (act.attendeesFull !== undefined && typeof act.attendeesFull !== "boolean") {
    err(id, "'attendeesFull' must be true or false");
  }

  if (!act.formPrefillLabel || !String(act.formPrefillLabel).trim()) {
    warn(id, "no 'formPrefillLabel' - friends can't be pre-registered for this activity in the form");
  }
}

if (errors.length) {
  console.error(`x events.json has ${errors.length} problem(s):`);
  for (const e of errors) console.error(e);
  process.exit(1);
}

console.log(`v events.json OK - ${count} activit${count === 1 ? "y" : "ies"} checked`);
for (const w of warnings) console.warn(w);
