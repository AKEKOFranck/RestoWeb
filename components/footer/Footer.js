import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { site } from "@/data/site";
import { formatHours } from "@/lib/schedule";
import styles from "./Footer.module.css";

const SOCIALS = [
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "facebook", label: "Facebook", Icon: FaFacebookF },
];

export default function Footer() {
  const socials = SOCIALS.filter(({ key }) => site.social[key]);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.brand}>{site.name}</p>
          <p className={styles.muted}>{site.tagline}</p>
          <p className={styles.address}>
            <FiMapPin aria-hidden="true" />
            <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer">
              {site.address.line}, {site.address.city}
            </a>
          </p>
          {socials.length > 0 && (
            <ul className={styles.socials}>
              {socials.map(({ key, label, Icon }) => (
                <li key={key}>
                  <a href={site.social[key]} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon aria-hidden="true" size={18} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Pied de page">
          <p className={styles.title}>Explorer</p>
          <ul className={styles.list}>
            {[...site.nav, { label: "Réserver une table", href: "/reserver" }].map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <p className={styles.title}>Horaires</p>
          <dl className={styles.hours}>
            {site.hours.map((h) => (
              <div key={h.day}>
                <dt>{h.label}</dt>
                <dd>{formatHours(h)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <p className={`container ${styles.copy}`}>© {new Date().getFullYear()} {site.name}. Tous droits réservés.</p>
    </footer>
  );
}
