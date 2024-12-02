import gradient from "@material-tailwind/react/theme/components/timeline/timelineIconColors/gradient";
import { Color } from "../../../Interface";
import { Link } from "react-router-dom";

interface Props {
  id: number;
  colors: Color[];
  onHover: (colorId: number) => void;
}

const ColorCard = ({ colors, onHover }: Props) => {
  return (
    <div className="flex items-center gap-2 pt-2">
      {colors.slice(0, 4).map((color) => (
        <Link
          to=""
          key={color.colorId}
          style={{ backgroundColor: color.hexaCode }}
          onMouseEnter={() => onHover(color.colorId)}
          className="inline-block cursor-pointer rounded-full border-2 hover:border-black sm:h-2 sm:w-4 md:h-4 md:w-4 lg:h-6 lg:w-6"
        ></Link>
      ))}
    </div>
  );
};

export default ColorCard;
