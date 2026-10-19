// Limiteur en mémoire. Suffisant pour un seul serveur ; en serverless (Vercel),
// remplacer par Upstash Redis ou Vercel KV pour un compteur partagé.
const hits = new Map();

export function isRateLimited(key, { limit = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  }
  return false;
}
