// ============================================================
// Configuration du restaurant : tout ce qui change se modifie ici.
// ⚠ Le numéro WhatsApp n’est PAS ici : il est dans .env.local
// ============================================================

export const site = {
  name: "La Table du Soleil",
  tagline: "Cuisine africaine, braise & grand air",
  description:
    "Restaurant africain à Abidjan : poissons et poulets braisés au feu de bois, alloco, sauce graine et plats mijotés, servis en plein air.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  address: {
    line: "Riviera 3",
    city: "Abidjan",
    country: "Côte d’Ivoire",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Riviera+3+Abidjan",
  },

  // Laisser une chaîne vide pour masquer le réseau.
  social: {
    instagram: "",
    facebook: "",
  },

  nav: [
    { label: "Accueil", href: "/" },
    { label: "Notre cuisine", href: "/notre-cuisine" },
    { label: "Le cadre", href: "/le-cadre" },
    { label: "Galerie", href: "/galerie" },
    { label: "Contact", href: "/contact" },
  ],

  // day : 0 = dimanche … 6 = samedi. open/close = null → fermé.
  hours: [
    { day: 1, label: "Lundi", open: null, close: null },
    { day: 2, label: "Mardi", open: "11:30", close: "23:00" },
    { day: 3, label: "Mercredi", open: "11:30", close: "23:00" },
    { day: 4, label: "Jeudi", open: "11:30", close: "23:00" },
    { day: 5, label: "Vendredi", open: "11:30", close: "00:00" },
    { day: 6, label: "Samedi", open: "11:30", close: "00:00" },
    { day: 0, label: "Dimanche", open: "11:30", close: "22:00" },
  ],

  reservation: {
    maxGuests: 12,
    maxDaysAhead: 60,
    slotStepMinutes: 30,
    lastSeatingBeforeCloseMinutes: 60,
    minLeadMinutes: 60, // délai minimum pour une réservation le jour même
  },

  // Chemins relatifs à /public. Une image absente est simplement masquée.
  images: {
    hero: { src: "/images/hero.jpg", alt: "Tilapia braisé, alloco et attiéké servis sur la terrasse" },
    story: { src: "/images/histoire.jpg", alt: "La terrasse du restaurant face à la lagune" },
  },

  ambiance: [
    {
      title: "La terrasse",
      text: "Des tables en bois, de l’ombre, des plantes et la brise d’Abidjan. On déjeune comme on dîne, sans se presser, entre amis ou en famille.",
      image: { src: "/images/terrasse.png", alt: "Tables en bois sur la terrasse ombragée" },
    },
    {
      title: "Le feu de bois",
      text: "Tout est braisé devant vous : poissons, poulets, viandes. Le feu donne ce goût fumé qu’aucune cuisine fermée n’a jamais pu imiter.",
      image: { src: "/images/feu.png", alt: "Poisson en cours de braisage sur le feu de bois" },
    },
    {
      title: "Le bar",
      text: "Bissap, gingembre, jus pressés et boissons fraîches pour accompagner les plats épicés.",
      image: { src: "/images/bar.jpg", alt: "Le bar et ses jus frais" },
    },
  ],

  gallery: [
    { src: "/images/terrasse.png", alt: "La terrasse" },
    { src: "/images/poisson-braise.jpg", alt: "Poisson braisé" },
    { src: "/images/poulet-braise.jpg", alt: "Poulet braisé" },
    { src: "/images/alloco.jpg", alt: "Alloco" },
    { src: "/images/bar.jpg", alt: "Le bar" },
    { src: "/images/feu.png", alt: "Le feu de bois" },
  ],
};
