import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Photo from "@/components/ui/Photo";
import { site } from "@/data/site";
import styles from "./page.module.css";

export const metadata = {
  title: "Le cadre",
  description: "Une terrasse ouverte, un feu de bois et une ambiance chaleureuse au cœur d’Abidjan.",
};

const TONES = ["var(--lagune)", "var(--soleil)", "var(--sable-2)"];

export default function LeCadrePage() {
  return (
    <>
      <PageHeader label="Le cadre" title="Un restaurant pensé pour prendre son temps." intro="Un espace ouvert, de l’ombre, du bois, des plantes et le feu au centre." />
      <section className="section">
        <div className={`container ${styles.list}`}>
          {site.ambiance.map((item, i) => (
            <article key={item.title} className={styles.item}>
              <div className={styles.photo}>
                <Photo {...item.image} sizes="(max-width: 800px) 100vw, 50vw" tone={TONES[i % TONES.length]} />
              </div>
              <div className={styles.text}>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
          <div className={styles.cta}>
            <Link href="/reserver" className="btn btnPrimary">Réserver une table</Link>
          </div>
        </div>
      </section>
    </>
  );
}
