"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMapPin, FiMenu, FiX } from "react-icons/fi";
import { site } from "@/data/site";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} onClick={close}>
          <span className={styles.name}>{site.name}</span>
          <span className={styles.tagline}>{site.tagline}</span>
        </Link>

        <nav id="menu-principal" aria-label="Navigation principale" className={styles.nav} data-open={open}>
          <ul>
            {site.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={active ? `${styles.link} ${styles.active}` : styles.link}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.side}>
          <span className={styles.place}>
            <FiMapPin aria-hidden="true" />
            {site.address.line}, {site.address.city}
          </span>
          <Link href="/reserver" className={`btn btnPrimary ${styles.cta}`} onClick={close}>
            Réserver une table
          </Link>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX aria-hidden="true" size={26} /> : <FiMenu aria-hidden="true" size={26} />}
          </button>
        </div>
      </div>
    </header>
  );
}
