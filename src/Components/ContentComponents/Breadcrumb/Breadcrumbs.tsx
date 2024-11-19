import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { convertSlugToTitle } from "../../Service/slugService";

interface Props {
  onAddCategoryName: (categoryName: string) => void;
  onAddCategoryLocation: (category: string) => void;
}

const Breadcrumbs: React.FC<Props> = ({
  onAddCategoryName,
  onAddCategoryLocation,
}: Props) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  onAddCategoryLocation(pathnames[pathnames.length - 1]);

  useEffect(() => {
    const categoryPath = pathnames[pathnames.length - 1];
    const title = convertSlugToTitle(categoryPath);
    onAddCategoryName(title);
  }, [location.pathname, onAddCategoryName]);
  return (
    <nav className="text-blue-500 text text-base">
      {" "}
      <ul className="flex mb-6">
        <li>
          <Link to="/" className="hover:text-blue-500 hover:underline mt-2">
            Home
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
              {last ? <span>{title}</span> : <Link to={to}>{title}</Link>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
