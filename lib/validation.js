import { site } from "@/data/site";
import { buildSlots, getBookingWindow } from "./schedule";

// Retire caractères de contrôle, caractères de direction cachés et marqueurs de mise en forme WhatsApp.
const clean = (value, max) =>
  String(value ?? "")
    .normalize("NFC")
    .replace(/[\u0000-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g, " ")
    .replace(/[*_~`]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

export function validateReservation(input, now = new Date()) {
  const errors = {};
  const name = clean(input?.name, 60);
  const notes = clean(input?.notes, 300);
  const guests = Number(input?.guests);
  const date = String(input?.date ?? "");
  const time = String(input?.time ?? "");

  if (name.length < 2) errors.name = "Indiquez votre nom (2 caractères minimum).";
  else if (!/^[\p{L}\p{M}' .’-]+$/u.test(name)) errors.name = "Le nom contient des caractères non autorisés.";

  if (!Number.isInteger(guests) || guests < 1 || guests > site.reservation.maxGuests)
    errors.guests = `Choisissez entre 1 et ${site.reservation.maxGuests} personnes.`;

  const { min, max } = getBookingWindow(now);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < min || date > max) {
    errors.date = "Choisissez une date valide.";
  } else {
    const slots = buildSlots(date, now);
    if (slots.length === 0) errors.date = "Plus de créneau disponible ce jour-là. Choisissez une autre date.";
    else if (!slots.includes(time)) errors.time = "Choisissez un horaire dans la liste.";
  }

  return { ok: Object.keys(errors).length === 0, errors, data: { name, guests, date, time, notes } };
}
