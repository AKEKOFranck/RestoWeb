"use client";

import { useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { FiCheck } from "react-icons/fi";
import { site } from "@/data/site";
import { buildSlots, formatDateFr, formatTime } from "@/lib/schedule";
import styles from "./Reservation.module.css";

const GUEST_OPTIONS = Array.from({ length: site.reservation.maxGuests }, (_, i) => i + 1);
const EMPTY = { name: "", guests: "2", date: "", time: "", notes: "", website: "" };

export default function Reservation({ minDate, maxDate }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done
  const [serverError, setServerError] = useState("");
  const [result, setResult] = useState(null);
  const [startedAt] = useState(() => Date.now());

  const slots = useMemo(() => (form.date ? buildSlots(form.date) : []), [form.date]);
  const noSlot = form.date !== "" && slots.length === 0;

  const update = (field) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [field]: value, ...(field === "date" ? { time: "" } : {}) }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    setServerError("");

    const local = {};
    if (form.name.trim().length < 2) local.name = "Indiquez votre nom.";
    if (!form.date) local.date = "Choisissez une date.";
    else if (noSlot) local.date = "Aucun créneau ce jour-là. Choisissez une autre date.";
    if (form.date && !noSlot && !form.time) local.time = "Choisissez un horaire.";
    if (Object.keys(local).length) return setErrors(local);

    setStatus("sending");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, startedAt }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors ?? {});
        setServerError(data.error ?? "Une erreur est survenue. Réessayez.");
        return setStatus("idle");
      }
      if (!data.url) {
        setServerError("L’envoi a échoué. Réessayez dans un instant.");
        return setStatus("idle");
      }
      setResult({ url: data.url, reference: data.reference, summary: data.summary });
      setStatus("done");
    } catch {
      setServerError("Connexion impossible. Vérifiez votre réseau et réessayez.");
      setStatus("idle");
    }
  }

  if (status === "done" && result) {
    const s = result.summary;
    return (
      <div className={styles.panel} role="status">
        <p className={styles.doneIcon}><FiCheck aria-hidden="true" size={28} /></p>
        <h2 className={styles.doneTitle}>Votre demande est prête</h2>
        <p className={styles.doneText}>
          Dernière étape : ouvrez WhatsApp et appuyez sur « Envoyer ». Le restaurant reçoit alors votre demande et vous confirme la table.
        </p>
        <dl className={styles.recap}>
          <div><dt>Nom</dt><dd>{s.name}</dd></div>
          <div><dt>Personnes</dt><dd>{s.guests}</dd></div>
          <div><dt>Date</dt><dd>{formatDateFr(s.date)}</dd></div>
          <div><dt>Heure</dt><dd>{formatTime(s.time)}</dd></div>
          <div><dt>Référence</dt><dd>{result.reference}</dd></div>
        </dl>
        <div className={styles.doneActions}>
          <a href={result.url} target="_blank" rel="noopener noreferrer" className="btn btnPrimary">
            <FaWhatsapp aria-hidden="true" size={20} /> Ouvrir WhatsApp
          </a>
          <button type="button" className="btn btnSoft" onClick={() => { setForm(EMPTY); setResult(null); setStatus("idle"); }}>
            Modifier la demande
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.panel} onSubmit={onSubmit} noValidate>
      <div className={styles.field + " " + styles.full}>
        <label htmlFor="r-name">Nom</label>
        <input id="r-name" name="name" type="text" autoComplete="name" maxLength={60} value={form.name} onChange={update("name")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "r-name-err" : undefined} />
        {errors.name && <p id="r-name-err" className={styles.error} role="alert">{errors.name}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="r-guests">Personnes</label>
        <select id="r-guests" name="guests" value={form.guests} onChange={update("guests")}>
          {GUEST_OPTIONS.map((n) => (<option key={n} value={n}>{n}</option>))}
        </select>
        {errors.guests && <p className={styles.error} role="alert">{errors.guests}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="r-date">Date</label>
        <input id="r-date" name="date" type="date" min={minDate} max={maxDate} value={form.date} onChange={update("date")} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? "r-date-err" : undefined} />
        {errors.date && <p id="r-date-err" className={styles.error} role="alert">{errors.date}</p>}
      </div>

      <div className={styles.field + " " + styles.full}>
        <label htmlFor="r-time">Heure</label>
        <select id="r-time" name="time" value={form.time} onChange={update("time")} disabled={!form.date || noSlot} aria-invalid={Boolean(errors.time)} aria-describedby={errors.time ? "r-time-err" : undefined}>
          <option value="">{!form.date ? "Choisissez d’abord une date" : noSlot ? "Aucun créneau" : "Choisir un horaire"}</option>
          {slots.map((t) => (<option key={t} value={t}>{formatTime(t)}</option>))}
        </select>
        {errors.time && <p id="r-time-err" className={styles.error} role="alert">{errors.time}</p>}
      </div>

      <div className={styles.field + " " + styles.full}>
        <label htmlFor="r-notes">Précisions (facultatif)</label>
        <textarea id="r-notes" name="notes" rows={3} maxLength={300} placeholder="Anniversaire, allergie, table en terrasse…" value={form.notes} onChange={update("notes")} />
      </div>

      {/* Champ piège pour les robots : invisible pour les humains */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor="r-website">Ne pas remplir</label>
        <input id="r-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")} />
      </div>

      {serverError && <p className={`${styles.error} ${styles.full}`} role="alert">{serverError}</p>}

      <div className={styles.full}>
        <button type="submit" className="btn btnPrimary" disabled={status === "sending"}>
          <FaWhatsapp aria-hidden="true" size={20} />
          {status === "sending" ? "Préparation…" : "Réserver par WhatsApp"}
        </button>
        <p className={styles.hint}>Votre demande est transmise par WhatsApp. Elle est confirmée par le restaurant.</p>
      </div>
    </form>
  );
}
