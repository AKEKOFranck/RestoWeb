import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata = { title: "Page introuvable" };

export default function NotFound() {
  return (
    <section className={`section ${styles.wrap}`}>
      <div className="container">
        <p className="script">Oups</p>
        <h1>Cette page n’existe pas.</h1>
        <p className={styles.text}>Le lien est peut-être erroné. La carte et la réservation, elles, sont bien là.</p>
        <div className={styles.actions}>
          <Link href="/" className="btn btnPrimary">Retour à l’accueil</Link>
          <Link href="/notre-cuisine" className="btn btnSoft">Voir la carte</Link>
        </div>
      </div>
    </section>
  );
}
