const slugToTitleDictionary: Record<string, string> = {
  "ao-nam": "Áo nam",
  "ao-polo-nam": "Áo polo",
  "ao-so-mi-nam": "Áo sơ mi",
  "ao-khoac-nam": "Áo khoác",
  "ao-hoodie-ni-nam": "Áo Hoodie - Áo nỉ",
  "ao-the-thao-tre-em": "Áo thể thao trẻ em",
};

export const convertSlugToTitle = (slug: string): string => {
  return (
    slugToTitleDictionary[slug] ||
    slug
      .replace(/-/g, " ")
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
};
