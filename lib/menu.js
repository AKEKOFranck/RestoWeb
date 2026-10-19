import { categories, dishes } from "@/data/menu";

// Contrôle au démarrage : une erreur de saisie dans data/menu.js est signalée clairement.
const categoryIds = new Set(categories.map((c) => c.id));
const seen = new Set();
for (const d of dishes) {
  if (!categoryIds.has(d.category)) throw new Error(`Plat « ${d.name} » : catégorie inconnue « ${d.category} ».`);
  if (!Number.isFinite(d.price)) throw new Error(`Plat « ${d.name} » : le prix doit être un nombre.`);
  if (seen.has(d.id)) throw new Error(`Identifiant en double : « ${d.id} ».`);
  seen.add(d.id);
}

export { categories };
export const availableDishes = dishes.filter((d) => d.available !== false);

export const dishesByCategory = new Map(
  categories.map((c) => [c.id, availableDishes.filter((d) => d.category === c.id)])
);

export const getFeaturedDishes = (limit = 4) => availableDishes.filter((d) => d.featured).slice(0, limit);
