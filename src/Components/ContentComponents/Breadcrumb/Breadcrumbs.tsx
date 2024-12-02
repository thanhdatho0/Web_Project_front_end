import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { convertSlugToTitle } from "../../Service/slugService";
import { getSubcategoryId } from "../../../api";

interface Props {
  onAddSubcategoryName: (subcategoryName: string) => void;
  subcategoryId: number;
}

const Breadcrumbs: React.FC<Props> = ({
  onAddSubcategoryName,
  subcategoryId,
}: Props) => {
  const location = useLocation();
  const [subcategoryName, setSubcategoryName] = useState<string>("");
  const pathnames = location.pathname.split("/").filter((x) => x);

  useEffect(() => {
    if (!subcategoryId) return;

    const fetchSubcategoryName = async () => {
      try {
        const subcategoryData = await getSubcategoryId(subcategoryId);

        if (typeof subcategoryData === "string") {
          console.error("Error fetching subcategory:", subcategoryData);
          return null;
        }
        if (subcategoryData.subcategoryName) {
          setSubcategoryName(subcategoryData.subcategoryName);
          onAddSubcategoryName(subcategoryData.subcategoryName);
        } else {
          console.error("Name not found in subcategory data:", subcategoryData);
        }
      } catch (error) {
        console.error("Error fetching subcategory data:", error);
      }
    };

    fetchSubcategoryName();
  }, [subcategoryId, onAddSubcategoryName]);

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

          if (value === "subcategory") return null;

          return (
            <li key={to}>
              <span className="mx-2 mt-6">/</span>
              {last ? (
                <span>{subcategoryName || title || "Loading..."}</span>
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
