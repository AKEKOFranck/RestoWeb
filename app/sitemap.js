import { site } from "@/data/site";

export default function sitemap() {
  const paths = [...site.nav.map((item) => item.href), "/reserver"];
  return paths.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
  }));
}
