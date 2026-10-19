import { site } from "@/data/site";

// Fuseau du restaurant : Abidjan = UTC+0, on travaille donc en UTC.
const hoursByDay = new Map(site.hours.map((h) => [h.day, h]));

const toMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const toTime = (min) => `${String(Math.floor(min / 60) % 24).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

export const isoDate = (d) => d.toISOString().slice(0, 10);

export function getHoursForDate(iso) {
  const d = new Date(`${iso}T12:00:00Z`);
  return Number.isNaN(d.getTime()) ? null : hoursByDay.get(d.getUTCDay()) ?? null;
}

export function buildSlots(iso, now = new Date()) {
  const hours = getHoursForDate(iso);
  if (!hours?.open) return [];
  const { slotStepMinutes, lastSeatingBeforeCloseMinutes, minLeadMinutes } = site.reservation;
  const open = toMinutes(hours.open);
  let close = toMinutes(hours.close);
  if (close <= open) close += 24 * 60; // fermeture après minuit
  const earliest = iso === isoDate(now) ? now.getUTCHours() * 60 + now.getUTCMinutes() + minLeadMinutes : -1;

  const slots = [];
  for (let t = open; t <= close - lastSeatingBeforeCloseMinutes; t += slotStepMinutes) {
    if (t > earliest) slots.push(toTime(t));
  }
  return slots;
}

export function getBookingWindow(now = new Date()) {
  const max = new Date(now.getTime() + site.reservation.maxDaysAhead * 86_400_000);
  return { min: isoDate(now), max: isoDate(max) };
}

export const formatTime = (t) => t.replace(":", "h");
export const formatHours = (h) => (h.open ? `${formatTime(h.open)} – ${formatTime(h.close)}` : "Fermé");

export function formatDateFr(iso) {
  return new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(
    new Date(`${iso}T12:00:00Z`)
  );
}
