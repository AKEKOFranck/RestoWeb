import Photo from "@/components/ui/Photo";
import { formatPrice } from "@/lib/format";
import styles from "./DishCard.module.css";

export default function DishCard({ dish }) {
  return (
    <article className={styles.card}>
      {dish.image && (
        <div className={styles.photo}>
          <Photo src={dish.image} alt={dish.name} sizes="(max-width: 700px) 100vw, 400px" />
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.head}>
          <h3>{dish.name}</h3>
          <p className={styles.price}>{formatPrice(dish.price)}</p>
        </div>
        <p className={styles.desc}>{dish.description}</p>
        {dish.tags?.length > 0 && (
          <ul className={styles.tags}>
            {dish.tags.map((tag) => (<li key={tag}>{tag}</li>))}
          </ul>
        )}
      </div>
    </article>
  );
}
