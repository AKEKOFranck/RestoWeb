import { randomInt } from "node:crypto";
import { site } from "@/data/site";
import { formatDateFr, formatTime } from "./schedule";

// Module réservé au serveur (utilise node:crypto et la variable d’environnement).
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export const createReference = () =>
  "R-" + Array.from({ length: 5 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");

export function buildReservationMessage({ name, guests, date, time, notes }, reference) {
  const lines = [
    `*Nouvelle réservation – ${site.name}*`,
    `Réf. ${reference}`,
    "",
    `Nom : ${name}`,
    `Personnes : ${guests}`,
    `Date : ${formatDateFr(date)}`,
    `Heure : ${formatTime(time)}`,
  ];
  if (notes) lines.push(`Précisions : ${notes}`);
  return lines.join("\n");
}

// Le numéro vit uniquement côté serveur (variable d’environnement) : il n’apparaît ni dans le HTML ni dans le JS envoyé au navigateur.
export function buildWhatsAppUrl(message) {
  const number = (process.env.RESTAURANT_WHATSAPP ?? "").replace(/\D/g, "");
  if (number.length < 8 || number.length > 15) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
