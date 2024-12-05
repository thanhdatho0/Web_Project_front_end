import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { convertSlugToTitle } from "../../Service/slugService";
import { getCategoryId, getSubcategoryId, getTargetId } from "../../../api";

interface Props {
  targetId: number;
  categoryId: number;
  subcategoryId?: number;
  productId?: number;
  name?: string;
  onTitleChange?: (name: string) => void;
}

const Breadcrumbs: React.FC<Props> = ({
  targetId,
  categoryId,
  subcategoryId,
  name,
  onTitleChange,
  productId,
}: Props) => {
  const location = useLocation();
  const [targetName, setTargetName] = useState<string>("Loading target...");
  const [categoryName, setCategoryName] = useState<string>(
    "Loading category..."
  );
  const [subcategoryName, setSubcategoryName] = useState<string>(
    "Loading subcategory..."
  );
  const pathnames = location.pathname.split("/").filter((x) => x);

  useEffect(() => {
    const fetchSubcategoryName = async () => {
      try {
        const targetData = await getTargetId(targetId);

        if (typeof targetData === "string") {
          console.error("Error fetching target :", targetData);
          return null;
        }

        setTargetName(targetData.targetCustomerName || "Unknown target");

        const categoryData = await getCategoryId(categoryId);

        if (typeof categoryData === "string") {
          console.error("Error fetching category:", categoryData);
          return null;
        }

        const fetchedCategoryName = categoryData.name || "Unknown category";
        setCategoryName(fetchedCategoryName);

        if (subcategoryId != null) {
          const subcategoryData = await getSubcategoryId(subcategoryId);

          if (typeof subcategoryData === "string") {
            console.error("Error fetching subcategory:", subcategoryData);
            return null;
          }

          const fetchedSubcategoryName =
            subcategoryData.subcategoryName || "Unknown subcategory";
          setSubcategoryName(fetchedSubcategoryName);
          if (onTitleChange) onTitleChange(fetchedSubcategoryName);
        } else {
          if (onTitleChange) onTitleChange(fetchedCategoryName);
        }
      } catch (error) {
        console.error("Error fetching subcategory data:", error);
      }
    };

    fetchSubcategoryName();
  }, [targetId, categoryId, subcategoryId, onTitleChange]);

  return (
    <nav className=" text text-base">
      <ul className="flex mb-6 mt-6 ">
        <li>
          <Link
            to="/"
            className="hover:text-blue-500 hover:underline mt-2 text-black"
          >
            Trang chủ
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          let title = convertSlugToTitle(value);

          // if (productId == null && value === "category") return null;
          if (value === "category") return null;

          if (index === 0) {
            title = targetName;
          } else if (index === 1) {
            title = categoryName;
          } else if (index === 2) {
            title = subcategoryName;
          }
          // else if (productId == null) return null;

          return (
            <li key={to}>
              <span className="mx-2 mt-6 text-black"> {">"} </span>
              {last ? (
                productId ? (
                  // Khi có productId, hiển thị toàn bộ breadcrumb, bao gồm tên sản phẩm, subcategory, và category
                  <span className="text-blue-500">{name}</span>
                ) : subcategoryId ? (
                  // Nếu không có productId nhưng có subcategoryId, hiển thị tên subcategory
                  <span className="text-blue-500">
                    {subcategoryName || title}
                  </span>
                ) : (
                  // Nếu không có cả productId và subcategoryId, chỉ hiển thị tên category
                  <span className="text-blue-500">{categoryName || title}</span>
                )
              ) : (
                // Nếu không phải phần tử cuối, hiển thị liên kết breadcrumb
                <Link to={to} className="hover:underline hover:text-blue-500">
                  {title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
