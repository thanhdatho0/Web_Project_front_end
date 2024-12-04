const slugToTitleDictionary: Record<string, string> = {
  "ao-nam": "Áo nam",
  "ao-polo-nam": "Áo polo",
  "ao-so-mi-nam": "Áo sơ mi",
  "ao-khoac-nam": "Áo khoác",
  "ao-hoodie-ni-nam": "Áo Hoodie - Áo nỉ",
  "ao-the-thao-tre-em": "Áo thể thao trẻ em",
  "quan-nam": "Quần nam",
  "do-bo-nam": "Đồ bộ nam",
  "do-mac-trong-nam": "Đồ mặc trong nam",
  "do-the-thao-nam": "Đồ thể thao nam",
  "phu-kien-nam": "Phụ kiện nam",
  "ao-nu": "Áo nữ",
  "quan-nu": "Quần nữ",
  "do-bo-nu": "Đồ bộ nữ",
  "do-mac-trong-nu": "Đồ mặc trong nữ",
  "do-the-thao-nu": "Đồ thể thao nữ",
  "dam-va-chan-vay-nu": "Đầm và chân váy nữ",
  "phu-kien-nu": "Phụ kiện nữ",
  "ao-tre-em": "Áo trẻ em",
  "quan-tre-em": "Quần trẻ em",
  "do-bo-tre-em": "Đồ bộ trẻ em",
  "do-mac-trong-tre-em": "Đồ mặc trong trẻ em",
  "do-the-thao-tre-em": "Đồ thể thao trẻ em",
  "dam-va-chan-vay-be-gai": "Đầm và chân váy bé gái",
  "phu-kien-tre-em": "Phụ kiện trẻ em",
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
