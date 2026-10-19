// ============================================================
// LA CARTE : pour ajouter un plat, copiez une ligne dans `dishes`.
//
//  id          texte unique, sans espace
//  category    un `id` de `categories`
//  name        nom affiché
//  description courte phrase
//  price       nombre en FCFA (pas de texte)
//  featured    true → affiché sur l’accueil (4 maximum)
//  available   false → masqué sans le supprimer (par défaut : true)
//  tags        ["épicé", "végétarien"…] (facultatif)
//  image       "/images/plats/xxx.jpg" (facultatif, sans photo = carte texte)
// ============================================================

export const categories = [
  { id: "braises", label: "Braisés" },
  { id: "mijotes", label: "Plats mijotés" },
  { id: "accompagnements", label: "Accompagnements" },
  { id: "boissons", label: "Boissons" },
  { id: "desserts", label: "Desserts" },
];

export const dishes = [
  // --- Braisés ---
  { id: "tilapia-braise", category: "braises", name: "Tilapia braisé", description: "Tilapia grillé au feu de bois, attiéké, citron, légumes et piment maison.", price: 9000, featured: true },
  { id: "poulet-braise", category: "braises", name: "Poulet braisé", description: "Poulet fermier mariné, alloco et piment maison.", price: 7500, featured: true },
  { id: "capitaine-braise", category: "braises", name: "Capitaine braisé", description: "Filet de capitaine braisé, riz parfumé, sauce tomate.", price: 12000, tags: ["signature"] },
  { id: "brochettes-boeuf", category: "braises", name: "Brochettes de bœuf", description: "Cinq brochettes marinées, oignons et sauce pimentée.", price: 5000, tags: ["épicé"] },
  { id: "choukouya-mouton", category: "braises", name: "Choukouya de mouton", description: "Mouton braisé aux oignons et épices, servi chaud.", price: 10000, tags: ["épicé"] },

  // --- Plats mijotés ---
  { id: "sauce-graine", category: "mijotes", name: "Sauce graine", description: "Viande tendre, sauce onctueuse, accompagnement au choix.", price: 8500, featured: true },
  { id: "kedjenou-poulet", category: "mijotes", name: "Kédjénou de poulet", description: "Poulet mijoté à l’étouffée avec légumes et épices locales.", price: 7000 },
  { id: "foutou-sauce-claire", category: "mijotes", name: "Foutou sauce claire", description: "Foutou banane, sauce claire au poisson fumé.", price: 6500 },
  { id: "riz-gras", category: "mijotes", name: "Riz gras", description: "Riz cuit dans une sauce tomate relevée, poulet.", price: 5500 },

  // --- Accompagnements ---
  { id: "alloco", category: "accompagnements", name: "Alloco", description: "Banane plantain frite, sauce tomate épicée.", price: 4000, featured: true, tags: ["végétarien"] },
  { id: "attieke", category: "accompagnements", name: "Attiéké", description: "Semoule de manioc, portion supplémentaire.", price: 1500, tags: ["végétarien"] },
  { id: "banane-braisee", category: "accompagnements", name: "Banane plantain braisée", description: "Plantain mûr braisé au feu de bois.", price: 2500, tags: ["végétarien"] },

  // --- Boissons ---
  { id: "bissap", category: "boissons", name: "Bissap", description: "Infusion d’hibiscus glacée, menthe.", price: 1500 },
  { id: "gingembre", category: "boissons", name: "Jus de gingembre", description: "Pressé maison, relevé et frais.", price: 1500 },
  { id: "jus-orange", category: "boissons", name: "Jus d’orange pressé", description: "Oranges pressées à la commande.", price: 2000 },
  { id: "eau", category: "boissons", name: "Eau minérale", description: "Bouteille de 50 cl.", price: 1000 },

  // --- Desserts ---
  { id: "dege", category: "desserts", name: "Dêgê", description: "Dessert au mil et au yaourt, vanille.", price: 2500 },
  { id: "salade-fruits", category: "desserts", name: "Salade de fruits", description: "Ananas, mangue, papaye, fruits de saison.", price: 2500, tags: ["végétarien"] },
];
