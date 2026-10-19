import PageHeader from "@/components/ui/PageHeader";
import Photo from "@/components/ui/Photo";
import { site } from "@/data/site";
import styles from "./page.module.css";

export const metadata = { title: "Galerie", description: "Les plats, la terrasse et le feu de bois en images." };

const TONES = ["var(--soleil)", "var(--lagune)", "var(--sable-2)", "var(--braise)"];

export default function GaleriePage() {
  return (
    <>
      <PageHeader label="Galerie" title="Le feu, les plats, la terrasse." />
      <section className="section">
        <ul className={`container ${styles.grid}`}>
          {site.gallery.map((img, i) => (
            <li key={img.src} className={i % 5 === 0 ? styles.wide : styles.tile}>
              <Photo {...img} sizes="(max-width: 700px) 100vw, 33vw" tone={TONES[i % TONES.length]} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
