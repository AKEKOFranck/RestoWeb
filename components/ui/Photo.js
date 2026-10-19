"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Photo.module.css";

// Cadre photo : si le fichier n’existe pas encore, on garde un aplat de couleur.
export default function Photo({ src, alt, sizes = "100vw", priority = false, tone = "var(--sable-2)", className = "" }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`${styles.frame} ${className}`} style={{ backgroundColor: tone }}>
      {src && !failed && (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={styles.img} onError={() => setFailed(true)} />
      )}
    </div>
  );
}
