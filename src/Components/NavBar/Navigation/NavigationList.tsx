import WideDropdownMenu from "../../ContentComponents/WideDropdownMenu/WideDropdownMenu";
import Navigation from "./Navigation";
import aoNamItems from "../../../JsonData/AoNamItems.json";
import quanNamItems from "../../../JsonData/QuanNamItems.json";

// const aoNamItems =

const doBoNamItems = [
  { navigate: "do-bo-nam", description: "Đồ bộ" },
  { navigate: "db-ngan-tay", description: "Đồ bộ ngắn tay nam", id: "11" },
  { navigate: "db-dai-tay", description: "Đồ bộ dài tay nam", id: "12" },
];

const doMacTrongNamItems = [
  { navigate: "do-mac-trong-nam", description: "Đồ mặc trong" },
  { navigate: "ao-ba-lo", description: "Áo ba lỗ nam", id: "13" },
  { navigate: "quan-lot", description: "Quần lót nam", id: "14" },
  { navigate: "ao-giu-nhiet", description: "Áo giữ nhiệt nam", id: "15" },
];

const doTheThaoNamItems = [
  { navigate: "do-the-thao-nam", description: "Đồ thể thao" },
  {
    navigate: "ao-thun-the-thao",
    description: "Áo thun thể thao nam",
    id: "16",
  },
  { navigate: "ao-polo", description: "Áo polo nam", id: "17" },
  { navigate: "quan-the-thao", description: "Quần thể thao nam", id: "18" },
  { navigate: "bo-the-thao", description: "Bộ thể thao nam", id: "19" },
];

const phuKienNamItems = [
  { navigate: "phu-kien-nam", description: "Phụ kiện" },
  { navigate: "giay", description: "Giày nam", id: "20" },
  { navigate: "that-lung", description: "Thắt lưng nam", id: "21" },
  { navigate: "mu", description: "Mũ nam", id: "22" },
];

// Các danh mục sản phẩm nữ
const aoNuItems = [
  { navigate: "ao-nu", description: "Áo" },
  { navigate: "ao-polo", description: "Áo polo nữ", id: "23" },
  { navigate: "ao-thun", description: "Áo thun nữ", id: "24" },
  { navigate: "ao-so-mi", description: "Áo sơ mi nữ", id: "25" },
  { navigate: "ao-chong-nang", description: "Áo chống nắng nữ", id: "26" },
  { navigate: "ao-khoac", description: "Áo khoác nữ", id: "27" },
  { navigate: "ao-hoodie-ni", description: "Áo hoodie - Áo nỉ nữ", id: "28" },
  { navigate: "#ao-len", description: "Áo len nữ", id: "29" },
];

const quanNuItems = [
  { navigate: "quan-nu", description: "Quần" },
  { navigate: "quan-jeans", description: "Quần jeans nữ", id: "30" },
  { navigate: "quan-au", description: "Quần âu nữ", id: "31" },
  { navigate: "quan-kaki", description: "Quần kaki nữ", id: "32" },
  { navigate: "quan-dai", description: "Quần dài nữ", id: "33" },
  { navigate: "quan-short", description: "Quần short nữ", id: "34" },
  { navigate: "quan-ni", description: "Quần nỉ nữ", id: "35" },
];

const doBoNuItems = [
  { navigate: "do-bo-nu", description: "Đồ bộ" },
  { navigate: "do-bo-ngan-tay", description: "Đồ bộ ngắn tay nữ", id: "36" },
  { navigate: "do-bo-dai-tay", description: "Đồ bộ dài tay nữ", id: "37" },
];

const doMacTrongNuItems = [
  { navigate: "do-mac-trong-nu", description: "Đồ mặc trong" },
  { navigate: "ao-ba-lo-2-day", description: "Áo ba lỗ - 2 day nữ", id: "38" },
  { navigate: "quan-lot", description: "Quần lót nữ", id: "39" },
  { navigate: "ao-bra", description: "Áo bra nữ", id: "40" },
  { navigate: "ao-giu-nhiet", description: "Áo giữ nhiệt nữ", id: "41" },
];

const doTheThaoNuItems = [
  { navigate: "do-the-thao-nu", description: "Đồ thể thao" },
  {
    navigate: "ao-polo-the-thao",
    description: "Áo polo thể thao nữ",
    id: "42",
  },
  { navigate: "bo-the-thao", description: "Bộ thể thao nữ", id: "43" },
];

const vayNuItems = [
  { navigate: "vay-nu", description: "Váy" },
  { navigate: "dam-nu", description: "Đầm nữ", id: "44" },
  { navigate: "chan-vay-nu", description: "Chân váy nữ", id: "45" },
];

