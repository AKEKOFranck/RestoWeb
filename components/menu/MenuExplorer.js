"use client";

import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import DishCard from "./DishCard";
import styles from "./MenuExplorer.module.css";

const normalize = (s) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

export default function MenuExplorer({ categories, dishes }) {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const sections = useMemo(() => {
    const q = normalize(query.trim());
    const byCategory = new Map(categories.map((c) => [c.id, { ...c, items: [] }]));
    for (const dish of dishes) {
      if (active !== "all" && dish.category !== active) continue;
      if (q && !normalize(`${dish.name} ${dish.description}`).includes(q)) continue;
      byCategory.get(dish.category)?.items.push(dish);
    }
    return [...byCategory.values()].filter((s) => s.items.length > 0);
  }, [categories, dishes, active, query]);

  const tabs = [{ id: "all", label: "Tout" }, ...categories];

  return (
    <div>
      <div className={styles.controls}>
        <div className={styles.tabs} role="group" aria-label="Catégories">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={active === tab.id}
              className={active === tab.id ? `${styles.tab} ${styles.tabOn}` : styles.tab}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <label className={styles.search}>
          <FiSearch aria-hidden="true" />
          <span className="srOnly" style={{ position: "absolute", left: "-9999px" }}>Rechercher un plat</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un plat" />
        </label>
      </div>

      {sections.length === 0 ? (
        <p className={styles.empty}>Aucun plat ne correspond à votre recherche. Essayez un autre mot ou choisissez « Tout ».</p>
      ) : (
        sections.map((section) => (
          <section key={section.id} className={styles.section} aria-labelledby={`cat-${section.id}`}>
            <h2 id={`cat-${section.id}`}>{section.label}</h2>
            <div className={styles.grid}>
              {section.items.map((dish) => (<DishCard key={dish.id} dish={dish} />))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
