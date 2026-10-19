import styles from "./PageHeader.module.css";

export default function PageHeader({ label, title, intro }) {
  return (
    <header className={styles.header}>
      <div className="container">
        {label && <p className="script">{label}</p>}
        <h1>{title}</h1>
        {intro && <p className={styles.intro}>{intro}</p>}
      </div>
    </header>
  );
}