const phuKienNuItems = [
  { navigate: "phu-kien-nu", description: "Phụ kiện" },
  { navigate: "giay", description: "Giày nữ", id: "46" },
  { navigate: "tui-xach", description: "Túi xách nữ", id: "47" },
  { navigate: "tat", description: "Tất nữ", id: "48" },
];

// Các danh mục sản phẩm trẻ con
const aoTreEmItems = [
  { navigate: "ao-tre-em", description: "Áo" },
  { navigate: "ao-polo", description: "Áo polo trẻ ẻm", id: "49" },
  { navigate: "ao-thun", description: "Áo thun trẻ em", id: "50" },
  { navigate: "ao-so-mi", description: "Áo sơ mi trẻ em", id: "51" },
  { navigate: "ao-khoac", description: "Áo khoác trẻ em", id: "52" },
  {
    navigate: "ao-hoodie-ni",
    description: "Áo hoodie - Áo nỉ trẻ em",
    id: "53",
  },
  { navigate: "ao-len", description: "Áo len trẻ em", id: "54" },
];

const quanTreEmItems = [
  { navigate: "quan", description: "Quần " },
  { navigate: "quan-jean", description: "Quần jeans trẻ em", id: "55" },
  { navigate: "quan-kaki", description: "Quần kaki trẻ em", id: "56" },
  { navigate: "quan-dai", description: "Quần dài trẻ em", id: "57" },
  { navigate: "quan-short", description: "Quần short trẻ em", id: "58" },
  { navigate: "quan-ni", description: "Quần nỉ trẻ em", id: "59" },
];

const doBoTreEmItems = [
  { navigate: "do-bo-tre-em", description: "Đồ bộ" },
  {
    navigate: "do-bo-ngan-tay",
    description: "Đồ bộ ngắn tay trẻ em",
    id: "60",
  },
  { navigate: "do-bo-dai-tay", description: "Đồ bộ dài tay trẻ em", id: "61" },
];

const doMacTrongItems = [
  { navigate: "do-mac-trong-tre-em", description: "Đồ mặc trong" },
  { navigate: "ao-giu-nhiet", description: "Áo giữ nhiệt trẻ em", id: "62" },
];

const vayTreEmItems = [
  { navigate: "dam-chan-vay-tre-em", description: "Đầm - Chân váy" },
  { navigate: "dam", description: "Đầm trẻ em", id: "63" },
  { navigate: "chan-vay", description: "Chân váy trẻ em", id: "64" },
];

const phuKienTreEmItems = [
  { navigate: "phu-kien-tre-em", description: "Phụ kiện" },
  { navigate: "mu", description: "Mũ trẻ em", id: "65" },
  { navigate: "tat", description: "Tất trẻ em", id: "66" },
];

const items = [
  { name: "SALE", navigate: "#" },
  { name: "Mới về", navigate: "#" },
  { name: "Bán chạy", navigate: "#" },
  {
    name: "Nam",
    items: [
      aoNamItems,
      quanNamItems,
      doBoNamItems,
      doMacTrongNamItems,
      doTheThaoNamItems,
      phuKienNamItems,
    ],
    img: "https://yody.vn/images/menu-desktop/menu_man.png",
  },
  {
    name: "Nữ",
    items: [
      aoNuItems,
      quanNuItems,
      doBoNuItems,
      doMacTrongNuItems,
      doTheThaoNuItems,
      vayNuItems,
      phuKienNuItems,
    ],
    img: "https://yody.vn/images/menu-desktop/menu_woman.png",
  },
  {
    name: "Trẻ em",
    items: [
      aoTreEmItems,
      quanTreEmItems,
      doBoTreEmItems,
      doMacTrongItems,
      vayTreEmItems,
      phuKienTreEmItems,
    ],
    img: "https://yody.vn/images/menu-desktop/menu_man.png",
  },
  { name: "Bộ sưu tập", navigate: "#" },
  { name: "Đồng phục", navigate: "#" },
  { name: "Tin hot", navigate: "#" },
];

const NavigationList = () => {
  return (
    <div>
      <div className="relative flex flex-row font-semibold">
        {items.map((item, index) =>
          item.items ? (
            <WideDropdownMenu
              key={index}
              name={item.name}
              items={item.items}
              img={item.img}
            />
          ) : (
            <Navigation key={index} name={item.name} navigate={item.navigate} />
          )
        )}
      </div>
    </div>
  );
};

export default NavigationList;
