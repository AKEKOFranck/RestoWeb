import PageHeader from "@/components/ui/PageHeader";
import Reservation from "@/components/reservation/Reservation";
import { site } from "@/data/site";
import { formatHours, getBookingWindow } from "@/lib/schedule";
import styles from "./page.module.css";

export const revalidate = 3600; // la fenêtre de dates est recalculée toutes les heures

export const metadata = {
  title: "Réserver une table",
  description: "Réservez votre table en quelques secondes : votre demande est envoyée au restaurant par WhatsApp.",
};

export default function ReserverPage() {
  const { min, max } = getBookingWindow();
  return (
    <>
      <PageHeader label="Réservation" title="Réservez votre table." intro="Remplissez le formulaire : votre demande arrive directement sur le WhatsApp du restaurant." />
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <Reservation minDate={min} maxDate={max} />
          <aside className={styles.aside}>
            <h2>Horaires</h2>
            <dl className={styles.hours}>
              {site.hours.map((h) => (
                <div key={h.day}><dt>{h.label}</dt><dd>{formatHours(h)}</dd></div>
              ))}
            </dl>
            <h2>Adresse</h2>
            <p>
              <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {site.address.line}, {site.address.city}
              </a>
            </p>
            <p className={styles.note}>Pour plus de {site.reservation.maxGuests} personnes, indiquez le nombre exact dans les précisions.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
