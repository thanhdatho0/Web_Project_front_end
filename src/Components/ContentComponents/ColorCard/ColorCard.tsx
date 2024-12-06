import { Color } from "../../../Interface";

interface Props {
  colors: Color[];
  onHover: (colorId: number) => void;
}

const ColorCard = ({ colors, onHover }: Props) => {
  return (
    <div className="flex items-center gap-2 pt-2">
      {colors.slice(0, 8).map((color, index) => (
        <div
          key={index}
          style={{ backgroundColor: color.hexaCode }}
          onMouseEnter={() => onHover(color.colorId)}
          className="inline-block cursor-pointer rounded-full border-2 hover:border-black sm:h-2 sm:w-4 md:h-4 md:w-4 lg:h-6 lg:w-6"
        ></div>
      ))}
    </div>
  );
};

export default ColorCard;
