import PageHeader from "@/components/ui/PageHeader";
import MenuExplorer from "@/components/menu/MenuExplorer";
import { availableDishes, categories } from "@/lib/menu";
import styles from "./page.module.css";

export const metadata = {
  title: "Notre cuisine",
  description: "La carte : poissons et poulets braisés, plats mijotés, accompagnements, boissons et desserts.",
};

export default function NotreCuisinePage() {
  return (
    <>
      <PageHeader label="Notre cuisine" title="Braisé au feu de bois, mijoté avec patience." intro="Produits frais, recettes de chez nous. Les prix sont en FCFA." />
      <section className={`section ${styles.wrap}`}>
        <div className="container">
          <MenuExplorer categories={categories} dishes={availableDishes} />
        </div>
      </section>
    </>
  );
}
