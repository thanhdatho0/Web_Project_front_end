import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { convertSlugToTitle } from "../../Service/slugService";
import axios from "axios";

interface Props {
  onAddCategoryName: (categoryName: string) => void;
  categoryId: number;
}

const Breadcrumbs: React.FC<Props> = ({
  onAddCategoryName,
  categoryId,
}: Props) => {
  const location = useLocation();
  const [categoryName, setCategoryName] = useState<string>("");
  const pathnames = location.pathname.split("/").filter((x) => x);

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5254/api/categories/${categoryId}`
        );

        const categoryData = response.data;
        if (categoryData.name) {
          setCategoryName(categoryData.name);
          onAddCategoryName(categoryData.name);
        } else {
          console.error("Name not found in category data:", categoryData);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryName();
  }, [categoryId]);

  return (
    <nav className="text-blue-500 text text-base">
      <ul className="flex mb-6 mt-6 ">
        <li>
          <Link to="/" className="hover:text-blue-500 hover:underline mt-2">
            Trang chủ
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const title = convertSlugToTitle(value);

          if (value === "category") return null;

          return (
            <li key={to}>
              <span className="mx-2 mt-6">/</span>
              {last ? (
                <span>{categoryName || title || "Loading..."}</span>
              ) : (
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
