import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import PageHeader from "@/components/ui/PageHeader";
import { site } from "@/data/site";
import { formatHours } from "@/lib/schedule";
import styles from "./page.module.css";

export const metadata = { title: "Contact", description: "Adresse, horaires et réservation." };

const SOCIALS = [
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "facebook", label: "Facebook", Icon: FaFacebookF },
];

export default function ContactPage() {
  const socials = SOCIALS.filter(({ key }) => site.social[key]);
  return (
    <>
      <PageHeader label="Contact" title="Venez nous voir." intro="Pour une table, le plus simple est le formulaire de réservation : il arrive directement au restaurant." />
      <section className="section">
        <div className={`container ${styles.grid}`}>
          <div className={styles.block}>
            <h2>Adresse</h2>
            <p className={styles.address}><FiMapPin aria-hidden="true" /> {site.address.line}, {site.address.city}, {site.address.country}</p>
            <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btnSoft">Ouvrir dans Maps</a>
          </div>

          <div className={styles.block}>
            <h2>Horaires</h2>
            <dl className={styles.hours}>
              {site.hours.map((h) => (
                <div key={h.day}><dt>{h.label}</dt><dd>{formatHours(h)}</dd></div>
              ))}
            </dl>
          </div>

          <div className={styles.block}>
            <h2>Réserver</h2>
            <p>Choisissez votre date et votre horaire, la demande part sur WhatsApp.</p>
            <Link href="/reserver" className="btn btnPrimary">Réserver une table</Link>
            {socials.length > 0 && (
              <ul className={styles.socials}>
                {socials.map(({ key, label, Icon }) => (
                  <li key={key}>
                    <a href={site.social[key]} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon aria-hidden="true" size={18} /></a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
