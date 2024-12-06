import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategoryId, getSubcategoryId } from "../../../api";

interface Props {
  targetId: number;
  categoryId: number;
  subcategoryId?: number;
  productId?: number;
  name?: string;
  onTitleChange?: (name: string) => void;
}

const slugify = (text: string) => {
  const from =
    "áàảãạăắằẳẵặâấầẩẫậóòỏõọôốồổỗộơớờởỡợéèẻẽẹêếềểễệúùủũụưứừửữựíìỉĩịýỳỷỹỵđ";
  const to =
    "aaaaaaaaaaaaaaaaaaooooooooooooooooeeeeeeeeeeeuuuuuuuuuuuuiiiiiyyyyyd";

  let slug = text
    .split("")
    .map((char) => {
      const i = from.indexOf(char.toLowerCase());
      return i !== -1 ? to[i] : char;
    })
    .join("");

  slug = slug.toLowerCase();

  slug = slug.replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

  return slug.replace(/^-+|-+$/g, "");
};

const Breadcrumbs: React.FC<Props> = ({
  targetId,
  categoryId,
  subcategoryId,
  name,
  onTitleChange,
  productId,
}: Props) => {
  const [categoryName, setCategoryName] = useState<string>(
    "Loading category..."
  );
  const [subcategoryName, setSubcategoryName] = useState<string>(
    "Loading subcategory..."
  );
  useEffect(() => {
    const fetchSubcategoryName = async () => {
      try {
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

  const isProductPage = !!productId && !!name;
  const isSubcateogryPage = !!subcategoryId;

  const navigate = useNavigate();

  const handleNavigation = async (
    name: string,
    targetId: number,
    categoryId: number,
    subcategoryId?: number
  ) => {
    try {
      const formattedName = slugify(name);
      const path = subcategoryId
        ? `/subCategory/${formattedName}`
        : `/category/${formattedName}`;

      navigate(path, {
        state: {
          targetCustomerId: targetId,
          categoryId,
          ...(subcategoryId && { subcategoryId }),
        },
      });
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };

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
        {/* Category */}
        {categoryId && (
          <li>
            <span className="mx-2 text-black"> {">"} </span>
            <span
              onClick={() =>
                handleNavigation(categoryName, targetId, categoryId)
              }
              // className="hover:underline hover:text-blue-500"
              className={
                isSubcateogryPage
                  ? "text-black hover:underline hover:text-blue-500 cursor-pointer"
                  : "text-blue-500"
              }
            >
              {categoryName}
            </span>
          </li>
        )}

        {/* Subcategory */}
        {subcategoryId && (
          <li>
            <span className="mx-2 text-black"> {">"} </span>
            <span
              onClick={() =>
                handleNavigation(
                  subcategoryName,
                  targetId,
                  categoryId,
                  subcategoryId
                )
              }
              // className="hover:underline hover:text-blue-500"
              className={
                isProductPage
                  ? "text-black hover:underline hover:text-blue-500 cursor-pointer"
                  : "text-blue-500"
              }
            >
              {subcategoryName}
            </span>
          </li>
        )}

        {/* Sản phẩm (chỉ hiển thị khi ở trang sản phẩm) */}
        {isProductPage && (
          <li>
            <span className="mx-2 text-black"> {">"} </span>
            <span className="text-blue-500">{name}</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
