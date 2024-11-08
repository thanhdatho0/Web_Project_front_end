import WideDropdownMenu from "../../ContentComponents/ItemSuggestions/WideDropdownMenu";
import Navigation from "./Navigation";

// const items = [
//   {
//     name: "SALE",
//     navigate: "#",
//   },
//   {
//     name: "Mới về",
//     navigate: "#",
//   },
//   {
//     name: "Bán chạy",
//     navigate: "#",
//   },
//   {
//     name: "Nam",
//     navigate: "#",
//   },
//   {
//     name: "Nữ",
//     navigate: "#",
//   },
//   {
//     name: "Trẻ em",
//     navigate: "#",
//   },
//   {
//     name: "Bộ sưu tập",
//     navigate: "#",
//   },
//   {
//     name: "Đồng phục",
//     navigate: "#",
//   },
//   {
//     name: "Tin hot",
//     navigate: "#",
//   },
// ];

const aoNamItems = [
  { navigate: "#", description: "Áo nam" },
  { navigate: "#", description: "Áo polo" },
  { navigate: "#", description: "Áo thun" },
  { navigate: "#", description: "Áo sơ mi" },
  { navigate: "#", description: "Áo khoác" },
  { navigate: "#", description: "Áo hoodie - Áo nỉ" },
];
const quanNamItems = [
  { navigate: "#", description: "Quần" },
  { navigate: "#", description: "Quần jeans" },
  { navigate: "#", description: "Quần âu" },
  { navigate: "#", description: "Quần kaki" },
  { navigate: "#", description: "Quần dài" },
  { navigate: "#", description: "Quần short" },
];
const doBoNamItems = [
  { navigate: "#", description: "Đồ bộ" },
  { navigate: "#", description: "Đồ bộ ngắn tay" },
  { navigate: "#", description: "Đồ bộ dài tay" },
];

const doMacTrongNamItems = [
  { navigate: "#", description: "Đò mặc trong" },
  { navigate: "#", description: "Áo ba lỗ" },
  { navigate: "#", description: "Quần lót" },
  { navigate: "#", description: "Áo giữ nhiệt" },
];

const doTheThaoNamItems = [
  { navigate: "#", description: "Đồ thể thao nam" },
  { navigate: "#", description: "Áo thun thể thao" },
  { navigate: "#", description: "Áo polo" },
  { navigate: "#", description: "Quần thể thao" },
  { navigate: "#", description: "Bộ thể thao" },
];

const phuKienNamItems = [
  { navigate: "#", description: "Phụ kiện nam" },
  { navigate: "#", description: "Giày" },
  { navigate: "#", description: "Thắt lưng" },
  { navigate: "#", description: "Mũ" },
  { navigate: "#", description: "Khác" },
];

// Các danh mục sản phẩm nữ
const aoNuItems = [
  { navigate: "#", description: "Áo nữ" },
  { navigate: "#", description: "Áo polo" },
  { navigate: "#", description: "Áo thun" },
  { navigate: "#", description: "Áo sơ mi" },
  { navigate: "#", description: "Áo chống nắng" },
  { navigate: "#", description: "Áo khoác" },
  { navigate: "#", description: "Áo hoodie - Áo nỉ" },
  { navigate: "#", description: "Áo len" },
];

const quanNuItems = [
  { navigate: "#", description: "Quần nữ" },
  { navigate: "#", description: "Quần jeans" },
  { navigate: "#", description: "Quần âu" },
  { navigate: "#", description: "Quần kaki" },
  { navigate: "#", description: "Quần dài" },
  { navigate: "#", description: "Quần short" },
  { navigate: "#", description: "Quần nỉ nữ" },
];

const doBoNuItems = [
  { navigate: "#", description: "Đồ bộ" },
  { navigate: "#", description: "Đồ bộ ngắn tay" },
  { navigate: "#", description: "Đồ bộ dài tay" },
];

const doMacTrongNuItems = [
  { navigate: "#", description: "Đồ mặc trong" },
  { navigate: "#", description: "Áo ba lỗ - 2 day" },
  { navigate: "#", description: "Quần lót" },
  { navigate: "#", description: "Áo bra" },
  { navigate: "#", description: "Áo giữ nhiệt" },
];

const doTheThaoNuItems = [
  { navigate: "#", description: "Đồ thể thao" },
  { navigate: "#", description: "Áo polo thể thao" },
  { navigate: "#", description: "Bộ thể thao" },
];

const vayNuItems = [
  { navigate: "#", description: "Váy nữ" },
  { navigate: "#", description: "Đầm" },
  { navigate: "#", description: "Chân váy" },
];

const phuKienNuItems = [
  { navigate: "#", description: "Phụ kiện nữ" },
  { navigate: "#", description: "Giày" },
  { navigate: "#", description: "Túi xách" },
  { navigate: "#", description: "Tất nữ" },
  { navigate: "#", description: "Khác" },
];

// Các danh mục sản phẩm trẻ con
const aoTreEmItems = [
  { navigate: "#", description: "Áo trẻ em" },
  { navigate: "#", description: "Áo polo" },
  { navigate: "#", description: "Áo thun" },
  { navigate: "#", description: "Áo sơ mi" },
  { navigate: "#", description: "Áo khoác" },
  { navigate: "#", description: "Áo hoodie - Áo nỉ" },
  { navigate: "#", description: "Áo len" },
];

const quanTreEmItems = [
  { navigate: "#", description: "Quần trẻ em" },
  { navigate: "#", description: "Quần jeans" },
  { navigate: "#", description: "Quần kaki" },
  { navigate: "#", description: "Quần dài" },
  { navigate: "#", description: "Quần short" },
  { navigate: "#", description: "Quần nỉ" },
];

const doBoTreEmItems = [
  { navigate: "#", description: "Đồ bộ trẻ em" },
  { navigate: "#", description: "Đồ bộ ngắn tay" },
  { navigate: "#", description: "Đồ bộ dài tay" },
];

const doMacTrongItems = [
  { navigate: "#", description: "Đồ mặc trong" },
  { navigate: "#", description: "Áo giữ nhiệt" },
];

const vayTreEmItems = [
  { navigate: "#", description: "Đầm - Chân váy" },
  { navigate: "#", description: "Đầm" },
  { navigate: "#", description: "Chân váy" },
];

const phuKienTreEmItems = [
  { navigate: "#", description: "Phụ kiện trẻ em" },
  { navigate: "#", description: "Mũ" },
  { navigate: "#", description: "Tất" },
  { navigate: "#", description: "Khác" },
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
      {/* <MegaMenuDefault /> */}
    </div>
  );
};

export default NavigationList;
