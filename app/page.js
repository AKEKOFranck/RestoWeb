import Link from "next/link";
import Photo from "@/components/ui/Photo";
import DishCard from "@/components/menu/DishCard";
import { getFeaturedDishes } from "@/lib/menu";
import { site } from "@/data/site";
import styles from "./page.module.css";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Home() {
  const featured = getFeaturedDishes(4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    description: site.description,
    url: site.url,
    servesCuisine: "Africaine",
    priceRange: "FCFA",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line,
      addressLocality: site.address.city,
      addressCountry: "CI",
    },
    openingHoursSpecification: site.hours
      .filter((h) => h.open)
      .map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: DAYS[h.day], opens: h.open, closes: h.close })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className="script">Restaurant à {site.address.city}</p>
          <h1>Les saveurs du feu, la douceur du plein air.</h1>
          <p className={styles.lead}>
            Une cuisine africaine authentique, préparée au feu de bois, à savourer dans un cadre ouvert et chaleureux, au cœur d’{site.address.city}.
          </p>
          <div className={styles.actions}>
            <Link href="/notre-cuisine" className="btn btnPrimary">Découvrir la carte</Link>
            <Link href="/reserver" className="btn btnSoft">Réserver une table</Link>
          </div>
        </div>
        <div className={styles.heroPhoto}>
          <Photo {...site.images.hero} sizes="(max-width: 900px) 100vw, 60vw" priority tone="var(--soleil)" />
        </div>
      </section>

      <section className={`section ${styles.story}`}>
        <div className={`container ${styles.storyGrid}`}>
          <div className={styles.storyPhoto}>
            <Photo {...site.images.story} sizes="(max-width: 900px) 100vw, 55vw" tone="var(--lagune)" />
          </div>
          <div>
            <p className="script">Notre histoire</p>
            <h2>Un lieu, une cuisine, une ambiance.</h2>
            <p className={styles.storyText}>
              {site.name}, c’est l’envie de partager une cuisine africaine généreuse, autour du feu, dans un cadre en plein air où l’on prend le temps. Ici, chaque plat raconte une histoire : celle de nos terres, de nos traditions et de notre amour du bon goût.
            </p>
            <p className={`script ${styles.sign}`}>À bientôt autour d’une bonne assiette !</p>
            <Link href="/le-cadre" className="btn btnSoft">Découvrir le cadre</Link>
          </div>
        </div>
      </section>

      <section className={`section ${styles.signature}`}>
        <div className="container">
          <div className={styles.signatureHead}>
            <div>
              <p className="script">Nos plats signatures</p>
              <h2>Le meilleur de nos terres</h2>
              <p className={styles.signatureText}>Des recettes authentiques, des produits frais, un goût inoubliable.</p>
            </div>
            <Link href="/notre-cuisine" className="btn btnPrimary">Voir toute la carte</Link>
          </div>
          <div className={styles.dishes}>
            {featured.map((dish) => (<DishCard key={dish.id} dish={dish} />))}
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <div className={`container ${styles.bandInner}`}>
          <div>
            <h2>Une envie de bon repas ?</h2>
            <p>Réservez votre table, nous vous attendons à {site.name}.</p>
          </div>
          <Link href="/reserver" className="btn btnLight">Réserver maintenant</Link>
        </div>
      </section>
    </>
  );
}