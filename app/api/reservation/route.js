import { NextResponse } from "next/server";
import { validateReservation } from "@/lib/validation";
import { isRateLimited } from "@/lib/rateLimit";
import { buildReservationMessage, buildWhatsAppUrl, createReference } from "@/lib/whatsapp";

export const runtime = "nodejs";

const MAX_BODY = 4_000;
const MIN_FILL_MS = 2_500; // un humain met plus de 2,5 s à remplir le formulaire

const reply = (body, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request) {
  // 1. Même origine uniquement (anti-CSRF)
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get("host")) return reply({ error: "Origine refusée." }, 403);
    } catch {
      return reply({ error: "Origine refusée." }, 403);
    }
  }

  // 2. Type de contenu
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reply({ error: "Requête invalide." }, 415);

  // 3. Limite de débit par IP
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "inconnue";
  if (isRateLimited(ip)) return reply({ error: "Trop de tentatives. Réessayez dans quelques minutes." }, 429);

  // 4. Lecture bornée + JSON
  let body;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY) return reply({ error: "Requête trop volumineuse." }, 413);
    body = JSON.parse(raw);
  } catch {
    return reply({ error: "Requête invalide." }, 400);
  }

  // 5. Anti-bot : champ piège et temps de remplissage (réponse neutre, rien n’est envoyé)
  const tooFast = typeof body?.startedAt !== "number" || Date.now() - body.startedAt < MIN_FILL_MS;
  if (body?.website || tooFast) return reply({ ok: true, url: null, reference: null });

  // 6. Validation stricte côté serveur
  const { ok, errors, data } = validateReservation(body);
  if (!ok) return reply({ error: "Vérifiez les champs du formulaire.", errors }, 422);

  // 7. Message + lien WhatsApp
  const reference = createReference();
  const url = buildWhatsAppUrl(buildReservationMessage(data, reference));
  if (!url) {
    console.error("RESTAURANT_WHATSAPP manquant ou invalide dans .env.local");
    return reply({ error: "La réservation en ligne est momentanément indisponible." }, 503);
  }

  return reply({ ok: true, url, reference, summary: data });
}

export function GET() {
  return reply({ error: "Méthode non autorisée." }, 405);
}
