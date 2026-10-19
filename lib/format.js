// 8500 → "8 500 FCFA" (espace insécable, identique serveur/client)
export function formatPrice(value) {
  return `${Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0")}\u00A0FCFA`;
}
